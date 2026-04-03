import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

const mockUseClientAsyncInit = vi.fn()

vi.mock("@statsig/react-bindings", () => ({
  StatsigProvider: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="statsig-provider">{children}</div>
  ),
  useClientAsyncInit: (...args: unknown[]) => mockUseClientAsyncInit(...args),
}))

vi.mock("@statsig/web-analytics", () => ({
  StatsigAutoCapturePlugin: vi.fn(),
}))

vi.mock("@statsig/session-replay", () => ({
  StatsigSessionReplayPlugin: vi.fn(),
}))

import MyStatsig from "@/components/my-statsig"

describe("MyStatsig", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders children directly when client is null (not wrapped in StatsigProvider)", () => {
    mockUseClientAsyncInit.mockReturnValue({ client: null })

    render(
      <MyStatsig>
        <span data-testid="child">Hello</span>
      </MyStatsig>,
    )

    expect(screen.getByTestId("child")).toBeInTheDocument()
    expect(screen.getByText("Hello")).toBeInTheDocument()
    expect(screen.queryByTestId("statsig-provider")).not.toBeInTheDocument()
  })

  it("renders children directly when client is undefined", () => {
    mockUseClientAsyncInit.mockReturnValue({ client: undefined })

    render(
      <MyStatsig>
        <span data-testid="child">World</span>
      </MyStatsig>,
    )

    expect(screen.getByTestId("child")).toBeInTheDocument()
    expect(screen.queryByTestId("statsig-provider")).not.toBeInTheDocument()
  })

  it("renders children inside StatsigProvider when client is available", () => {
    const fakeClient = { initialize: vi.fn() }
    mockUseClientAsyncInit.mockReturnValue({ client: fakeClient })

    render(
      <MyStatsig>
        <span data-testid="child">Wrapped</span>
      </MyStatsig>,
    )

    expect(screen.getByTestId("statsig-provider")).toBeInTheDocument()
    expect(screen.getByTestId("child")).toBeInTheDocument()
    expect(screen.getByText("Wrapped")).toBeInTheDocument()
  })

  it("passes the correct SDK key to useClientAsyncInit", () => {
    mockUseClientAsyncInit.mockReturnValue({ client: null })

    render(
      <MyStatsig>
        <span>Test</span>
      </MyStatsig>,
    )

    expect(mockUseClientAsyncInit).toHaveBeenCalledWith(
      "client-TAPXuEfuJy4Yue7QsvIHv74mmDjjGMxRVL9bqITHiNd",
      { userID: "a-user" },
      expect.objectContaining({ plugins: undefined }),
    )
  })

  it("renders multiple children correctly when client is null", () => {
    mockUseClientAsyncInit.mockReturnValue({ client: null })

    render(
      <MyStatsig>
        <span data-testid="first">First</span>
        <span data-testid="second">Second</span>
      </MyStatsig>,
    )

    expect(screen.getByTestId("first")).toBeInTheDocument()
    expect(screen.getByTestId("second")).toBeInTheDocument()
  })

  it("renders multiple children correctly when client is available", () => {
    const fakeClient = { initialize: vi.fn() }
    mockUseClientAsyncInit.mockReturnValue({ client: fakeClient })

    render(
      <MyStatsig>
        <span data-testid="first">First</span>
        <span data-testid="second">Second</span>
      </MyStatsig>,
    )

    expect(screen.getByTestId("statsig-provider")).toBeInTheDocument()
    expect(screen.getByTestId("first")).toBeInTheDocument()
    expect(screen.getByTestId("second")).toBeInTheDocument()
  })
})
