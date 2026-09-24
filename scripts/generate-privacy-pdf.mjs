import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.resolve(__dirname, '..', 'public', 'docs', 'politica-privacidad.pdf');

// ── Athernix Brand Colors ───────────────────────────────────────
const C = {
  bg: '#08000a',
  orange: '#FF6B35',
  orangeDark: '#FF6B00',
  magenta: '#FF006E',
  gold: '#FFD700',
  purple: '#A855F7',
  green: '#00E5A0',
  cyan: '#00CCFF',
  text: '#ede0d4',
  textLight: 'rgba(237,224,212,0.75)',
  textMuted: 'rgba(200,150,120,0.5)',
  border: 'rgba(168,85,247,0.25)',
  bgLight: 'rgba(168,85,247,0.08)',
};

function buildHTML() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  /* ── Reset & Base ─────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @page {
    size: Letter;
  }

  p, li, .highlight-box, .contact-box, .subsection, .section {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  h1, h2, h3, h4, h5, h6, .section-head, .subsection-title, .part-header {
    page-break-after: avoid;
    break-after: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  html {
    background: ${C.bg} !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;
    font-size: 10pt;
    line-height: 1.7;
    color: ${C.text};
    background: ${C.bg} !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    margin: 0;
    padding: 0 2.54cm;
    box-sizing: border-box;
    min-height: 100vh;
  }

  /* ── Footer on every page ─────────────────────── */
  .page-footer {
    position: fixed;
    bottom: 0.8cm;
    left: 2cm;
    right: 2cm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    color: ${C.textMuted};
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: 0.06em;
    border-top: 1px solid ${C.border};
    padding-top: 6px;
  }

  .page-footer .brand {
    font-weight: 700;
    color: ${C.orange};
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  /* ── Header bar on content pages ──────────────── */
  .header-bar {
    position: fixed;
    top: 1cm;
    left: 2cm;
    right: 2cm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 6.5pt;
    color: ${C.textMuted};
    font-family: 'Plus Jakarta Sans', sans-serif;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding-bottom: 4px;
    border-bottom: 1px solid ${C.border};
  }

  .header-bar .logo-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 11pt;
    letter-spacing: 0.2em;
    background: linear-gradient(90deg, ${C.orange}, ${C.magenta});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ══════════════════════════════════════════════════
     COVER PAGE
     ══════════════════════════════════════════════════ */
  .cover {
    page-break-after: always;
    width: 8.5in;
    height: 11in;
    background: ${C.bg};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -2.54cm;
    margin-bottom: -2.54cm;
    margin-left: -2.54cm;
    margin-right: -2.54cm;
  }

  /* Decorative elements */
  .cover::before {
    content: '';
    position: absolute;
    top: -30%;
    left: -20%;
    width: 140%;
    height: 80%;
    background: radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, transparent 65%);
    pointer-events: none;
  }
  .cover::after {
    content: '';
    position: absolute;
    bottom: -20%;
    right: -15%;
    width: 100%;
    height: 60%;
    background: radial-gradient(ellipse at center, rgba(255,107,53,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .cover-border {
    position: absolute;
    inset: 12mm;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    pointer-events: none;
  }

  .cover-border::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 25%;
    right: 25%;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${C.orange}, ${C.magenta}, ${C.purple}, transparent);
  }

  .cover-border::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 25%;
    right: 25%;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${C.purple}, ${C.magenta}, ${C.orange}, transparent);
  }

  .cover-content {
    position: relative;
    z-index: 2;
    max-width: 140mm;
  }

  .cover-badge {
    display: inline-block;
    padding: 5px 18px;
    border: 1px solid rgba(168,85,247,0.4);
    border-radius: 20px;
    font-size: 7pt;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(190,140,255,0.8);
    margin-bottom: 28px;
    font-weight: 600;
  }

  .cover-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 62pt;
    letter-spacing: 0.18em;
    line-height: 1;
    margin-bottom: 16px;
    background: linear-gradient(135deg, ${C.orange}, ${C.magenta}, ${C.purple});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .cover-divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, ${C.orange}, ${C.magenta});
    margin: 0 auto 24px;
  }

  .cover-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13pt;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(237,224,212,0.9);
    margin-bottom: 8px;
    line-height: 1.5;
  }

  .cover-subtitle {
    font-size: 9pt;
    color: rgba(200,150,120,0.5);
    letter-spacing: 0.15em;
    margin-bottom: 48px;
    font-weight: 400;
  }

  .cover-meta {
    font-size: 7.5pt;
    color: rgba(200,150,120,0.4);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    line-height: 2.2;
  }

  .cover-meta strong {
    color: rgba(237,224,212,0.65);
    font-weight: 600;
  }

  .cover-version {
    position: absolute;
    bottom: 20mm;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 6.5pt;
    color: rgba(200,150,120,0.3);
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  /* ══════════════════════════════════════════════════
     TABLE OF CONTENTS
     ══════════════════════════════════════════════════ */
  .toc {
    page-break-after: always;
    padding-top: 1cm;
  }

  .toc-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28pt;
    letter-spacing: 0.12em;
    color: ${C.text};
    margin-bottom: 6px;
  }

  .toc-accent {
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, ${C.orange}, ${C.magenta});
    margin-bottom: 28px;
    border-radius: 2px;
  }

  .toc-part {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 8pt;
    font-weight: 800;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 8px 0 4px;
    margin-top: 14px;
    border-bottom: 1px solid ${C.border};
  }

  .toc-part.orange { color: ${C.orange}; border-bottom-color: ${C.orange}33; }
  .toc-part.purple { color: ${C.purple}; border-bottom-color: ${C.purple}33; }

  .toc-item {
    display: flex;
    align-items: baseline;
    padding: 4px 0;
    font-size: 9pt;
    color: ${C.text};
  }

  .toc-num {
    font-weight: 700;
    color: ${C.orange};
    min-width: 28px;
    font-size: 8.5pt;
  }

  .toc-label {
    flex: 1;
    font-weight: 500;
  }

  .toc-dots {
    flex: 1;
    border-bottom: 1px dotted ${C.border};
    margin: 0 6px;
    min-width: 20px;
  }

  /* ══════════════════════════════════════════════════
     CONTENT SECTIONS
     ══════════════════════════════════════════════════ */

  .part-header {
    page-break-before: always;
    text-align: center;
    padding: 2cm 0 30px;
  }

  .part-num {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 7pt;
    font-weight: 700;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    display: inline-block;
    padding: 4px 14px;
    border-radius: 3px;
    margin-bottom: 12px;
  }

  .part-num.orange { color: ${C.orange}; background: ${C.orange}0D; border: 1px solid ${C.orange}22; }
  .part-num.purple { color: ${C.purple}; background: ${C.purple}0D; border: 1px solid ${C.purple}22; }

  .part-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26pt;
    letter-spacing: 0.1em;
    color: ${C.text};
    margin-bottom: 4px;
  }

  .part-line {
    width: 50px;
    height: 3px;
    margin: 0 auto;
    border-radius: 2px;
  }

  .part-line.orange { background: linear-gradient(90deg, ${C.orange}, ${C.magenta}); }
  .part-line.purple { background: linear-gradient(90deg, ${C.purple}, ${C.cyan}); }

  /* Section heading */
  .section {
    margin-top: 28px;
  }

  .section-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid ${C.border};
  }

  .section-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22pt;
    line-height: 1;
  }

  .section-num.orange { color: ${C.orange}; }
  .section-num.purple { color: ${C.purple}; }
  .section-num.magenta { color: ${C.magenta}; }
  .section-num.gold { color: ${C.gold}; }

  .section-title {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11pt;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${C.text};
  }

  .section p {
    margin: 0;
    text-align: left;
    text-indent: 1.27cm;
    hyphens: auto;
  }

  /* Sub-section */
  .subsection {
    margin-top: 14px;
    margin-left: 8px;
  }

  .subsection-title {
    font-size: 9.5pt;
    font-weight: 700;
    color: ${C.text};
    margin-bottom: 5px;
    letter-spacing: 0.04em;
  }

  .subsection-num {
    font-weight: 800;
    margin-right: 4px;
  }

  .subsection-num.orange { color: ${C.orange}; }
  .subsection-num.purple { color: ${C.purple}; }

  .subsection p {
    font-size: 9.5pt;
    color: ${C.textLight};
    margin: 0;
    text-align: left;
    text-indent: 1.27cm;
  }

  /* Bullet list */
  .legal-list {
    margin: 0 0 0 1.27cm;
    padding: 0;
    list-style: none;
    text-align: left;
  }

  .legal-list li {
    position: relative;
    padding-left: 14px;
    margin-bottom: 0;
    font-size: 9.5pt;
    color: ${C.textLight};
    line-height: 2.0;
  }

  .legal-list li::before {
    content: '›';
    position: absolute;
    left: 0;
    color: ${C.orange};
    font-weight: 800;
    font-size: 11pt;
    line-height: 1.35;
  }

  /* Highlight box */
  .highlight-box {
    background: ${C.bgLight};
    border-left: 3px solid ${C.orange};
    padding: 10px 14px;
    margin: 0;
    border-radius: 0 4px 4px 0;
    font-size: 9pt;
    color: ${C.textLight};
    line-height: 2.0;
    text-align: left;
  }

  .highlight-box.purple { border-left-color: ${C.purple}; }
  .highlight-box.magenta { border-left-color: ${C.magenta}; }

  /* Contact box */
  .contact-box {
    background: ${C.bgLight};
    border: 1px solid ${C.border};
    color: rgba(237,224,212,0.85);
    padding: 20px 24px;
    border-radius: 8px;
    margin: 16px 0;
    font-size: 9pt;
    line-height: 2;
  }

  .contact-box strong {
    color: ${C.orange};
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .contact-label {
    display: inline-block;
    width: 120px;
    font-weight: 600;
    color: rgba(200,150,120,0.6);
    font-size: 7.5pt;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  /* Section divider */
  .section-divider {
    height: 1px;
    margin: 24px 0;
    background: linear-gradient(90deg, transparent, ${C.border}, transparent);
  }

  .section-divider.orange { background: linear-gradient(90deg, transparent, ${C.orange}33, transparent); }
  .section-divider.purple { background: linear-gradient(90deg, transparent, ${C.purple}33, transparent); }

  /* Final signature */
  .signature {
    text-align: center;
    padding: 40px 0 20px;
    margin-top: 30px;
    border-top: 2px solid ${C.border};
  }

  .signature-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20pt;
    letter-spacing: 0.15em;
    background: linear-gradient(90deg, ${C.orange}, ${C.magenta});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 4px;
  }

  .signature-text {
    font-size: 7.5pt;
    color: ${C.textMuted};
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
</style>
</head>
<body>



<!-- ════════════════════ COVER PAGE ════════════════════════ -->
<div class="cover">
  <div class="cover-border"></div>
  <div class="cover-content">
    <div class="cover-badge">◆ Documento Legal Oficial</div>
    <div class="cover-logo">ATHERNIX</div>
    <div class="cover-divider"></div>
    <div class="cover-title">
      POLÍTICA DE PRIVACIDAD<br>Y TÉRMINOS DE SERVICIO
    </div>
    <div class="cover-subtitle">
      Plataforma Educativa de Realidad Virtual e Inteligencia Artificial
    </div>
    <div class="cover-meta">
      <strong>Versión:</strong> 1.0<br>
      <strong>Fecha de vigencia:</strong> Agosto 2026<br>
      <strong>Empresa:</strong> NEO VORTEX LABS<br>
      <strong>Ubicación:</strong> El Salvador, Centroamérica
    </div>
  </div>
  <div class="cover-version">
    © 2026 NEO VORTEX LABS · TODOS LOS DERECHOS RESERVADOS
  </div>
</div>

<!-- ════════════════════ TABLE OF CONTENTS ═════════════════ -->
<div class="toc">
  <div class="toc-title">CONTENIDO</div>
  <div class="toc-accent"></div>

  <div class="toc-part orange">PARTE I — POLÍTICA DE PRIVACIDAD</div>
  <div class="toc-item"><span class="toc-num">1.</span><span class="toc-label">Introducción y Alcance</span></div>
  <div class="toc-item"><span class="toc-num">2.</span><span class="toc-label">Información que Recopilamos</span></div>
  <div class="toc-item"><span class="toc-num">3.</span><span class="toc-label">Uso de la Información</span></div>
  <div class="toc-item"><span class="toc-num">4.</span><span class="toc-label">Base Legal del Tratamiento</span></div>
  <div class="toc-item"><span class="toc-num">5.</span><span class="toc-label">Compartir con Terceros</span></div>
  <div class="toc-item"><span class="toc-num">6.</span><span class="toc-label">Seguridad de los Datos</span></div>
  <div class="toc-item"><span class="toc-num">7.</span><span class="toc-label">Retención de Datos</span></div>
  <div class="toc-item"><span class="toc-num">8.</span><span class="toc-label">Derechos del Usuario</span></div>
  <div class="toc-item"><span class="toc-num">9.</span><span class="toc-label">Menores de Edad</span></div>
  <div class="toc-item"><span class="toc-num">10.</span><span class="toc-label">Cookies y Tecnologías de Seguimiento</span></div>
  <div class="toc-item"><span class="toc-num">11.</span><span class="toc-label">Transferencias Internacionales</span></div>

  <div class="toc-part purple">PARTE II — TÉRMINOS Y CONDICIONES DE USO</div>
  <div class="toc-item"><span class="toc-num">12.</span><span class="toc-label">Aceptación de los Términos</span></div>
  <div class="toc-item"><span class="toc-num">13.</span><span class="toc-label">Descripción del Servicio</span></div>
  <div class="toc-item"><span class="toc-num">14.</span><span class="toc-label">Registro y Cuenta</span></div>
  <div class="toc-item"><span class="toc-num">15.</span><span class="toc-label">Uso Aceptable</span></div>
  <div class="toc-item"><span class="toc-num">16.</span><span class="toc-label">Propiedad Intelectual</span></div>
  <div class="toc-item"><span class="toc-num">17.</span><span class="toc-label">Contenido Generado por Usuarios</span></div>
  <div class="toc-item"><span class="toc-num">18.</span><span class="toc-label">Disponibilidad del Servicio</span></div>
  <div class="toc-item"><span class="toc-num">19.</span><span class="toc-label">Limitación de Responsabilidad</span></div>
  <div class="toc-item"><span class="toc-num">20.</span><span class="toc-label">Modificaciones</span></div>
  <div class="toc-item"><span class="toc-num">21.</span><span class="toc-label">Ley Aplicable y Jurisdicción</span></div>
  <div class="toc-item"><span class="toc-num">22.</span><span class="toc-label">Contacto</span></div>
  <div class="toc-item"><span class="toc-num">23.</span><span class="toc-label">Disposiciones Finales</span></div>
</div>

<!-- ══════════════════════════════════════════════════════════
     PARTE I: POLÍTICA DE PRIVACIDAD
     ══════════════════════════════════════════════════════════ -->
<div class="part-header">
  <div class="part-num orange">PARTE I</div>
  <div class="part-title">POLÍTICA DE PRIVACIDAD</div>
  <div class="part-line orange"></div>
</div>

<!-- ── 1. INTRODUCCIÓN Y ALCANCE ───────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num orange">1</span>
    <span class="section-title">Introducción y Alcance</span>
  </div>
  <p>La presente Política de Privacidad (en adelante, la «Política») describe las prácticas de NEO VORTEX LABS (en adelante, «la Empresa», «nosotros» o «Athernix») en relación con la recopilación, uso, almacenamiento, tratamiento y protección de los datos personales de los usuarios que acceden y utilizan la plataforma ATHERNIX, incluyendo todos sus módulos de realidad virtual (VR/XR), la plataforma web, la aplicación móvil, el asistente de inteligencia artificial «Ather» y cualquier otro servicio relacionado.</p>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">1.1</span> Identificación del Responsable</div>
    <p>El responsable del tratamiento de datos personales es NEO VORTEX LABS, empresa constituida y domiciliada en la República de El Salvador, Centroamérica. Para cualquier consulta relacionada con el tratamiento de sus datos personales, puede contactarnos a través del correo electrónico <strong>privacidad@athernix.com</strong>.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">1.2</span> Ámbito de Aplicación</div>
    <p>Esta Política se aplica a todos los servicios ofrecidos por ATHERNIX, incluyendo, entre otros: los módulos educativos de realidad virtual (Historia Viva VR, Virtual Tours, MenteLibre VR, Quantum Lab), el sistema de gamificación y misiones, las aulas virtuales para docentes, el explorador 3D Mundi, el asistente de IA Ather, y todas las funcionalidades accesibles a través de la plataforma web y las aplicaciones compatibles con dispositivos VR/XR.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">1.3</span> Fecha de Vigencia</div>
    <p>Esta Política entra en vigor a partir de agosto de 2026 y permanecerá vigente hasta su modificación o sustitución por una versión posterior, la cual será debidamente notificada a los usuarios conforme a lo establecido en la Sección 20 del presente documento.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">1.4</span> Marco Regulatorio</div>
    <p>ATHERNIX adopta un enfoque integral de cumplimiento normativo que incorpora las mejores prácticas internacionales de protección de datos, incluyendo principios inspirados en la LGPD (Ley General de Protección de Datos Personales), cumplimiento con COPPA (Children's Online Privacy Protection Act) para la protección de menores de 13 años, y adherencia a los preceptos de FERPA (Family Educational Rights and Privacy Act) para la privacidad de registros educativos.</p>
  </div>
</div>

<div class="section-divider orange"></div>

<!-- ── 2. INFORMACIÓN QUE RECOPILAMOS ─────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num orange">2</span>
    <span class="section-title">Información que Recopilamos</span>
  </div>
  <p>Para la prestación y mejora continua de nuestros servicios, ATHERNIX recopila distintas categorías de datos personales, las cuales se detallan a continuación:</p>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">2.1</span> Datos Proporcionados por el Usuario</div>
    <p>Al crear una cuenta en ATHERNIX, el usuario proporciona voluntariamente la siguiente información:</p>
    <ul class="legal-list">
      <li>Nombre completo y nombre de usuario</li>
      <li>Dirección de correo electrónico</li>
      <li>Rol educativo (estudiante, docente, administrador)</li>
      <li>Institución educativa (si aplica)</li>
      <li>Rango de edad o fecha de nacimiento</li>
      <li>Preferencias de idioma y accesibilidad</li>
      <li>Fotografía de perfil (opcional)</li>
    </ul>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">2.2</span> Datos Recopilados Automáticamente</div>
    <p>Durante el uso de la plataforma, recopilamos de manera automática ciertos datos técnicos necesarios para el funcionamiento óptimo de las experiencias inmersivas:</p>
    <ul class="legal-list">
      <li>Información del dispositivo (modelo, sistema operativo, versión del navegador)</li>
      <li>Modelo y especificaciones del headset VR/XR utilizado</li>
      <li>Dirección IP y datos de geolocalización aproximada</li>
      <li>Patrones de uso y navegación dentro de la plataforma</li>
      <li>Duración de las sesiones y frecuencia de acceso</li>
      <li>Métricas de rendimiento de las experiencias VR</li>
    </ul>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">2.3</span> Datos de Biofeedback (MenteLibre VR)</div>
    <p>El módulo MenteLibre VR procesa señales fisiológicas de biofeedback en tiempo real para adaptar las experiencias terapéuticas y de relajación a las necesidades individuales del usuario.</p>
    <div class="highlight-box">
      <strong>Importante:</strong> Las señales de biofeedback se procesan de forma efímera y en tiempo real. No se almacenan en su forma bruta, no se venden a terceros y no se utilizan con fines publicitarios. Únicamente se almacenan métricas agregadas de progreso que no permiten identificar señales fisiológicas individuales.
    </div>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">2.4</span> Datos Generados por Inteligencia Artificial</div>
    <p>Las interacciones con el asistente de IA «Ather» y otros componentes inteligentes de la plataforma generan los siguientes datos:</p>
    <ul class="legal-list">
      <li>Registros de conversaciones e interacciones con Ather</li>
      <li>Datos de rutas de aprendizaje personalizadas</li>
      <li>Analíticas de rendimiento académico y progreso</li>
      <li>Preferencias de contenido inferidas algorítmicamente</li>
    </ul>
  </div>
</div>

<div class="section-divider orange"></div>

<!-- ── 3. USO DE LA INFORMACIÓN ────────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num magenta">3</span>
    <span class="section-title">Uso de la Información</span>
  </div>
  <p>Los datos personales recopilados se utilizan exclusivamente para los fines que se describen a continuación:</p>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">3.1</span> Personalización de Experiencias VR</div>
    <p>Se adapta el contenido, la dificultad y las experiencias inmersivas de cada módulo educativo en función del perfil del usuario, su progreso académico y sus preferencias de aprendizaje, con el fin de optimizar la eficacia educativa de cada sesión.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">3.2</span> Seguimiento de Progreso Académico</div>
    <p>Se generan informes y analíticas de progreso para estudiantes y docentes, lo que permite un seguimiento detallado del avance en misiones, módulos completados, competencias adquiridas y áreas de mejora.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">3.3</span> Mejora de Módulos y Contenido</div>
    <p>Se utilizan datos de uso anonimizados y agregados para identificar qué módulos, experiencias y contenidos aportan mayor valor a la comunidad educativa, lo que nos permite orientar el desarrollo de nuevo contenido y perfeccionar el existente.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">3.4</span> Comunicaciones de Servicio</div>
    <p>Se envían comunicaciones relacionadas con el servicio, incluyendo notificaciones sobre actualizaciones de la plataforma, cambios en los términos de uso, alertas de seguridad y confirmaciones de actividad de la cuenta.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">3.5</span> Seguridad de la Plataforma</div>
    <p>Se procesan datos con el propósito de detectar, prevenir e investigar actividades fraudulentas, accesos no autorizados, uso indebido del servicio y cualquier incidente de seguridad que pueda comprometer la integridad de la plataforma o la protección de los usuarios.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">3.6</span> Investigación y Desarrollo</div>
    <p>Se utilizan datos debidamente anonimizados y agregados con fines de investigación y desarrollo, con el propósito de perfeccionar nuestros algoritmos de inteligencia artificial, mejorar las experiencias de realidad virtual y contribuir al avance de la tecnología educativa.</p>
  </div>

  <div class="highlight-box magenta">
    <strong>Compromiso:</strong> ATHERNIX nunca utiliza los datos personales de sus usuarios con fines de publicidad de terceros. Garantizamos que no vendemos, no alquilamos ni comercializamos la información de nuestra comunidad educativa bajo ninguna circunstancia.
  </div>
</div>

<div class="section-divider orange"></div>

<!-- ── 4. BASE LEGAL DEL TRATAMIENTO ──────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num gold">4</span>
    <span class="section-title">Base Legal del Tratamiento</span>
  </div>
  <p>El tratamiento de datos personales por parte de ATHERNIX se fundamenta en las siguientes bases legales:</p>
  <ul class="legal-list">
    <li><strong>Consentimiento:</strong> El usuario otorga su consentimiento libre, informado, específico e inequívoco al aceptar la presente Política y al registrarse en la plataforma.</li>
    <li><strong>Ejecución contractual:</strong> El tratamiento es necesario para la prestación de los servicios educativos contratados por el usuario, conforme a los Términos y Condiciones de Uso.</li>
    <li><strong>Interés legítimo:</strong> El tratamiento se realiza para fines de mejora continua del servicio, seguridad de la plataforma e investigación educativa, siempre que no prevalezcan los derechos y libertades fundamentales del usuario.</li>
    <li><strong>Obligación legal:</strong> El tratamiento es necesario para el cumplimiento de obligaciones legales aplicables, como la conservación de registros fiscales o la respuesta a requerimientos judiciales debidamente fundamentados.</li>
  </ul>
</div>

<div class="section-divider orange"></div>

<!-- ── 5. COMPARTIR CON TERCEROS ──────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num orange">5</span>
    <span class="section-title">Compartir con Terceros</span>
  </div>
  <p>ATHERNIX puede compartir datos personales con terceros únicamente en las siguientes circunstancias estrictamente definidas:</p>
  <ul class="legal-list">
    <li><strong>Proveedores de infraestructura:</strong> Compartimos datos con proveedores de servicios tecnológicos bajo acuerdos contractuales de confidencialidad y protección de datos, incluyendo servicios de alojamiento en la nube, autenticación, procesamiento de IA y analítica.</li>
    <li><strong>Administradores institucionales:</strong> Los administradores de instituciones educativas pueden acceder a informes agregados de progreso de sus estudiantes, sin acceso a datos individuales de biofeedback o conversaciones privadas con el asistente Ather.</li>
    <li><strong>Cumplimiento legal:</strong> Podemos divulgar datos personales cuando sea requerido por ley, orden judicial, proceso legal o requerimiento gubernamental debidamente fundamentado.</li>
  </ul>
  <div class="highlight-box">
    <strong>Garantía:</strong> ATHERNIX no vende, comercializa ni intercambia datos personales de sus usuarios con terceros para fines comerciales o publicitarios. Todos los proveedores que procesan datos en nombre de la empresa están sujetos a estrictas obligaciones contractuales de confidencialidad.
  </div>
</div>

<div class="section-divider orange"></div>

<!-- ── 6. SEGURIDAD DE LOS DATOS ──────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num purple">6</span>
    <span class="section-title">Seguridad de los Datos</span>
  </div>
  <p>Se implementan medidas de seguridad técnicas, administrativas y físicas de alto nivel para proteger los datos personales contra acceso no autorizado, alteración, divulgación indebida o destrucción:</p>
  <ul class="legal-list">
    <li><strong>Cifrado AES-256:</strong> Todos los datos personales se cifran tanto en tránsito (TLS 1.3) como en reposo (AES-256) para garantizar su confidencialidad.</li>
    <li><strong>Control de acceso por roles (RBAC):</strong> El acceso a datos personales está estrictamente limitado al personal autorizado según su rol y necesidad de conocimiento.</li>
    <li><strong>Auditorías periódicas:</strong> Realizamos auditorías de seguridad internas y externas de manera regular para identificar y remediar posibles vulnerabilidades.</li>
    <li><strong>Infraestructura segura:</strong> Nuestros servidores están alojados en centros de datos certificados con medidas de seguridad física, redundancia y protección contra desastres.</li>
    <li><strong>Respuesta a incidentes:</strong> Contamos con procedimientos documentados de respuesta a incidentes de seguridad, incluyendo la notificación oportuna a los usuarios afectados y a las autoridades competentes.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 7. RETENCIÓN DE DATOS ──────────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num purple">7</span>
    <span class="section-title">Retención de Datos</span>
  </div>
  <p>Conservamos los datos personales durante el período necesario para cumplir con las finalidades descritas en esta Política, conforme a los siguientes criterios:</p>
  <ul class="legal-list">
    <li><strong>Datos de cuenta activa:</strong> Se conservan mientras la cuenta del usuario permanezca activa y durante un período adicional de dos (2) años tras su desactivación o eliminación.</li>
    <li><strong>Datos de biofeedback:</strong> Se procesan de forma efímera en tiempo real y no se almacenan en su forma original. Las métricas agregadas de progreso se conservan de acuerdo con las mismas políticas aplicables a los datos de cuenta.</li>
    <li><strong>Anonimización:</strong> El usuario puede solicitar en cualquier momento la anonimización de sus datos, lo que permite conservar información estadística sin posibilidad de identificación personal.</li>
    <li><strong>Eliminación:</strong> Tras la solicitud de eliminación de cuenta, los datos personales se eliminan de forma segura e irreversible en un plazo máximo de treinta (30) días hábiles, salvo aquellos datos que debamos conservar por obligación legal.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 8. DERECHOS DEL USUARIO ────────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num magenta">8</span>
    <span class="section-title">Derechos del Usuario</span>
  </div>
  <p>Todo usuario de ATHERNIX tiene los siguientes derechos respecto a sus datos personales, los cuales podrá ejercer en cualquier momento:</p>
  <ul class="legal-list">
    <li><strong>Derecho de acceso:</strong> Solicitar información sobre los datos personales que tenemos sobre usted y las finalidades de su tratamiento.</li>
    <li><strong>Derecho de rectificación:</strong> Solicitar la corrección de datos personales inexactos, incompletos o desactualizados.</li>
    <li><strong>Derecho de eliminación:</strong> Solicitar la supresión de sus datos personales cuando ya no sean necesarios para las finalidades que motivaron su recopilación (derecho al olvido).</li>
    <li><strong>Derecho de portabilidad:</strong> Solicitar la entrega de sus datos personales en un formato estructurado, de uso común y lectura mecánica para transferirlos a otro responsable.</li>
    <li><strong>Derecho de revocación del consentimiento:</strong> Retirar en cualquier momento el consentimiento previamente otorgado, sin que ello afecte la licitud del tratamiento previo.</li>
    <li><strong>Derecho de oposición:</strong> Oponerse al tratamiento de sus datos personales por motivos relacionados con su situación particular.</li>
  </ul>
  <div class="highlight-box purple">
    <strong>Ejercicio de derechos:</strong> Para ejercer cualquiera de estos derechos, envíe un correo electrónico a <strong>privacidad@athernix.com</strong> indicando el derecho que desea ejercer, su nombre completo y el correo electrónico asociado a su cuenta. Responderemos a su solicitud en un plazo máximo de quince (15) días hábiles.
  </div>
</div>

<div class="section-divider purple"></div>

<!-- ── 9. MENORES DE EDAD ─────────────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num magenta">9</span>
    <span class="section-title">Menores de Edad</span>
  </div>
  <p>ATHERNIX reconoce la importancia de proteger la privacidad de los menores de edad y adopta las siguientes medidas específicas:</p>
  <ul class="legal-list">
    <li><strong>Consentimiento institucional:</strong> El uso de ATHERNIX en entornos escolares se realiza exclusivamente bajo el consentimiento del centro educativo y, cuando sea requerido, de los padres o tutores legales de los menores.</li>
    <li><strong>Perfiles mínimos:</strong> Los perfiles de menores de edad contienen únicamente la información estrictamente necesaria para la operación del programa educativo.</li>
    <li><strong>Cumplimiento COPPA:</strong> Para usuarios menores de trece (13) años, se implementan protecciones adicionales conforme a la Children’s Online Privacy Protection Act (COPPA), para lo cual se requiere consentimiento verificable de los padres o tutores legales.</li>
    <li><strong>Controles parentales:</strong> Los padres o tutores legales tienen la posibilidad de revisar, modificar o solicitar la eliminación de los datos personales de sus hijos menores de edad, así como restringir ciertas funcionalidades de la plataforma.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 10. COOKIES Y TECNOLOGÍAS ──────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num gold">10</span>
    <span class="section-title">Cookies y Tecnologías de Seguimiento</span>
  </div>
  <p>ATHERNIX emplea cookies y tecnologías similares de forma estrictamente funcional para asegurar el correcto funcionamiento de la plataforma:</p>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">10.1</span> Cookies Esenciales</div>
    <p>Necesarias para el funcionamiento básico de la plataforma, incluyendo la gestión de sesiones de usuario, autenticación segura y protección contra ataques CSRF. No requieren consentimiento adicional ya que son estrictamente necesarias para la prestación del servicio.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">10.2</span> Cookies de Preferencias</div>
    <p>Almacenan las preferencias del usuario como el idioma seleccionado, configuración de accesibilidad (tamaño de fuente, contraste, reducción de movimiento), tema visual y configuración de notificaciones.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">10.3</span> Cookies Analíticas</div>
    <p>Recopilan métricas de uso anónimas y agregadas que nos permiten entender qué módulos y experiencias aportan mayor valor a la comunidad educativa. Estas cookies no recopilan información que permita identificar individualmente a los usuarios.</p>
  </div>

  <div class="highlight-box">
    <strong>Sin publicidad:</strong> ATHERNIX no utiliza cookies de publicidad, remarketing ni seguimiento de terceros con fines comerciales. Puede gestionar las cookies de preferencias y analíticas desde la configuración de su navegador o desde su perfil en la plataforma.
  </div>
</div>

<div class="section-divider orange"></div>

<!-- ── 11. TRANSFERENCIAS INTERNACIONALES ─────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num orange">11</span>
    <span class="section-title">Transferencias Internacionales</span>
  </div>
  <p>Los datos personales de los usuarios de ATHERNIX se almacenan principalmente en servidores ubicados en el continente americano. En caso de que sea necesario realizar transferencias internacionales de datos a países que no cuenten con un nivel de protección adecuado, ATHERNIX implementará las salvaguardas apropiadas, incluyendo cláusulas contractuales tipo, evaluaciones de impacto y medidas técnicas adicionales para garantizar un nivel de protección equivalente al ofrecido en el país de origen de los datos.</p>
</div>

<!-- ══════════════════════════════════════════════════════════
     PARTE II: TÉRMINOS Y CONDICIONES DE USO
     ══════════════════════════════════════════════════════════ -->
<div class="part-header">
  <div class="part-num purple">PARTE II</div>
  <div class="part-title">TÉRMINOS Y CONDICIONES DE USO</div>
  <div class="part-line purple"></div>
</div>

<!-- ── 12. ACEPTACIÓN DE LOS TÉRMINOS ────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num purple">12</span>
    <span class="section-title">Aceptación de los Términos</span>
  </div>
  <p>Al acceder, registrarse o utilizar cualquier servicio de la plataforma ATHERNIX, el usuario declara haber leído, comprendido y aceptado íntegramente los presentes Términos y Condiciones de Uso (en adelante, los «Términos»), así como la Política de Privacidad que los acompaña.</p>
  <ul class="legal-list">
    <li>El uso de ATHERNIX requiere ser mayor de trece (13) años o contar con el consentimiento verificable de un padre, madre o tutor legal.</li>
    <li>Los usuarios institucionales están sujetos a los acuerdos específicos celebrados entre ATHERNIX y su institución educativa, los cuales prevalecerán sobre estos Términos en caso de conflicto.</li>
    <li>Si usted no está de acuerdo con estos Términos, deberá abstenerse de utilizar la plataforma.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 13. DESCRIPCIÓN DEL SERVICIO ──────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num purple">13</span>
    <span class="section-title">Descripción del Servicio</span>
  </div>
  <p>ATHERNIX es una plataforma educativa integral de realidad virtual e inteligencia artificial que ofrece los siguientes servicios:</p>
  <ul class="legal-list">
    <li><strong>Módulos educativos inmersivos:</strong> Experiencias de aprendizaje en realidad virtual que abarcan historia, patrimonio cultural, ciencias STEM, bienestar mental y turismo educativo.</li>
    <li><strong>Asistente de IA «Ather»:</strong> Un tutor inteligente conversacional que guía y acompaña a los usuarios en su proceso de aprendizaje, proporcionando explicaciones personalizadas y recomendaciones de contenido.</li>
    <li><strong>Sistema de gamificación:</strong> Mecánicas de juego que incluyen puntos de experiencia (XP), niveles, logros desbloqueables, misiones y sub-tareas para fomentar la motivación y el compromiso del estudiante.</li>
    <li><strong>Paneles para docentes y administradores:</strong> Herramientas de gestión de aulas virtuales, asignación de misiones, seguimiento analítico de estudiantes y creación de rutas didácticas personalizadas.</li>
    <li><strong>Compatibilidad multidispositivo:</strong> Soporte para múltiples dispositivos VR/XR (Meta Quest, Apple Vision Pro, PSVR2, Valve Index, HTC Vive, Pico y otros), así como acceso web para dispositivos no VR.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 14. REGISTRO Y CUENTA ─────────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num magenta">14</span>
    <span class="section-title">Registro y Cuenta</span>
  </div>
  <p>Para acceder a las funcionalidades completas de ATHERNIX, el usuario deberá crear una cuenta personal sujeta a las siguientes condiciones:</p>
  <ul class="legal-list">
    <li><strong>Información veraz:</strong> El usuario se compromete a proporcionar información precisa y completa durante el proceso de registro, así como a mantenerla actualizada en todo momento.</li>
    <li><strong>Seguridad de la cuenta:</strong> El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que se realicen desde su cuenta.</li>
    <li><strong>Cuenta única:</strong> Cada persona física podrá mantener una única cuenta personal en ATHERNIX, salvo que se trate de cuentas institucionales debidamente autorizadas.</li>
    <li><strong>Suspensión o cancelación:</strong> ATHERNIX se reserva el derecho de suspender o cancelar cuentas que infrinjan estos Términos, previa notificación al usuario afectado, salvo en situaciones de urgencia que requieran acción inmediata.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 15. USO ACEPTABLE ─────────────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num purple">15</span>
    <span class="section-title">Uso Aceptable</span>
  </div>
  <p>La plataforma ATHERNIX ha sido diseñada exclusivamente para fines educativos y de aprendizaje personal. El usuario se compromete a utilizar el servicio conforme a la legislación vigente y a los presentes Términos. Queda expresamente prohibido:</p>
  <ul class="legal-list">
    <li>Utilizar la plataforma para fines ilegales, fraudulentos o no autorizados.</li>
    <li>Acosar, intimidar, amenazar o difamar a otros usuarios de la plataforma.</li>
    <li>Realizar ingeniería inversa, descompilar, desensamblar o intentar obtener el código fuente de la plataforma o cualquiera de sus módulos.</li>
    <li>Acceder o intentar acceder de forma no autorizada a sistemas, redes o datos de ATHERNIX o de otros usuarios.</li>
    <li>Explotar comercialmente cualquier contenido de la plataforma sin autorización previa y por escrito de NEO VORTEX LABS.</li>
    <li>Introducir virus, malware o cualquier código malicioso que pueda dañar la infraestructura de la plataforma.</li>
    <li>Suplantar la identidad de otro usuario o de cualquier empleado de ATHERNIX.</li>
    <li>Utilizar herramientas automatizadas (bots, scrapers) para extraer contenido o datos de la plataforma.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 16. PROPIEDAD INTELECTUAL ──────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num gold">16</span>
    <span class="section-title">Propiedad Intelectual</span>
  </div>
  <p>Todos los derechos de propiedad intelectual sobre la plataforma ATHERNIX y sus contenidos son propiedad exclusiva de NEO VORTEX LABS:</p>
  <ul class="legal-list">
    <li>Todo el contenido de la plataforma —incluyendo, sin limitación, los módulos de realidad virtual, modelos 3D, texturas, animaciones, modelos de inteligencia artificial, algoritmos, código fuente, diseños de interfaz, logotipos, marcas, nombres comerciales y material didáctico— es propiedad exclusiva de NEO VORTEX LABS o de sus licenciantes.</li>
    <li>Los usuarios conservan todos los derechos sobre el contenido original que generen a través de la plataforma (ensayos, proyectos, creaciones).</li>
    <li>La licencia de uso otorgada al usuario es no exclusiva, intransferible, revocable y limitada al uso personal y educativo conforme a estos Términos.</li>
    <li>Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación del contenido de ATHERNIX sin autorización previa y por escrito.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 17. CONTENIDO GENERADO POR USUARIOS ───────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num purple">17</span>
    <span class="section-title">Contenido Generado por Usuarios</span>
  </div>
  <p>Respecto al contenido que los usuarios crean, comparten o publican a través de la plataforma ATHERNIX:</p>
  <ul class="legal-list">
    <li>Los usuarios son responsables del contenido que crean y comparten, asegurándose de que no infrinja derechos de terceros ni contenga material ilícito, ofensivo o inapropiado.</li>
    <li>Al compartir contenido en la plataforma, el usuario otorga a ATHERNIX una licencia no exclusiva, mundial, libre de regalías y sublicenciable para exhibir, procesar, almacenar y distribuir dicho contenido en el marco de la prestación del servicio.</li>
    <li>ATHERNIX se reserva el derecho de eliminar, sin previo aviso, cualquier contenido que infrinja estos Términos, la legislación aplicable o los derechos de terceros.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 18. DISPONIBILIDAD DEL SERVICIO ────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num magenta">18</span>
    <span class="section-title">Disponibilidad del Servicio</span>
  </div>
  <p>ATHERNIX se esfuerza por mantener la plataforma disponible de manera continua, sujeta a las siguientes consideraciones:</p>
  <ul class="legal-list">
    <li><strong>Mejor esfuerzo:</strong> La disponibilidad del servicio se proporciona bajo una obligación de medios, sin garantía de funcionamiento ininterrumpido.</li>
    <li><strong>Mantenimiento programado:</strong> ATHERNIX podrá programar ventanas de mantenimiento para actualizaciones, mejoras y correcciones, procurando realizarlas en horarios de menor impacto y con aviso previo cuando sea posible.</li>
    <li><strong>Fuerza mayor:</strong> ATHERNIX no será responsable por interrupciones del servicio causadas por eventos de fuerza mayor, incluyendo pero no limitándose a desastres naturales, cortes de energía, fallos de infraestructura de terceros, ataques cibernéticos o cualquier otra circunstancia fuera de nuestro control razonable.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 19. LIMITACIÓN DE RESPONSABILIDAD ──────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num magenta">19</span>
    <span class="section-title">Limitación de Responsabilidad</span>
  </div>
  <p>En la máxima medida permitida por la legislación aplicable:</p>
  <ul class="legal-list">
    <li>La plataforma ATHERNIX se proporciona «tal cual» (as is) y «según disponibilidad» (as available), sin garantías de ningún tipo, ya sean expresas o implícitas.</li>
    <li>ATHERNIX no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos que resulten del uso o la imposibilidad de uso de la plataforma.</li>
    <li>La responsabilidad total acumulada de ATHERNIX por cualquier reclamación no excederá el monto total pagado por el usuario durante los doce (12) meses anteriores al evento que dio origen a la reclamación.</li>
  </ul>
  <div class="highlight-box magenta">
    <strong>Advertencia de salud VR:</strong> El uso prolongado de dispositivos de realidad virtual puede ocasionar mareo por movimiento (motion sickness), fatiga visual, desorientación y, en casos excepcionales, episodios epilépticos en personas fotosensibles. Se recomienda tomar pausas regulares de al menos 10 a 15 minutos por cada hora de uso. Los usuarios con condiciones médicas preexistentes deben consultar a su médico antes de utilizar experiencias de realidad virtual.
  </div>
</div>

<div class="section-divider purple"></div>

<!-- ── 20. MODIFICACIONES ─────────────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num gold">20</span>
    <span class="section-title">Modificaciones</span>
  </div>
  <p>ATHERNIX se reserva el derecho de modificar estos Términos y la Política de Privacidad en cualquier momento, sujeto a las siguientes condiciones:</p>
  <ul class="legal-list">
    <li>Las modificaciones sustanciales serán comunicadas a los usuarios con al menos treinta (30) días de anticipación a su entrada en vigor, mediante notificación por correo electrónico y aviso prominente en la plataforma.</li>
    <li>Las modificaciones menores o de carácter aclaratorio podrán implementarse sin previo aviso; en tal caso, se actualizará la fecha de última modificación en el encabezado del documento.</li>
    <li>El uso continuado de la plataforma tras la entrada en vigor de las modificaciones constituirá la aceptación tácita de los nuevos términos.</li>
    <li>Si el usuario no está de acuerdo con las modificaciones, podrá solicitar la eliminación de su cuenta conforme a lo establecido en la Sección 7 de la Política de Privacidad.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 21. LEY APLICABLE Y JURISDICCIÓN ──────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num purple">21</span>
    <span class="section-title">Ley Aplicable y Jurisdicción</span>
  </div>
  <p>Los presentes Términos y la Política de Privacidad se rigen e interpretan de conformidad con las leyes de la República de El Salvador.</p>
  <ul class="legal-list">
    <li>Cualquier controversia que surja de la interpretación, aplicación o cumplimiento de estos Términos será sometida a la jurisdicción de los tribunales competentes de la República de El Salvador, renunciando las partes a cualquier otro fuero que pudiera corresponderles.</li>
    <li>ATHERNIX promueve la resolución alternativa de disputas e invita a los usuarios a comunicarse con la empresa para procurar una solución amistosa antes de iniciar cualquier procedimiento legal.</li>
    <li>Para usuarios fuera de El Salvador, las leyes locales de protección de datos del país de residencia del usuario podrán complementar las disposiciones de estos Términos en lo que resulte más favorable para la protección de sus derechos.</li>
  </ul>
</div>

<div class="section-divider purple"></div>

<!-- ── 22. CONTACTO ───────────────────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num orange">22</span>
    <span class="section-title">Contacto</span>
  </div>
  <p>Para cualquier consulta, solicitud o reclamación relacionada con estos Términos o con el tratamiento de sus datos personales, puede contactarnos a través de los siguientes canales:</p>

  <div class="contact-box">
    <span class="contact-label">Privacidad</span> <strong>privacidad@athernix.com</strong><br>
    <span class="contact-label">General</span> <strong>contacto@athernix.com</strong><br>
    <span class="contact-label">Sitio Web</span> <strong>athernix.com</strong><br>
    <span class="contact-label">Empresa</span> NEO VORTEX LABS<br>
    <span class="contact-label">Ubicación</span> El Salvador, Centroamérica<br>
    <span class="contact-label">Tiempo de respuesta</span> Máximo quince (15) días hábiles
  </div>
</div>

<div class="section-divider orange"></div>

<!-- ── 23. DISPOSICIONES FINALES ──────────────────────────── -->
<div class="section">
  <div class="section-head">
    <span class="section-num gold">23</span>
    <span class="section-title">Disposiciones Finales</span>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">23.1</span> Divisibilidad</div>
    <p>Si alguna disposición de estos Términos fuese declarada nula, inválida o inaplicable por un tribunal competente, dicha nulidad no afectará la validez de las restantes disposiciones, las cuales permanecerán en pleno vigor y efecto.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">23.2</span> Renuncia</div>
    <p>La falta de ejercicio o el retraso en el ejercicio de cualquier derecho o recurso previsto en estos Términos no constituirá una renuncia al mismo, ni impedirá su ejercicio futuro. La renuncia a cualquier derecho deberá ser expresa y por escrito.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">23.3</span> Acuerdo Completo</div>
    <p>Estos Términos, junto con la Política de Privacidad, constituyen el acuerdo completo entre el usuario y ATHERNIX respecto al uso de la plataforma, sustituyendo cualquier acuerdo o entendimiento previo, ya sea verbal o escrito.</p>
  </div>

  <div class="subsection">
    <div class="subsection-title"><span class="subsection-num orange">23.4</span> Cesión</div>
    <p>El usuario no podrá ceder ni transferir sus derechos u obligaciones derivados de estos Términos sin el consentimiento previo y por escrito de ATHERNIX. ATHERNIX podrá ceder libremente sus derechos y obligaciones a cualquier empresa del grupo o sucesor, previa notificación al usuario.</p>
  </div>
</div>

<!-- ── FIRMA / CIERRE ─────────────────────────────────────── -->
<div class="signature">
  <div class="signature-logo">ATHERNIX</div>
  <div class="signature-text">
    NEO VORTEX LABS · El Salvador · Centroamérica<br>
    Documento vigente desde agosto de 2026 · Versión 1.0<br>
    © 2026 NEO VORTEX LABS. Todos los derechos reservados.
  </div>
</div>

</body>
</html>`;
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Generando PDF de Política de Privacidad de ATHERNIX...');
  console.log(`   Salida: ${OUTPUT_PATH}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  const html = buildHTML();
  console.log('📄 Cargando HTML y fuentes...');

  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

  // Small delay to ensure fonts are fully loaded
  await new Promise(r => setTimeout(r, 2000));

  console.log('🖨️  Generando PDF...');

  await page.pdf({
    path: OUTPUT_PATH,
    format: 'Letter',
    scale: 1,
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="background-color: ${C.bg}; position: absolute; top: 0; left: -50vw; width: 200vw; height: 3.5cm; -webkit-print-color-adjust: exact; print-color-adjust: exact;"></div>`,
    footerTemplate: `<div style="background-color: ${C.bg}; position: absolute; bottom: 0; left: -50vw; width: 200vw; height: 3cm; display: flex; justify-content: center; -webkit-print-color-adjust: exact; print-color-adjust: exact;"><div style="width: 8.5in; height: 3cm; display: flex; align-items: flex-end; justify-content: space-between; padding: 0 2.54cm 0.8cm 2.54cm; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 6.5pt; color: rgba(200,150,120,0.5);"><div style="width: 100%; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(168,85,247,0.25); padding-top: 8px;"><span style="font-weight: 700; color: #FF6B35; letter-spacing: 0.15em;">ATHERNIX</span><span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span></div></div></div>`,
    margin: {
      top: '3.5cm',
      bottom: '3cm',
      left: '0',
      right: '0',
    },
    preferCSSPageSize: false,
  });

  await browser.close();

  console.log('✅ PDF generado exitosamente.');
  console.log(`   📁 ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('❌ Error generando el PDF:', err);
  process.exit(1);
});
