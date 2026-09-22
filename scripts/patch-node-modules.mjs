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

// --- Patch 2: make OpenNext composable-cache patch emit a return -----------
patchFile(
  "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/next-server.js",
  (src) => {
    if (src.includes("__ATHERNIX_CACHE_HANDLERS_PATCH__")) return null;
    const anchor =
      "globalThis[handlersSetSymbol] = new Set(globalThis[handlersMapSymbol].values());";
    const idx = src.indexOf(anchor);
    if (idx === -1) return src;
    const insertAt = idx + anchor.length;
    return (
      src.slice(0, insertAt) +
      "\n  return; // __ATHERNIX_CACHE_HANDLERS_PATCH__" +
      src.slice(insertAt)
    );
  }
);

if (failures > 0) {
  console.error(`[patch] ${failures} patch(es) failed to apply`);
  process.exit(1);
}
console.log("[patch] done");
