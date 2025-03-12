import MesServicesClient from "@/components/mes-services/mes-services"
import { setStaticParamsLocale } from "next-international/server";


export default async function MesServices({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return <MesServicesClient />
}

