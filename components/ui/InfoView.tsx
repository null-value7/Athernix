// @ts-nocheck
"use client";

import { useState } from "react";

export default function InfoView({ characters, previewItems, poseItems, priceFeatures }) {
  const [selectedKey, setSelectedKey] = useState("alien");
  const [showToast, setShowToast] = useState(false);
  const selected = characters[selectedKey];

  const handleDownload = () => {
    const demo = {
      product: "Athernix VR demo",
      contents: ["3 sample modules", "8 interaction labels", "20 preview items", "responsive landing page"],
      note: "Local demo generated for the functional website clone.",
    };
    const file = new Blob([JSON.stringify(demo, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "athernix-demo.json";
    link.click();
    URL.revokeObjectURL(link.href);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <div className="info-page">
      <div className="info-promo">
        <span>Ecosistema de Realidad Virtual e Inteligencia Artificial</span>
        <a href="#pricing">Adquirir Licencia</a>
      </div>

      <main id="top">
        <section className="info-section info-hero">
          <div className="info-hero-copy">
            <p className="info-kicker">Athernix VR</p>
            <h1>ATHERNIX VR</h1>
            <p className="info-hero-text">
              Una plataforma revolucionaria que une historia, neurociencia y tecnologia para crear simulaciones inmersivas y experiencias de turismo virtual.
            </p>
            <div className="info-hero-actions">
              <a className="info-button" href="#pricing">
                Adquirir Licencia
              </a>
              <a className="info-button ghost" href="#preview">
                Ver Simulacion ↗
              </a>
            </div>
          </div>
          <div className="info-hero-stage" aria-label="Animated space illustration preview">
            <div className="info-orbit info-orbit-one" />
            <div className="info-orbit info-orbit-two" />
            <div className="info-planet info-planet-blue" />
            <div className="info-planet info-planet-yellow" />
            <div className="info-spacer astronaut">
              <div className="info-helmet" />
              <div className="info-visor" />
              <div className="info-body" />
              <div className="info-arm info-arm-left" />
              <div className="info-arm info-arm-right" />
              <div className="info-leg info-leg-left" />
              <div className="info-leg info-leg-right" />
            </div>
            <div className="info-floating-card">
              <strong>48</strong>
              <span>modulos</span>
            </div>
          </div>
        </section>

        <section id="characters" className="info-section info-split">
          <div>
            <p className="info-kicker">3 Modulos Principales</p>
            <h2>Explora las dimensiones de nuestra simulacion.</h2>
            <p>Hemos creado tres entornos inmersivos utilizando fotogrametria y biofeedback. Elige Historia Viva, Turismo Virtual o MenteLibre.</p>
          </div>
          <div className="info-character-tabs" role="tablist" aria-label="Character selector">
            {Object.entries(characters).map(([key, character]) => (
              <button
                className={`info-tab ${selectedKey === key ? "active" : ""}`}
                key={key}
                onClick={() => setSelectedKey(key)}
                role="tab"
                type="button"
                aria-selected={selectedKey === key}
              >
                {character.name}
              </button>
            ))}
          </div>
          <div className="info-character-view" aria-live="polite">
            <div className={`info-mascot ${selected.className}`} />
            <div>
              <h3>{selected.name}</h3>
              <p>{selected.text}</p>
            </div>
          </div>
        </section>

        <section id="poses" className="info-section">
          <div className="info-section-heading">
            <p className="info-kicker">Renderizado Fotorrealista</p>
            <h2>
              <span>120+</span> Entornos VR
            </h2>
            <p>Gran variedad de simulaciones 4K con iluminacion global, texturas 8K y fisicas realistas.</p>
          </div>
          <div className="info-pose-grid">
            {poseItems.map(([className, label]) => (
              <article className="info-pose-card" key={label}>
                <div className={`info-pose-art ${className}`} />
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section info-designer">
          <h2>Disenado para la Inmersion Total.</h2>
          <div className="info-designer-grid">
            <div className="info-quote-panel">
              <div className="info-mini-scene info-alien-face" />
              <p>Sincronizacion Neural Activa</p>
            </div>
            <div className="info-quote-panel accent">
              <div className="info-mini-scene info-astro-face" />
              <p>Latencia de 5ms</p>
            </div>
          </div>
        </section>

        <section className="info-section info-uses">
          <div className="info-use-showcase">
            <div className="info-browser-window">
              <div className="info-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="info-ui-lines" />
              <div className="info-ui-grid" />
            </div>
            <div className="info-phone-card">
              <div className="info-phone-planet" />
            </div>
          </div>
          <div>
            <p className="info-kicker">Como Funciona</p>
            <h2>Nuestras simulaciones VR estan optimizadas para los visores mas avanzados del mercado.</h2>
            <p>El ecosistema procesa biometria en tiempo real, adaptando el entorno a los niveles de estres y atencion del usuario.</p>
          </div>
        </section>

        <section className="info-section info-details">
          <div className="info-section-heading">
            <p className="info-kicker">Sensores de alta precision</p>
            <h2>Biofeedback en Tiempo Real</h2>
            <p>Sensores hapticos, seguimiento ocular y escaneres volumetricos completan la experiencia.</p>
          </div>
          <div className="info-object-cloud" aria-label="Decorative 3D object grid">
            {["rocket", "moon", "satellite", "comet", "star-object", "rover"].map((item) => (
              <span className={`info-object ${item}`} key={item} />
            ))}
          </div>
          <div className="info-counter">48 Sensores</div>
        </section>

        <section id="preview" className="info-section info-preview">
          <div className="info-section-heading">
            <p className="info-kicker">Tecnologia</p>
            <h2>Todo conectado en la red Athernix.</h2>
          </div>
          <div className="info-preview-grid">
            {previewItems.map((label, index) => (
              <article className="info-preview-item" key={label}>
                <div className="info-preview-art" style={{ "--shift": index }} />
                <span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="info-section info-pricing">
          <article className="info-price-card main-price">
            <p className="info-kicker">Athernix</p>
            <h2>$32</h2>
            <ul>
              {priceFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a className="info-button" href="#demo">
              Comprar, $32
            </a>
          </article>
          <article className="info-price-card pro">
            <p className="info-kicker">Acceso Institucional</p>
            <h2>$120+/mes</h2>
            <p>Implementa el ecosistema Athernix en tu museo, universidad o empresa de turismo.</p>
            <a className="info-button ghost" href="#demo">
              Solicitar Demo
            </a>
          </article>
          <article id="demo" className="info-price-card demo">
            <p className="info-kicker">Demo Educativa</p>
            <h2>Prueba Gratuita</h2>
            <p>No estas seguro sobre la Licencia VR? Pruebalo gratis y explora los entornos de muestra.</p>
            <button className="info-button" onClick={handleDownload} type="button">
              Jugar Demo Gratis
            </button>
          </article>
        </section>
      </main>

      <div className={`info-toast ${showToast ? "show" : ""}`}>Descarga de demo iniciada</div>
    </div>
  );
}
