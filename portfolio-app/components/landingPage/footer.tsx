"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Newsletter } from "@/components/landingPage/newsletter"
import { useI18n } from "@/locales/client"
import { RiTiktokLine } from "react-icons/ri"
import { FiFacebook, FiLinkedin } from "react-icons/fi"
import { FaXTwitter } from "react-icons/fa6"
import { LuGithub } from "react-icons/lu"


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
            <Link href="https://github.com/LeMarechalDeFer" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="GitHub" className="rounded-full">
                <LuGithub className="h-5 w-5" />
              </Button>
            </Link>
              <Link href="https://www.linkedin.com/in/romain-blanchot-449941284/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="LinkedIn" className="rounded-full">
                  <FiLinkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:blanchot@et.esiea.fr">
                <Button variant="ghost" size="icon" aria-label="Email" className="rounded-full">
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://x.com/talleyrand1000" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="Twitter" className="rounded-full">
                  <FaXTwitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.tiktok.com/@romain.blanchot" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="TikTok" className="rounded-full">
                  <RiTiktokLine className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://web.facebook.com/people/Romain-Blanchot/pfbid034Hz3fp8rLVBXKJkS31RF8pCSVCVbN7zGtNZZR53GZmwHgyxizSupZj9J1Qact2Nzl/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="Facebook" className="rounded-full">
                  <FiFacebook className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.services.title")}</h3>
            <ul className="space-y-2">
              {/* <li>
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
              </li> */}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.resources.title")}</h3>
            <ul className="space-y-2">
              {/* <li>
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
              </li> */}
            </ul>
          </div>
          <div>
            <Newsletter />
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Romain. {t("footer.copyright")}</p>
          <div className="mt-2 space-x-4">
            {/* <Link href="/mentions-legales" className="hover:text-foreground">
              {t("footer.legal.terms")}
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-foreground">
              {t("footer.legal.privacy")}
            </Link>
            <Link href="/conditions-utilisation" className="hover:text-foreground">
              {t("footer.legal.conditions")}
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

