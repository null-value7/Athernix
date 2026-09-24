import type { MetadataRoute } from 'next'

// NEXT_PUBLIC_SITE_URL puede quedar inlineado como localhost si se buildea
// con .env.local — nunca emitir localhost en el sitemap de producción.
const envUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
const BASE_URL = envUrl.startsWith('http') && !envUrl.includes('localhost')
  ? envUrl.replace(/\/$/, '')
  : 'https://athernix.com'

// Solo rutas públicas e indexables (las rutas privadas van con noindex
// vía robots en sus layouts y con disallow en robots.txt).
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/accesibilidad',
    '/ather',
    '/discover',
    '/experience',
    '/explore',
    '/modulos',
    '/modulos/history',
    '/modulos/tours',
    '/modulos/brain',
    '/mundi',
    '/ondilla3',
    '/ondilla3/materias',
    '/privacidad',
    '/terminos',
    '/soporte',
    '/vrtech',
    '/zen',
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }))
}
