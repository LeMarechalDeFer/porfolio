
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/app/providers";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/landingPage/theme-provider";
import { organizationSchema, personSchema, webSiteSchema } from "@/components/schema-dts";
import Script from "next/script";
import MyStatsig from "@/components/my-statsig";
import { getCurrentLocale } from "@/locales/server";


// Chargement des polices Google Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });  



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Obtenir la locale actuelle à partir de next-international
  const locale = await getCurrentLocale();
  
  return <html lang={locale} suppressHydrationWarning>
   
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <PostHogProvider>
            <MyStatsig>      
                {children}
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
}