/**
 * Applies local patches to node_modules required for the OpenNext/Cloudflare
 * Workers build. Both patches are idempotent and safe to run repeatedly.
 *
 * 1. next/dist/server/lib/router-utils/instrumentation-globals.external.js
 *    Forces `getInstrumentationModule` to return `null`. The original does a
 *    dynamic `require()` of `instrumentation.js`, which workerd does not
 *    support and crashed every request with
 *    "An error occurred while loading the instrumentation hook".
 *
 * 2. @opennextjs/cloudflare .../patches/plugins/next-server.js
 *    Appends `return;` to the `createComposableCacheHandlersRule` fix template.
 *    The rule replaces `const { cacheMaxMemorySize, cacheHandlers } = ...` with
 *    `const cacheHandlers = null` + global handler registration, but the
 *    original code that follows still references the removed destructured
 *    variables. esbuild then emitted `t`/`e` with no declaration, producing
 *    "ReferenceError: t is not defined" at runtime. The `return;` makes the
 *    leftover code unreachable so the bundler eliminates it.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let failures = 0;

function patchFile(relPath, apply) {
  const abs = join(root, relPath);
  if (!existsSync(abs)) {
    console.warn(`[patch] SKIP (not found): ${relPath}`);
    return;
  }
  const contents = readFileSync(abs, "utf8");
  const result = apply(contents);
  if (result === null) {
    console.log(`[patch] already applied: ${relPath}`);
    return;
  }
  if (result === contents) {
    console.warn(`[patch] FAIL (pattern not found): ${relPath}`);
    failures++;
    return;
  }
  writeFileSync(abs, result);
  console.log(`[patch] applied: ${relPath}`);
}

// --- Patch 1: disable instrumentation hook loading -------------------------
patchFile(
  "node_modules/next/dist/server/lib/router-utils/instrumentation-globals.external.js",
  (src) => {
    if (src.includes("__ATHERNIX_INSTRUMENTATION_PATCH__")) return null;
    const signature = "async function getInstrumentationModule(projectDir, distDir) {";
    const idx = src.indexOf(signature);
    if (idx === -1) return src;
    const insertAt = idx + signature.length;
    return (
      src.slice(0, insertAt) +
      "\n        // __ATHERNIX_INSTRUMENTATION_PATCH__: dynamic require is not supported in workerd.\n" +
      "        return null;" +
      src.slice(insertAt)
    );
  }
);

// --- Patch 2: rewrite OpenNext composable-cache rule to replace whole method -
// The stock rule only replaces the `const { cacheMaxMemorySize, cacheHandlers }`
// declaration inside `loadCustomCacheHandlers`, leaving the rest of the body
// referencing the now-undeclared `cacheMaxMemorySize`. Appending `return;` fixed
// that but made esbuild's dead-code elimination also drop the following sibling
// methods (getPublicDir/getHasStaticDir/getCacheFilesystem) -> "this.getPublicDir
// is not a function" on every request. Replacing the ENTIRE method via a
// pattern/context/selector rule leaves no dead code and no dangling references.
patchFile(
  "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/next-server.js",
  (src) => {
    if (src.includes("__ATHERNIX_CACHE_HANDLERS_PATCH__")) return null;
    const startMarker =
      "export function createComposableCacheHandlersRule(handlerPath) {";
    const startIdx = src.indexOf(startMarker);
    if (startIdx === -1) return src;
    // The function ends with the first "\n}" (closing brace at column 0).
    const endIdx = src.indexOf("\n}", startIdx);
    if (endIdx === -1) return src;
    const replacement =
      "export function createComposableCacheHandlersRule(handlerPath) {\n" +
      "    // __ATHERNIX_CACHE_HANDLERS_PATCH__: replace the whole method so no\n" +
      "    // dead code / dangling cacheMaxMemorySize reference remains.\n" +
      "    return `\n" +
      "rule:\n" +
      "  pattern:\n" +
      "    selector: method_definition\n" +
      '    context: "class { async loadCustomCacheHandlers($$$PARAMS) { $$$_ } }"\n' +
      "fix: |-\n" +
      "  async loadCustomCacheHandlers($$$PARAMS) {\n" +
      "    const handlersSymbol = Symbol.for('@next/cache-handlers');\n" +
      "    const handlersMapSymbol = Symbol.for('@next/cache-handlers-map');\n" +
      "    const handlersSetSymbol = Symbol.for('@next/cache-handlers-set');\n" +
      "    globalThis[handlersMapSymbol] = new Map();\n" +
      '    globalThis[handlersMapSymbol].set("default", require(\'${normalizePath(handlerPath)}\').default);\n' +
      '    globalThis[handlersMapSymbol].set("remote", require(\'${normalizePath(handlerPath)}\').default);\n' +
      "    globalThis[handlersSetSymbol] = new Set(globalThis[handlersMapSymbol].values());\n" +
      "  }\n" +
      "`;\n" +
      "}";
    return src.slice(0, startIdx) + replacement + src.slice(endIdx + 2);
  }
);

if (failures > 0) {
  console.error(`[patch] ${failures} patch(es) failed to apply`);
  process.exit(1);
}
console.log("[patch] done");
