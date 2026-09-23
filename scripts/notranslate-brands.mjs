// Codemod: wraps proper nouns (brand names) in JSX text with
// <span className="notranslate" translate="no"> so Google Translate skips them.
// Only touches JSX text — imports, attributes and code strings are ignored.
import fs from 'node:fs';
import path from 'node:path';

const BRAND = /\b(Athernixito|Athernix|Mundi|Ather)\b/gi;
const wrap = (w) => `<span className="notranslate" translate="no">${w}</span>`;

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.tsx')) yield p;
  }
}

const files = [...walk('app'), ...walk('components')];
const changed = [];

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  let touched = false;

  const out = lines.map((line) => {
    if (line.includes('notranslate')) return line; // already marked — skip
    // Pattern A: single-line JSX text  >...brand...<
    let nl = line.replace(/>([^<>{}'"`;=]*\b(?:Athernixito|Athernix|Mundi|Ather)\b[^<>{}'"`;=]*)</gi,
      (m, txt) => '>' + txt.replace(BRAND, wrap) + '<');

    // Pattern B: bare text line inside JSX (no code/tag chars, no quotes)
    const t = nl.trim();
    const looksLikeCode = /[<>{}()=;:'"`\\]/.test(t)
      || /^(\/\/|\/\*|\*|import\b|export\b|const\b|let\b|var\b|return\b|function\b|type\b|interface\b|case\b|default:)/.test(t);
    if (t && !looksLikeCode && BRAND.test(t)) {
      BRAND.lastIndex = 0;
      nl = nl.replace(BRAND, wrap);
    }
    BRAND.lastIndex = 0;
    if (nl !== line) touched = true;
    return nl;
  });

  if (touched) {
    fs.writeFileSync(f, out.join('\n'));
    changed.push(f);
  }
}

console.log(changed.join('\n'));
console.log('files changed:', changed.length);
