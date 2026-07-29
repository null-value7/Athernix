import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATHERNIX | VR Ecosystem",
  description:
    "Ecosistema de Realidad Virtual e Inteligencia Artificial en El Salvador.",
  keywords: [
    "realidad virtual",
    "VR",
    "inteligencia artificial",
    "El Salvador",
    "Joya de Cerén",
    "biofeedback",
    "MenteLibre VR",
    "SVirtual Tours",
    "Historia Viva VR",
  ],
  authors: [{ name: "NEO VORTEX LABS" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ backgroundColor: '#08000a' }}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* ── Librerías CDN globales — usadas vía window.* en componentes
            como page.tsx (Three.js, GSAP, ScrollTrigger, Lenis).── */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://unpkg.com/@studio-freight/lenis@1.0.34/dist/lenis.min.js"
          strategy="afterInteractive"
        />

        {/* ── Google Translate widget ── */}
        <div id="google_translate_element" style={{ display: "none" }} />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'es', includedLanguages: 'en,es', autoDisplay: false },
                'google_translate_element'
              );
            }
          `}
        </Script>

        <div className="grain-overlay" />
        <CustomCursor />
        <Navbar />
        <main className="flex-grow pt-20 pb-16 relative" style={{ backgroundColor: '#08000a', minHeight: 'calc(100vh - 250px)', zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}