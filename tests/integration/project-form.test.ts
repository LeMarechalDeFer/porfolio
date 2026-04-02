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
vi.mock("@/components/email/projectForm-Email", () => ({
  ProjectFormEmail: () => null,
}))

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  mockSend.mockReset().mockResolvedValue({ data: { id: "mock-id" }, error: null })
})
afterAll(() => server.close())

const { projectFormRequest } = await import("@/app/[locale]/actions/action.project-form")

const validData = {
  name: "Jean",
  surname: "Dupont",
  email: "jean@example.com",
  company: "Acme",
  sector: "Tech",
  budget: "5000-10000",
  timeline: "3 mois",
  mainObjective: "Refonte du site web",
  projectIdea: "Un site portfolio moderne",
  targetAudience: "Développeurs freelance",
  expectedResults: "Plus de visibilité",
}

describe("Project form – integration", () => {
  it("succeeds with valid data", async () => {
    const result = await projectFormRequest(validData)

    expect(result.success).toBe(true)
    expect(result.message).toBe("project-form.email.subject")
  })

  it("rejects when required fields are missing", async () => {
    const result = await projectFormRequest({
      ...validData,
      name: "",
      email: "",
    })

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it("rejects an invalid email", async () => {
    const result = await projectFormRequest({
      ...validData,
      email: "bad-email",
    })

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it("returns an error when Resend throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("Network failure"))

    const result = await projectFormRequest(validData)

    expect(result.success).toBe(false)
    expect(result.message).toContain("erreur")
  })

  it("includes optional fields in the email call", async () => {
    await projectFormRequest({
      ...validData,
      technicalPreferences: "Next.js + Tailwind",
      otherDetails: "Besoin urgent",
    })

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "jean@example.com",
        from: expect.stringContaining("devis@romainblanchot.com"),
      }),
    )
  })

  it("sends to the correct email address", async () => {
    await projectFormRequest({
      ...validData,
      email: "custom@domain.fr",
    })

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "custom@domain.fr",
        replyTo: "romainblanchot0@gmail.com",
      }),
    )
  })
})
