import { describe, it, expect } from "vitest"
import robots from "@/app/robots"

describe("robots()", () => {
  const result = robots()

  it("returns rules with userAgent wildcard", () => {
    expect(result.rules).toBeDefined()
    const rules = result.rules as { userAgent: string; allow: string }
    expect(rules.userAgent).toBe("*")
  })

  it("allows all paths", () => {
    const rules = result.rules as { userAgent: string; allow: string }
    expect(rules.allow).toBe("/")
  })

  it("has correct sitemap URL", () => {
    expect(result.sitemap).toBe("https://www.romainblanchot.com/sitemap.xml")
  })
})
