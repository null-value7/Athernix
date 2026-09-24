import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ATHERNIX | Ecosistema VR',
    short_name: 'ATHERNIX',
    description: 'Ecosistema de Realidad Virtual e Inteligencia Artificial en El Salvador.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08000a',
    theme_color: '#08000a',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
