import {
  Html,
  Head,
  Preview,
  Tailwind,
  Body,
  Container,
  Section,
  Text,
  Link,
  Img,
  Hr,
  Button,
} from "@react-email/components"
import * as React from "react"
import { getI18n } from "@/locales/server"
import { setStaticParamsLocale } from "next-international/server"

type WelcomeNewsletterProps = {
  email: string
  language: string
}

export async function WelcomeNewsletter(props: WelcomeNewsletterProps) {
  const { email, language } = props
  setStaticParamsLocale(language)
  const t = await getI18n()

  return (
    <Html>
      <Head />
      <Preview>{t("newsletter.email.previewText")}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white p-8 shadow-lg">
            {/* En-tête avec logo et couleur d'accent */}
            <Section className="rounded-t-lg bg-indigo-600 p-6 text-center">
              <Img
                src="https://www.romainblanchot.com/photoProfilRomain.jpg"
                alt="Romain Blanchot"
                width="100"
                height="100"
                className="mx-auto mb-4 rounded-full border-4 border-white"
              />
              <Text className="mb-2 text-2xl font-bold text-white">
                {t("newsletter.email.header")}
              </Text>
              <Text className="text-white opacity-90">{t("newsletter.email.tagline")}</Text>
            </Section>

            {/* Message de bienvenue personnalisé */}
            <Section className="mt-8 px-4">
              <Text className="text-lg font-bold text-gray-800">
                {t("newsletter.email.greeting")} {email.split("@")[0]} ! 👋
              </Text>
              <Text className="mt-4 mb-4 text-xl font-bold text-indigo-600">
                {t("newsletter.email.welcomeMessage")} 🎉
              </Text>
              <Text className="mb-6 text-gray-600">{t("newsletter.email.description")}</Text>
            </Section>

            {/* Contenu de la newsletter */}
            <Section className="my-6 rounded-md bg-gray-50 p-6">
              <Text className="mb-4 text-lg font-bold text-gray-800">
                {t("newsletter.email.whatToExpect")}
              </Text>

              <div className="mb-4">
                <Text className="mb-1 font-medium text-indigo-600">
                  📌 {t("newsletter.email.content.1.title")}
                </Text>
                <Text className="text-sm text-gray-600">
                  {t("newsletter.email.content.1.description")}
                </Text>
              </div>

              <div className="mb-4">
                <Text className="mb-1 font-medium text-indigo-600">
                  📌 {t("newsletter.email.content.2.title")}
                </Text>
                <Text className="text-sm text-gray-600">
                  {t("newsletter.email.content.2.description")}
                </Text>
              </div>

              <div className="mb-4">
                <Text className="mb-1 font-medium text-indigo-600">
                  📌 {t("newsletter.email.content.3.title")}
                </Text>
                <Text className="text-sm text-gray-600">
                  {t("newsletter.email.content.3.description")}
                </Text>
              </div>

              <div>
                <Text className="mb-1 font-medium text-indigo-600">
                  📌 {t("newsletter.email.content.4.title")}
                </Text>
                <Text className="text-sm text-gray-600">
                  {t("newsletter.email.content.4.description")}
                </Text>
              </div>
            </Section>

            {/* Services et appel à l'action */}
            <Section className="my-8 text-center">
              <Text className="mb-4 text-lg font-bold text-gray-800">
                {t("newsletter.email.services.title")}
              </Text>
              <Text className="mb-6 text-gray-600">
                {t("newsletter.email.services.description")}
              </Text>
              <Button
                className="rounded-md bg-indigo-600 px-6 py-3 font-bold text-white no-underline"
                href="https://www.romainblanchot.com/services"
              >
                {t("newsletter.email.services.cta")}
              </Button>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Signature */}
            <Section>
              <Text className="text-gray-600">{t("newsletter.email.signoff")}</Text>
              <Text className="mt-4 font-bold text-gray-800">🚀 Romain Blanchot</Text>
              <Text className="text-gray-600">💼 {t("newsletter.email.jobTitle")}</Text>
              <Link href="https://www.romainblanchot.com" className="text-indigo-600 no-underline">
                🌐 www.romainblanchot.com
              </Link>
            </Section>

            {/* Astuce et pied de page */}
            <Section className="mt-6 rounded-md bg-gray-50 p-4 text-sm text-gray-500">
              <Text>📩 {t("newsletter.email.tip")}</Text>
            </Section>

            <Section className="mt-8 border-t border-gray-200 pt-6">
              <Text className="text-center text-sm text-gray-500">
                <Link href="#" className="mr-4 text-indigo-600 underline">
                  {t("newsletter.email.unsubscribe")}
                </Link>
                <Link href="mailto:romainblanchot@gmail.com" className="text-indigo-600 underline">
                  {t("newsletter.email.contactUs")}
                </Link>
              </Text>
              <Text className="mt-4 text-center text-xs text-gray-400">
                {t("newsletter.email.copyright")}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

// Export pour Resend
export default WelcomeNewsletter
