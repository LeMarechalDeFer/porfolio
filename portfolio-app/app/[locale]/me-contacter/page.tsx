import Contact from "@/components/landingPage/contact"
import { setStaticParamsLocale } from "next-international/server";

export default async function MeContacter({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <div className="pt-10 ">
      <Contact />
    </div>
  )
}