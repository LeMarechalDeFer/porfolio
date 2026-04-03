import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("next-international/server", () => mocks.nextInternationalServerMock)

vi.mock("@/locales/server", () => ({
  getI18n: vi.fn().mockResolvedValue((key: string) => key),
  getStaticParams: vi.fn().mockReturnValue([{ locale: "fr" }, { locale: "en" }]),
}))

vi.mock("@/locales/client", () => ({
  I18nProviderClient: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="i18n-provider">{children}</div>
  ),
}))

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}))

vi.mock("@/components/landingPage/header", () => ({
  default: () => <header data-testid="header">Header</header>,
}))

vi.mock("@/components/landingPage/footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

vi.mock("@/components/cookie-consent", () => ({
  CookieConsent: () => <div data-testid="cookie-consent">CookieConsent</div>,
}))

vi.mock("@/components/newsletter-popup", () => ({
  default: () => <div data-testid="newsletter-popup">NewsletterPopup</div>,
}))

vi.mock("@/components/ui/sonner", () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
}))

vi.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: () => null,
}))

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => null,
}))

vi.mock("@/components/landingPage/theme-provider", () => ({
  ThemeProvider: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}))

vi.mock("@/components/schema-dts", () => ({
  organizationSchema: {},
  personSchema: {},
  webSiteSchema: {},
}))

vi.mock("next/script", () => ({
  default: ({
    children,
    ...props
  }: { children?: React.ReactNode } & React.ScriptHTMLAttributes<HTMLScriptElement>) => (
    <script {...props}>{children}</script>
  ),
}))

vi.mock("@/components/my-statsig", () => ({
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="statsig">{children}</div>
  ),
}))

describe("RootLayout", () => {
  it("renders layout with children and all providers", async () => {
    const { default: RootLayout } = await import("@/app/[locale]/layout")
    const params = Promise.resolve({ locale: "fr" })
    const element = await RootLayout({
      params,
      children: <div data-testid="child">Child Content</div>,
    })
    render(element as React.ReactElement)

    expect(screen.getByTestId("theme-provider")).toBeInTheDocument()
    expect(screen.getByTestId("i18n-provider")).toBeInTheDocument()
    expect(screen.getByTestId("statsig")).toBeInTheDocument()
    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("footer")).toBeInTheDocument()
    expect(screen.getByTestId("child")).toBeInTheDocument()
    expect(screen.getByTestId("cookie-consent")).toBeInTheDocument()
    expect(screen.getByTestId("newsletter-popup")).toBeInTheDocument()
    expect(screen.getByTestId("toaster")).toBeInTheDocument()
  })

  it("generates static params for fr and en locales", async () => {
    const { generateStaticParams } = await import("@/app/[locale]/layout")
    const params = generateStaticParams()
    expect(params).toEqual([{ locale: "fr" }, { locale: "en" }])
  })

  it("generates metadata with correct title and description", async () => {
    const { generateMetadata } = await import("@/app/[locale]/layout")
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "fr" }),
    })

    expect(metadata.title).toEqual({
      default: "metadata.layout.title",
      template: "%s | metadata.layout.title",
    })
    expect(metadata.description).toBe("metadata.layout.description")
    expect(metadata.authors).toEqual([{ name: "Romain Blanchot" }])
    expect(metadata.creator).toBe("Romain Blanchot")
  })

  it("generates metadata with correct alternates for fr locale", async () => {
    const { generateMetadata } = await import("@/app/[locale]/layout")
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "fr" }),
    })

    expect(metadata.alternates?.canonical).toBe("https://www.romainblanchot.com")
  })

  it("generates metadata with correct alternates for en locale", async () => {
    const { generateMetadata } = await import("@/app/[locale]/layout")
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    })

    expect(metadata.alternates?.canonical).toBe("https://www.romainblanchot.com/en")
  })
})
