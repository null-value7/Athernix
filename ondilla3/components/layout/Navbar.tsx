"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { MATERIAS } from "@/models/materia.model";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/#recorrido", label: "El recorrido" },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("atx-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} className="atx-nav flex items-center justify-between">
      <Link href="/" className="group flex items-center gap-2" data-cursor-hover>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-brand-red to-brand-gold" />
        </span>
        <span className="font-display text-gradient-fire text-xl tracking-[0.1em]">ATHERNIX</span>
      </Link>

      <ul className="hidden items-center gap-7 font-mono-label text-[11px] text-white/70 md:flex">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={cn(
                "link-underline transition-colors hover:text-white",
                pathname === l.href && "is-active text-white"
              )}
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Link
            href="/materias"
            className={cn(
              "link-underline flex items-center gap-1 transition-colors hover:text-white",
              pathname.startsWith("/materias") && "is-active text-white"
            )}
          >
            Materias <ChevronDown size={12} className={cn("transition-transform duration-300", open && "rotate-180")} />
          </Link>
          <div
            className={cn(
              "absolute left-1/2 top-full flex w-60 -translate-x-1/2 flex-col gap-1 rounded-2xl border border-white/10 bg-[#140406]/95 p-2 backdrop-blur-xl transition-all",
              open ? "pointer-events-auto translate-y-2 opacity-100" : "pointer-events-none translate-y-0 opacity-0"
            )}
          >
            {MATERIAS.map((m) => (
              <Link
                key={m.slug}
                href={`/materias/${m.slug}`}
                className="group/item flex items-center gap-2 rounded-xl px-3 py-2 text-white/80 transition-all hover:translate-x-1 hover:bg-white/5 hover:text-white"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-all group-hover/item:scale-150"
                  style={{ background: m.color, boxShadow: `0 0 8px ${m.color}80` }}
                />
                {m.nombre}
              </Link>
            ))}
          </div>
        </li>
      </ul>

      <Link href="/materias" className="hidden md:block" data-cursor-hover>
        <span className="font-mono-label btn-shine inline-block rounded-full bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(255,107,53,0.45)]">
          Explorar
        </span>
      </Link>

      <button
        className="text-white md:hidden"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Abrir menú"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div className="absolute left-0 top-full mt-2 flex w-full flex-col gap-1 rounded-2xl border border-white/10 bg-[#140406]/95 p-3 backdrop-blur-xl md:hidden">
          {[...LINKS, { href: "/materias", label: "Materias" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 font-mono-label text-xs text-white/80 hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
