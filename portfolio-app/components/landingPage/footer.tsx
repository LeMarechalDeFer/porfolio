"use client"

import { Linkedin, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Newsletter } from "@/components/landingPage/newsletter"
import { useI18n } from "@/locales/client"


export default function Footer() {
  const t = useI18n()
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 md:py-16 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("footer.name")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
            <div className="flex space-x-2">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:contact@example.com">
                <Button variant="ghost" size="icon" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.services.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/developpement-web"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("footer.services.development")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/solutions-end-to-end"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("footer.services.solutions")}
                </Link>
              </li>
              <li>
                <Link href="/services/integration-ia" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("footer.services.ai")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/optimisation-performance"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("footer.services.performance")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.resources.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("footer.resources.blog")}
                </Link>
              </li>
              <li>
                <Link href="/projets" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("footer.resources.projects")}
                </Link>
              </li>
              <li>
                <Link href="/temoignages" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("footer.resources.testimonials")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("footer.resources.faq")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Newsletter />
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Romain. {t("footer.copyright")}</p>
          <div className="mt-2 space-x-4">
            <Link href="/mentions-legales" className="hover:text-foreground">
              {t("footer.legal.terms")}
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-foreground">
              {t("footer.legal.privacy")}
            </Link>
            <Link href="/conditions-utilisation" className="hover:text-foreground">
              {t("footer.legal.conditions")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

