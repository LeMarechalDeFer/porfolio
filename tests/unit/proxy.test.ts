import { describe, it, expect, vi, beforeEach } from "vitest"

const { mockMiddleware } = vi.hoisted(() => ({
  mockMiddleware: vi.fn().mockReturnValue({ status: 200 }),
}))

const { mockCreateI18nMiddleware } = vi.hoisted(() => ({
  mockCreateI18nMiddleware: vi.fn(),
}))

vi.mock("next-international/middleware", () => {
  mockCreateI18nMiddleware.mockReturnValue(mockMiddleware)
  return {
    createI18nMiddleware: mockCreateI18nMiddleware,
  }
})

vi.mock("next/server", () => ({
  NextRequest: vi.fn(),
}))

import { proxy, config } from "@/proxy"

describe("proxy", () => {
  beforeEach(() => {
    mockMiddleware.mockClear()
    mockMiddleware.mockReturnValue({ status: 200 })
  })

  it("calls the i18n middleware with the provided request and returns its result", () => {
    const fakeRequest = { url: "http://localhost:3000/fr" } as unknown as Parameters<
      typeof proxy
    >[0]
    const result = proxy(fakeRequest)

    expect(mockMiddleware).toHaveBeenCalledWith(fakeRequest)
    expect(result).toEqual({ status: 200 })
  })

  it("creates the middleware with correct locale configuration", () => {
    expect(mockCreateI18nMiddleware).toHaveBeenCalledWith({
      locales: ["en", "fr"],
      defaultLocale: "fr",
      urlMappingStrategy: "rewriteDefault",
    })
  })

  it("returns whatever the middleware returns", () => {
    const customResponse = { status: 307, headers: { Location: "/fr" } }
    mockMiddleware.mockReturnValue(customResponse)

    const fakeRequest = { url: "http://localhost:3000/" } as unknown as Parameters<typeof proxy>[0]
    const result = proxy(fakeRequest)

    expect(result).toEqual(customResponse)
  })
})

describe("proxy config.matcher", () => {
  // The config.matcher is a Next.js path pattern, not a raw regex.
  // When used as RegExp directly, it tests if any substring matches.
  // Here we test the patterns that the regex correctly includes/excludes.
  const matcher = config.matcher[0]
  const regex = new RegExp(matcher)

  const shouldMatch = [
    "/",
    "/fr",
    "/en",
    "/about",
    "/en/services",
    "/mes-projets",
    "/en/a-propos",
    "/demarrer-votre-projet",
    "/en/start-your-project",
  ]

  // These paths contain dots or start with excluded prefixes that the
  // negative lookahead catches when the regex is applied
  const shouldNotMatch = [
    "/_next/static/chunk.js",
    "/favicon.ico",
    "/robots.txt",
    "/static/image.png",
    "/logo.svg",
    "/image.jpg",
    "/photo.webp",
    "/document.pdf",
    "/file.css",
  ]

  for (const path of shouldMatch) {
    it(`matches app route: ${path}`, () => {
      expect(regex.test(path)).toBe(true)
    })
  }

  for (const path of shouldNotMatch) {
    it(`does NOT match excluded path: ${path}`, () => {
      expect(regex.test(path)).toBe(false)
    })
  }

  it("has exactly one matcher pattern", () => {
    expect(config.matcher).toHaveLength(1)
  })

  it("matcher pattern includes negative lookahead for api, static, _next, and file extensions", () => {
    const pattern = config.matcher[0]
    expect(pattern).toContain("api")
    expect(pattern).toContain("static")
    expect(pattern).toContain("_next")
    expect(pattern).toContain("favicon.ico")
    expect(pattern).toContain("robots.txt")
    expect(pattern).toContain("ingest")
  })
})
