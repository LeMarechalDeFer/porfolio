import type { WithContext, Organization, Person, WebSite } from "schema-dts";

/**
 * 1. Organization Schema
 */
export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TransiTech",
  url: "https://www.romainblanchot.com",
  logo: "./photoProfilRomain.jpg",
  sameAs: [
    "https://www.linkedin.com/in/romain-blanchot-449941284/",
    "https://github.com/LeMarechalDeFer",
    "https://www.instagram.com/romainblanchot/",
    // "https://twitter.com/votre-profil",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "60 rue de seine",
    addressLocality: "Paris",
    postalCode: "75006",
    addressCountry: "FR",
  },
  telephone: "+33 7 88 28 47 15",
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "blanchot@et.esiea.fr",
      telephone: "+33 7 88 28 47 15",
      contactType: "customer support",
      availableLanguage: ["French", "English"],
    },
  ],
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "Romain Blanchot",
  },
  description:
    "Ingénieux freelance spécialisé en automatisation et en développement fullstack.",
  // Les horaires d'ouverture en schéma.org s'expriment souvent sous la forme "Mo-Su 00:00-23:59" pour 24/7
  // openingHours: "Mo-Su 00:00-23:59",
};

/**
 * 2. Person Schema
 */
export const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Romain Blanchot",
  jobTitle:
    "Ingénieux freelance spécialisé en automatisation et en développement fullstack",
  url: "https://www.romainblanchot.com",
  sameAs: [
    "https://www.linkedin.com/in/romain-blanchot-449941284/",
    "https://www.instagram.com/_romain_blanchot_/",
    "https://github.com/LeMarechalDeFer",
  ],
  image: "./photoProfilRomain.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "60 rue de seine",
    addressLocality: "Paris",
    postalCode: "75006",
    addressCountry: "FR",
  },
  email: "mailto:blanchot@et.esiea.fr",
  description:
    "Ingénieux freelance spécialisé en automatisation et en développement fullstack depuis 2 ans, étudiant ingénieur en informatique à l'ESIEA et passionné. Mes mots d'ordre : créer et résoudre des problèmes complexes et innovants.",
  award: "Diplôme d'ingénieur en cours (actuellement étudiant)",
  worksFor: {
    "@type": "Organization",
    name: "Hotel La Louisiane",
  },
};

/**
 * 3. WebSite Schema
 */
export const webSiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Portfolio de Romain Blanchot",
  url: "https://www.romainblanchot.com",
  description:
    "Ingénieux freelance spécialisé en automatisation et en développement fullstack depuis 2 ans, étudiant ingénieur en informatique à l'ESIEA et passionné. Mes mots d'ordre : créer et résoudre des problèmes complexes et innovants.",
  inLanguage: ["fr", "en"], // Bilingue
  author: {
    "@type": "Person",
    name: "Romain Blanchot",
  },
  // Vous pouvez utiliser "publisher" = Person ou Organization, selon votre préférence
  publisher: {
    "@type": "Person",
    name: "Romain Blanchot",
  },
  copyrightHolder: {
    "@type": "Person",
    name: "Romain Blanchot",
  },
  // Date de lancement du site (publication)
  datePublished: "2025-03-01",
  // Optionnel : logo distinct
  //  logo: "https://www.romainblanchot.com/photoProfilRomain.jpg",
};

// liste de mes liens :
// https://www.romainblanchot.com/ 1
// https://www.romainblanchot.com/a-propos 6
// https://www.romainblanchot.com/demarrer-votre-projet 2
// https://www.romainblanchot.com/me-contacter 7
// https://www.romainblanchot.com/mes-projets 5
// https://www.romainblanchot.com/mes-services 3
// https://www.romainblanchot.com/skills 4


// export const breadcrumbSchema: WithContext<BreadcrumbList> = {
//   "@context": "https://schema.org",
//   "@type": "BreadcrumbList",
//   itemListElement: [
//     {
//       "@type": "ListItem",
//       position: 1,
//       name: "Accueil",
//       item: "https://www.romainblanchot.com",
//     },
//     {
//       "@type": "ListItem",
//       position: 2,
//       name: "Portfolio",
//       item: "https://www.romainblanchot.com/portfolio",
//     },
//     {
//       "@type": "ListItem",
//       position: 3,
//       name: "Contact",
//       item: "https://www.romainblanchot.com/contact",
//     },
//   ],
// };
