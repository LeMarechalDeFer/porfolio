import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("next-international/server", () => mocks.nextInternationalServerMock)
vi.mock("@/locales/server", () => mocks.localesServerMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("@/components/ui/button", () => mocks.buttonSimpleAsChildMock)

vi.mock("lucide-react", () => ({
  ArrowLeft: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

describe("PolitiqueDeConfidentialite", () => {
  it("renders page title", async () => {
    const { default: Page } = await import("@/app/[locale]/politique-de-confidentialite/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Page({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("politique-de-confidentialite.title")).toBeInTheDocument()
  })

  it("renders back home link", async () => {
    const { default: Page } = await import("@/app/[locale]/politique-de-confidentialite/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Page({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("politique-de-confidentialite.back-home")).toBeInTheDocument()
  })

  it("renders all 13 sections", async () => {
    const { default: Page } = await import("@/app/[locale]/politique-de-confidentialite/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Page({ params })
    render(element as React.ReactElement)

    for (let i = 1; i <= 13; i++) {
      expect(
        screen.getByText(`politique-de-confidentialite.section.${i}.title`),
      ).toBeInTheDocument()
    }
  })

  it("renders cookie policy link in section 11", async () => {
    const { default: Page } = await import("@/app/[locale]/politique-de-confidentialite/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Page({ params })
    render(element as React.ReactElement)

    const cookieLink = screen.getByText("politique-de-confidentialite.section.11.cookie-policy")
    expect(cookieLink.closest("a")).toHaveAttribute("href", "/politique-cookies")
  })
})
