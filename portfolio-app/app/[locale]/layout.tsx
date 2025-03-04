

// app/[locale]/client/layout.tsx
import { ReactElement } from 'react'
import { I18nProviderClient } from '../../locales/client'
// import { ThemeProvider } from '@/components/landingPage/theme-provider'
import Header from '@/components/landingPage/header'
import Footer from '@/components/landingPage/footer'
import { ThemeProvider } from 'next-themes'
// If you are using Next.js < 15, you don't need to await `params`:
// export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: ReactElement }) {
export default async function SubLayout({ params, children }: { params: Promise<{ locale: string }>, children: ReactElement }) {
  const { locale } = await params
 
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <I18nProviderClient locale={locale}>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </I18nProviderClient>
    // </ThemeProvider>
  )
} 