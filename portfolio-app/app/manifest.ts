import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Romain Blanchot',
    short_name: 'Romain Blanchot',
    description: 'Ingénieur Full Stack Freelance spécialisé en solutions end-to-end et intégration d\'IA. Créez des applications web performantes et évolutives avec un expert Next.js.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
    {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
    },
    {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
    },
    {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
    },
    ],
}
}
