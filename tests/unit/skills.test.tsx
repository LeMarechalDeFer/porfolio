import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("framer-motion", () => mocks.framerMotionMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("next/image", () => mocks.nextImageMock)
vi.mock("@/components/ui/card", () => mocks.cardMock)
vi.mock("@/components/ui/badge", () => mocks.badgeMock)
vi.mock("@/components/ui/dialog", () => mocks.dialogMock)

import Skills from "@/components/landingPage/skills"

describe("Skills", () => {
  it("renders the section with id='skills'", () => {
    const { container } = render(<Skills />)
    const section = container.querySelector("section#skills")
    expect(section).toBeInTheDocument()
  })

  it("renders a heading with 'skills.title'", () => {
    render(<Skills />)
    expect(screen.getByText("skills.title")).toBeInTheDocument()
  })

  it("renders 5 category cards (frontend, backend, database, devops, ai)", () => {
    render(<Skills />)
    const categories = [
      "skills.category.frontend",
      "skills.category.backend",
      "skills.category.database",
      "skills.category.devops",
      "skills.category.ai",
    ]
    for (const category of categories) {
      expect(screen.getByText(category)).toBeInTheDocument()
    }
  })

  it("renders frontend skill badges", () => {
    render(<Skills />)
    const frontendSkills = ["React.js", "Next.js", "TypeScript", "HTML/CSS", "Tailwind CSS"]
    for (const skill of frontendSkills) {
      const elements = screen.getAllByText(skill)
      expect(elements.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("renders backend skill badges", () => {
    render(<Skills />)
    const backendSkills = ["Node.js", "Express.js", "C/C++", "Java"]
    for (const skill of backendSkills) {
      const elements = screen.getAllByText(skill)
      expect(elements.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("renders database skill badges", () => {
    render(<Skills />)
    const dbSkills = ["PostgreSQL", "MongoDB", "Redis"]
    for (const skill of dbSkills) {
      const elements = screen.getAllByText(skill)
      expect(elements.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("renders devops skill badges", () => {
    render(<Skills />)
    const devopsSkills = ["Docker", "Git", "CI/CD"]
    for (const skill of devopsSkills) {
      const elements = screen.getAllByText(skill)
      expect(elements.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("renders AI skill badges", () => {
    render(<Skills />)
    const aiSkills = ["Machine Learning", "NLP"]
    for (const skill of aiSkills) {
      const elements = screen.getAllByText(skill)
      expect(elements.length).toBeGreaterThanOrEqual(1)
    }
  })

  it("renders all 17 skill badges total", () => {
    render(<Skills />)
    const allSkills = [
      "React.js",
      "Next.js",
      "TypeScript",
      "HTML/CSS",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "C/C++",
      "Java",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Git",
      "CI/CD",
      "Machine Learning",
      "NLP",
    ]
    for (const skill of allSkills) {
      const elements = screen.getAllByText(skill)
      expect(elements.length).toBe(2)
    }
  })

  it("renders 5 category headings", () => {
    render(<Skills />)
    const headings = screen.getAllByRole("heading", { level: 3 })
    expect(headings).toHaveLength(5)
  })

  it("renders dialog content for skill details", () => {
    render(<Skills />)
    const dialogTitles = screen.getAllByRole("heading", { level: 4 })
    expect(dialogTitles.length).toBe(34)
  })
})
