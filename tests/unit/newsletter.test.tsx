import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientNoChangeMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("sonner", () => mocks.sonnerMock)
vi.mock("@hookform/resolvers/zod", () => mocks.zodResolverMock)
vi.mock("@/components/ui/form", () => mocks.formDivMock)
vi.mock("@/components/ui/button", () => mocks.buttonSimpleMock)
vi.mock("@/components/ui/input", () => mocks.inputMock)

vi.mock("@/app/[locale]/actions/action.newsletter", () => ({
  subscribeToNewsletter: vi.fn(),
}))

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    handleSubmit:
      (fn: (data: Record<string, string>) => unknown) => (e?: { preventDefault?: () => void }) => {
        e?.preventDefault?.()
        return fn({ email: "test@test.com", language: "fr" })
      },
    formState: { isSubmitting: false },
    reset: vi.fn(),
    setValue: vi.fn(),
  }),
}))

import { Newsletter } from "@/components/landingPage/newsletter"
import { subscribeToNewsletter } from "@/app/[locale]/actions/action.newsletter"
import { toast } from "sonner"

const mockSubscribe = vi.mocked(subscribeToNewsletter)
const mockToast = vi.mocked(toast)

describe("Newsletter (footer)", () => {
  it("renders title", () => {
    render(<Newsletter />)
    expect(screen.getByText("newsletter.title")).toBeInTheDocument()
  })

  it("renders description", () => {
    render(<Newsletter />)
    expect(screen.getByText("newsletter.description")).toBeInTheDocument()
  })

  it("renders email label", () => {
    render(<Newsletter />)
    expect(screen.getByText("newsletter.label")).toBeInTheDocument()
  })

  it("renders submit button", () => {
    render(<Newsletter />)
    expect(screen.getByText("newsletter.button")).toBeInTheDocument()
  })

  it("renders privacy link", () => {
    render(<Newsletter />)
    expect(screen.getByText("newsletter.privacy")).toBeInTheDocument()
    const link = screen.getByText("newsletter.privacy").closest("a")
    expect(link).toHaveAttribute("href", "/politique-de-confidentialite")
  })

  it("renders disclaimer", () => {
    render(<Newsletter />)
    expect(screen.getByText(/newsletter\.disclaimer/)).toBeInTheDocument()
  })

  it("shows success toast on successful submission", async () => {
    mockSubscribe.mockResolvedValue({ success: true })

    const { container } = render(<Newsletter />)
    const form = container.querySelector("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockSubscribe).toHaveBeenCalledWith({ email: "test@test.com", language: "fr" })
      expect(mockToast.success).toHaveBeenCalled()
    })
  })

  it("shows error toast on failed submission", async () => {
    mockSubscribe.mockResolvedValue({ success: false })

    const { container } = render(<Newsletter />)
    const form = container.querySelector("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalled()
    })
  })

  it("shows error toast on exception", async () => {
    mockSubscribe.mockRejectedValue(new Error("Network error"))

    const { container } = render(<Newsletter />)
    const form = container.querySelector("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalled()
    })
  })
})
