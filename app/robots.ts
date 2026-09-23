import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://athernix.com'

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
