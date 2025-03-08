import type { MetadataRoute } from 'next';

// Liste des langues prises en charge
const LANGUAGES = ["fr", "en"];

// Liste des pages statiques de ton site
const STATIC_PAGES = [
  "",
  "mes-services",
  "demarrer-votre-projet",
  "mes-projets",
  "mes-competences",
  "a-propos",
  "me-contacter",
];

// Génération des entrées pour la sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  STATIC_PAGES.forEach((page) => {
    const urlFr = `https://www.romainblanchot.com${page ? `/${page}` : ""}`;
    const urlEn = `https://www.romainblanchot.com/en${page ? `/${page}` : ""}`;

    const alternates: Record<string, string> = {};
    LANGUAGES.forEach((lang) => {
      alternates[lang] = lang === "fr" ? urlFr : urlEn;
    });

    urls.push({
      url: urlFr, // Page FR
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: page === "" ? 1 : 0.8, // Priorité plus haute pour la home
      alternates: { languages: alternates },
    });

    urls.push({
      url: urlEn, // Page EN
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: { languages: alternates },
    });
  });

  return urls;
}


// import type { MetadataRoute } from 'next'
 
// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//         url: 'https://www.romainblanchot.com',
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 1,
//         alternates: {
//             languages: {
//                 fr: 'https://www.romainblanchot.com',
//                 en: 'https://www.romainblanchot.com/en',
//             },
//         },
//         images: ['https://www.romainblanchot.com/photoProfilRomain.jpg'],
//     },
//     {
//         url: 'https://www.romainblanchot.com/mes-services',
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 0.8,
//         alternates: {
//             languages: {
//                 fr: 'https://www.romainblanchot.com/mes-services',
//                 en: 'https://www.romainblanchot.com/en/mes-services',
//             },
//         },
//     },
//     {
//         url: 'https://www.romainblanchot.com/demarrer-votre-projet',
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 0.8,
//         alternates: {
//             languages: {
//                 fr: 'https://www.romainblanchot.com/demarrer-votre-projet',
//                 en: 'https://www.romainblanchot.com/en/demarrer-votre-projet',
//             },
//         },
//     },
//     {
//         url: 'https://www.romainblanchot.com/mes-projets',
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 0.8,
//         alternates: {
//             languages: {
//                 fr: 'https://www.romainblanchot.com/mes-projets',
//                 en: 'https://www.romainblanchot.com/en/mes-projets',
//             },
//         },  
//     },
//     {
//         url: 'https://www.romainblanchot.com/mes-competences',
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 0.8,
//         alternates: {
//             languages: {
//                 fr: 'https://www.romainblanchot.com/mes-competences',
//                 en: 'https://www.romainblanchot.com/en/mes-competences',
//             },
//         },
//     },
//     {
//         url: 'https://www.romainblanchot.com/a-propos',
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 0.8,
//         alternates: {
//             languages: {
//                 fr: 'https://www.romainblanchot.com/a-propos',
//                 en: 'https://www.romainblanchot.com/en/a-propos',
//             },
//         },
//     },


//     {
//         url: 'https://www.romainblanchot.com/me-contacter',
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 0.8,
//         alternates: {
//             languages: {
//                 fr: 'https://www.romainblanchot.com/me-contacter',
//                 en: 'https://www.romainblanchot.com/en/me-contacter',
//             },
//         },
//     },
//     {
//         url: 'https://www.romainblanchot.com/mes-services',
//         lastModified: new Date(),
//         changeFrequency: 'daily',
//         priority: 0.8,
//         alternates: {
//             languages: {
//                 fr: 'https://www.romainblanchot.com/mes-services',
//                 en: 'https://www.romainblanchot.com/en/mes-services',
//             },
//         },
//     },

    
//   ]
// }