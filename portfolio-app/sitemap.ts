import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
        url: 'https://romainblanchot.com',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
        alternates: {
        languages: {
            en: 'https://romainblanchot.com/en',
        },
        },
    },
  ]
}