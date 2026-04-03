import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen, fireEvent, waitFor } from "@testing-library/react"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mocks = vi.hoisted(() => require("../mocks/shared.cjs").createMocks(vi))

vi.mock("@/locales/client", () => mocks.localesClientMock)
vi.mock("sonner", () => mocks.sonnerMock)
vi.mock("@hookform/resolvers/zod", () => mocks.zodResolverMock)
vi.mock("@/components/ui/input", () => mocks.inputMock)
vi.mock("@/components/ui/button", () => mocks.buttonSimpleMock)

// Action mock
vi.mock("@/app/[locale]/actions/action.project-form", () => ({
  projectFormRequest: vi.fn(),
}))

// react-hook-form mock (project-form-specific)
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    control: {},
    handleSubmit:
      (fn: (data: Record<string, string>) => unknown) =>
      (e?: { preventDefault?: () => void }) => {
        e?.preventDefault?.()
        return fn({})
      },
    formState: { isSubmitting: false },
    reset: vi.fn(),
  }),
}))

// Schema mock
vi.mock("@/lib/schema/schema.project-form", () => ({
  projectFormSchema: () => ({}),
  ProjectFormSchema: {},
}))

// lucide-react mock
vi.mock("lucide-react", () => ({
  Loader2: (props: React.SVGProps<SVGSVGElement>) => <svg data-testid="loader-icon" {...props} />,
}))

// UI component mocks (project-form-specific)
vi.mock("@/components/ui/form", () => ({
  Form: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => <div {...props}>{children}</div>,
  FormField: ({ render, name }: { render: (args: { field: Record<string, unknown> }) => React.ReactNode; name: string }) => {
    const field = {
      value: "",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name,
      ref: vi.fn(),
    }
    return (
      <div data-testid={`field-${name}`}>{render({ field })}</div>
    )
  },
  FormItem: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  FormLabel: ({ children, ...props }: React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>) => (
    <label {...props}>{children}</label>
  ),
  FormControl: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  FormMessage: () => null,
}))

vi.mock("@/components/ui/select", () => ({
  Select: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  SelectContent: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children?: React.ReactNode; value: string }) => (
    <option value={value}>{children}</option>
  ),
  SelectTrigger: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
    <div {...props}>{children}</div>
  ),
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
}))

vi.mock("@/components/ui/textarea", () => {
  const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>((props, ref) => (
    <textarea ref={ref} {...props} />
  ))
  Textarea.displayName = "Textarea"
  return { Textarea }
})

import ProjectForm from "@/components/reservation/project-form"
import { projectFormRequest } from "@/app/[locale]/actions/action.project-form"
import { toast } from "sonner"

const mockProjectFormRequest = vi.mocked(projectFormRequest)
const mockToast = vi.mocked(toast)

describe("ProjectForm", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders all form fields", () => {
    render(<ProjectForm />)

    const expectedFields = [
      "name",
      "surname",
      "email",
      "company",
      "sector",
      "budget",
      "timeline",
      "mainObjective",
      "projectIdea",
      "targetAudience",
      "expectedResults",
      "technicalPreferences",
      "otherDetails",
    ]

    for (const fieldName of expectedFields) {
      expect(screen.getByTestId(`field-${fieldName}`)).toBeInTheDocument()
    }
  })

  it("has submit button with i18n key text", () => {
    render(<ProjectForm />)

    const submitButton = screen.getByText("project-form.submit")
    expect(submitButton).toBeInTheDocument()
    expect(submitButton.tagName).toBe("BUTTON")
    expect(submitButton).toHaveAttribute("type", "submit")
  })

  it("renders correct labels for text input fields", () => {
    render(<ProjectForm />)

    const expectedLabels = [
      "project-form.name",
      "project-form.surname",
      "project-form.email",
      "project-form.company",
    ]

    for (const labelText of expectedLabels) {
      expect(screen.getByText(labelText)).toBeInTheDocument()
    }
  })

  it("renders correct labels for select fields", () => {
    render(<ProjectForm />)

    const expectedLabels = [
      "project-form.sector",
      "project-form.budget",
      "project-form.timeline",
      "project-form.mainObjective",
    ]

    for (const labelText of expectedLabels) {
      // Select labels appear as FormLabel and SelectValue placeholder
      const elements = screen.getAllByText(labelText)
      expect(elements.length).toBeGreaterThan(0)
    }
  })

  it("renders correct labels for textarea fields", () => {
    render(<ProjectForm />)

    const expectedLabels = [
      "project-form.projectIdea",
      "project-form.targetAudience",
      "project-form.expectedResults",
      "project-form.technicalPreferences",
      "project-form.otherDetails",
    ]

    for (const labelText of expectedLabels) {
      expect(screen.getByText(labelText)).toBeInTheDocument()
    }
  })

  it("renders sector select options", () => {
    render(<ProjectForm />)

    expect(screen.getByText("project-form.sector.tech")).toBeInTheDocument()
    expect(screen.getByText("project-form.sector.health")).toBeInTheDocument()
    expect(
      screen.getByText("project-form.sector.finance"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.sector.education"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.sector.ecommerce"),
    ).toBeInTheDocument()
    expect(screen.getByText("project-form.sector.other")).toBeInTheDocument()
  })

  it("renders budget select options", () => {
    render(<ProjectForm />)

    expect(
      screen.getByText("project-form.budget.less1000"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.budget.1000-5000"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.budget.5000-10000"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.budget.more10000"),
    ).toBeInTheDocument()
  })

  it("renders timeline select options", () => {
    render(<ProjectForm />)

    expect(
      screen.getByText("project-form.timeline.urgent"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.timeline.1-3months"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.timeline.3+months"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.timeline.flexible"),
    ).toBeInTheDocument()
  })

  it("renders mainObjective select options", () => {
    render(<ProjectForm />)

    expect(
      screen.getByText("project-form.mainObjective.present"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.mainObjective.sell"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.mainObjective.automate"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.mainObjective.community"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("project-form.mainObjective.other"),
    ).toBeInTheDocument()
  })

  it("submit button is not disabled when form is not submitting", () => {
    render(<ProjectForm />)

    const submitButton = screen.getByText("project-form.submit")
    expect(submitButton).not.toBeDisabled()
  })

  it("renders the form element", () => {
    const { container } = render(<ProjectForm />)
    const form = container.querySelector("form")
    expect(form).toBeInTheDocument()
  })

  it("shows success toast on successful submission", async () => {
    mockProjectFormRequest.mockResolvedValue({ success: true })

    const { container } = render(<ProjectForm />)
    const form = container.querySelector("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockProjectFormRequest).toHaveBeenCalled()
      expect(mockToast.success).toHaveBeenCalled()
    })
  })

  it("shows error toast on failed submission", async () => {
    mockProjectFormRequest.mockResolvedValue({ success: false, message: "Error occurred" })

    const { container } = render(<ProjectForm />)
    const form = container.querySelector("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalled()
    })
  })

  it("shows error toast on network error", async () => {
    mockProjectFormRequest.mockRejectedValue(new Error("Network error"))

    const { container } = render(<ProjectForm />)
    const form = container.querySelector("form")!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalled()
    })
  })
})
