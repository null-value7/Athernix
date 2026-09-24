import type { MetadataRoute } from 'next'

// Mismo criterio que sitemap.ts: no emitir localhost si .env.local lo define.
const envUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
const BASE_URL = envUrl.startsWith('http') && !envUrl.includes('localhost')
  ? envUrl.replace(/\/$/, '')
  : 'https://athernix.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dashboard',
        '/profile',
        '/home',
        '/missions',
        '/teacher',
        '/student',
        '/headsets',
        '/chatbot',
        '/development',
        '/update-password',
        '/resetpassword',
        '/forgotpassword',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
