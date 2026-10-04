import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Assets estáticos servidos tal cual (código generado por Unity/Emscripten,
    // no es código fuente del proyecto y no debe analizarse ni formatearse).
    "public/**",
    // Salidas de build (código generado, nunca se edita a mano).
    ".open-next/**",
    ".wrangler/**",
  ]),
]);

export default eslintConfig;
