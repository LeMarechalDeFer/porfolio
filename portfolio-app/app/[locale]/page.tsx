import Hero from "@/components/landingPage/hero"
import Services from "@/components/landingPage/services"
import Skills from "@/components/landingPage/skills"
import Projects from "@/components/landingPage/projects"
import About from "@/components/landingPage/about"
import Contact from "@/components/landingPage/contact"
import { organizationSchema, personSchema } from "@/components/schema-dts"
import Script from "next/script"

export default function Home() {
  return (
    <>

    

        <Hero />
        <Services />
        <Skills />
        <Projects />
        <About />
        <Contact />
      

    </>
  )
}
