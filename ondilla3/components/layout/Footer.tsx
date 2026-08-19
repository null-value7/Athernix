import Link from "next/link";
import { MATERIAS } from "@/models/materia.model";
import Marquee from "@/components/ui/Marquee";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/40">
      {/* Marquesina de materias */}
      <div className="border-b border-white/5 py-6">
        <Marquee duration={36}>
          {MATERIAS.map((m) => (
            <span key={m.slug} className="font-display flex items-center gap-8 pr-8 text-4xl tracking-wide text-white/15 transition-colors hover:text-white/40 sm:text-5xl">
              {m.nombre.toUpperCase()}
              <span style={{ color: m.color }}>✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between">
        <div>
          <span className="font-display text-gradient-fire text-2xl tracking-[0.1em]">ATHERNIX</span>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Un visor a las 4 materias básicas de la educación en El Salvador,
            reimaginadas en un recorrido 3D.
          </p>
          <p className="mt-4 font-mono-label text-[10px] text-white/30">
            EL SALVADOR · EDUCACIÓN · REALIDAD VIRTUAL
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
          <div>
            <h4 className="font-mono-label mb-3 text-[10px] text-brand-gold">MATERIAS</h4>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              {MATERIAS.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/materias/${m.slug}`}
                    className="inline-flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full" style={{ background: m.color }} />
                    {m.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono-label mb-3 text-[10px] text-brand-red">SITIO</h4>
            <ul className="flex flex-col gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="inline-block transition-all hover:translate-x-1 hover:text-white">Inicio</Link>
              </li>
              <li>
                <Link href="/materias" className="inline-block transition-all hover:translate-x-1 hover:text-white">Todas las materias</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 px-6 pb-24 pt-6 font-mono-label text-[10px] text-white/30 md:flex-row">
        <span>© {new Date().getFullYear()} ATHERNIX · TODOS LOS DERECHOS RESERVADOS</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold" /> SISTEMA_ACTIVO
        </span>
      </div>

      {/* Watermark gigante */}
      <div
        aria-hidden
        className="watermark-text font-display pointer-events-none absolute inset-x-0 -bottom-6 select-none text-center text-[19vw] leading-none"
      >
        ATHERNIX
      </div>
    </footer>
  );
}
