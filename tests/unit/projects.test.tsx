import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("framer-motion", () => mocks.framerMotionMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("next/image", () => mocks.nextImageMock)
vi.mock("@/components/ui/button", () => mocks.buttonMock)
vi.mock("@/components/ui/card", () => mocks.cardMock)
vi.mock("@/components/ui/badge", () => mocks.badgeMock)

import Projects from "@/components/landingPage/projects"

describe("Projects", () => {
  it("renders the section with id='projects'", () => {
    const { container } = render(<Projects />)
    const section = container.querySelector("section#projects")
    expect(section).toBeInTheDocument()
  })

  it("renders a heading with 'projects.title'", () => {
    render(<Projects />)
    expect(screen.getByText("projects.title")).toBeInTheDocument()
  })

  it("renders featured project with 'projects.featured' badge", () => {
    render(<Projects />)
    expect(screen.getByText("projects.featured")).toBeInTheDocument()
  })

  it("renders 3 projects total (1 featured + 2 regular)", () => {
    render(<Projects />)
    expect(screen.getByText("projects.hotel.title")).toBeInTheDocument()
    expect(screen.getByText("projects.extraction.title")).toBeInTheDocument()
    expect(screen.getByText("projects.infrastructure.title")).toBeInTheDocument()
  })

  it("renders tags for featured project", () => {
    render(<Projects />)
    expect(screen.getByText("Next.js")).toBeInTheDocument()
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument()
    expect(screen.getByText("Framer Motion")).toBeInTheDocument()
    expect(screen.getByText("PDF Generation")).toBeInTheDocument()
  })

  it("renders tags for extraction project", () => {
    render(<Projects />)
    expect(screen.getByText("Python")).toBeInTheDocument()
    expect(screen.getByText("Selenium")).toBeInTheDocument()
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument()
    expect(screen.getByText("Docker")).toBeInTheDocument()
    expect(screen.getByText("ETL")).toBeInTheDocument()
  })

  it("renders tags for infrastructure project", () => {
    render(<Projects />)
    expect(screen.getByText("Infrastructure")).toBeInTheDocument()
    expect(screen.getByText("PXE")).toBeInTheDocument()
    expect(screen.getByText("iDRAC")).toBeInTheDocument()
    expect(screen.getByText("VLAN")).toBeInTheDocument()
    expect(screen.getByText("Monitoring")).toBeInTheDocument()
  })

  it("renders 'viewProject' button for featured project", () => {
    render(<Projects />)
    expect(screen.getByText("projects.viewProject")).toBeInTheDocument()
  })

  it("renders the featured project link pointing to hotel site", () => {
    render(<Projects />)
    const viewButton = screen.getByText("projects.viewProject")
    const link = viewButton.closest("a")
    expect(link).toHaveAttribute("href", "https://hotel-lalouisiane.com")
  })

  it("renders the featured project image", () => {
    render(<Projects />)
    const img = screen.getByRole("img", { name: "projects.hotel.title" })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", "/premierePage.jpg")
  })

  it("has expand/collapse button for challenges on featured project", () => {
    render(<Projects />)
    // There should be 3 challenge buttons (1 featured + 2 regular)
    const challengeButtons = screen.getAllByText("projects.defiSolution")
    expect(challengeButtons.length).toBe(3)
  })

  it("expands challenges when clicking the featured project expand button", () => {
    render(<Projects />)
    const expandButtons = screen.getAllByText("projects.defiSolution")
    // Click the first one (featured project)
    fireEvent.click(expandButtons[0])

    // After expanding, the challenges should be visible
    expect(screen.getByText("projects.hotel.challenges.1.challenge")).toBeInTheDocument()
    expect(screen.getByText("projects.hotel.challenges.1.solution")).toBeInTheDocument()
    expect(screen.getByText("projects.hotel.challenges.2.challenge")).toBeInTheDocument()
    expect(screen.getByText("projects.hotel.challenges.3.challenge")).toBeInTheDocument()
  })

  it("collapses challenges when clicking the expand button again", () => {
    render(<Projects />)
    const expandButtons = screen.getAllByText("projects.defiSolution")
    // Click to expand
    fireEvent.click(expandButtons[0])
    expect(screen.getByText("projects.hotel.challenges.1.challenge")).toBeInTheDocument()

    // Click the masquer button to collapse
    const collapseButton = screen.getByText("projects.masquer")
    fireEvent.click(collapseButton)

    // challenges should no longer be visible
    expect(screen.queryByText("projects.hotel.challenges.1.challenge")).not.toBeInTheDocument()
  })

  it("renders project descriptions", () => {
    render(<Projects />)
    expect(screen.getByText("projects.hotel.description")).toBeInTheDocument()
    expect(screen.getByText("projects.extraction.description")).toBeInTheDocument()
    expect(screen.getByText("projects.infrastructure.description")).toBeInTheDocument()
  })

  it("can expand challenges on regular projects independently", () => {
    render(<Projects />)
    const expandButtons = screen.getAllByText("projects.defiSolution")
    // Click the second one (first regular project: extraction)
    fireEvent.click(expandButtons[1])

    expect(screen.getByText("projects.extraction.challenges.1.challenge")).toBeInTheDocument()
    expect(screen.getByText("projects.extraction.challenges.2.challenge")).toBeInTheDocument()
    expect(screen.getByText("projects.extraction.challenges.3.challenge")).toBeInTheDocument()
  })
})
