import type { Metadata } from "next";

const LANGUAGES = ["fr", "en", "es", "de", "it", "pt", "nl", "ru", "zh", "ja"];

// Si tu veux gérer des variantes régionales
const LOCALE_MAP: Record<string, string> = {
  fr: "fr",
  en: "en",
  // es: "es",
  // de: "de",
  // it: "it",
  // pt: "pt",
  // nl: "nl",
  // ru: "ru",
  // zh: "zh",
  // ja: "ja",
};


export function generateMetadata({ params }: { params: { lang?: string; slug?: string[] } }): Metadata {
  const currentLang = params.lang || "fr"; // Langue actuelle
  const slug = params.slug ? `/${params.slug.join("/")}` : ""; // Page actuelle

  const baseUrl = "https://www.romainblanchot.com";
  const pageUrl = `${baseUrl}${currentLang === "fr" ? "" : `/${currentLang}`}${slug}`;

  // Générer les alternates pour chaque langue
  const alternates: Record<string, string> = {};
  LANGUAGES.forEach((lang) => {
    alternates[lang] = `${baseUrl}${lang === "fr" ? "" : `/${lang}`}${slug}`;
  });

  return {
    title: {
      default: "Romain - Ingénieur Full Stack Freelance Next.js et Automation",
      template: "%s | Romain - Ingénieur Full Stack Freelance Next.js et Automation",
    },
    description: "Ingénieur Full Stack Freelance spécialisé en solutions end-to-end et intégration d'IA.",
    keywords: ["développeur web", "freelance", "Next.js", "React", "full-stack", "IA", "applications web"],
    authors: [{ name: "Romain" }],
    creator: "Romain",
    category: "technology, portfolio, programming, automation, business",
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

    alternates: {
      canonical: pageUrl, // Canonical unique selon la page
      languages: alternates, // Toutes les langues disponibles
    },

    openGraph: {
      title: "Romain - Développeur Web Freelance",
      description: "Développeur web freelance spécialisé en solutions end-to-end et intégration d'IA.",
      type: "website",
      locale: LOCALE_MAP[currentLang] || "fr", // Utiliser la map pour éviter les erreurs
      url: pageUrl,
      siteName: "Romain Blanchot - Développeur Web Freelance",
      images: [
        {
          url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
          width: 1200,
          height: 630,
          alt: "Romain - Développeur Web Freelance Expert Next.js",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Romain - Développeur Web Freelance",
      description: "Développeur web freelance spécialisé en solutions end-to-end et intégration d'IA.",
      creator: "@talleyrand1000",
      siteId: "@talleyrand1000",
      creatorId: "@talleyrand1000",
      images: {
        url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
        alt: "Romain - Développeur Web Freelance Expert Next.js",
      },
    },
  };
}

// export function generateMetadata({ params }) {
//     const currentLang = params.lang || "fr"; // Récupérer la langue actuelle
  
//     return {
//       alternates: {
//         canonical: `https://www.romainblanchot.com${currentLang === "en" ? "/en" : ""}`,
//         languages: {
//           "fr": "https://www.romainblanchot.com",
//           "en": "https://www.romainblanchot.com/en",
//         },
//       },
//     };
//   }
  