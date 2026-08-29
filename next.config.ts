import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  serverExternalPackages: [
    '@ai-sdk/groq',
    '@ai-sdk/elevenlabs',
    'ai',
    '@supabase/supabase-js',
    '@supabase/ssr',
    '@vercel/og',
  ],
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
    ];
  },
};

export default nextConfig;