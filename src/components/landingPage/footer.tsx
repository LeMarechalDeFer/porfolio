import Link from "next/link"
import { Newsletter } from "@/components/landingPage/newsletter"
import { SocialLinks } from "@/components/social-links"
import { getI18n } from "@/locales/server"
import { setStaticParamsLocale } from "next-international/server"

export default async function Footer({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const t = await getI18n()
  const { locale } = await params
  setStaticParamsLocale(locale)

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-8 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t("footer.name")}</h2>
            <p className="text-muted-foreground text-sm">{t("footer.description")}</p>
            <SocialLinks
              variant="ghost"
              className="flex space-x-2"
              buttonClassName="rounded-full"
              include={["github", "linkedin", "email", "twitter", "tiktok", "facebook"]}
            />
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
        <div className="text-muted-foreground mt-12 border-t pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Romain. {t("footer.copyright")}
          </p>
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
            <Link href="/politique-de-confidentialite" className="hover:text-foreground">
              {t("footer.legal.privacy")}
            </Link>
            <Link href="/politique-cookies" className="hover:text-foreground">
              {t("footer.legal.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
