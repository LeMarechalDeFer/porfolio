import Header from "@/components/landingPage/header"
import Hero from "@/components/landingPage/hero"
import Services from "@/components/landingPage/services"
import Skills from "@/components/landingPage/skills"
import Projects from "@/components/landingPage/projects"
import About from "@/components/landingPage/about"
import Contact from "@/components/landingPage/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}

