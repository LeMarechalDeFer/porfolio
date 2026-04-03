import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("framer-motion", () => mocks.framerMotionMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("next/image", () => mocks.nextImageMock)
vi.mock("@/components/ui/card", () => mocks.cardMock)

import Services from "@/components/landingPage/services"

describe("Services", () => {
  it("renders the section with id='services'", () => {
    const { container } = render(<Services />)
    const section = container.querySelector("section#services")
    expect(section).toBeInTheDocument()
  })

  it("renders a heading with 'services.title'", () => {
    render(<Services />)
    expect(screen.getByText("services.title")).toBeInTheDocument()
  })

  it("renders 4 service cards", () => {
    render(<Services />)
    const titles = [
      "services.dev.title",
      "services.solutions.title",
      "services.ai.title",
      "services.deploy.title",
    ]
    for (const title of titles) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it("renders descriptions for each service", () => {
    render(<Services />)
    const descriptions = [
      "services.dev.description",
      "services.solutions.description",
      "services.ai.description",
      "services.deploy.description",
    ]
    for (const desc of descriptions) {
      expect(screen.getByText(desc)).toBeInTheDocument()
    }
  })

  it("renders all 4 service cards (Web Dev, Solutions, AI, Cloud/Deploy)", () => {
    render(<Services />)
    // All 4 titles should be present
    const allTitles = screen.getAllByRole("heading", { level: 3 })
    expect(allTitles).toHaveLength(4)
  })
})
