// /app/[locale]/politique-cookies/page.tsx

import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { getI18n } from "@/locales/server"
import { setStaticParamsLocale } from "next-international/server";


export const metadata: Metadata = {
  title: "Politique de Cookies | Romain - Développeur Web Freelance",
  description:
    "Politique de cookies détaillant l'utilisation des cookies et technologies similaires sur notre site web.",
}


export default async function PolitiqueCookies({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getI18n();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("politique-cookies.back-home")}
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">{t("politique-cookies.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {t("politique-cookies.last-update")} {new Date().toLocaleDateString("fr-FR")}
        </p>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("politique-cookies.section.1.title")}</h2>
            <p>
              {t("politique-cookies.section.1.p1")}
            </p>
            <p>
              {t("politique-cookies.section.1.p2")}
            </p>
            <p>
              {t("politique-cookies.section.1.p3")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("politique-cookies.section.2.title")}</h2>
            <p>
              {t("politique-cookies.section.2.p1")}
            </p>
            <p>
              {t("politique-cookies.section.2.p2")}
            </p>
            <p>
              {t("politique-cookies.section.2.p3")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("politique-cookies.section.3.title")}</h2>
            <p>
              {t("politique-cookies.section.3.p1")}
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.3.1.title")}</h3>
            <p>
              {t("politique-cookies.section.3.1.p1")}
            </p>
            <table className="min-w-full border border-gray-300 dark:border-gray-700 mb-4">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.name")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.provider")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.purpose")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.duration")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.1.row1.name")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.1.row1.provider")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {t("politique-cookies.table.3.1.row1.purpose")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.1.row1.duration")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.1.row2.name")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.1.row2.provider")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {t("politique-cookies.table.3.1.row2.purpose")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.1.row2.duration")}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.3.2.title")}</h3>
            <p>
              {t("politique-cookies.section.3.2.p1")}
            </p>
            <table className="min-w-full border border-gray-300 dark:border-gray-700 mb-4">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.name")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.provider")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.purpose")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.duration")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.2.row1.name")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.2.row1.provider")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {t("politique-cookies.table.3.2.row1.purpose")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.2.row1.duration")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.2.row2.name")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.2.row2.provider")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {t("politique-cookies.table.3.2.row2.purpose")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.2.row2.duration")}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.3.3.title")}</h3>
            <p>
              {t("politique-cookies.section.3.3.p1")}
            </p>
            <table className="min-w-full border border-gray-300 dark:border-gray-700 mb-4">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.name")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.provider")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.purpose")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.duration")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row1.name")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row1.provider")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {t("politique-cookies.table.3.3.row1.purpose")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row1.duration")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row2.name")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row2.provider")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {t("politique-cookies.table.3.3.row2.purpose")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row2.duration")}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row3.name")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row3.provider")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {t("politique-cookies.table.3.3.row3.purpose")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.3.row3.duration")}</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.3.4.title")}</h3>
            <p>
              {t("politique-cookies.section.3.4.p1")}
            </p>
            <table className="min-w-full border border-gray-300 dark:border-gray-700 mb-4">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.name")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.provider")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.purpose")}</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">{t("politique-cookies.table.header.duration")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.4.row1.name")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.4.row1.provider")}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    {t("politique-cookies.table.3.4.row1.purpose")}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{t("politique-cookies.table.3.4.row1.duration")}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("politique-cookies.section.4.title")}</h2>
            <p>
              {t("politique-cookies.section.4.p1")}
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.4.1.title")}</h3>
            <p>
              {t("politique-cookies.section.4.1.p1")}
            </p>
            <p>
              {t("politique-cookies.section.4.1.p2")}{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("politique-cookies.section.4.1.link")}
              </a>
              .
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.4.2.title")}</h3>
            <p>
              {t("politique-cookies.section.4.2.p1")}
            </p>
            <p>
              {t("politique-cookies.section.4.2.p2")}
            </p>
            <p>
              {t("politique-cookies.section.4.2.p3")}{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("politique-cookies.section.4.2.link")}
              </a>
              .
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.4.3.title")}</h3>
            <p>
              {t("politique-cookies.section.4.3.p1")}
            </p>
            <p>
              {t("politique-cookies.section.4.3.p2")}{" "}
              <a
                href="https://posthog.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("politique-cookies.section.4.3.link")}
              </a>
              .
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.4.4.title")}</h3>
            <p>
              {t("politique-cookies.section.4.4.p1")}
            </p>
            <p>
              {t("politique-cookies.section.4.4.p2")}{" "}
              <a
                href="https://resend.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("politique-cookies.section.4.4.link")}
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("politique-cookies.section.5.title")}</h2>
            <p>
              {t("politique-cookies.section.5.p1")}
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.5.1.title")}</h3>
            <p>
              {t("politique-cookies.section.5.1.p1")}
            </p>
            <p>{t("politique-cookies.section.5.1.p2")}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Chrome</strong> : {t("politique-cookies.section.5.1.li1")}
              </li>
              <li>
                <strong>Firefox</strong> : {t("politique-cookies.section.5.1.li2")}
              </li>
              <li>
                <strong>Safari</strong> : {t("politique-cookies.section.5.1.li3")}
              </li>
              <li>
                <strong>Edge</strong> : {t("politique-cookies.section.5.1.li4")}
              </li>
            </ul>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.5.2.title")}</h3>
            <p>
              {t("politique-cookies.section.5.2.p1")}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {" "}
                {t("politique-cookies.section.5.2.link")}
              </a>
              .
            </p>
            <p>
              {t("politique-cookies.section.5.2.p2")}{" "}
              <code>{t("politique-cookies.section.5.2.code")}</code>
              {" "}{t("politique-cookies.section.5.2.p3")}
            </p>

            <h3 className="text-lg font-medium mt-6 mb-3">{t("politique-cookies.section.5.3.title")}</h3>
            <p>
              {t("politique-cookies.section.5.3.p1")}
            </p>
            <p>
              {t("politique-cookies.section.5.3.p2")}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("politique-cookies.section.6.title")}</h2>
            <p>{t("politique-cookies.section.6.p1")}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>{t("politique-cookies.section.6.title.li1")}</strong> : {t("politique-cookies.section.6.li1")}
              </li>
              <li>
                <strong>{t("politique-cookies.section.6.title.li2")}</strong> : {t("politique-cookies.section.6.li2")}
              </li>
              <li>
                <strong>{t("politique-cookies.section.6.title.li3")}</strong> : {t("politique-cookies.section.6.li3")}
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("politique-cookies.section.7.title")}</h2>
            <p>
              {t("politique-cookies.section.7.p1")}
            </p>
            <p>{t("politique-cookies.section.7.p2")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t("politique-cookies.section.8.title")}</h2>
            <p>
              {t("politique-cookies.section.8.p1")}
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t("politique-cookies.section.8.li1")}</li>
              <li>{t("politique-cookies.section.8.li2")}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

