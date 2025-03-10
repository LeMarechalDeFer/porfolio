import { Html, Head, Preview, Tailwind, Body, Container, Section, Text, Link, Hr, Button } from "@react-email/components"
import * as React from 'react';
import { getI18n } from "@/locales/server";
import { ProjectFormSchema } from "@/lib/schema/schema.project-form";

export async function ProjectFormEmail(props: ProjectFormSchema) {
    const t = await getI18n();
    const {
        name,
        surname,
        email,
        company,
        sector,
        budget,
        timeline,
        mainObjective,
        projectIdea,
        targetAudience,
        expectedResults,
        technicalPreferences,
        otherDetails
    } = props;

    return (
        <Html>
            <Head />
            <Preview>{t("project-form.email.subject")}</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto p-4 max-w-[600px]">
                        <Section className="bg-white rounded-lg p-6 shadow-md">
                            {/* Header */}
                            <Section className="text-center mb-8">
                                <Text className="text-3xl font-bold text-blue-600 mb-2">
                                    {t("project-form.email.header")}
                                </Text>
                                <Text className="text-gray-700">
                                    {t("project-form.email.greeting")} {name} !
                                </Text>
                            </Section>

                            <Text className="text-gray-700 mb-6">
                                {t("project-form.email.intro")}
                            </Text>

                            {/* What happens next */}
                            <Section className="mb-8">
                                <Text className="text-xl font-bold text-blue-600 mb-3">
                                    {t("project-form.email.next.title")}
                                </Text>

                                <Text className="text-gray-700 mb-2">
                                    <strong>1️⃣ {t("project-form.email.next.step1.title")}</strong>: {t("project-form.email.next.step1.desc")}
                                </Text>
                                <Text className="text-gray-700 mb-2">
                                    <strong>2️⃣ {t("project-form.email.next.step2.title")}</strong>: {t("project-form.email.next.step2.desc")}
                                </Text>
                                <Text className="text-gray-700 mb-4">
                                    <strong>3️⃣ {t("project-form.email.next.step3.title")}</strong>: {t("project-form.email.next.step3.desc")}
                                </Text>
                            </Section>

                            {/* Project Summary */}
                            <Section className="mb-8 bg-gray-50 p-4 rounded border border-gray-200">
                                <Text className="text-xl font-bold text-blue-600 mb-4">
                                    {t("project-form.email.summary.title")}
                                </Text>

                                <Section className="mb-2">
                                    <Text className="text-gray-700 mb-1">
                                        <strong>{t("project-form.name")}</strong>: {name} {surname}
                                    </Text>
                                    <Text className="text-gray-700 mb-1">
                                        <strong>{t("project-form.email")}</strong>: {email}
                                    </Text>
                                    <Text className="text-gray-700 mb-1">
                                        <strong>{t("project-form.company")}</strong>: {company}
                                    </Text>
                                    <Text className="text-gray-700 mb-1">
                                        <strong>{t("project-form.sector")}</strong>: {sector}
                                    </Text>
                                </Section>

                                <Hr className="my-4 border-gray-300" />

                                <Section className="mb-2">
                                    <Text className="text-gray-700 mb-1">
                                        <strong>{t("project-form.budget")}</strong>: {budget}
                                    </Text>
                                    <Text className="text-gray-700 mb-1">
                                        <strong>{t("project-form.timeline")}</strong>: {timeline}
                                    </Text>
                                </Section>

                                <Hr className="my-4 border-gray-300" />

                                <Section className="mb-2">
                                    <Text className="text-gray-700 mb-3">
                                        <strong>{t("project-form.mainObjective")}</strong>:
                                    </Text>
                                    <Text className="text-gray-700 bg-white p-3 rounded border border-gray-200 mb-3">
                                        {mainObjective}
                                    </Text>

                                    <Text className="text-gray-700 mb-3">
                                        <strong>{t("project-form.projectIdea")}</strong>:
                                    </Text>
                                    <Text className="text-gray-700 bg-white p-3 rounded border border-gray-200 mb-3">
                                        {projectIdea}
                                    </Text>

                                    <Text className="text-gray-700 mb-3">
                                        <strong>{t("project-form.targetAudience")}</strong>:
                                    </Text>
                                    <Text className="text-gray-700 bg-white p-3 rounded border border-gray-200 mb-3">
                                        {targetAudience}
                                    </Text>

                                    <Text className="text-gray-700 mb-3">
                                        <strong>{t("project-form.expectedResults")}</strong>:
                                    </Text>
                                    <Text className="text-gray-700 bg-white p-3 rounded border border-gray-200 mb-3">
                                        {expectedResults}
                                    </Text>

                                    {technicalPreferences && (
                                        <>
                                            <Text className="text-gray-700 mb-3">
                                                <strong>{t("project-form.technicalPreferences")}</strong>:
                                            </Text>
                                            <Text className="text-gray-700 bg-white p-3 rounded border border-gray-200 mb-3">
                                                {technicalPreferences}
                                            </Text>
                                        </>
                                    )}

                                    {otherDetails && (
                                        <>
                                            <Text className="text-gray-700 mb-3">
                                                <strong>{t("project-form.otherDetails")}</strong>:
                                            </Text>
                                            <Text className="text-gray-700 bg-white p-3 rounded border border-gray-200">
                                                {otherDetails}
                                            </Text>
                                        </>
                                    )}
                                </Section>
                            </Section>

                            {/* Website Link */}
                            <Section className="mb-8 text-center">
                                <Text className="text-gray-700 mb-4">
                                    {t("project-form.email.website.intro")}
                                </Text>
                                <Button
                                    href="https://www.romainblanchot.com"
                                    className="bg-blue-600 text-white font-bold px-6 py-3 rounded shadow-md hover:bg-blue-700 transition-colors"
                                >
                                    {t("project-form.email.website.button")}
                                </Button>
                            </Section>

                            {/* Footer */}
                            <Hr className="my-6 border-gray-300" />
                            <Section>
                                <Text className="text-gray-700 mb-2">
                                    {t("project-form.email.footer.replyText")}
                                </Text>
                                <Text className="text-gray-700 mb-6">
                                    {t("project-form.email.footer.salutation")}
                                </Text>
                                <Text className="text-gray-700 font-bold">
                                    Romain Blanchot
                                </Text>
                                <Text className="text-gray-700">
                                    💼 {t("project-form.email.footer.title")}
                                </Text>
                                <Link href="https://www.romainblanchot.com" className="text-blue-600 underline">
                                    🌐 www.romainblanchot.com
                                </Link>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
