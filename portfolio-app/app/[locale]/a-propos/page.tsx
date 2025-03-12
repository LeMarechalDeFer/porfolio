import About from "@/components/landingPage/about";
import { setStaticParamsLocale } from "next-international/server";

export default async function APropos({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <div className="pt-16 lg:pt-20">
      <About />
    </div>
  )
}