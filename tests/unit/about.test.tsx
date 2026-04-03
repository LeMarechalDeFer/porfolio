import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMinimalMock)
vi.mock("framer-motion", () => mocks.framerMotionMinimalMock)
vi.mock("next/image", () => mocks.nextImageNoPlaceholderMock)

vi.mock("@/public/alpinismeRomain.jpg", () => ({
  default: "/alpinismeRomain.jpg",
}))

import About from "@/components/landingPage/about"

describe("About", () => {
  it("renders section with id 'about'", () => {
    const { container } = render(<About />)
    expect(container.querySelector("#about")).toBeTruthy()
  })

  it("renders title", () => {
    render(<About />)
    expect(screen.getByText("about.title")).toBeInTheDocument()
  })

  it("renders description paragraphs", () => {
    render(<About />)
    expect(screen.getByText("about.description")).toBeInTheDocument()
    expect(screen.getByText("about.description2")).toBeInTheDocument()
    expect(screen.getByText("about.description3")).toBeInTheDocument()
  })

  it("renders profile image", () => {
    render(<About />)
    const img = screen.getByAltText("About Romain")
    expect(img).toBeInTheDocument()
  })
})
