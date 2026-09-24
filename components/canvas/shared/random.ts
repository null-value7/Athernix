/**
 * PRNG determinista (mulberry32). Sustituye a Math.random() en generación
 * procedural que ocurre durante el render (p. ej. dentro de useMemo): así la
 * función sigue siendo pura -misma semilla, mismo resultado- en vez de
 * depender de una fuente de aleatoriedad impura no permitida por las reglas
 * de pureza de React Compiler.
 */
export function createRng(seed: number) {
  let s = seed >>> 0;
  return function rng() {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
