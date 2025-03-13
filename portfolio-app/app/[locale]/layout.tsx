// app/[locale]/layout.tsx
import { I18nProviderClient } from '../../locales/client'
import Header from '@/components/landingPage/header'
import Footer from '@/components/landingPage/footer'
import { CookieConsent } from "@/components/cookie-consent"
import NewsletterPopup from '@/components/newsletter-popup'
import { Toaster } from "@/components/ui/sonner"

import type { Metadata } from "next";

import { getI18n, getStaticParams } from "@/locales/server";
import { ReactElement } from 'react'

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/app/providers";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/landingPage/theme-provider";
import { organizationSchema, personSchema, webSiteSchema } from "@/components/schema-dts";
import Script from "next/script";
import MyStatsig from "@/components/my-statsig";
import { setStaticParamsLocale } from "next-international/server";

// Chargement des polices Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });  



export function generateStaticParams() {
  return getStaticParams();
}



export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  // Utilise getI18n pour récupérer les traductions
  const t = await getI18n();
  const isFrench = locale === "fr";

  return {
    title: {
      default: t("metadata.layout.title"),
      template: "%s | " + t("metadata.layout.title"),
    },
    description: t("metadata.layout.description"),
    keywords: [
      t("metadata.layout.keywords.0"),
      t("metadata.layout.keywords.1"),
      t("metadata.layout.keywords.2"),
      t("metadata.layout.keywords.3"),
      t("metadata.layout.keywords.4"),
      t("metadata.layout.keywords.5"),
      t("metadata.layout.keywords.6"),
      t("metadata.layout.keywords.7"),
      t("metadata.layout.keywords.8"),
      t("metadata.layout.keywords.9"),
      t("metadata.layout.keywords.10"),
      t("metadata.layout.keywords.11"),
      t("metadata.layout.keywords.12"),
      t("metadata.layout.keywords.13"),
      t("metadata.layout.keywords.14")
    ],
    authors: [{ name: "Romain Blanchot" }],
    creator: "Romain Blanchot", 
    category: t("metadata.layout.category"),
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: isFrench 
      ? "https://www.romainblanchot.com" 
      : `https://www.romainblanchot.com/${locale}`,
      languages: {
        "fr": "https://www.romainblanchot.com",
        "en": "https://www.romainblanchot.com/en",
      },
  
    },
    openGraph: {
      title: t("metadata.layout.openGraph.title"),
      description: t("metadata.layout.openGraph.description"),
      type: "website",
      locale: locale,
      url: isFrench 
      ? "https://www.romainblanchot.com" 
      : `https://www.romainblanchot.com/${locale}`,
      siteName: t("metadata.layout.openGraph.siteName"),
      images: [
        {
          url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
          width: 1200,
          height: 630,
          alt: t("metadata.layout.openGraph.alt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.layout.twitter.title"),
      description: t("metadata.layout.twitter.description"),
      
      creator: "@talleyrand1000",
      siteId: "@talleyrand1000",
      creatorId: "@talleyrand1000",
  
      images: {
        url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
        alt: t("metadata.layout.twitter.alt"),
      },
    },
  };
}

export default async function RootLayout({
   params, 
   children }: {
     params: Promise<{ locale: string }>, 
     children: ReactElement }) {

  const { locale } = await params
  setStaticParamsLocale(locale);
 
  return (
    <html lang={locale} suppressHydrationWarning>
   
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
       
    <I18nProviderClient locale={locale}>
    <PostHogProvider>
    <MyStatsig>   
      <Header />
        <main  className="min-h-screen bg-background overflow-x-hidden mb-10">
          {children}
          <CookieConsent />
          <NewsletterPopup />
          <Toaster />
        </main>
      <Footer params={params} />
      </MyStatsig>
      </PostHogProvider>
    </I18nProviderClient>

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
  )
} 
