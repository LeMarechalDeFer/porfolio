import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("next-international/server", () => mocks.nextInternationalServerMock)
vi.mock("@/locales/server", () => mocks.localesServerMock)
vi.mock("next/image", () => mocks.nextImageNoPlaceholderMock)
vi.mock("@/components/ui/button", () => mocks.buttonSimpleMock)
vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  CardContent: ({
    children,
    ...props
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  CardHeader: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children?: React.ReactNode }) => <h3>{children}</h3>,
}))

vi.mock("@/components/reservation/project-form", () => ({
  default: () => <div data-testid="project-form">ProjectForm</div>,
}))

vi.mock("@/components/ui/carousel", () => ({
  Carousel: ({
    children,
    ...props
  }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  CarouselContent: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CarouselItem: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  CarouselNext: () => <button>Next</button>,
  CarouselPrevious: () => <button>Previous</button>,
}))

describe("DemarrerVotreProjet page", () => {
  it("renders page title and subtitle", async () => {
    const { default: DemarrerVotreProjet } =
      await import("@/app/[locale]/demarrer-votre-projet/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await DemarrerVotreProjet({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("start-project.title")).toBeInTheDocument()
    expect(screen.getByText("start-project.subtitle")).toBeInTheDocument()
  })

  it("renders project form", async () => {
    const { default: DemarrerVotreProjet } =
      await import("@/app/[locale]/demarrer-votre-projet/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await DemarrerVotreProjet({ params })
    render(element as React.ReactElement)

    expect(screen.getByTestId("project-form")).toBeInTheDocument()
  })

  it("renders process steps", async () => {
    const { default: DemarrerVotreProjet } =
      await import("@/app/[locale]/demarrer-votre-projet/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await DemarrerVotreProjet({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("start-project.process.title")).toBeInTheDocument()
    expect(screen.getByText("start-project.process.step1")).toBeInTheDocument()
    expect(screen.getByText("start-project.process.step5")).toBeInTheDocument()
  })

  it("renders why section", async () => {
    const { default: DemarrerVotreProjet } =
      await import("@/app/[locale]/demarrer-votre-projet/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await DemarrerVotreProjet({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("start-project.why.title")).toBeInTheDocument()
    expect(screen.getByText("start-project.why.expertise")).toBeInTheDocument()
  })

  it("renders testimonials", async () => {
    const { default: DemarrerVotreProjet } =
      await import("@/app/[locale]/demarrer-votre-projet/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await DemarrerVotreProjet({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("start-project.testimonials.title")).toBeInTheDocument()
    expect(screen.getByText("start-project.testimonials.client1.name")).toBeInTheDocument()
  })

  it("renders CTA section with image", async () => {
    const { default: DemarrerVotreProjet } =
      await import("@/app/[locale]/demarrer-votre-projet/page")
    const params = Promise.resolve({ locale: "fr" })
    const element = await DemarrerVotreProjet({ params })
    render(element as React.ReactElement)

    expect(screen.getByText("start-project.cta.title")).toBeInTheDocument()
    expect(screen.getByText("start-project.cta.button")).toBeInTheDocument()
    expect(screen.getByAltText("Collaboration en action")).toBeInTheDocument()
  })
})
