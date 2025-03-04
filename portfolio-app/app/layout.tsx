
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PostHogProvider } from './providers'
// import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/react"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Romain - Développeur Web Freelance Expert Next.js",
    template: "%s | Romain - Développeur Web Freelance",
  },
  description:
    "Développeur web freelance spécialisé en solutions end-to-end et intégration d'IA. Créez des applications web performantes et évolutives avec un expert Next.js.",
  keywords: ["développeur web", "freelance", "Next.js", "React", "full-stack", "IA", "applications web"],
  authors: [{ name: "Romain" }],
  creator: "Romain",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.romainblanchot.com",
    siteName: "Romain - Développeur Web Freelance",
    images: [
      {
        url: "https://www.romainblanchot.com/photoProfilRomain.jpg",
        width: 1200,
        height: 630,
        alt: "Romain - Développeur Web Freelance Expert Next.js",
      },
    ],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="fr" suppressHydrationWarning>
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
          <PostHogProvider>
            {children}
          </PostHogProvider>
        {/* </ThemeProvider> */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
