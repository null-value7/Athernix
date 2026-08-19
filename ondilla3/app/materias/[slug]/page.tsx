import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { MATERIAS, getMateria } from "@/models/materia.model";
import MateriaDetailScene from "@/components/materias/MateriaDetailScene";

export async function generateStaticParams() {
  return MATERIAS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/materias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const materia = getMateria(slug);
  if (!materia) return {};
  return {
    title: `${materia.nombre} · ATHERNIX`,
    description: materia.descripcion,
  };
}

export default async function MateriaDetailPage({ params }: PageProps<"/materias/[slug]">) {
  const { slug } = await params;
  const materia = getMateria(slug);
  if (!materia) notFound();

  const next = MATERIAS[(materia.ordenViaje + 1) % MATERIAS.length];

  return (
    <div>
      <section className="relative h-[85vh] w-full overflow-hidden">
        <MateriaDetailScene slug={materia.slug} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start bg-gradient-to-t from-background via-background/60 to-transparent px-6 pb-10 pt-24 sm:px-10">
          <span className="font-mono-label flex items-center gap-2 text-xs" style={{ color: materia.color }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: materia.color }} />
            {materia.numero} · MATERIA BÁSICA
          </span>
          <h1 className="font-display mt-2 text-5xl text-white sm:text-7xl">{materia.nombre}</h1>
          <p className="mt-1 text-sm italic text-white/60 sm:text-base">{materia.tagline}</p>
        </div>

        <div className="pointer-events-none absolute right-6 top-28 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md sm:right-10">
          <Sparkles size={14} style={{ color: materia.color }} />
          <span className="font-mono-label text-[10px] text-white/60">ARRASTRA · TOCA LA ESCENA</span>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full opacity-10 blur-3xl"
          style={{ background: materia.color }}
        />

        <Link
          href="/materias"
          className="font-mono-label group inline-flex items-center gap-2 text-xs text-white/50 transition-colors hover:text-white"
          data-cursor-hover
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> TODAS LAS MATERIAS
        </Link>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">{materia.descripcion}</p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {materia.temas.map((tema) => (
            <div
              key={tema}
              data-cursor-hover
              className="tema-card flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white/70"
              style={{ "--mc": materia.color, borderColor: `${materia.color}33` } as React.CSSProperties}
            >
              <span className="text-base" style={{ color: materia.color }}>
                ✦
              </span>
              {tema}
            </div>
          ))}
        </div>

        <div
          className="fire-border mt-10 rounded-2xl px-6 py-5"
          style={{ background: `${materia.colorSecundario}0d` }}
        >
          <span className="font-mono-label text-[10px]" style={{ color: materia.colorSecundario }}>
            ¿SABÍAS QUE…?
          </span>
          <p className="mt-2 text-sm text-white/80">{materia.dato}</p>
        </div>

        <Link
          href={`/materias/${next.slug}`}
          data-cursor-hover
          className="group mt-14 flex items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.04]"
        >
          <div>
            <span className="font-mono-label text-[10px] text-white/40">SIGUIENTE MATERIA</span>
            <p className="font-display mt-1 flex items-center gap-3 text-2xl text-white">
              <span className="h-2 w-2 rounded-full" style={{ background: next.color, boxShadow: `0 0 10px ${next.color}` }} />
              {next.nombre}
            </p>
          </div>
          <ArrowRight className="text-white/50 transition-all duration-300 group-hover:translate-x-2 group-hover:text-white" />
        </Link>
      </section>
    </div>
  );
}
