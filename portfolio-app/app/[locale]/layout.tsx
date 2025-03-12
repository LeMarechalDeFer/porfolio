

// app/[locale]/layout.tsx
import { ReactElement } from 'react'
import { I18nProviderClient } from '../../locales/client'
import Header from '@/components/landingPage/header'
import Footer from '@/components/landingPage/footer'
import { CookieConsent } from "@/components/cookie-consent"
import NewsletterPopup from '@/components/newsletter-popup'
import { Toaster } from "@/components/ui/sonner"
import { Geist, Geist_Mono } from "next/font/google";
import { getStaticParams } from '@/locales/server'
import { setStaticParamsLocale } from 'next-international/server'
import type { Metadata } from "next";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/app/providers";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/landingPage/theme-provider";
import { organizationSchema, personSchema, webSiteSchema } from "@/components/schema-dts";
import Script from "next/script";
import MyStatsig from "@/components/my-statsig";



export const metadata: Metadata = {
  title: {
    default: "Romain Blanchot - Ingénieur Full Stack & Automatisation",
    template: "%s | Romain Blanchot - Ingénieur Full Stack & Automatisation",
  },
  description:
    "Ingénieur Full Stack Freelance spécialisé en solutions end-to-end et intégration d'IA. Créez des applications web performantes et évolutives !",
  keywords: ["développeur web", "freelance", "Next.js", "React", "full-stack", "IA", "applications web", "automatisation", "web app", "solution end-to-end", "cloud", "docker", "git", "postgtresql", "typescript"],
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
    title: "Romain Blanchot - Ingénieur en Développement Full Stack et Automatisation",
    description: "Développeur web freelance spécialisé en solutions end-to-end et intégration d'IA. Créez des applications web performantes et évolutives !",
    type: "website",
    locale: "fr",
    url: "https://www.romainblanchot.com",
    siteName: "Romain Blanchot - Ingénieur en Développement Full Stack et Automatisation",
    images: [
      {
        url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
        width: 1200,
        height: 630,
        alt: "Romain Blanchot - Ingénieur en Développement Full Stack et Automatisation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Romain Blanchot - Ingénieur en Développement Full Stack et Automatisation",
    description: "Développeur web freelance spécialisé en solutions end-to-end et intégration d'IA. Créez des applications web performantes et évolutives !",
    
    creator: "@talleyrand1000",
    siteId: "@talleyrand1000",
    creatorId: "@talleyrand1000",

    images: {
      url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
      alt: "Romain Blanchot - Ingénieur en Développement Full Stack et Automatisation",
    },
  },
  

};


// Chargement des polices Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });  


export function generateStaticParams() {
  return getStaticParams();
}

export default async function SubLayout({
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
          <PostHogProvider>
            <MyStatsig>      
              <I18nProviderClient locale={locale}>
                <Header />
                  <main  className="min-h-screen bg-background overflow-x-hidden mb-10">
                    {children}
                    <CookieConsent />
                    <NewsletterPopup />
                    <Toaster />
                  </main>
                <Footer />
              </I18nProviderClient>
            </MyStatsig>
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