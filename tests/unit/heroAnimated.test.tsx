import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMinimalMock)
vi.mock("framer-motion", () => mocks.framerMotionMinimalMock)

vi.mock("next/image", () => ({
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}))

vi.mock("@/public/photoProfilRomain.jpg", () => ({
  default: "/photoProfilRomain.jpg",
}))

import HeroAnimated from "@/components/landingPage/heroAnimated"

describe("HeroAnimated", () => {
  it("renders profile image with alt text", () => {
    render(<HeroAnimated />)
    const img = screen.getByAltText("Romain")
    expect(img).toBeInTheDocument()
  })

  it("renders availability status", () => {
    render(<HeroAnimated />)
    expect(screen.getByText("hero.availability")).toBeInTheDocument()
  })

  it("renders with priority loading", () => {
    render(<HeroAnimated />)
    const img = screen.getByAltText("Romain")
    expect(img).toHaveAttribute("loading", "eager")
  })
})
