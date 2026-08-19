import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MATERIAS } from "@/models/materia.model";
import MateriaCard from "@/components/materias/MateriaCard";
import Marquee from "@/components/ui/Marquee";
import Magnetic from "@/components/ui/Magnetic";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Materias · ATHERNIX",
  description:
    "Las 4 materias básicas del programa de Educación Básica en El Salvador: Matemática, Lenguaje y Literatura, Ciencia y Tecnología, y Estudios Sociales y Cívica.",
};

export default function MateriasPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Orbes de fondo */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-96 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-24 left-1/3 h-72 w-72 rounded-full bg-brand-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-40">
        <span className="font-mono-label flex items-center gap-2 text-xs text-brand-gold">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold" />
          EL PROGRAMA COMPLETO
        </span>
        <h1 className="font-display mt-3 text-5xl text-white sm:text-7xl">
          LAS 4 MATERIAS <span className="text-gradient-fire">BÁSICAS</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/60 sm:text-base">
          Según el currículo nacional del Ministerio de Educación, Ciencia y
          Tecnología (MINED), estas cuatro asignaturas forman el núcleo de la
          Educación Básica en El Salvador. Elige una para explorar su universo
          3D y arrastra para descubrirlo desde todos los ángulos.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {MATERIAS.map((m, i) => (
            <MateriaCard key={m.slug} materia={m} index={i} />
          ))}
        </div>

        {/* CTA al recorrido */}
        <div className="fire-border relative mt-16 flex flex-col items-center gap-5 overflow-hidden rounded-3xl bg-white/[0.02] px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              ¿PREFIERES <span className="text-gradient-fire">VIVIRLO</span>?
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Recorre las 4 materias en un solo viaje: entra por el lente del
              visor VR y déjate llevar por el scroll.
            </p>
          </div>
          <Magnetic>
            <Link href="/#recorrido" data-cursor-hover>
              <Button size="lg">
                Iniciar recorrido 3D <ArrowRight size={15} />
              </Button>
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* Marquesina inferior */}
      <div className="border-t border-white/5 py-8">
        <Marquee duration={30}>
          {MATERIAS.map((m) => (
            <span key={m.slug} className="font-display flex items-center gap-8 pr-8 text-3xl tracking-wide text-white/10 sm:text-4xl">
              {m.nombre.toUpperCase()}
              <span style={{ color: m.color }}>✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
