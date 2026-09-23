// Codemod: wraps JSX-child expressions {x.field} whose field is a display-text
// field with {protectBrands(x.field)} so data strings containing brand names
// are protected from Google Translate. Adds the import when missing.
import fs from 'node:fs';
import path from 'node:path';

const FIELDS = 'name|nombre|title|label|text|desc|description|descripcion|summary|tagline|mission|philosophy|heroSub|eyebrow|comingSoon|species|subtitle|heading|subheading|content|message|bio|quote|role|country|category|author|teacherName|note|hint|caption|footerNote|cta|body|legend|tag';
const EXPR = new RegExp(`(^|>|[ \\t])\\{([a-zA-Z_][a-zA-Z0-9_]*\\.(?:${FIELDS}))\\}`, 'g');
const IMPORT = "import { protectBrands } from '@/components/ui/ProtectedText';";

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.tsx')) yield p;
  }
}

const changed = [];
for (const f of [...walk('app'), ...walk('components')]) {
  if (f.endsWith('ProtectedText.tsx')) continue;
  let src = fs.readFileSync(f, 'utf8');
  const next = src.replace(EXPR, (m, pre, expr) => `${pre}{protectBrands(${expr})}`);
  if (next === src) continue;
  src = next;
  if (!src.includes("from '@/components/ui/ProtectedText'")) {
    const lines = src.split('\n');
    let lastImport = -1;
    for (let i = 0; i < Math.min(lines.length, 80); i++) {
      if (/^\s*import\b/.test(lines[i])) lastImport = i;
    }
    if (lastImport >= 0) lines.splice(lastImport + 1, 0, IMPORT);
    else lines.unshift(IMPORT);
    src = lines.join('\n');
  }
  fs.writeFileSync(f, src);
  changed.push(f);
}
console.log(changed.join('\n'));
console.log('files changed:', changed.length);
