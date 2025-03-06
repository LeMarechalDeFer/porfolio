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
    {
        url: 'https://www.romainblanchot.com/mes-services',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
            languages: {
                en: 'https://www.romainblanchot.com/en/mes-services',
            },
        },
    },
    {
        url: 'https://www.romainblanchot.com/demarrer-votre-projet',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
            languages: {
                en: 'https://www.romainblanchot.com/en/demarrer-votre-projet',
            },
        },
    },
    {
        url: 'https://www.romainblanchot.com/mes-projets',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
            languages: {
                en: 'https://www.romainblanchot.com/en/mes-projets',
            },
        },  
    },
    {
        url: 'https://www.romainblanchot.com/skills',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
            languages: {
                en: 'https://www.romainblanchot.com/en/skills',
            },
        },
    },
    {
        url: 'https://www.romainblanchot.com/a-propos',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
            languages: {
                en: 'https://www.romainblanchot.com/en/a-propos',
            },
        },
    },


    {
        url: 'https://www.romainblanchot.com/me-contacter',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
            languages: {
                en: 'https://www.romainblanchot.com/en/me-contacter',
            },
        },
    },
    {
        url: 'https://www.romainblanchot.com/mes-services',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        alternates: {
            languages: {
                en: 'https://www.romainblanchot.com/en/mes-services',
            },
        },
    },






    
  ]
}