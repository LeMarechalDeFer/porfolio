import { describe, it, expect } from "vitest"
import { organizationSchema, personSchema, webSiteSchema } from "@/components/schema-dts"

describe("organizationSchema", () => {
  it("has correct @context", () => {
    expect(organizationSchema["@context"]).toBe("https://schema.org")
  })

  it("has correct @type", () => {
    expect(organizationSchema["@type"]).toBe("Organization")
  })

  it("has correct name", () => {
    expect(organizationSchema.name).toBe("TransiTech")
  })

  it("has correct url", () => {
    expect(organizationSchema.url).toBe("https://www.romainblanchot.com")
  })

  it("has sameAs array with social links", () => {
    expect(Array.isArray(organizationSchema.sameAs)).toBe(true)
    const sameAs = organizationSchema.sameAs as string[]
    expect(sameAs).toContain("https://www.linkedin.com/in/romain-blanchot-449941284/")
    expect(sameAs).toContain("https://github.com/LeMarechalDeFer")
    expect(sameAs).toContain("https://www.instagram.com/romainblanchot/")
  })

  it("has address with correct type and details", () => {
    const address = organizationSchema.address as Record<string, string>
    expect(address["@type"]).toBe("PostalAddress")
    expect(address.addressLocality).toBe("Paris")
    expect(address.postalCode).toBe("75006")
    expect(address.addressCountry).toBe("FR")
  })

  it("has correct telephone", () => {
    expect(organizationSchema.telephone).toBe("+33 7 88 28 47 15")
  })

  it("has contactPoint array with customer support entry", () => {
    expect(Array.isArray(organizationSchema.contactPoint)).toBe(true)
    const contactPoints = organizationSchema.contactPoint as Array<Record<string, unknown>>
    expect(contactPoints).toHaveLength(1)
    expect(contactPoints[0]["@type"]).toBe("ContactPoint")
    expect(contactPoints[0].contactType).toBe("customer support")
    expect(contactPoints[0].email).toBe("blanchot@et.esiea.fr")
  })
})

describe("personSchema", () => {
  it("has correct @context", () => {
    expect(personSchema["@context"]).toBe("https://schema.org")
  })

  it("has correct @type", () => {
    expect(personSchema["@type"]).toBe("Person")
  })

  it("has correct name", () => {
    expect(personSchema.name).toBe("Romain Blanchot")
  })

  it("has a jobTitle string", () => {
    expect(typeof personSchema.jobTitle).toBe("string")
    expect((personSchema.jobTitle as string).length).toBeGreaterThan(0)
  })

  it("has correct url", () => {
    expect(personSchema.url).toBe("https://www.romainblanchot.com")
  })

  it("has sameAs array with social links", () => {
    expect(Array.isArray(personSchema.sameAs)).toBe(true)
    const sameAs = personSchema.sameAs as string[]
    expect(sameAs).toContain("https://www.linkedin.com/in/romain-blanchot-449941284/")
    expect(sameAs).toContain("https://github.com/LeMarechalDeFer")
  })

  it("has correct email", () => {
    expect(personSchema.email).toBe("mailto:blanchot@et.esiea.fr")
  })
})

describe("webSiteSchema", () => {
  it("has correct @context", () => {
    expect(webSiteSchema["@context"]).toBe("https://schema.org")
  })

  it("has correct @type", () => {
    expect(webSiteSchema["@type"]).toBe("WebSite")
  })

  it("has correct name", () => {
    expect(webSiteSchema.name).toBe("Portfolio de Romain Blanchot")
  })

  it("has correct url", () => {
    expect(webSiteSchema.url).toBe("https://www.romainblanchot.com")
  })

  it("has inLanguage with fr and en", () => {
    expect(webSiteSchema.inLanguage).toEqual(["fr", "en"])
  })

  it("has author as Person type with correct name", () => {
    const author = webSiteSchema.author as Record<string, string>
    expect(author["@type"]).toBe("Person")
    expect(author.name).toBe("Romain Blanchot")
  })

  it("has correct datePublished", () => {
    expect(webSiteSchema.datePublished).toBe("2025-03-01")
  })
})
