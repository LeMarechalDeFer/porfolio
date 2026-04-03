import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

vi.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
}))

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children?: React.ReactNode }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardContent: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
}))

import {
  SkeletonGrid,
  SkeletonCardGrid,
  SkeletonSection,
  SkeletonRepeat,
} from "@/components/skeletons"

describe("SkeletonGrid", () => {
  it("renders the correct number of skeletons", () => {
    render(<SkeletonGrid count={4} className="grid" itemClassName="h-10" prefix="test" />)
    const skeletons = screen.getAllByTestId("skeleton")
    expect(skeletons).toHaveLength(4)
  })

  it("applies itemClassName to each skeleton", () => {
    render(<SkeletonGrid count={2} className="grid" itemClassName="h-20 w-full" prefix="item" />)
    const skeletons = screen.getAllByTestId("skeleton")
    for (const skeleton of skeletons) {
      expect(skeleton).toHaveClass("h-20", "w-full")
    }
  })

  it("applies className to the container div", () => {
    const { container } = render(
      <SkeletonGrid count={1} className="grid gap-4" itemClassName="h-10" prefix="grid" />,
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass("grid", "gap-4")
  })

  it("renders zero skeletons when count is 0", () => {
    const { container } = render(
      <SkeletonGrid count={0} className="grid" itemClassName="h-10" prefix="empty" />,
    )
    expect(container.querySelector("[data-testid='skeleton']")).toBeNull()
  })
})

describe("SkeletonCardGrid", () => {
  it("renders the correct number of cards", () => {
    render(
      <SkeletonCardGrid
        count={3}
        className="grid"
        prefix="card"
        headerContent={(i) => <span>Header {i}</span>}
        bodyContent={(i) => <span>Body {i}</span>}
      />,
    )
    const cards = screen.getAllByTestId("card")
    expect(cards).toHaveLength(3)
  })

  it("renders header content via headerContent callback", () => {
    render(
      <SkeletonCardGrid
        count={2}
        className="grid"
        prefix="card"
        headerContent={(i) => <span data-testid={`header-${i}`}>Header {i}</span>}
        bodyContent={(i) => <span>Body {i}</span>}
      />,
    )
    expect(screen.getByTestId("header-0")).toHaveTextContent("Header 0")
    expect(screen.getByTestId("header-1")).toHaveTextContent("Header 1")
  })

  it("renders body content via bodyContent callback", () => {
    render(
      <SkeletonCardGrid
        count={2}
        className="grid"
        prefix="card"
        headerContent={(i) => <span>Header {i}</span>}
        bodyContent={(i) => <span data-testid={`body-${i}`}>Body {i}</span>}
      />,
    )
    expect(screen.getByTestId("body-0")).toHaveTextContent("Body 0")
    expect(screen.getByTestId("body-1")).toHaveTextContent("Body 1")
  })

  it("renders CardHeader and CardContent within each card", () => {
    render(
      <SkeletonCardGrid
        count={1}
        className="grid"
        prefix="card"
        headerContent={() => <span>H</span>}
        bodyContent={() => <span>B</span>}
      />,
    )
    expect(screen.getAllByTestId("card-header")).toHaveLength(1)
    expect(screen.getAllByTestId("card-content")).toHaveLength(1)
  })
})

describe("SkeletonSection", () => {
  it("renders a section element", () => {
    const { container } = render(
      <SkeletonSection>
        <p>Content</p>
      </SkeletonSection>,
    )
    const section = container.querySelector("section")
    expect(section).not.toBeNull()
  })

  it("renders a title skeleton", () => {
    render(
      <SkeletonSection>
        <p>Content</p>
      </SkeletonSection>,
    )
    const skeletons = screen.getAllByTestId("skeleton")
    expect(skeletons.length).toBeGreaterThanOrEqual(1)
  })

  it("uses default titleWidth of w-64", () => {
    render(
      <SkeletonSection>
        <p>Content</p>
      </SkeletonSection>,
    )
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton.className).toContain("w-64")
  })

  it("accepts a custom titleWidth", () => {
    render(
      <SkeletonSection titleWidth="w-96">
        <p>Content</p>
      </SkeletonSection>,
    )
    const skeleton = screen.getByTestId("skeleton")
    expect(skeleton.className).toContain("w-96")
  })

  it("renders children", () => {
    render(
      <SkeletonSection>
        <p data-testid="child">Hello</p>
      </SkeletonSection>,
    )
    expect(screen.getByTestId("child")).toHaveTextContent("Hello")
  })

  it("applies className to the section", () => {
    const { container } = render(
      <SkeletonSection className="py-20">
        <p>Content</p>
      </SkeletonSection>,
    )
    const section = container.querySelector("section")
    expect(section).toHaveClass("py-20")
  })
})

describe("SkeletonRepeat", () => {
  it("renders the correct number of children", () => {
    render(
      <SkeletonRepeat count={5} prefix="repeat">
        {(i) => <span data-testid={`item-${i}`}>Item {i}</span>}
      </SkeletonRepeat>,
    )
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`item-${i}`)).toHaveTextContent(`Item ${i}`)
    }
  })

  it("renders zero children when count is 0", () => {
    const { container } = render(
      <SkeletonRepeat count={0} prefix="empty">
        {(i) => <span>Item {i}</span>}
      </SkeletonRepeat>,
    )
    expect(container.innerHTML).toBe("")
  })

  it("passes correct index to the children render function", () => {
    const indices: number[] = []
    render(
      <SkeletonRepeat count={3} prefix="idx">
        {(i) => {
          indices.push(i)
          return <span>Item {i}</span>
        }}
      </SkeletonRepeat>,
    )
    expect(indices).toEqual([0, 1, 2])
  })
})
