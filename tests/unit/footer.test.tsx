import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("next-international/server", () => mocks.nextInternationalServerMock)
vi.mock("@/locales/server", () => mocks.localesServerMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("@/components/ui/button", () => mocks.buttonSimpleMock)

vi.mock("@/components/landingPage/newsletter", () => ({
  Newsletter: () => <div data-testid="newsletter">Newsletter</div>,
}))

vi.mock("lucide-react", () => ({
  Mail: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/ri", () => ({
  RiTiktokLine: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/fi", () => ({
  FiFacebook: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  FiLinkedin: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/fa6", () => ({
  FaXTwitter: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/lu", () => ({
  LuGithub: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  LuYoutube: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/fa", () => ({
  FaInstagram: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

describe("Footer", () => {
  it("renders footer with name and description", async () => {
    const { default: Footer } = await import("@/components/landingPage/footer")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Footer({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("footer.name")).toBeInTheDocument()
    expect(screen.getByText("footer.description")).toBeInTheDocument()
  })

  it("renders social media links", async () => {
    const { default: Footer } = await import("@/components/landingPage/footer")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Footer({ params })
    render(element as React.ReactElement)

    expect(screen.getByLabelText("GitHub")).toBeInTheDocument()
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument()
    expect(screen.getByLabelText("TikTok")).toBeInTheDocument()
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument()
  })

  it("renders services and resources sections", async () => {
    const { default: Footer } = await import("@/components/landingPage/footer")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Footer({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("footer.services.title")).toBeInTheDocument()
    expect(screen.getByText("footer.resources.title")).toBeInTheDocument()
  })

  it("renders newsletter component", async () => {
    const { default: Footer } = await import("@/components/landingPage/footer")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Footer({ params })
    render(element as React.ReactElement)

    expect(screen.getByTestId("newsletter")).toBeInTheDocument()
  })

  it("renders copyright and legal links", async () => {
    const { default: Footer } = await import("@/components/landingPage/footer")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Footer({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("footer.copyright", { exact: false })).toBeInTheDocument()
    expect(screen.getByText("footer.legal.privacy")).toBeInTheDocument()
    expect(screen.getByText("footer.legal.cookies")).toBeInTheDocument()
  })
})
