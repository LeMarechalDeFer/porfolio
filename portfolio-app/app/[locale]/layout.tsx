

// app/[locale]/client/layout.tsx
import { ReactElement } from 'react'
import { I18nProviderClient } from '../../locales/client'
import Header from '@/components/landingPage/header'
import Footer from '@/components/landingPage/footer'
import { CookieConsent } from "@/components/cookie-consent"
import NewsletterPopup from '@/components/newsletter-popup'
import { Toaster } from "@/components/ui/sonner"


// If you are using Next.js < 15, you don't need to await `params`:
// export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: ReactElement }) {
export default async function SubLayout({ params, children }: { params: Promise<{ locale: string }>, children: ReactElement }) {
  const { locale } = await params
 
  return (
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
  )
} 