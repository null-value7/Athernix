import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };

// NEXT_PUBLIC_SITE_URL puede quedar inlineado como localhost si el build
// corre con .env.local — nunca usar localhost como metadataBase en prod.
const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
const siteBaseUrl =
  envSiteUrl.startsWith("http") && !envSiteUrl.includes("localhost")
    ? envSiteUrl.replace(/\/$/, "")
    : "https://athernix.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: "ATHERNIX | Ecosistema VR",
    template: "%s · ATHERNIX",
  },
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
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/*
          Google Translate mutates the DOM (wraps text nodes in <font>, injects
          elements into <body>), which breaks React reconciliation and throws
          "Failed to execute 'removeChild'/'insertBefore' on 'Node'". Patch the
          prototypes to no-op when the node isn't a child of the expected parent.
          Runs before hydration so it is active for React's first commit.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof Node === 'function' && Node.prototype) {
                const _removeChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function (child) {
                  if (child.parentNode !== this) {
                    return child;
                  }
                  return _removeChild.apply(this, arguments);
                };
                const _insertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function (newNode, refNode) {
                  if (refNode && refNode.parentNode !== this) {
                    return newNode;
                  }
                  return _insertBefore.apply(this, arguments);
                };
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* ── Librerías CDN globales — usadas vía window.* en componentes
            como ather/page.tsx, explore/page.tsx, page.tsx (Three.js, GSAP, ScrollTrigger, Lenis).── */}
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
                { pageLanguage: 'es', includedLanguages: 'es,en,pt,fr,it', autoDisplay: false },
                'google_translate_element'
              );
            }
          `}
        </Script>

        {/* ── Aplicar preferencias de accesibilidad guardadas (/accesibilidad) ── */}
        <Script id="a11y-init" strategy="afterInteractive">
          {`
            try {
              var s = JSON.parse(localStorage.getItem('atx-a11y') || '{}');
              var el = document.documentElement;
              if (s.textScale === 1) el.classList.add('a11y-text-lg');
              if (s.textScale === 2) el.classList.add('a11y-text-xl');
              if (s.contrast) el.classList.add('a11y-contrast');
              if (s.reduceMotion) el.classList.add('a11y-reduce-motion');
              if (s.underline) el.classList.add('a11y-underline');
              if (s.readable) el.classList.add('a11y-readable');
              if (s.no3d) el.classList.add('a11y-no3d');
            } catch (e) {}
          `}
        </Script>

        <div className="grain-overlay" />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}