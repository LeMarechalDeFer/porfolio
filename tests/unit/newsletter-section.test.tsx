import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("framer-motion", () => mocks.framerMotionMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("next/image", () => mocks.nextImageMock)
vi.mock("sonner", () => mocks.sonnerMock)
vi.mock("@hookform/resolvers/zod", () => mocks.zodResolverMock)
vi.mock("@/lib/schema/schema.newsletter", () => mocks.newsletterSchemaMock)
vi.mock("@/components/ui/button", () => mocks.buttonMock)
vi.mock("@/components/ui/card", () => mocks.cardMock)
vi.mock("@/components/ui/badge", () => mocks.badgeMock)
vi.mock("@/components/ui/input", () => mocks.inputMock)
vi.mock("@/components/ui/form", () => mocks.formMock)

vi.mock("@/app/[locale]/actions/action.newsletter", () => ({
  subscribeToNewsletter: vi.fn(),
}))

// react-hook-form mock (newsletter-specific)
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    handleSubmit:
      (fn: (data: Record<string, string>) => unknown) => (e?: { preventDefault?: () => void }) => {
        e?.preventDefault?.()
        fn({ email: "test@test.com" })
      },
    formState: { isSubmitting: false },
    reset: vi.fn(),
    setValue: vi.fn(),
  }),
}))

import NewsletterSection from "@/components/landingPage/newsletter-section"
import { subscribeToNewsletter } from "@/app/[locale]/actions/action.newsletter"
import { toast } from "sonner"

const mockSubscribe = vi.mocked(subscribeToNewsletter)
const mockToast = vi.mocked(toast)

describe("NewsletterSection", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders badge 'newsletter-section.badge'", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.badge")).toBeInTheDocument()
  })

  it("renders title 'newsletter-section.title'", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.title")).toBeInTheDocument()
  })

  it("renders description", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.description")).toBeInTheDocument()
  })

  it("renders 3 benefits", () => {
    render(<NewsletterSection />)
    const benefitTitles = [
      "newsletter-section.benefit.1.title",
      "newsletter-section.benefit.2.title",
      "newsletter-section.benefit.3.title",
    ]
    for (const title of benefitTitles) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it("renders benefit descriptions", () => {
    render(<NewsletterSection />)
    const benefitDescriptions = [
      "newsletter-section.benefit.1.description",
      "newsletter-section.benefit.2.description",
      "newsletter-section.benefit.3.description",
    ]
    for (const desc of benefitDescriptions) {
      expect(screen.getByText(desc)).toBeInTheDocument()
    }
  })

  it("renders the info text", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.info")).toBeInTheDocument()
  })

  it("renders the card title and subtitle", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.card.title")).toBeInTheDocument()
    expect(screen.getByText("newsletter-section.card.subtitle")).toBeInTheDocument()
  })

  it("has email input form with label", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.form.label")).toBeInTheDocument()
  })

  it("has submit button with correct text", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.form.button")).toBeInTheDocument()
  })

  it("renders submit button as not disabled when not submitting", () => {
    render(<NewsletterSection />)
    const submitButton = screen.getByText("newsletter-section.form.button")
    expect(submitButton.closest("button")).not.toBeDisabled()
  })

  it("has privacy text and link", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.form.privacy.link")).toBeInTheDocument()
    const privacyLink = screen.getByText("newsletter-section.form.privacy.link").closest("a")
    expect(privacyLink).toHaveAttribute("href", "/politique-de-confidentialite")
  })

  it("renders privacy text content", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.form.privacy.link")).toBeInTheDocument()
  })

  it("renders the testimonial", () => {
    render(<NewsletterSection />)
    expect(screen.getByText("newsletter-section.testimonial")).toBeInTheDocument()
    expect(screen.getByText("newsletter-section.testimonial.author")).toBeInTheDocument()
  })

  it("renders the form element", () => {
    const { container } = render(<NewsletterSection />)
    const forms = container.querySelectorAll("form")
    expect(forms.length).toBeGreaterThanOrEqual(1)
  })

  it("renders an email input field", () => {
    render(<NewsletterSection />)
    const input = screen.getByPlaceholderText("newsletter-section.form.placeholder")
    expect(input).toBeInTheDocument()
  })

  it("shows success toast on successful submission", async () => {
    mockSubscribe.mockResolvedValue({ success: true, message: "OK" })

    const { container } = render(<NewsletterSection />)
    const forms = container.querySelectorAll("form")
    const form = forms[forms.length - 1]
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockSubscribe).toHaveBeenCalled()
      expect(mockToast.success).toHaveBeenCalled()
    })
  })

  it("shows error toast on failed submission", async () => {
    mockSubscribe.mockResolvedValue({ success: false, message: "Error" })

    const { container } = render(<NewsletterSection />)
    const forms = container.querySelectorAll("form")
    const form = forms[forms.length - 1]
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalled()
    })
  })

  it("shows error toast on network error", async () => {
    mockSubscribe.mockRejectedValue(new Error("Network error"))

    const { container } = render(<NewsletterSection />)
    const forms = container.querySelectorAll("form")
    const form = forms[forms.length - 1]
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalled()
    })
  })
})
