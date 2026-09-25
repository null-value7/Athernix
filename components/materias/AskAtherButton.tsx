"use client";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import type { Materia } from "@/models/materia.model";

// Botón "Preguntar a Ather": guarda un prompt de la materia en sessionStorage
// (la página de /chatbot lo lee y lo auto-envía) y navega al chatbot.
export default function AskAtherButton({ materia }: { materia: Materia }) {
  const router = useRouter();

  const ask = () => {
    const prompt =
      `Quiero aprender sobre ${materia.nombre} — "${materia.tagline}". ` +
      `${materia.descripcion} Sus temas principales son: ${materia.temas.join(", ")}. ` +
      `Explícame la materia y por dónde conviene empezar.`;
    sessionStorage.setItem("ather_prefill_prompt", prompt);
    router.push("/chatbot");
  };

  return (
    <button
      type="button"
      onClick={ask}
      data-cursor-hover
      className="group mt-10 flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
      style={{
        background: `linear-gradient(90deg, ${materia.color}, ${materia.colorSecundario})`,
        fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
        boxShadow: `0 10px 34px ${materia.color}40`,
      }}
    >
      <Sparkles size={15} className="transition-transform duration-300 group-hover:rotate-12" />
      Preguntar a Ather sobre esta materia
    </button>
  );
}
