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
  "politique-de-confidentialite",
  "politique-de-cookies",
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


// curl -X POST "https://api.indexnow.org/indexnow" \
//      -H "Content-Type: application/json" \
//      -d '{
//            "host": "www.romainblanchot.com",
//            "key": "8aa5a83821e746829b4f56bd8cfebc0d",
//            "keyLocation": "https://www.romainblanchot.com/8aa5a83821e746829b4f56bd8cfebc0d.txt",
//            "urlList": [
//              "https://www.romainblanchot.com/",
//              "https://www.romainblanchot.com/mes-services",
//              "https://www.romainblanchot.com/demarrer-votre-projet",
//              "https://www.romainblanchot.com/mes-projets",
//              "https://www.romainblanchot.com/mes-competences",
//              "https://www.romainblanchot.com/a-propos",
//              "https://www.romainblanchot.com/me-contacter",
//              "https://www.romainblanchot.com/politique-de-confidentialite",
//              "https://www.romainblanchot.com/politique-de-cookies",
//              "https://www.romainblanchot.com/en",
//              "https://www.romainblanchot.com/en/mes-services",
//              "https://www.romainblanchot.com/en/demarrer-votre-projet",
//              "https://www.romainblanchot.com/en/mes-projets",
//              "https://www.romainblanchot.com/en/mes-competences",
//              "https://www.romainblanchot.com/en/a-propos",
//              "https://www.romainblanchot.com/en/me-contacter",
//              "https://www.romainblanchot.com/en/politique-de-confidentialite",
//              "https://www.romainblanchot.com/en/politique-de-cookies"
//            ]
//          }'

