export async function register() {
  // No-op: required for Cloudflare Workers compatibility.
  // Without this file, Next.js tries to dynamically require
  // .next/server/instrumentation.js which fails in the Workers
  // runtime with "Dynamic require is not supported".
}
