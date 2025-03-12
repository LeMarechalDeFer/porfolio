

import Hero from "@/components/landingPage/hero"
import Services from "@/components/landingPage/services"
import Skills from "@/components/landingPage/skills"
import Projects from "@/components/landingPage/projects"
import About from "@/components/landingPage/about"
import Contact from "@/components/landingPage/contact"
import NewsletterSection from "@/components/landingPage/newsletter-section"
import { getStaticParams } from "@/locales/server"
import { setStaticParamsLocale } from "next-international/server"


export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <NewsletterSection />
      <About />
      <Contact />
    </>
  )
}
