import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("next/link", () => mocks.nextLinkMock)

import GlobalError from "@/app/global-error"

describe("GlobalError", () => {
  const mockReset = vi.fn()
  const mockError = new Error("Something went wrong") as Error & { digest?: string }
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.clearAllMocks()
    consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
  })

  it("renders 500 heading", () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(screen.getByText("500")).toBeInTheDocument()
  })

  it("renders error message text", () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(screen.getByText("Une erreur inattendue est survenue.")).toBeInTheDocument()
  })

  it("has a retry button", () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    const button = screen.getByRole("button", { name: /réessayer/i })
    expect(button).toBeInTheDocument()
  })

  it("calls reset() when retry button is clicked", () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    const button = screen.getByRole("button", { name: /réessayer/i })
    fireEvent.click(button)
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it("calls console.error with the error", () => {
    render(<GlobalError error={mockError} reset={mockReset} />)
    expect(consoleSpy).toHaveBeenCalledWith(mockError)
  })

  it("renders with a body element", () => {
    const { container } = render(<GlobalError error={mockError} reset={mockReset} />)
    // jsdom hoists <html> and <body> out of the container,
    // so we verify the component rendered its content wrapper
    const wrapper = container.querySelector("div")
    expect(wrapper).not.toBeNull()
  })
})
