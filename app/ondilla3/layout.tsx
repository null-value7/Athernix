import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ATHERNIX | El programa de El Salvador, en un lente VR",
  description:
    "Recorrido 3D interactivo por las 4 materias básicas de la educación en El Salvador: Matemática, Lenguaje y Literatura, Ciencia y Tecnología, y Estudios Sociales y Cívica.",
  keywords: [
    "El Salvador",
    "educación",
    "realidad virtual",
    "MINED",
    "matemática",
    "lenguaje y literatura",
    "ciencia y tecnología",
    "estudios sociales",
  ],
};

export default function OndillaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`ondilla3-root ${display.variable} ${sans.variable} ${mono.variable} min-h-screen bg-background text-foreground antialiased dark`}
    >
      <div className="ond-grain-overlay" />
      {children}
    </div>
  );
}
