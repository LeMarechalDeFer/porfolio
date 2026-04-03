import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from "vitest"
import { server } from "../mocks/server"

// Set dummy API key before Resend constructor runs
process.env.RESEND_API_KEY = "re_test_123"

const mockSend = vi.fn().mockResolvedValue({ data: { id: "mock-id" }, error: null })

// Mock Resend to control email sending behaviour
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: mockSend } }
  }),
}))

// Mock next-international server
vi.mock("@/locales/server", () => ({
  getI18n: vi.fn().mockResolvedValue((key: string) => key),
  getCurrentLocale: vi.fn().mockResolvedValue("fr"),
}))

// Mock react email component
vi.mock("@/components/email/welcomeNewsletter-Email", () => ({
  WelcomeNewsletter: () => null,
}))

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  mockSend.mockReset().mockResolvedValue({ data: { id: "mock-id" }, error: null })
})
afterAll(() => server.close())

// Dynamic import so mocks are applied first
const { subscribeToNewsletter } = await import("@/app/[locale]/actions/action.newsletter")

describe("Newsletter subscription – integration", () => {
  it("succeeds with a valid email", async () => {
    const result = await subscribeToNewsletter({
      email: "test@example.com",
      language: "fr",
    })

    expect(result.success).toBe(true)
    expect(result.message).toBe("newsletter.success.description")
  })

  it("rejects an invalid email before calling Resend", async () => {
    const result = await subscribeToNewsletter({
      email: "not-an-email",
      language: "fr",
    })

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it("returns an error when Resend throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("Network failure"))

    const result = await subscribeToNewsletter({
      email: "test@example.com",
      language: "fr",
    })

    expect(result.success).toBe(false)
    expect(result.message).toContain("erreur")
  })

  it("passes the correct payload to Resend", async () => {
    await subscribeToNewsletter({
      email: "romain@test.com",
      language: "en",
    })

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "romain@test.com",
        from: expect.stringContaining("newsletter@romainblanchot.com"),
        replyTo: "romainblanchot0@gmail.com",
      }),
    )
  })
})
