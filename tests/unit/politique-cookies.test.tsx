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

describe("PolitiqueCookies", () => {
  it("renders page title", async () => {
    const { default: PolitiqueCookies } = await import("@/app/[locale]/politique-cookies/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await PolitiqueCookies({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("politique-cookies.title")).toBeInTheDocument()
  })

  it("renders back home link", async () => {
    const { default: PolitiqueCookies } = await import("@/app/[locale]/politique-cookies/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await PolitiqueCookies({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("politique-cookies.back-home")).toBeInTheDocument()
  })

  it("renders all 8 main sections", async () => {
    const { default: PolitiqueCookies } = await import("@/app/[locale]/politique-cookies/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await PolitiqueCookies({ params })
    render(element as React.ReactElement)

    for (let i = 1; i <= 8; i++) {
      expect(screen.getByText(`politique-cookies.section.${i}.title`)).toBeInTheDocument()
    }
  })

  it("renders cookie tables", async () => {
    const { default: PolitiqueCookies } = await import("@/app/[locale]/politique-cookies/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await PolitiqueCookies({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("politique-cookies.table.3.1.row1.name")).toBeInTheDocument()
    expect(screen.getByText("politique-cookies.table.3.2.row1.name")).toBeInTheDocument()
    expect(screen.getByText("politique-cookies.table.3.3.row1.name")).toBeInTheDocument()
    expect(screen.getByText("politique-cookies.table.3.4.row1.name")).toBeInTheDocument()
  })

  it("renders external policy links", async () => {
    const { default: PolitiqueCookies } = await import("@/app/[locale]/politique-cookies/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await PolitiqueCookies({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("politique-cookies.section.4.1.link")).toBeInTheDocument()
    expect(screen.getByText("politique-cookies.section.4.2.link")).toBeInTheDocument()
    expect(screen.getByText("politique-cookies.section.4.3.link")).toBeInTheDocument()
  })
})
