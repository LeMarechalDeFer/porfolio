import React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("framer-motion", () => mocks.framerMotionMock)
vi.mock("next/link", () => mocks.nextLinkMock)
vi.mock("next/image", () => mocks.nextImageMock)
vi.mock("@/components/ui/button", () => mocks.buttonMock)
vi.mock("@/components/ui/card", () => mocks.cardMock)
vi.mock("@/components/ui/badge", () => mocks.badgeMock)
vi.mock("@/components/ui/tabs", () => mocks.tabsMock)

import MesServicesClient from "@/components/mes-services/mes-services"

describe("MesServicesClient", () => {
  it("renders page title 'mes-services.title'", () => {
    render(<MesServicesClient />)
    expect(screen.getByText("mes-services.title")).toBeInTheDocument()
  })

  it("renders page subtitle 'mes-services.subtitle'", () => {
    render(<MesServicesClient />)
    expect(screen.getByText("mes-services.subtitle")).toBeInTheDocument()
  })

  it("renders 3 category tabs (dev, sys, ai)", () => {
    render(<MesServicesClient />)
    const tabs = screen.getAllByRole("tab")
    expect(tabs).toHaveLength(3)

    expect(screen.getByText("mes-services.category.dev")).toBeInTheDocument()
    expect(screen.getByText("mes-services.category.sys")).toBeInTheDocument()
    expect(screen.getByText("mes-services.category.ai")).toBeInTheDocument()
  })

  it("renders 9 service cards (3 per category, all visible since TabsContent renders all)", () => {
    render(<MesServicesClient />)
    const serviceTitles = [
      "mes-services.item.web.title",
      "mes-services.item.api.title",
      "mes-services.item.integration.title",
      "mes-services.item.cloud.title",
      "mes-services.item.devops.title",
      "mes-services.item.security.title",
      "mes-services.item.ai-integration.title",
      "mes-services.item.ml-pipelines.title",
      "mes-services.item.data-analysis.title",
    ]
    for (const title of serviceTitles) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it("renders service descriptions", () => {
    render(<MesServicesClient />)
    const descriptions = [
      "mes-services.item.web.description",
      "mes-services.item.api.description",
      "mes-services.item.integration.description",
      "mes-services.item.cloud.description",
      "mes-services.item.devops.description",
      "mes-services.item.security.description",
      "mes-services.item.ai-integration.description",
      "mes-services.item.ml-pipelines.description",
      "mes-services.item.data-analysis.description",
    ]
    for (const desc of descriptions) {
      expect(screen.getByText(desc)).toBeInTheDocument()
    }
  })

  it("renders skills badges for dev category services", () => {
    render(<MesServicesClient />)
    const devSkills = [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "REST",
      "GraphQL",
      "Express",
      "Apollo",
      "Microservices",
      "ESB",
      "Middleware",
    ]
    for (const skill of devSkills) {
      expect(screen.getByText(skill)).toBeInTheDocument()
    }
  })

  it("renders skills badges for sys category services", () => {
    render(<MesServicesClient />)
    const sysSkills = [
      "AWS",
      "Azure",
      "GCP",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "GitLab CI",
      "Ansible",
      "OWASP",
      "GDPR",
      "ISO 27001",
    ]
    for (const skill of sysSkills) {
      expect(screen.getByText(skill)).toBeInTheDocument()
    }
  })

  it("renders skills badges for AI category services", () => {
    render(<MesServicesClient />)
    const aiSkills = [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "MLflow",
      "Kubeflow",
      "Apache Airflow",
      "Pandas",
      "Spark",
      "Tableau",
      "Power BI",
    ]
    for (const skill of aiSkills) {
      expect(screen.getByText(skill)).toBeInTheDocument()
    }
  })

  it("has CTA section with 'mes-services.call-to-action.title'", () => {
    render(<MesServicesClient />)
    expect(screen.getByText("mes-services.call-to-action.title")).toBeInTheDocument()
  })

  it("renders CTA description and start button", () => {
    render(<MesServicesClient />)
    expect(screen.getByText("mes-services.call-to-action.description")).toBeInTheDocument()
    expect(screen.getByText("mes-services.call-to-action.start")).toBeInTheDocument()
  })

  it("renders CTA button linking to /demarrer-votre-projet", () => {
    render(<MesServicesClient />)
    const ctaLink = screen.getByText("mes-services.call-to-action.start").closest("a")
    expect(ctaLink).toHaveAttribute("href", "/demarrer-votre-projet")
  })

  it("renders 'learn more' buttons for each service card", () => {
    render(<MesServicesClient />)
    const learnMoreButtons = screen.getAllByText("mes-services.learn-more")
    expect(learnMoreButtons).toHaveLength(9)
  })
})
