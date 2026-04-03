import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("framer-motion", () => mocks.framerMotionMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("next/image", () => mocks.nextImageMock)
vi.mock("@/components/ui/button", () => mocks.buttonMock)
vi.mock("@/components/ui/card", () => mocks.cardMock)

// Mock ProjectForm
vi.mock("@/components/reservation/project-form", () => ({
  default: () => <div data-testid="project-form">ProjectForm</div>,
}))

import Contact from "@/components/landingPage/contact"

describe("Contact", () => {
  it("renders the section with id='contact'", () => {
    const { container } = render(<Contact />)
    const section = container.querySelector("section#contact")
    expect(section).toBeInTheDocument()
  })

  it("renders a heading with 'contact.title'", () => {
    render(<Contact />)
    expect(screen.getByText("contact.title")).toBeInTheDocument()
  })

  it("renders the 'contact.restons' subheading", () => {
    render(<Contact />)
    expect(screen.getByText("contact.restons")).toBeInTheDocument()
  })

  it("renders the 'contact.description' paragraph", () => {
    render(<Contact />)
    expect(screen.getByText("contact.description")).toBeInTheDocument()
  })

  it("renders 3 contact info items (email, phone, location)", () => {
    render(<Contact />)
    expect(screen.getByText("contact.info.email")).toBeInTheDocument()
    expect(screen.getByText("contact.info.phone")).toBeInTheDocument()
    expect(screen.getByText("contact.info.location")).toBeInTheDocument()
  })

  it("renders contact info values", () => {
    render(<Contact />)
    expect(screen.getByText("blanchot@et.esiea.fr")).toBeInTheDocument()
    expect(screen.getByText("+33 7 88 28 47 15")).toBeInTheDocument()
    expect(screen.getByText("Paris, France")).toBeInTheDocument()
  })

  it("renders contact info links with correct hrefs", () => {
    render(<Contact />)
    const emailLink = screen.getByText("blanchot@et.esiea.fr").closest("a")
    expect(emailLink).toHaveAttribute("href", "mailto:blanchot@et.esiea.fr")

    const phoneLink = screen.getByText("+33 7 88 28 47 15").closest("a")
    expect(phoneLink).toHaveAttribute("href", "tel:+33788284715")

    const locationLink = screen.getByText("Paris, France").closest("a")
    expect(locationLink).toHaveAttribute("href", "https://maps.google.com/?q=Paris,France")
  })

  it("renders 8 social media links (GitHub, LinkedIn, Instagram, Email, Twitter, TikTok, Facebook, Youtube)", () => {
    render(<Contact />)
    const socialLabels = [
      "GitHub",
      "LinkedIn",
      "Instagram",
      "Email",
      "Twitter",
      "TikTok",
      "Facebook",
      "Youtube",
    ]
    for (const label of socialLabels) {
      expect(screen.getByLabelText(label)).toBeInTheDocument()
    }
  })

  it("renders social links with correct URLs", () => {
    render(<Contact />)
    const links = screen.getAllByRole("link")
    const hrefs = links.map((link) => link.getAttribute("href"))

    expect(hrefs).toContain("https://github.com/LeMarechalDeFer")
    expect(hrefs).toContain("https://www.linkedin.com/in/romain-blanchot-449941284/")
    expect(hrefs).toContain("https://www.instagram.com/_romain_blanchot_/")
    expect(hrefs).toContain("mailto:blanchot@et.esiea.fr")
    expect(hrefs).toContain("https://x.com/talleyrand1000")
    expect(hrefs).toContain("https://www.tiktok.com/@romain.blanchot")
    expect(hrefs).toContain("https://www.youtube.com/@romainblanchot")
  })

  it("renders the ProjectForm component", () => {
    render(<Contact />)
    expect(screen.getByTestId("project-form")).toBeInTheDocument()
  })

  it("renders the 'Parlons de votre projet' card title", () => {
    render(<Contact />)
    expect(screen.getByText("Parlons de votre projet")).toBeInTheDocument()
  })

  it("renders the form description", () => {
    render(<Contact />)
    expect(screen.getByText("contact.form.description")).toBeInTheDocument()
  })
})
