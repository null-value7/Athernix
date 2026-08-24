// Base URL para assets pesados (>25 MiB) servidos desde Cloudflare R2 en producción.
// En desarrollo local queda vacío y los assets se sirven desde /public.
// Configurar NEXT_PUBLIC_ASSETS_URL en Cloudflare Pages con la URL pública del bucket R2,
// por ejemplo: https://pub-xxxxxxxx.r2.dev o https://assets.tudominio.com
export const ASSETS_BASE_URL = process.env.NEXT_PUBLIC_ASSETS_URL ?? '';

export function assetUrl(path: string): string {
  const base = ASSETS_BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
