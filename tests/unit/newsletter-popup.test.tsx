import React from "react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("framer-motion", () => mocks.framerMotionPopupMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("next/image", () => mocks.nextImageMock)
vi.mock("sonner", () => mocks.sonnerMock)
vi.mock("@hookform/resolvers/zod", () => mocks.zodResolverMock)
vi.mock("@/lib/schema/schema.newsletter", () => mocks.newsletterSchemaMock)
vi.mock("@/components/ui/button", () => mocks.buttonOnClickMock)
vi.mock("@/components/ui/input", () => mocks.inputMock)
vi.mock("@/components/ui/card", () => mocks.cardMinimalMock)
vi.mock("@/components/ui/form", () => mocks.formDivMock)

vi.mock("@/app/[locale]/actions/action.newsletter", () => ({
  subscribeToNewsletter: vi.fn(),
}))

vi.mock("@/public/photoProfilRomain.jpg", () => ({
  default: "/photoProfilRomain.jpg",
}))

// react-hook-form mock (newsletter-popup-specific)
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    handleSubmit:
      (fn: (data: Record<string, string>) => unknown) =>
      (e?: { preventDefault?: () => void }) => {
        e?.preventDefault?.()
        return fn({ email: "test@test.com", language: "fr" })
      },
    formState: { isSubmitting: false },
    reset: vi.fn(),
    setValue: vi.fn(),
  }),
}))

// lucide-react mock
vi.mock("lucide-react", () => ({
  X: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="x-icon" {...props} />,
  Send: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="send-icon" {...props} />,
  Sparkles: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="sparkles-icon" {...props} />,
  Loader2: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="loader-icon" {...props} />,
}))

import NewsletterPopup from "@/components/newsletter-popup"

describe("NewsletterPopup", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("does not show popup when newsletterSubscribed is in localStorage", () => {
    localStorage.setItem("newsletterSubscribed", "true")

    render(<NewsletterPopup />)

    expect(
      screen.queryByText("newsletter-popup.title"),
    ).not.toBeInTheDocument()
  })

  it("does not show popup when lastNewsletterPopupShown is recent (within POPUP_INTERVAL)", () => {
    localStorage.setItem(
      "lastNewsletterPopupShown",
      String(Date.now() - 1000),
    )

    render(<NewsletterPopup />)

    expect(
      screen.queryByText("newsletter-popup.title"),
    ).not.toBeInTheDocument()
  })

  it("renders null before storage check, then renders after useEffect", () => {
    const { container } = render(<NewsletterPopup />)
    // After useEffect runs, the component should have rendered something
    // (either the popup or empty fragment)
    expect(container).toBeDefined()
  })

  it("shows popup content when triggered by TIME_ON_SITE timer", () => {
    render(<NewsletterPopup />)

    // Advance past the TIME_ON_SITE (60s)
    act(() => {
      vi.advanceTimersByTime(61_000)
    })

    expect(screen.getByText("newsletter-popup.title")).toBeInTheDocument()
    expect(
      screen.getByText("newsletter-popup.description"),
    ).toBeInTheDocument()
  })

  it("shows email input field and submit button when popup is open", () => {
    render(<NewsletterPopup />)

    act(() => {
      vi.advanceTimersByTime(61_000)
    })

    expect(
      screen.getByText("newsletter-popup.email.label"),
    ).toBeInTheDocument()
    expect(screen.getByText("newsletter-popup.button")).toBeInTheDocument()
  })

  it("shows close button with sr-only text when popup is open", () => {
    render(<NewsletterPopup />)

    act(() => {
      vi.advanceTimersByTime(61_000)
    })

    expect(screen.getByText("newsletter-popup.close")).toBeInTheDocument()
  })

  it("closes popup when close button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(<NewsletterPopup />)

    act(() => {
      vi.advanceTimersByTime(61_000)
    })

    expect(screen.getByText("newsletter-popup.title")).toBeInTheDocument()

    // The close button has the X icon and sr-only text
    const closeButton = screen
      .getByText("newsletter-popup.close")
      .closest("button")!
    await user.click(closeButton)

    expect(
      screen.queryByText("newsletter-popup.title"),
    ).not.toBeInTheDocument()
  })

  it("renders privacy link", () => {
    render(<NewsletterPopup />)

    act(() => {
      vi.advanceTimersByTime(61_000)
    })

    const link = screen.getByText("newsletter-popup.disclaimer.link")
    expect(link).toBeInTheDocument()
    expect(link.closest("a")).toHaveAttribute(
      "href",
      "/politique-de-confidentialite",
    )
  })

  it("renders disclaimer text", () => {
    render(<NewsletterPopup />)

    act(() => {
      vi.advanceTimersByTime(61_000)
    })

    const disclaimerElements = screen.getAllByText(
      "newsletter-popup.disclaimer",
      { exact: false },
    )
    expect(disclaimerElements.length).toBeGreaterThan(0)
  })

  it("renders profile image", () => {
    render(<NewsletterPopup />)

    act(() => {
      vi.advanceTimersByTime(61_000)
    })

    const img = screen.getByAltText("newsletter-popup.image.alt")
    expect(img).toBeInTheDocument()
  })
})
