"use client";

import dynamic from "next/dynamic";

const HomeExperience = dynamic(() => import("@/components/home/HomeExperience"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <span className="font-mono-label text-xs text-white/40">CARGANDO VISOR VR…</span>
    </div>
  ),
});

export default function Home() {
  return <HomeExperience />;
}
