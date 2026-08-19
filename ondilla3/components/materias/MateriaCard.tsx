"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import type { Materia } from "@/models/materia.model";

/** Tarjeta interactiva (tilt 3D + glare + glow) para la vista general de materias. */
export default function MateriaCard({ materia, index }: { materia: Materia; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/materias/${materia.slug}`} data-cursor-hover className="block">
        <TiltCard className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-white/25">
          {/* Glow de color */}
          <div
            className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-45"
            style={{ background: materia.color }}
          />
          {/* Número fantasma */}
          <span className="ghost-number font-display pointer-events-none absolute -right-1 -top-7 text-[7.5rem] leading-none select-none transition-transform duration-500 group-hover:-translate-y-1">
            {materia.numero}
          </span>

          <span className="font-mono-label flex items-center gap-2 text-xs" style={{ color: materia.color }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: materia.color }} />
            {materia.numero}
          </span>
          <h2 className="font-display relative mt-2 text-3xl text-white sm:text-4xl">{materia.nombre}</h2>
          <p className="mt-1 text-sm italic text-white/50">{materia.tagline}</p>
          <p className="relative mt-4 max-w-sm text-sm text-white/60">{materia.descripcion}</p>

          <div className="relative mt-6 flex flex-wrap gap-2">
            {materia.temas.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono-label rounded-full border px-3 py-1 text-[10px] text-white/60 transition-colors duration-300 group-hover:text-white/80"
                style={{ borderColor: `${materia.color}44` }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="font-mono-label relative mt-6 flex items-center justify-between text-[11px] text-white">
            <span className="flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1">
              EXPLORAR <ArrowUpRight size={14} style={{ color: materia.color }} />
            </span>
            <span
              className="rounded-full border px-2.5 py-1 text-[9px] text-white/50 transition-colors group-hover:text-white/90"
              style={{ borderColor: `${materia.color}55` }}
            >
              ESCENA 3D
            </span>
          </div>
        </TiltCard>
      </Link>
    </motion.div>
  );
}
