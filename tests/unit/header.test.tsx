import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("framer-motion", () => mocks.framerMotionMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("next/image", () => mocks.nextImageMock)
vi.mock("next-themes", () => mocks.nextThemesMock)
vi.mock("@/components/ui/button", () => mocks.buttonMock)
vi.mock("@/components/ui/dropdown-menu", () => mocks.dropdownMenuMock)

import Header from "@/components/landingPage/header"

describe("Header", () => {
  it("initially returns null (mounted = false), then renders after mount", () => {
    const { container } = render(<Header />)
    expect(container.querySelector("header")).toBeInTheDocument()
  })

  it("renders the 'Romain' brand link", () => {
    render(<Header />)
    const brandLink = screen.getByText("Romain")
    expect(brandLink).toBeInTheDocument()
    expect(brandLink.closest("a")).toHaveAttribute("href", "/")
  })

  it("renders 7 navigation items", () => {
    render(<Header />)
    const navItems = [
      "nav.home",
      "nav.skills",
      "nav.projects",
      "nav.about",
      "nav.contact",
      "nav.services",
      "nav.demarer-votre-projet",
    ]
    for (const navItem of navItems) {
      const elements = screen.getAllByText(navItem)
      expect(elements.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("renders navigation links with correct hrefs", () => {
    render(<Header />)
    const expectedLinks = [
      { text: "nav.home", href: "/" },
      { text: "nav.skills", href: "/mes-competences" },
      { text: "nav.projects", href: "/mes-projets" },
      { text: "nav.about", href: "/a-propos" },
      { text: "nav.contact", href: "/me-contacter" },
      { text: "nav.services", href: "/mes-services" },
      { text: "nav.demarer-votre-projet", href: "/demarrer-votre-projet" },
    ]

    for (const { text, href } of expectedLinks) {
      const elements = screen.getAllByText(text)
      const link = elements[0].closest("a")
      expect(link).toHaveAttribute("href", href)
    }
  })

  it("has theme toggle button with sr-only text", () => {
    render(<Header />)
    const themeButtons = screen.getAllByText("header.theme")
    expect(themeButtons.length).toBeGreaterThanOrEqual(1)
  })

  it("has language dropdown with language options", () => {
    render(<Header />)
    expect(screen.getByText("header.language")).toBeInTheDocument()
    expect(screen.getByText("Fran\u00e7ais")).toBeInTheDocument()
    expect(screen.getByText("English")).toBeInTheDocument()
  })

  it("has mobile menu button", () => {
    render(<Header />)
    const menuButton = screen.getByLabelText("Ouvrir le menu")
    expect(menuButton).toBeInTheDocument()
  })

  it("toggles mobile menu when clicking the menu button", () => {
    render(<Header />)
    const menuButton = screen.getByLabelText("Ouvrir le menu")

    fireEvent.click(menuButton)

    const closeButton = screen.getByLabelText("Fermer le menu")
    expect(closeButton).toBeInTheDocument()

    const mobileMenu = document.getElementById("mobile-menu")
    expect(mobileMenu).toBeInTheDocument()
  })

  it("closes mobile menu when clicking the close button", () => {
    render(<Header />)
    const menuButton = screen.getByLabelText("Ouvrir le menu")

    fireEvent.click(menuButton)
    expect(document.getElementById("mobile-menu")).toBeInTheDocument()

    const closeButton = screen.getByLabelText("Fermer le menu")
    fireEvent.click(closeButton)
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument()
  })

  it("closes mobile menu when clicking a navigation link", () => {
    render(<Header />)
    const menuButton = screen.getByLabelText("Ouvrir le menu")

    fireEvent.click(menuButton)
    expect(document.getElementById("mobile-menu")).toBeInTheDocument()

    const mobileMenu = document.getElementById("mobile-menu")!
    const navLinks = mobileMenu.querySelectorAll("a")
    fireEvent.click(navLinks[0])

    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument()
  })

  it("renders language buttons in mobile menu", () => {
    render(<Header />)
    const menuButton = screen.getByLabelText("Ouvrir le menu")
    fireEvent.click(menuButton)

    expect(screen.getByText("FR")).toBeInTheDocument()
    expect(screen.getByText("EN")).toBeInTheDocument()
  })

  it("has aria-expanded attribute on mobile menu button", () => {
    render(<Header />)
    const menuButton = screen.getByLabelText("Ouvrir le menu")
    expect(menuButton).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(menuButton)
    const closeButton = screen.getByLabelText("Fermer le menu")
    expect(closeButton).toHaveAttribute("aria-expanded", "true")
  })
})
