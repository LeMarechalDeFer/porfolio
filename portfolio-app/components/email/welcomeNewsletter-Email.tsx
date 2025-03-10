import { Html, Head, Preview, Tailwind, Body, Container, Section, Text, Link, Img, Hr, Button } from "@react-email/components"
import * as React from 'react';
import { getI18n } from "@/locales/server";
// import photoProfilRomain from "@/public/photoProfilRomain.jpg";
// import { newsletterSchema, NewsletterSchemaType } from "@/lib/schema/schema.newsletter";

type WelcomeNewsletterProps = {
  email: string;
  language?: string;
}

export async function WelcomeNewsletter(props: WelcomeNewsletterProps) {
  const { email } = props;
  const t = await getI18n();
  
  return (
    <Html>
      <Head />
      <Preview>{t("newsletter.email.previewText")}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded-lg bg-white p-8 shadow-lg">
            {/* En-tête avec logo et couleur d'accent */}
            <Section className="bg-indigo-600 rounded-t-lg p-6 text-center">
            <Img
              src="https://www.romainblanchot.com/photoProfilRomain.jpg" 
              alt="Romain Blanchot"
              width="100"
              height="100"
              className="mx-auto rounded-full border-4 border-white mb-4"
            />
              <Text className="text-2xl font-bold text-white mb-2">{t("newsletter.email.header")}</Text>
              <Text className="text-white opacity-90">{t("newsletter.email.tagline")}</Text>
            </Section>
            
            {/* Message de bienvenue personnalisé */}
            <Section className="mt-8 px-4">
              <Text className="text-lg font-bold text-gray-800">{t("newsletter.email.greeting")} {email.split('@')[0]} ! 👋</Text>
              <Text className="text-xl font-bold text-indigo-600 mt-4 mb-4">{t("newsletter.email.welcomeMessage")} 🎉</Text>
              <Text className="text-gray-600 mb-6">{t("newsletter.email.description")}</Text>
            </Section>
            
            {/* Contenu de la newsletter */}
            <Section className="bg-gray-50 p-6 rounded-md my-6">
              <Text className="text-lg font-bold text-gray-800 mb-4">{t("newsletter.email.whatToExpect")}</Text>
              
              <div className="mb-4">
                <Text className="text-indigo-600 font-medium mb-1">📌 {t("newsletter.email.content.1.title")}</Text>
                <Text className="text-gray-600 text-sm">{t("newsletter.email.content.1.description")}</Text>
              </div>
              
              <div className="mb-4">
                <Text className="text-indigo-600 font-medium mb-1">📌 {t("newsletter.email.content.2.title")}</Text>
                <Text className="text-gray-600 text-sm">{t("newsletter.email.content.2.description")}</Text>
              </div>
              
              <div className="mb-4">
                <Text className="text-indigo-600 font-medium mb-1">📌 {t("newsletter.email.content.3.title")}</Text>
                <Text className="text-gray-600 text-sm">{t("newsletter.email.content.3.description")}</Text>
              </div>
              
              <div>
                <Text className="text-indigo-600 font-medium mb-1">📌 {t("newsletter.email.content.4.title")}</Text>
                <Text className="text-gray-600 text-sm">{t("newsletter.email.content.4.description")}</Text>
              </div>
            </Section>
            
            {/* Services et appel à l'action */}
            <Section className="my-8 text-center">
              <Text className="text-lg font-bold text-gray-800 mb-4">{t("newsletter.email.services.title")}</Text>
              <Text className="text-gray-600 mb-6">{t("newsletter.email.services.description")}</Text>
              <Button
                className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-md no-underline"
                href="https://www.romainblanchot.com/services"
              >
                {t("newsletter.email.services.cta")}
              </Button>
            </Section>
            
            <Hr className="border-t border-gray-200 my-6" />
            
            {/* Signature */}
            <Section>
              <Text className="text-gray-600">
                {t("newsletter.email.signoff")}
              </Text>
              <Text className="font-bold text-gray-800 mt-4">🚀 Romain Blanchot</Text>
              <Text className="text-gray-600">💼 {t("newsletter.email.jobTitle")}</Text>
              <Link href="https://www.romainblanchot.com" className="text-indigo-600 no-underline">
                🌐 www.romainblanchot.com
              </Link>
            </Section>
            
            {/* Astuce et pied de page */}
            <Section className="mt-6 bg-gray-50 p-4 rounded-md text-sm text-gray-500">
              <Text>
                📩 {t("newsletter.email.tip")}
              </Text>
            </Section>
            
            <Section className="mt-8 border-t border-gray-200 pt-6">
              <Text className="text-sm text-gray-500 text-center">
                <Link href="#" className="text-indigo-600 underline mr-4">{t("newsletter.email.unsubscribe")}</Link>
                <Link href="mailto:romainblanchot@gmail.com" className="text-indigo-600 underline">{t("newsletter.email.contactUs")}</Link>
              </Text>
              <Text className="text-xs text-gray-400 text-center mt-4">
                {t("newsletter.email.copyright")}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// Export pour Resend
export default WelcomeNewsletter;



