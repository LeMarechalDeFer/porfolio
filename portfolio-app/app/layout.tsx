import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/landingPage/theme-provider";
import { organizationSchema, personSchema, webSiteSchema } from "@/components/schema-dts";
import Script from "next/script";
import { WithContext, BreadcrumbList } from "schema-dts";

// Chargement des polices Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Romain Blanchot - Ingénieur Full Stack Freelance Next.js et Automation",
    template: "%s | Romain Blanchot - Ingénieur Full Stack Freelance Next.js et Automation",
  },
  description:
    "Ingénieur Full Stack Freelance spécialisé en solutions end-to-end et intégration d'IA. Créez des applications web performantes et évolutives avec un expert Next.js.",
  keywords: ["développeur web", "freelance", "Next.js", "React", "full-stack", "IA", "applications web"],
  authors: [{ name: "Romain Blanchot" }],
  creator: "Romain Blanchot",
  category: 'technology, portfolio, programming, automation, business',
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://www.romainblanchot.com",
    languages: {
      "fr": "https://www.romainblanchot.com",
      "en": "https://www.romainblanchot.com/en",
    },

  },
  openGraph: {
    title: "Romain - Développeur Web Freelance",
    description: "Développeur web freelance spécialisé en solutions end-to-end et intégration d'IA. Créez des applications web performantes et évolutives avec un expert Next.js.",
    type: "website",
    locale: "fr",
    url: "https://www.romainblanchot.com",
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
    description: "Développeur web freelance spécialisé en solutions end-to-end et intégration d'IA. Créez des applications web performantes et évolutives avec un expert Next.js.",
    
    creator: "@talleyrand1000",
    siteId: "@talleyrand1000",
    creatorId: "@talleyrand1000",

    images: {
      url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
      alt: "Romain - Développeur Web Freelance Expert Next.js",
    },
  },
  

};

// Définition du fil d'Ariane avec toutes les pages
const breadcrumbData = [
  { name: "Accueil", path: "/" },
  { name: "Démarrer votre projet", path: "/demarrer-votre-projet" },
  { name: "Mes Services", path: "/mes-services" },
  { name: "Mes Compétences", path: "/mes-competences" },
  { name: "Mes Projets", path: "/mes-projets" },
  { name: "À Propos", path: "/a-propos" },
  { name: "Me Contacter", path: "/me-contacter" },
];

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug?: string[] };
}>) {
  // Définir le chemin actuel (slug vide = page d'accueil "/")
  const currentPath = params.slug ? `/${params.slug.join("/")}` : "/";

  // Générer le fil d'Ariane avec tout le chemin
  const breadcrumbList: BreadcrumbList["itemListElement"] = breadcrumbData
  .filter((item) => currentPath.startsWith(item.path)) // Inclure toutes les pages jusqu'à la page actuelle
  .map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@id": `https://www.romainblanchot.com${item.path}`,
      name: item.name,
    },
  }));


  // Objet JSON-LD du fil d'Ariane
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </ThemeProvider>
      
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-org-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="schema-org-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Script
          id="schema-org-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2TC3Q2KCCQ"
          strategy="afterInteractive"
          id="google-analytics-script"
        />
        <Script
          id="google-analytics-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2TC3Q2KCCQ');
            `,
          }}
        />

      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qlehuwonqv");
          `
        }}
      />
      
      <SpeedInsights />
      <Analytics />
       
      </body>
    </html>
  );
}
