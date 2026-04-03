import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"

vi.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="skeleton" className={className} {...props} />
  ),
}))

vi.mock("@/components/skeletons", () => ({
  SkeletonSection: ({
    children,
    ...props
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => (
    <section {...props}>{children}</section>
  ),
  SkeletonGrid: ({
    count,
    prefix,
    ...props
  }: { count: number; prefix: string } & React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid={`grid-${prefix}`} {...props}>
      {Array.from({ length: count }, (_, i) => (
        <div key={`${prefix}-${i}`} />
      ))}
    </div>
  ),
  SkeletonRepeat: ({
    count,
    prefix,
    children,
  }: {
    count: number
    prefix: string
    children: (i: number) => React.ReactNode
  }) => (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={`${prefix}-${i}`}>{children(i)}</div>
      ))}
    </>
  ),
  SkeletonCardGrid: ({
    count,
    prefix,
    ...props
  }: { count: number; prefix: string } & React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid={`card-grid-${prefix}`} {...props}>
      {Array.from({ length: count }, (_, i) => (
        <div key={`${prefix}-${i}`} />
      ))}
    </div>
  ),
}))

vi.mock("@/components/ui/card", () => ({
  Card: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock("@/components/ui/tabs", () => ({
  Tabs: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  TabsContent: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  TabsList: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  TabsTrigger: ({ children }: { children?: React.ReactNode }) => <button>{children}</button>,
}))

describe("Loading components", () => {
  it("renders main loading page", async () => {
    const { default: Loading } = await import("@/app/[locale]/loading")
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeTruthy()
  })

  it("renders a-propos loading", async () => {
    const { default: Loading } = await import("@/app/[locale]/a-propos/loading")
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeTruthy()
  })

  it("renders demarrer-votre-projet loading", async () => {
    const { default: Loading } = await import("@/app/[locale]/demarrer-votre-projet/loading")
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeTruthy()
  })

  it("renders me-contacter loading", async () => {
    const { default: Loading } = await import("@/app/[locale]/me-contacter/loading")
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeTruthy()
  })

  it("renders mes-competences loading", async () => {
    const { default: Loading } = await import("@/app/[locale]/mes-competences/loading")
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeTruthy()
  })

  it("renders mes-projets loading", async () => {
    const { default: Loading } = await import("@/app/[locale]/mes-projets/loading")
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeTruthy()
  })

  it("renders mes-services loading", async () => {
    const { default: Loading } = await import("@/app/[locale]/mes-services/loading")
    const { container } = render(<Loading />)
    expect(container.firstChild).toBeTruthy()
  })
})
