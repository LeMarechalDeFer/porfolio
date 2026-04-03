import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("next/link", () => mocks.nextLinkMock)

vi.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    asChild,
    ...props
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLElement> & { asChild?: boolean }>) => {
    if (asChild) {
      // When asChild is used, render the child directly but keep button semantics
      return (
        <div data-testid="as-child-button" {...props}>
          {children}
        </div>
      )
    }
    return (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    )
  },
}))

import ErrorPage from "@/app/[locale]/error"

describe("Error page", () => {
  const mockReset = vi.fn()
  const mockError = new Error("Test error") as Error & { digest?: string }
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.clearAllMocks()
    consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
  })

  it("renders 500 heading", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />)
    expect(screen.getByText("500")).toBeInTheDocument()
  })

  it("renders error message", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />)
    expect(screen.getByText("Une erreur inattendue est survenue.")).toBeInTheDocument()
  })

  it("has a retry button that calls reset()", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />)
    const button = screen.getByRole("button", { name: /réessayer/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it("has a link back to home", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />)
    const link = screen.getByRole("link", { name: /retour/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/")
  })

  it("logs error via console.error in useEffect", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />)
    expect(consoleSpy).toHaveBeenCalledWith(mockError)
  })

  it("renders retry and home buttons side by side", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />)
    const retryButton = screen.getByRole("button", { name: /réessayer/i })
    const homeLink = screen.getByRole("link", { name: /retour/i })
    expect(retryButton).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument()
  })
})
