
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, ArrowRight, CheckCircle  } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import { RiTiktokLine } from "react-icons/ri";
import { LuYoutube } from "react-icons/lu";
import { getI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import HeroAnimated from "./heroAnimated"


export default async function Hero({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 mt-10 "
    >
      <div className="container relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/demarrer-votre-projet" className="sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto min-w-[200px] min-h-[44px]">
                  {t("hero.cta.primary")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#projects" className="sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] min-h-[44px]">
                  {t("hero.cta.secondary")}
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 pt-4 ">
              {[
                { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.1") },
                { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.2") },
                { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.3") },
                { icon: <CheckCircle className="h-5 w-5 text-primary" />, text: t("hero.feature.4") },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-xs sm:text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroAnimated />  
        </div>
        <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap justify-center lg:justify-start gap-4 max-w-[280px] sm:max-w-none mx-auto">
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
          <Link href="https://www.youtube.com/@romainblanchot" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" aria-label="Youtube" className="rounded-full">
              <LuYoutube className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

