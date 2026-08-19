import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <div className="grain-overlay" />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
