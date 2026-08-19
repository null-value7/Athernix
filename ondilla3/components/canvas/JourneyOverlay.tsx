"use client";

// ═══════════════════════════════════════════
// VIEW — Textos y paneles superpuestos del recorrido. Cada sección
// narrativa tiene su panel con animaciones staggered, chips
// interactivos y botones magnéticos. El tinte ambiental de fondo
// cambia con el color de la sección activa.
// ═══════════════════════════════════════════

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { MATERIAS, type Materia } from "@/models/materia.model";
import { SECTION_ACCENTS } from "@/models/vr-viewer.model";
import { Button } from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const wordReveal = {
  initial: { opacity: 0, y: 26, rotateX: -45 },
  animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function HeroPanel({ goTo }: { goTo: (index: number) => void }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex max-w-3xl flex-col items-center px-6 text-center"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="font-mono-label mb-5 flex items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-gold/5 px-4 py-1.5 text-[10px] text-brand-gold"
      >
        <Sparkles size={11} /> EL SALVADOR · EDUCACIÓN BÁSICA
      </motion.span>

      <motion.h1
        variants={stagger}
        initial="initial"
        animate="animate"
        className="font-display text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl md:text-8xl"
        style={{ perspective: 600 }}
      >
        <span className="block overflow-hidden">
          {"UN LENTE HACIA".split(" ").map((w) => (
            <motion.span key={w} variants={wordReveal} className="mr-[0.35em] inline-block last:mr-0">
              {w}
            </motion.span>
          ))}
        </span>
        <motion.span
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient-fire block"
        >
          TU EDUCACIÓN
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-5 max-w-md text-sm text-white/60 sm:text-base"
      >
        Desplázate para entrar en el visor y recorrer, en 3D, las cuatro
        materias que forman el programa básico salvadoreño.
      </motion.p>

      {/* Chips de acceso directo a cada materia */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-2"
      >
        {MATERIAS.map((m, i) => (
          <button
            key={m.slug}
            onClick={() => goTo(2 + i)}
            data-cursor-hover
            className="font-mono-label group flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[10px] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
            style={{ ["--mc" as string]: m.color }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${m.color}88`;
              e.currentTarget.style.boxShadow = `0 6px 24px ${m.color}2e`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150" style={{ background: m.color }} />
            {m.numero} {m.nombre.split(" ")[0].toUpperCase()}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="pointer-events-auto mt-8 flex items-center gap-3"
      >
        <Magnetic>
          <Button onClick={() => goTo(2)} data-cursor-hover>
            Iniciar recorrido <ArrowRight size={14} />
          </Button>
        </Magnetic>
        <Magnetic strength={0.25}>
          <Link href="/materias" data-cursor-hover>
            <Button variant="outline">Ver materias</Button>
          </Link>
        </Magnetic>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="pointer-events-none mt-10 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="font-mono-label text-[10px]">DESPLÁZATE</span>
        <span className="scroll-line" />
        <ChevronDown size={14} className="animate-bounce" />
      </motion.div>
    </motion.div>
  );
}

function LensPanel() {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative flex items-center justify-center px-6 text-center">
      {[130, 220, 320].map((size, i) => (
        <motion.span
          key={size}
          className="absolute rounded-full border border-brand-gold/25"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.25], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
        />
      ))}
      <motion.span
        className="font-mono-label text-xs text-brand-gold"
        animate={{ letterSpacing: ["0.16em", "0.34em", "0.16em"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ENTRANDO AL LENTE…
      </motion.span>
    </motion.div>
  );
}

function MateriaPanel({ materia }: { materia: Materia }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-xl flex-col items-start px-6 sm:px-0"
    >
      <div className="fire-border relative overflow-hidden rounded-3xl bg-black/35 p-6 backdrop-blur-md sm:p-8">
        {/* Número fantasma de fondo */}
        <span className="ghost-number font-display pointer-events-none absolute -right-2 -top-6 text-[9rem] leading-none select-none">
          {materia.numero}
        </span>
        <span
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-25 blur-3xl"
          style={{ background: materia.color }}
        />

        <span className="font-mono-label flex items-center gap-2 text-xs" style={{ color: materia.color }}>
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: materia.color }} />
          {materia.numero} · MATERIA BÁSICA
        </span>

        <motion.h2
          initial={{ clipPath: "inset(0 0 100% 0)", y: 10 }}
          animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-display relative mt-2 text-4xl text-white sm:text-5xl"
        >
          {materia.nombre}
        </motion.h2>
        <p className="mt-1 text-sm italic text-white/50">{materia.tagline}</p>
        <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/70">{materia.descripcion}</p>

        <motion.div variants={stagger} initial="initial" animate="animate" className="pointer-events-auto relative mt-5 flex flex-wrap gap-2">
          {materia.temas.map((tema) => (
            <motion.span
              key={tema}
              variants={wordReveal}
              data-cursor-hover
              className="font-mono-label cursor-default rounded-full border px-3 py-1 text-[10px] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
              style={{ borderColor: `${materia.color}55` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${materia.color}1a`;
                e.currentTarget.style.boxShadow = `0 4px 18px ${materia.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {tema}
            </motion.span>
          ))}
        </motion.div>

        <p className="relative mt-5 flex items-start gap-2 text-xs italic text-white/45">
          <Sparkles size={13} className="mt-0.5 shrink-0" style={{ color: materia.colorSecundario }} />
          {materia.dato}
        </p>

        <div className="pointer-events-auto relative mt-6">
          <Magnetic>
            <Link href={`/materias/${materia.slug}`} data-cursor-hover>
              <Button size="sm">
                Explorar {materia.nombre.split(" ")[0]} <ArrowRight size={13} />
              </Button>
            </Link>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
}

function OutroPanel() {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="w-full max-w-2xl px-6 text-center">
      <h2 className="font-display text-4xl text-white sm:text-6xl">
        4 MATERIAS. <span className="text-gradient-fire">1 PROGRAMA.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-sm text-white/60 sm:text-base">
        Matemática, Lenguaje y Literatura, Ciencia y Tecnología, y Estudios
        Sociales y Cívica: la base de la educación en El Salvador, ahora en 3D.
      </p>

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="pointer-events-auto mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {MATERIAS.map((m) => (
          <motion.div key={m.slug} variants={wordReveal}>
            <Link
              href={`/materias/${m.slug}`}
              data-cursor-hover
              className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${m.color}88`;
                e.currentTarget.style.boxShadow = `0 10px 30px ${m.color}26`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-black transition-transform group-hover:scale-110"
                style={{ background: m.color }}
              >
                {m.numero}
              </span>
              <span className="font-mono-label text-[9px] leading-tight text-white/70 group-hover:text-white">
                {m.nombre.toUpperCase()}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="pointer-events-auto mt-8 flex justify-center">
        <Magnetic>
          <Link href="/materias" data-cursor-hover>
            <Button>
              Ver el programa completo <ArrowRight size={14} />
            </Button>
          </Link>
        </Magnetic>
      </div>
    </motion.div>
  );
}

export default function JourneyOverlay({
  activeSection,
  goTo,
}: {
  activeSection: number;
  goTo: (index: number) => void;
}) {
  const accent = SECTION_ACCENTS[activeSection] ?? SECTION_ACCENTS[0];

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
      {/* Tinte ambiental según sección */}
      <AnimatePresence>
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(55% 45% at 18% 12%, ${accent}12, transparent 65%), radial-gradient(45% 40% at 85% 85%, ${accent}0d, transparent 60%)`,
          }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeSection === 0 && <HeroPanel key="hero" goTo={goTo} />}
        {activeSection === 1 && <LensPanel key="lens" />}
        {activeSection >= 2 && activeSection <= 5 && (
          <MateriaPanel key={`m-${activeSection}`} materia={MATERIAS[activeSection - 2]} />
        )}
        {activeSection === 6 && <OutroPanel key="outro" />}
      </AnimatePresence>
    </div>
  );
}
