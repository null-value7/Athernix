// Base URL para assets pesados (>25 MiB) servidos desde Cloudflare R2 en producción.
// En desarrollo local queda vacío y los assets se sirven desde /public.
// Configurar NEXT_PUBLIC_ASSETS_URL en Cloudflare Pages con la URL pública del bucket R2,
// por ejemplo: https://pub-xxxxxxxx.r2.dev o https://assets.tudominio.com
const rawBaseUrl = process.env.NEXT_PUBLIC_ASSETS_URL ?? '';

// Descarta placeholders u URLs vacías; en dev permite dejar la variable sin valor y usar /public.
const isValidAssetBase =
  rawBaseUrl.startsWith('http') &&
  !rawBaseUrl.includes('xxxxxxxx') &&
  !rawBaseUrl.includes('example.com') &&
  !rawBaseUrl.includes('localhost');

export const ASSETS_BASE_URL = isValidAssetBase ? rawBaseUrl.replace(/\/$/, '') : '';

export function assetUrl(path: string): string {
  return `${ASSETS_BASE_URL}${path}`;
}
