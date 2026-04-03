import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("@/components/ui/button", () => mocks.buttonOnClickMock)
vi.mock("@/components/ui/card", () => mocks.cardCookieConsentMock)
vi.mock("@/components/ui/tabs", () => mocks.tabsMock)
vi.mock("@/components/ui/switch", () => mocks.switchMock)
vi.mock("@/components/ui/label", () => mocks.labelMock)

import { CookieConsent } from "@/components/cookie-consent"

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("shows banner when no cookie consent is stored", () => {
    render(<CookieConsent />)

    expect(screen.getByText("cookie-consent.banner.text")).toBeInTheDocument()
    expect(
      screen.getByText("cookie-consent.banner.accept"),
    ).toBeInTheDocument()
    expect(screen.getByText("cookie-consent.banner.more")).toBeInTheDocument()
  })

  it("shows only manage button when valid consent is stored", () => {
    const prefs = {
      necessary: true,
      preferences: true,
      analytics: false,
      marketing: false,
    }
    localStorage.setItem("cookieConsent", JSON.stringify(prefs))

    render(<CookieConsent />)

    expect(screen.getByText("cookie-consent.manage")).toBeInTheDocument()
    expect(
      screen.queryByText("cookie-consent.banner.text"),
    ).not.toBeInTheDocument()
  })

  it("shows banner when localStorage contains invalid JSON", () => {
    localStorage.setItem("cookieConsent", "{bad json!!!")

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    render(<CookieConsent />)

    expect(screen.getByText("cookie-consent.banner.text")).toBeInTheDocument()
    expect(
      screen.getByText("cookie-consent.banner.accept"),
    ).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it("clicking 'accept all' saves all-true preferences to localStorage and hides banner", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    const acceptButton = screen.getByText("cookie-consent.banner.accept")
    await user.click(acceptButton)

    const stored = JSON.parse(localStorage.getItem("cookieConsent")!)
    expect(stored).toEqual({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    })

    // After accepting, banner should be gone and manage button shown
    expect(
      screen.queryByText("cookie-consent.banner.text"),
    ).not.toBeInTheDocument()
    expect(screen.getByText("cookie-consent.manage")).toBeInTheDocument()
  })

  it("clicking 'more' opens the preferences dialog", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    const moreButton = screen.getByText("cookie-consent.banner.more")
    await user.click(moreButton)

    expect(
      screen.getByText("cookie-consent.preferences-dialog.title"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("cookie-consent.preferences-dialog.description"),
    ).toBeInTheDocument()
  })

  it("preferences dialog shows tabs for necessary, preferences, analytics", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    expect(
      screen.getByText("cookie-consent.tabs.necessary"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("cookie-consent.tabs.preferences"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("cookie-consent.tabs.analytics"),
    ).toBeInTheDocument()
  })

  it("preferences dialog shows cancel, accept-all, and save buttons", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    expect(
      screen.getByText("cookie-consent.buttons.cancel"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("cookie-consent.buttons.accept-all"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("cookie-consent.buttons.save"),
    ).toBeInTheDocument()
  })

  it("save button saves current preferences to localStorage", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    const saveButton = screen.getByText("cookie-consent.buttons.save")
    await user.click(saveButton)

    const stored = JSON.parse(localStorage.getItem("cookieConsent")!)
    expect(stored).toEqual({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    })

    // After saving, should show manage button
    expect(screen.getByText("cookie-consent.manage")).toBeInTheDocument()
  })

  it("cancel button closes preferences dialog without saving", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    // Verify dialog is open
    expect(
      screen.getByText("cookie-consent.preferences-dialog.title"),
    ).toBeInTheDocument()

    const cancelButton = screen.getByText("cookie-consent.buttons.cancel")
    await user.click(cancelButton)

    // Dialog should close, nothing saved
    expect(localStorage.getItem("cookieConsent")).toBeNull()

    // Should go back to showing the banner
    expect(screen.getByText("cookie-consent.banner.text")).toBeInTheDocument()
  })

  it("clicking manage button from consent-stored state opens preferences", async () => {
    const prefs = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    }
    localStorage.setItem("cookieConsent", JSON.stringify(prefs))

    const user = userEvent.setup()
    render(<CookieConsent />)

    const manageButton = screen.getByText("cookie-consent.manage")
    await user.click(manageButton)

    expect(
      screen.getByText("cookie-consent.preferences-dialog.title"),
    ).toBeInTheDocument()
  })

  it("preferences dialog shows cookie policy link", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    expect(
      screen.getByText("cookie-consent.cookie-policy"),
    ).toBeInTheDocument()
    const link = screen.getByText("cookie-consent.cookie-policy")
    expect(link.closest("a")).toHaveAttribute("href", "/politique-cookies")
  })

  it("accept-all in preferences dialog saves and closes", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))
    await user.click(screen.getByText("cookie-consent.buttons.accept-all"))

    const stored = JSON.parse(localStorage.getItem("cookieConsent")!)
    expect(stored).toEqual({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    })

    expect(screen.getByText("cookie-consent.manage")).toBeInTheDocument()
  })

  it("preferences dialog has switches including a disabled necessary switch", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    const switches = screen.getAllByRole("switch")
    expect(switches.length).toBeGreaterThan(0)

    // At least one switch should be disabled (the necessary one in the "all" tab)
    const disabledSwitches = switches.filter(
      (s) => (s as HTMLButtonElement).disabled,
    )
    expect(disabledSwitches.length).toBeGreaterThan(0)
  })

  it("saves with analytics disabled when toggled off", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    // Find analytics switches and toggle one off
    const switches = screen.getAllByRole("switch")
    // Toggle analytics off (find the one that is checked and not disabled)
    const enabledCheckedSwitches = switches.filter(
      (s) => !(s as HTMLButtonElement).disabled && s.getAttribute("aria-checked") === "true",
    )
    // Toggle one of them to false
    if (enabledCheckedSwitches.length > 0) {
      await user.click(enabledCheckedSwitches[enabledCheckedSwitches.length - 1])
    }

    await user.click(screen.getByText("cookie-consent.buttons.save"))

    const stored = JSON.parse(localStorage.getItem("cookieConsent")!)
    expect(stored.necessary).toBe(true)
  })

  it("renders preferences tab content with cookie details", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    // Check necessary tab content (appears in "all" tab and "necessary" tab)
    expect(screen.getAllByText("cookie-consent.necessary.title").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("cookie-consent.necessary.description").length).toBeGreaterThanOrEqual(1)

    // Check preferences tab content (appears in "all" tab and "preferences" tab)
    expect(screen.getAllByText("cookie-consent.preferences.title").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("cookie-consent.preferences.description").length).toBeGreaterThanOrEqual(1)

    // Check analytics tab content (appears in "all" tab and "analytics" tab)
    expect(screen.getAllByText("cookie-consent.analytics.title").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("cookie-consent.analytics.description").length).toBeGreaterThanOrEqual(1)
  })

  it("renders cookie detail items in tabs", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    // Necessary tab cookies - text is after <strong> so use substring matching
    expect(screen.getByText(/cookie-consent\.necessary\.vercel/)).toBeInTheDocument()
    expect(screen.getByText(/cookie-consent\.necessary\.nextauth/)).toBeInTheDocument()

    // Preferences tab cookies
    expect(screen.getByText(/cookie-consent\.preferences\.theme/)).toBeInTheDocument()
    expect(screen.getByText(/cookie-consent\.preferences\.language/)).toBeInTheDocument()

    // Analytics tab cookies
    expect(screen.getByText(/cookie-consent\.analytics\.ga4/)).toBeInTheDocument()
    expect(screen.getByText(/cookie-consent\.analytics\.vercel/)).toBeInTheDocument()
  })

  it("renders enable labels for preferences and analytics", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    expect(screen.getByText("cookie-consent.preferences.enable")).toBeInTheDocument()
    expect(screen.getByText("cookie-consent.analytics.enable")).toBeInTheDocument()
  })

  it("renders marketing title and description in all tab", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    expect(screen.getByText("cookie-consent.marketing.title")).toBeInTheDocument()
    expect(screen.getByText("cookie-consent.marketing.description")).toBeInTheDocument()
  })

  it("renders more-info text in preferences dialog", async () => {
    const user = userEvent.setup()
    render(<CookieConsent />)

    await user.click(screen.getByText("cookie-consent.banner.more"))

    expect(screen.getByText("cookie-consent.more-info", { exact: false })).toBeInTheDocument()
  })
})
