import { describe, it, expect } from "vitest"
import sitemap from "@/app/sitemap"

describe("sitemap()", () => {
  const result = sitemap()

  it("returns an array of URL entries", () => {
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it("generates 18 total entries (9 static pages x 2 languages)", () => {
    expect(result).toHaveLength(18)
  })

  it("each entry has url, lastModified, changeFrequency, priority, and alternates", () => {
    for (const entry of result) {
      expect(entry).toHaveProperty("url")
      expect(entry).toHaveProperty("lastModified")
      expect(entry).toHaveProperty("changeFrequency")
      expect(entry).toHaveProperty("priority")
      expect(entry).toHaveProperty("alternates")
    }
  })

  it("sets changeFrequency to daily for all entries", () => {
    for (const entry of result) {
      expect(entry.changeFrequency).toBe("daily")
    }
  })

  it("sets lastModified to a Date instance for all entries", () => {
    for (const entry of result) {
      expect(entry.lastModified).toBeInstanceOf(Date)
    }
  })

  it("gives priority 1 to the FR home page", () => {
    const frHome = result.find((e) => e.url === "https://www.romainblanchot.com")
    expect(frHome).toBeDefined()
    expect(frHome!.priority).toBe(1)
  })

  it("gives priority 0.8 to the EN home page", () => {
    const enHome = result.find((e) => e.url === "https://www.romainblanchot.com/en")
    expect(enHome).toBeDefined()
    expect(enHome!.priority).toBe(0.8)
  })

  it("gives priority 0.8 to non-home pages", () => {
    const nonHomeEntries = result.filter(
      (e) =>
        e.url !== "https://www.romainblanchot.com" && e.url !== "https://www.romainblanchot.com/en",
    )
    for (const entry of nonHomeEntries) {
      expect(entry.priority).toBe(0.8)
    }
  })

  it("generates entries for both FR and EN for each page", () => {
    const frUrls = result.filter(
      (e) => e.url.startsWith("https://www.romainblanchot.com") && !e.url.includes("/en"),
    )
    const enUrls = result.filter((e) => e.url.includes("/en"))
    expect(frUrls).toHaveLength(9)
    expect(enUrls).toHaveLength(9)
  })

  it("includes alternates with fr and en language keys", () => {
    for (const entry of result) {
      const languages = (entry.alternates as { languages: Record<string, string> }).languages
      expect(languages).toHaveProperty("fr")
      expect(languages).toHaveProperty("en")
    }
  })

  it("FR alternates point to base URL, EN alternates include /en prefix", () => {
    const frHome = result.find((e) => e.url === "https://www.romainblanchot.com")
    const languages = (frHome!.alternates as { languages: Record<string, string> }).languages
    expect(languages.fr).toBe("https://www.romainblanchot.com")
    expect(languages.en).toBe("https://www.romainblanchot.com/en")
  })

  it("contains expected static page paths", () => {
    const urls = result.map((e) => e.url)
    expect(urls).toContain("https://www.romainblanchot.com/mes-services")
    expect(urls).toContain("https://www.romainblanchot.com/en/mes-services")
    expect(urls).toContain("https://www.romainblanchot.com/demarrer-votre-projet")
    expect(urls).toContain("https://www.romainblanchot.com/en/demarrer-votre-projet")
    expect(urls).toContain("https://www.romainblanchot.com/mes-projets")
    expect(urls).toContain("https://www.romainblanchot.com/en/mes-projets")
    expect(urls).toContain("https://www.romainblanchot.com/politique-de-confidentialite")
    expect(urls).toContain("https://www.romainblanchot.com/en/politique-de-confidentialite")
    expect(urls).toContain("https://www.romainblanchot.com/politique-de-cookies")
    expect(urls).toContain("https://www.romainblanchot.com/en/politique-de-cookies")
  })
})
