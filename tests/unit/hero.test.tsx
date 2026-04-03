import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("next-international/server", () => mocks.nextInternationalServerMock)
vi.mock("@/locales/server", () => mocks.localesServerMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("@/components/ui/button", () => mocks.buttonSimpleMock)

vi.mock("@/components/landingPage/heroAnimated", () => ({
  default: () => <div data-testid="hero-animated">HeroAnimated</div>,
}))

vi.mock("lucide-react", () => ({
  Mail: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  CheckCircle: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/fa6", () => ({
  FaXTwitter: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/fi", () => ({
  FiFacebook: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  FiLinkedin: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/ri", () => ({
  RiTiktokLine: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/lu", () => ({
  LuGithub: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
  LuYoutube: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

vi.mock("react-icons/fa", () => ({
  FaInstagram: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}))

describe("Hero", () => {
  it("renders hero section with title and description", async () => {
    const { default: Hero } = await import("@/components/landingPage/hero")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Hero({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("hero.title")).toBeInTheDocument()
    expect(screen.getByText("hero.description")).toBeInTheDocument()
  })

  it("renders CTA buttons", async () => {
    const { default: Hero } = await import("@/components/landingPage/hero")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Hero({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("hero.cta.primary")).toBeInTheDocument()
    expect(screen.getByText("hero.cta.secondary")).toBeInTheDocument()
  })

  it("renders 4 feature items", async () => {
    const { default: Hero } = await import("@/components/landingPage/hero")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Hero({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("hero.feature.1")).toBeInTheDocument()
    expect(screen.getByText("hero.feature.2")).toBeInTheDocument()
    expect(screen.getByText("hero.feature.3")).toBeInTheDocument()
    expect(screen.getByText("hero.feature.4")).toBeInTheDocument()
  })

  it("renders social media links", async () => {
    const { default: Hero } = await import("@/components/landingPage/hero")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Hero({ params })
    render(element as React.ReactElement)

    expect(screen.getByLabelText("GitHub")).toBeInTheDocument()
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument()
    expect(screen.getByLabelText("TikTok")).toBeInTheDocument()
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument()
    expect(screen.getByLabelText("Youtube")).toBeInTheDocument()
  })

  it("renders HeroAnimated component", async () => {
    const { default: Hero } = await import("@/components/landingPage/hero")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Hero({ params })
    render(element as React.ReactElement)

    expect(screen.getByTestId("hero-animated")).toBeInTheDocument()
  })

  it("renders section with id='home'", async () => {
    const { default: Hero } = await import("@/components/landingPage/hero")
    const params = Promise.resolve({ locale: "fr" })
    const element = await Hero({ params })
    const { container } = render(element as React.ReactElement)

    expect(container.querySelector("section#home")).toBeInTheDocument()
  })
})
