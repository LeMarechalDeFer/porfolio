import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

// Mock server-side i18n
vi.mock("next-international/server", () => mocks.nextInternationalServerMock)

vi.mock("@/locales/server", () => ({
  getI18n: vi.fn().mockResolvedValue((key: string) => key),
  getStaticParams: vi.fn().mockReturnValue([{ locale: "fr" }, { locale: "en" }]),
}))

// Mock all child components to isolate page-level logic
vi.mock("@/components/landingPage/hero", () => ({
  default: () => <div data-testid="hero">Hero</div>,
}))
vi.mock("@/components/landingPage/services", () => ({
  default: () => <div data-testid="services">Services</div>,
}))
vi.mock("@/components/landingPage/skills", () => ({
  default: () => <div data-testid="skills">Skills</div>,
}))
vi.mock("@/components/landingPage/projects", () => ({
  default: () => <div data-testid="projects">Projects</div>,
}))
vi.mock("@/components/landingPage/about", () => ({
  default: () => <div data-testid="about">About</div>,
}))
vi.mock("@/components/landingPage/contact", () => ({
  default: () => <div data-testid="contact">Contact</div>,
}))
vi.mock("@/components/landingPage/newsletter-section", () => ({
  default: () => <div data-testid="newsletter-section">Newsletter</div>,
}))
vi.mock("@/components/mes-services/mes-services", () => ({
  default: () => <div data-testid="mes-services-client">MesServicesClient</div>,
}))

describe("Home page", () => {
  it("renders all sections", async () => {
    const { default: Home } = await import("@/app/[locale]/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Home({ params })
    const { getByTestId } = render(element as React.ReactElement)

    expect(getByTestId("services")).toBeInTheDocument()
    expect(getByTestId("skills")).toBeInTheDocument()
    expect(getByTestId("projects")).toBeInTheDocument()
    expect(getByTestId("about")).toBeInTheDocument()
    expect(getByTestId("contact")).toBeInTheDocument()
    expect(getByTestId("newsletter-section")).toBeInTheDocument()
  })
})

describe("A-propos page", () => {
  it("renders About component", async () => {
    const { default: APropos } = await import("@/app/[locale]/a-propos/page")
    const element = await APropos()
    const { getByTestId } = render(element as React.ReactElement)
    expect(getByTestId("about")).toBeInTheDocument()
  })
})

describe("Me-contacter page", () => {
  it("renders Contact component", async () => {
    const { default: MeContacter } = await import("@/app/[locale]/me-contacter/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await MeContacter({ params })
    const { getByTestId } = render(element as React.ReactElement)
    expect(getByTestId("contact")).toBeInTheDocument()
  })
})

describe("Mes-competences page", () => {
  it("renders Skills component", async () => {
    const { default: SkillsPage } = await import("@/app/[locale]/mes-competences/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await SkillsPage({ params })
    const { getByTestId } = render(element as React.ReactElement)
    expect(getByTestId("skills")).toBeInTheDocument()
  })
})

describe("Mes-projets page", () => {
  it("renders Projects component", async () => {
    const { default: MesProjets } = await import("@/app/[locale]/mes-projets/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await MesProjets({ params })
    const { getByTestId } = render(element as React.ReactElement)
    expect(getByTestId("projects")).toBeInTheDocument()
  })
})

describe("Mes-services page", () => {
  it("renders MesServicesClient component", async () => {
    const { default: MesServices } = await import("@/app/[locale]/mes-services/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await MesServices({ params })
    const { getByTestId } = render(element as React.ReactElement)
    expect(getByTestId("mes-services-client")).toBeInTheDocument()
  })
})

describe("Mes-services layout", () => {
  it("renders children in a section", async () => {
    const { default: MesServicesLayout } = await import("@/app/[locale]/mes-services/layout")
    const { getByText } = render(
      <MesServicesLayout>
        <div>Test content</div>
      </MesServicesLayout>,
    )
    expect(getByText("Test content")).toBeInTheDocument()
  })

  it("exports generateMetadata", async () => {
    const { generateMetadata } = await import("@/app/[locale]/mes-services/layout")
    const metadata = await generateMetadata()
    expect(metadata.title).toContain("Romain Blanchot")
    expect(metadata.openGraph).toBeDefined()
  })
})
