// Genera un PDF placeholder válido para la política de privacidad.
// Ejecutar: node scripts/make-placeholder-pdf.js
const fs = require('fs');
const path = require('path');

let pdf = '%PDF-1.4\n';
const offsets = [0];
function add(s) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += s;
}

add('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
add('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
add('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\nendobj\n');

const stream =
  'BT /F1 22 Tf 72 708 Td (ATHERNIX - Politica de Privacidad) Tj ET\n' +
  'BT /F1 11 Tf 72 672 Td (Documento provisional \\(placeholder\\).) Tj ET\n' +
  'BT /F1 11 Tf 72 654 Td (Reemplazar este archivo con el PDF oficial en:) Tj ET\n' +
  'BT /F1 11 Tf 72 636 Td (public/docs/politica-privacidad.pdf) Tj ET\n';

add(`4 0 obj\n<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream\nendobj\n`);
add('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

const xrefPos = Buffer.byteLength(pdf);
pdf += 'xref\n0 6\n0000000000 65535 f \n';
for (let i = 1; i <= 5; i++) pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
pdf += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

const outDir = path.join(__dirname, '..', 'public', 'docs');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'politica-privacidad.pdf'), pdf, 'binary');
console.log('PDF placeholder generado en public/docs/politica-privacidad.pdf');
