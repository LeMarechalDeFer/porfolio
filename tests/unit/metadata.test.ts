import { describe, it, expect } from "vitest"
import { generateMetadata } from "@/components/metadata"

describe("generateMetadata()", () => {
  describe("default (no lang param)", () => {
    const meta = generateMetadata({ params: {} })

    it("defaults to fr locale", () => {
      expect(meta.alternates?.canonical).toBe("https://www.romainblanchot.com")
    })

    it("returns correct title object", () => {
      const title = meta.title as { default: string; template: string }
      expect(title.default).toContain("Romain")
      expect(title.template).toContain("%s")
    })

    it("returns a description string", () => {
      expect(typeof meta.description).toBe("string")
      expect(meta.description!.length).toBeGreaterThan(0)
    })

    it("returns keywords array", () => {
      expect(Array.isArray(meta.keywords)).toBe(true)
      expect(meta.keywords).toContain("Next.js")
      expect(meta.keywords).toContain("freelance")
    })

    it("returns correct authors", () => {
      expect(meta.authors).toEqual([{ name: "Romain" }])
    })

    it("returns correct creator", () => {
      expect(meta.creator).toBe("Romain")
    })
  })

  describe("FR locale canonical URL", () => {
    const meta = generateMetadata({ params: { lang: "fr" } })

    it("canonical for fr is base URL without lang prefix", () => {
      expect(meta.alternates?.canonical).toBe("https://www.romainblanchot.com")
    })
  })

  describe("EN locale canonical URL", () => {
    const meta = generateMetadata({ params: { lang: "en" } })

    it("canonical for en includes /en prefix", () => {
      expect(meta.alternates?.canonical).toBe("https://www.romainblanchot.com/en")
    })
  })

  describe("with slug", () => {
    const meta = generateMetadata({ params: { lang: "fr", slug: ["mes-services"] } })

    it("canonical includes slug path", () => {
      expect(meta.alternates?.canonical).toBe("https://www.romainblanchot.com/mes-services")
    })
  })

  describe("alternates.languages", () => {
    const meta = generateMetadata({ params: { lang: "fr" } })
    const languages = meta.alternates?.languages as Record<string, string>

    it("includes all 10 languages", () => {
      const expectedLangs = ["fr", "en", "es", "de", "it", "pt", "nl", "ru", "zh", "ja"]
      for (const lang of expectedLangs) {
        expect(languages).toHaveProperty(lang)
      }
      expect(Object.keys(languages)).toHaveLength(10)
    })

    it("FR alternate has no lang prefix", () => {
      expect(languages.fr).toBe("https://www.romainblanchot.com")
    })

    it("EN alternate has /en prefix", () => {
      expect(languages.en).toBe("https://www.romainblanchot.com/en")
    })

    it("other language alternates have correct prefixes", () => {
      expect(languages.es).toBe("https://www.romainblanchot.com/es")
      expect(languages.de).toBe("https://www.romainblanchot.com/de")
      expect(languages.ja).toBe("https://www.romainblanchot.com/ja")
    })
  })

  describe("openGraph", () => {
    const meta = generateMetadata({ params: { lang: "fr" } })
    const og = meta.openGraph!

    it("has correct title", () => {
      expect(og.title).toContain("Romain")
    })

    it("has correct type", () => {
      expect((og as Record<string, unknown>).type).toBe("website")
    })

    it("has correct locale for fr", () => {
      expect(og.locale).toBe("fr")
    })

    it("has correct url", () => {
      expect(og.url).toBe("https://www.romainblanchot.com")
    })

    it("has siteName", () => {
      expect(og.siteName).toBeDefined()
      expect(og.siteName!.length).toBeGreaterThan(0)
    })

    it("has images array", () => {
      expect(og.images).toBeDefined()
    })
  })

  describe("openGraph locale for en", () => {
    const meta = generateMetadata({ params: { lang: "en" } })

    it("uses en locale", () => {
      expect(meta.openGraph!.locale).toBe("en")
    })
  })

  describe("openGraph locale fallback for unknown language", () => {
    const meta = generateMetadata({ params: { lang: "zh" } })

    it("falls back to fr for unmapped locale", () => {
      expect(meta.openGraph!.locale).toBe("fr")
    })
  })

  describe("twitter", () => {
    const meta = generateMetadata({ params: { lang: "fr" } })
    const twitter = meta.twitter!

    it("has summary_large_image card type", () => {
      expect((twitter as Record<string, unknown>).card).toBe("summary_large_image")
    })

    it("has correct creator", () => {
      expect(twitter.creator).toBe("@talleyrand1000")
    })

    it("has title", () => {
      expect(twitter.title).toContain("Romain")
    })

    it("has description", () => {
      expect(twitter.description).toBeDefined()
    })
  })
})
