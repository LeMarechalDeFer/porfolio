import type { Organization, Person, WithContext } from "schema-dts"

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Romain - Développeur Web Freelance",
  url: "https://www.romainblanchot.com",
  logo: "https://www.romainblanchot.com/photoProfilRomain.jpg",
  sameAs: [
    "https://www.linkedin.com/in/romain-blanchot-449941284/",
    "https://github.com/LeMarechalDeFer",
    "mailto:blanchot@et.esiea.fr",
    "https://www.instagram.com/romainblanchot/",
    // "https://twitter.com/votre-profil",
  ],
}

export const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Romain",
  jobTitle: "Développeur Web Freelance",
  url: "https://www.romainblanchot.com",
  sameAs: [
    "https://www.linkedin.com/in/romain-blanchot-449941284/",
    "https://github.com/LeMarechalDeFer",
    "mailto:blanchot@et.esiea.fr",
    "https://www.instagram.com/romainblanchot/",
    // "https://twitter.com/votre-profil",
  ],
}