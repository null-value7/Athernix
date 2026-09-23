import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  serverExternalPackages: [
    '@ai-sdk/groq',
    '@ai-sdk/elevenlabs',
    'ai',
    '@supabase/supabase-js',
    '@supabase/ssr',
    '@vercel/og',
  ],
  turbopack: {
    rules: {
      '*.br': { type: 'asset' },
      '*.wasm': { type: 'asset' },
      '*.glb': { type: 'asset' },
      '*.gltf': { type: 'asset' },
      '*.fbx': { type: 'asset' },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tucsuclhwanifjexmztr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // ── Cabeceras de seguridad para todas las rutas ──────────────
        source: "/:path*",
        headers: [
          // HSTS: fuerza HTTPS por 2 años en el dominio y subdominios
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Anti MIME-sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Anti clickjacking (la app no se embebe en iframes)
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          // No filtrar la URL completa a terceros
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Superficie de APIs del navegador: micrófono/cámara solo propios
          // (transcripción de voz y funciones VR), WebXR permitido.
          { key: "Permissions-Policy", value: "camera=(self), microphone=(self), xr-spatial-tracking=(self), geolocation=(), payment=(), usb=()" },
          // OAuth (Google/GitHub) usa popups en algunos flujos
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        source: "/Unity/Build/:file*.br",
        headers: [{ key: "Content-Encoding", value: "br" }],
      },
      {
        source: "/Unity/Build/:file*.wasm.br",
        headers: [{ key: "Content-Type", value: "application/wasm" }],
      },
      {
        source: "/Unity/Build/:file*.data.br",
        headers: [{ key: "Content-Type", value: "application/octet-stream" }],
      },
      {
        source: "/Unity/Build/:file*.framework.js.br",
        headers: [{ key: "Content-Type", value: "application/javascript" }],
      },
      // ── Cache agresivo para assets pesados: el navegador los guarda 1 año
      //    y no vuelve a descargarlos en cada visita ──
      {
        source: "/Unity/Build/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/robot/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/models/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/AtherModel/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/media/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
