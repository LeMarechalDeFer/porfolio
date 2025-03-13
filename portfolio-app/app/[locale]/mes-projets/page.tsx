import Projects from "@/components/landingPage/projects";
import { setStaticParamsLocale } from "next-international/server";

export default async function MesProjets({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <div className="pt-10">
      <Projects />
    </div>
  )
}
