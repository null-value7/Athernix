import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/unity/Build/:path*.data.br',
        headers: [
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Content-Type', value: 'application/octet-stream' },
        ],
      },
      {
        source: '/unity/Build/:path*.wasm.br',
        headers: [
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Content-Type', value: 'application/wasm' },
        ],
      },
      {
        source: '/unity/Build/:path*.js.br',
        headers: [
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Content-Type', value: 'application/javascript' },
        ],
      },
    ];
  },
};

export default nextConfig;
