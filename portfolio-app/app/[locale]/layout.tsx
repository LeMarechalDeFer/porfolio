// app/[locale]/layout.tsx
import { I18nProviderClient } from '../../locales/client'
import Header from '@/components/landingPage/header'
import Footer from '@/components/landingPage/footer'
import { CookieConsent } from "@/components/cookie-consent"
import NewsletterPopup from '@/components/newsletter-popup'
import { Toaster } from "@/components/ui/sonner"

import type { Metadata } from "next";

import { getI18n, getStaticParams } from "@/locales/server";
import { setStaticParamsLocale } from 'next-international/server'
import { ReactElement } from 'react'


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

export default async function SubLayout({
   params, 
   children }: {
     params: Promise<{ locale: string }>, 
     children: ReactElement }) {

  const { locale } = await params

  setStaticParamsLocale(locale);
 
  return (
  
    <I18nProviderClient locale={locale}>
      <Header />
        <main  className="min-h-screen bg-background overflow-x-hidden mb-10">
          {children}
          <CookieConsent />
          <NewsletterPopup />
          <Toaster />
        </main>
      <Footer params={params} />
    </I18nProviderClient>
  
  )
} 
