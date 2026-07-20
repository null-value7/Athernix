import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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