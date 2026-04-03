import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

// Track the props that NextThemesProvider receives
const receivedProps = vi.hoisted(() => ({ current: null as Record<string, unknown> | null }))

vi.mock("next-themes", () => ({
  ThemeProvider: (props: Record<string, unknown> & { children?: React.ReactNode }) => {
    receivedProps.current = props
    return React.createElement("div", { "data-testid": "next-themes-provider" }, props.children)
  },
}))

import { ThemeProvider } from "@/components/landingPage/theme-provider"

describe("ThemeProvider", () => {
  beforeEach(() => {
    receivedProps.current = null
  })

  it("renders children", () => {
    render(
      <ThemeProvider>
        <span data-testid="child">Hello</span>
      </ThemeProvider>,
    )
    expect(screen.getByTestId("child")).toHaveTextContent("Hello")
  })

  it("passes props through to NextThemesProvider", () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <span>Content</span>
      </ThemeProvider>,
    )
    expect(receivedProps.current).toMatchObject({
      attribute: "class",
      defaultTheme: "dark",
      enableSystem: true,
      disableTransitionOnChange: true,
    })
  })

  it("wraps children inside NextThemesProvider", () => {
    render(
      <ThemeProvider>
        <span data-testid="inner">Inside</span>
      </ThemeProvider>,
    )
    const provider = screen.getByTestId("next-themes-provider")
    const inner = screen.getByTestId("inner")
    expect(provider).toContainElement(inner)
  })
})
