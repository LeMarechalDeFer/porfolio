import Skills from "@/components/landingPage/skills";
import { setStaticParamsLocale } from "next-international/server";

export default async function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <div className="pt-16 lg:pt-32">
      <Skills />
    </div>
  )
}
