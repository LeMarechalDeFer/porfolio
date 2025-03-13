import Projects from "@/components/landingPage/projects";
import { setStaticParamsLocale } from "next-international/server";
// import { Metadata, ResolvingMetadata } from "next";
// import { getI18n } from "@/locales/server";

// type Params = {
//   params: Promise<{
//     locale: string;
//   }>;
// };

// export async function generateMetadata(
//   { params }: Params,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { locale } = await params;
  
//   setStaticParamsLocale(locale);
//   const t = await getI18n();

//   const isFrench = locale === "fr";
  
//   // On récupère les données parentes
//   const parentMetadata = await parent;
  
//   // On extrait les propriétés sûres qui ne causent pas d'erreur de type
//   const { 
//     icons, manifest, applicationName, formatDetection,
//     metadataBase,  archives, assets, bookmarks,
//     category, classification, creator, publisher, referrer, colorScheme, generator
//   } = parentMetadata;

//   return {
//     // Propriétés de base sûres à réutiliser
//     icons, manifest, applicationName, formatDetection,
//     metadataBase, archives, assets, bookmarks,
//     category, classification, creator, publisher, referrer, colorScheme, generator,
    
//     // Nos propriétés spécifiques
//     title: {
//       default: t("metadata.mes-projets.title"),
//       template: "%s | Romain Blanchot",
//     },
//     description: t("metadata.mes-projets.description"),
//     // Données littérales pour éviter les erreurs de traduction
//     // keywords: [
//     //   "développement web", "portfolio", "projets", "nextjs", 
//     //   "react", "javascript", "typescript", "frontend", "backend",
//     //   "fullstack", "responsive", "mobile", "design", "UX/UI", "applications"
//     // ],
//     keywords: [t("metadata.mes-projets.keywords.1"),
//       t("metadata.mes-projets.keywords.2"),
//       t("metadata.mes-projets.keywords.3"),
//       t("metadata.mes-projets.keywords.4"),
//       t("metadata.mes-projets.keywords.5"),
//       t("metadata.mes-projets.keywords.6"),
//       t("metadata.mes-projets.keywords.7"),
//       t("metadata.mes-projets.keywords.8"),
//       t("metadata.mes-projets.keywords.9"),
//       t("metadata.mes-projets.keywords.10"),
//       t("metadata.mes-projets.keywords.11"),
//       t("metadata.mes-projets.keywords.12"),
//       t("metadata.mes-projets.keywords.13"),
//       t("metadata.mes-projets.keywords.14"),
      
//     ],
//     alternates: {
//       canonical: isFrench 
//       ? "https://www.romainblanchot.com/mes-projets" 
//       : `https://www.romainblanchot.com/${locale}/mes-projets`,
//       languages: {
//         "fr": "https://www.romainblanchot.com/mes-projets",
//         "en": "https://www.romainblanchot.com/en/mes-projets",
//       },
//     },
//     // Pour OpenGraph, on ne fait pas de spread mais on prend des valeurs spécifiques
//     openGraph: {
//       title: t("metadata.mes-projets.openGraph.title") || "Mes projets | Portfolio",
//       description: t("metadata.mes-projets.openGraph.description") || "Découvrez mes projets",
//       type: "website",
//       locale: locale,
//       url: isFrench 
//         ? "https://www.romainblanchot.com/mes-projets" 
//         : `https://www.romainblanchot.com/${locale}/mes-projets`,
//       siteName: t("metadata.mes-projets.openGraph.siteName") || "Portfolio Romain Blanchot",
//     },
//     // Pour Twitter, même chose
//     twitter: {
//       card: "summary_large_image",
//       title: t("metadata.mes-projets.twitter.title") || "Mes projets | Portfolio",
//       description: t("metadata.mes-projets.twitter.description") || "Découvrez mes projets",
//       creator: "@talleyrand1000",
//       siteId: "@talleyrand1000",
//       creatorId: "@talleyrand1000",
//       images: {
//         url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
//         alt: t("metadata.mes-projets.twitter.alt") || "Photo de profil",
//       },
//     },
//   };
// }

export default async function MesProjets({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <div className="pt-10">
        <Projects />
    </div>
  );
}
