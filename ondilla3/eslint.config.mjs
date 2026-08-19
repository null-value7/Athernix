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
  ]),
  {
    // react-three-fiber anima mutando objetos de Three.js (cámara,
    // materiales) dentro de useFrame a propósito: es el patrón oficial de
    // r3f para animar a 60fps sin pasar por el ciclo de render de React
    // ("mutate, don't set state" — docs/advanced/pitfalls de r3f). La
    // regla de inmutabilidad/refs de React Compiler no modela ese bucle
    // de render paralelo y marca ese patrón, seguro en r3f, como inseguro.
    // Se desactiva solo en las capas 3D imperativas, no en el resto del
    // proyecto.
    files: ["components/canvas/**/*.{ts,tsx}", "components/materias/scenes/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
    },
  },
]);

export default eslintConfig;
