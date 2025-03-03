import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
        url: 'https://www.romainblanchot.com',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
        alternates: {
            languages: {
                en: 'https://www.romainblanchot.com/en',
            },
        },
        images: ['https://www.romainblanchot.com/photoProfilRomain.jpg'],
    },
  ]
}