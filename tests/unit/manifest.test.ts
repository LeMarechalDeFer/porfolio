import { describe, it, expect } from "vitest"
import manifest from "@/app/manifest"

describe("manifest()", () => {
  const result = manifest()

  it("returns correct name", () => {
    expect(result.name).toBe("Romain Blanchot")
  })

  it("returns correct short_name", () => {
    expect(result.short_name).toBe("Romain Blanchot")
  })

  it("returns a description string", () => {
    expect(result.description).toBeDefined()
    expect(typeof result.description).toBe("string")
    expect(result.description!.length).toBeGreaterThan(0)
  })

  it("has proper start_url", () => {
    expect(result.start_url).toBe("/")
  })

  it("has standalone display mode", () => {
    expect(result.display).toBe("standalone")
  })

  it("has correct background_color", () => {
    expect(result.background_color).toBe("#ffffff")
  })

  it("has correct theme_color", () => {
    expect(result.theme_color).toBe("#ffffff")
  })

  it("has 3 icons", () => {
    expect(result.icons).toHaveLength(3)
  })

  it("has favicon.ico with 48x48 size", () => {
    const favicon = result.icons!.find((icon) => icon.src === "/favicon.ico")
    expect(favicon).toBeDefined()
    expect(favicon!.sizes).toBe("48x48")
    expect(favicon!.type).toBe("image/x-icon")
  })

  it("has 192x192 PNG icon with maskable purpose", () => {
    const icon192 = result.icons!.find((icon) => icon.sizes === "192x192")
    expect(icon192).toBeDefined()
    expect(icon192!.src).toBe("/favicon-192x192.png")
    expect(icon192!.type).toBe("image/png")
    expect(icon192!.purpose).toBe("maskable")
  })

  it("has 512x512 PNG icon with maskable purpose", () => {
    const icon512 = result.icons!.find((icon) => icon.sizes === "512x512")
    expect(icon512).toBeDefined()
    expect(icon512!.src).toBe("/favicon-512x512.png")
    expect(icon512!.type).toBe("image/png")
    expect(icon512!.purpose).toBe("maskable")
  })
})
