import type { Metadata } from "next"
import { getI18n } from "@/locales/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()
  
  // Utilisation directe des clés de traduction comme littéraux
  const title = t("mes-services.title") as string
  const subtitle = t("mes-services.subtitle") as string
  
  return {
    title: `${title} | Romain Blanchot`,
    description: subtitle,
    openGraph: {
      title: `${title} | Romain Blanchot`,
      description: subtitle,
      url: "/mes-services",
      siteName: "Romain Blanchot",
      locale: "fr_FR",
      type: "website",
    },
  }
}

export default function MesServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-background min-h-screen">
      <div className="mx-auto">
        {children}
      </div>
    </section>
  )
}