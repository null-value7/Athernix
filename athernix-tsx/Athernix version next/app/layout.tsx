// @ts-nocheck
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import Script from "next/script";

export const metadata = {
  title: "ATHERNIX | VR Ecosystem",
  description: "Ecosistema de Realidad Virtual e Inteligencia Artificial en El Salvador.",
  keywords: ["realidad virtual", "VR", "inteligencia artificial", "El Salvador", "Joya de Cerén", "biofeedback", "MenteLibre VR", "SVirtual Tours", "Historia Viva VR"],
  authors: [{ name: "NEO VORTEX LABS" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {/* Load CDN Libraries before interactive to ensure Three.js, GSAP and Lenis are globally available on window */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/@studio-freight/lenis@1.0.34/dist/lenis.min.js" strategy="beforeInteractive" />

        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({pageLanguage: 'es', includedLanguages: 'en,es', autoDisplay: false}, 'google_translate_element');
            }
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
