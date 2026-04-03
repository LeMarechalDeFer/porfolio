import { describe, it, expect } from "vitest"
import { organizationSchema, personSchema, webSiteSchema } from "@/components/schema-dts"

// schema-dts WithContext<T> types are complex unions including `string`,
// so direct property access doesn't type-check. We narrow to Record for test assertions.
const org = organizationSchema as unknown as Record<string, unknown>
const person = personSchema as unknown as Record<string, unknown>
const website = webSiteSchema as unknown as Record<string, unknown>

describe("organizationSchema", () => {
  it("has correct @context", () => {
    expect(org["@context"]).toBe("https://schema.org")
  })

  it("has correct @type", () => {
    expect(org["@type"]).toBe("Organization")
  })

  it("has correct name", () => {
    expect(org.name).toBe("TransiTech")
  })

  it("has correct url", () => {
    expect(org.url).toBe("https://www.romainblanchot.com")
  })

  it("has sameAs array with social links", () => {
    expect(Array.isArray(org.sameAs)).toBe(true)
    const sameAs = org.sameAs as string[]
    expect(sameAs).toContain("https://www.linkedin.com/in/romain-blanchot-449941284/")
    expect(sameAs).toContain("https://github.com/LeMarechalDeFer")
    expect(sameAs).toContain("https://www.instagram.com/romainblanchot/")
  })

  it("has address with correct type and details", () => {
    const address = org.address as Record<string, string>
    expect(address["@type"]).toBe("PostalAddress")
    expect(address.addressLocality).toBe("Paris")
    expect(address.postalCode).toBe("75006")
    expect(address.addressCountry).toBe("FR")
  })

  it("has correct telephone", () => {
    expect(org.telephone).toBe("+33 7 88 28 47 15")
  })

  it("has contactPoint array with customer support entry", () => {
    expect(Array.isArray(org.contactPoint)).toBe(true)
    const contactPoints = org.contactPoint as Array<Record<string, unknown>>
    expect(contactPoints).toHaveLength(1)
    expect(contactPoints[0]["@type"]).toBe("ContactPoint")
    expect(contactPoints[0].contactType).toBe("customer support")
    expect(contactPoints[0].email).toBe("blanchot@et.esiea.fr")
  })
})

describe("personSchema", () => {
  it("has correct @context", () => {
    expect(person["@context"]).toBe("https://schema.org")
  })

  it("has correct @type", () => {
    expect(person["@type"]).toBe("Person")
  })

  it("has correct name", () => {
    expect(person.name).toBe("Romain Blanchot")
  })

  it("has a jobTitle string", () => {
    expect(typeof person.jobTitle).toBe("string")
    expect((person.jobTitle as string).length).toBeGreaterThan(0)
  })

  it("has correct url", () => {
    expect(person.url).toBe("https://www.romainblanchot.com")
  })

  it("has sameAs array with social links", () => {
    expect(Array.isArray(person.sameAs)).toBe(true)
    const sameAs = person.sameAs as string[]
    expect(sameAs).toContain("https://www.linkedin.com/in/romain-blanchot-449941284/")
    expect(sameAs).toContain("https://github.com/LeMarechalDeFer")
  })

  it("has correct email", () => {
    expect(person.email).toBe("mailto:blanchot@et.esiea.fr")
  })
})

describe("webSiteSchema", () => {
  it("has correct @context", () => {
    expect(website["@context"]).toBe("https://schema.org")
  })

  it("has correct @type", () => {
    expect(website["@type"]).toBe("WebSite")
  })

  it("has correct name", () => {
    expect(website.name).toBe("Portfolio de Romain Blanchot")
  })

  it("has correct url", () => {
    expect(website.url).toBe("https://www.romainblanchot.com")
  })

  it("has inLanguage with fr and en", () => {
    expect(website.inLanguage).toEqual(["fr", "en"])
  })

  it("has author as Person type with correct name", () => {
    const author = website.author as Record<string, string>
    expect(author["@type"]).toBe("Person")
    expect(author.name).toBe("Romain Blanchot")
  })

  it("has correct datePublished", () => {
    expect(website.datePublished).toBe("2025-03-01")
  })
})
