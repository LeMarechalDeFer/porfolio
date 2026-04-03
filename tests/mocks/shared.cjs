/**
 * Shared mock factories for Vitest.
 *
 * This file is CommonJS (.cjs) so it can be loaded via require() inside vi.hoisted().
 * It receives `vi` as a parameter to createMocks() since vitest cannot be required in CJS.
 *
 * Usage in test files:
 *
 *   const mocks = vi.hoisted(() => {
 *     const { createMocks } = require("../mocks/shared.cjs")
 *     return createMocks(vi)
 *   })
 *   vi.mock("framer-motion", () => mocks.framerMotionMock)
 *   vi.mock("next/link", () => mocks.nextLinkMock)
 */
const React = require("react")

function createMocks(vi) {
  // -------------------------------------------------------------------------
  // framer-motion (full variant with useAnimation + useInView)
  // -------------------------------------------------------------------------
  const framerMotionMock = {
    motion: new Proxy(
      {},
      {
        get(_target, prop) {
          if (typeof prop === "string") {
            return React.forwardRef(function MotionProxy(
              {
                children,
                initial,
                animate,
                exit,
                whileInView,
                viewport,
                transition,
                variants,
                whileHover,
                whileTap,
                ...rest
              },
              ref,
            ) {
              return React.createElement(prop, { ...rest, ref }, children)
            })
          }
          return undefined
        },
      },
    ),
    AnimatePresence: function AnimatePresence({ children }) {
      return React.createElement(React.Fragment, null, children)
    },
    useAnimation: () => ({ start: vi.fn() }),
    useInView: () => true,
  }

  // -------------------------------------------------------------------------
  // framer-motion (minimal — no useAnimation/useInView)
  // Used by about.test.tsx & heroAnimated.test.tsx
  // -------------------------------------------------------------------------
  const framerMotionMinimalMock = {
    motion: new Proxy(
      {},
      {
        get(_target, prop) {
          if (typeof prop === "string") {
            return React.forwardRef(function MotionMinimalProxy(
              {
                children,
                initial,
                animate,
                exit,
                whileInView,
                viewport,
                transition,
                variants,
                ...rest
              },
              ref,
            ) {
              return React.createElement(prop, { ...rest, ref }, children)
            })
          }
          return undefined
        },
      },
    ),
    AnimatePresence: function AnimatePresence({ children }) {
      return React.createElement(React.Fragment, null, children)
    },
  }

  // -------------------------------------------------------------------------
  // framer-motion (popup variant — no useAnimation/useInView, same as minimal
  // but kept separate for clarity)
  // Used by newsletter-popup.test.tsx
  // -------------------------------------------------------------------------
  const framerMotionPopupMock = {
    motion: new Proxy(
      {},
      {
        get(_target, prop) {
          if (typeof prop === "string") {
            return React.forwardRef(function MotionPopupProxy(
              {
                children,
                initial,
                animate,
                exit,
                whileInView,
                viewport,
                transition,
                variants,
                whileHover,
                whileTap,
                ...rest
              },
              ref,
            ) {
              return React.createElement(prop, { ...rest, ref }, children)
            })
          }
          return undefined
        },
      },
    ),
    AnimatePresence: function AnimatePresence({ children }) {
      return React.createElement(React.Fragment, null, children)
    },
  }

  // -------------------------------------------------------------------------
  // next/link
  // -------------------------------------------------------------------------
  const nextLinkMock = {
    default: function MockLink({ children, href, ...props }) {
      return React.createElement("a", { href, ...props }, children)
    },
  }

  // -------------------------------------------------------------------------
  // next/image (strips `fill` prop)
  // -------------------------------------------------------------------------
  const nextImageMock = {
    default: function MockImage(props) {
      const { fill, ...rest } = props
      return React.createElement("img", rest)
    },
  }

  // -------------------------------------------------------------------------
  // next/image (strips `fill` and `placeholder`)
  // -------------------------------------------------------------------------
  const nextImageNoPlaceholderMock = {
    default: function MockImageNoPlaceholder(props) {
      const { fill, placeholder, ...rest } = props
      return React.createElement("img", rest)
    },
  }

  // -------------------------------------------------------------------------
  // @/locales/client (full: useI18n + useCurrentLocale + useChangeLocale)
  // -------------------------------------------------------------------------
  const localesClientMock = {
    useI18n: () => (key) => key,
    useCurrentLocale: () => "fr",
    useChangeLocale: () => vi.fn(),
  }

  // -------------------------------------------------------------------------
  // @/locales/client (minimal: useI18n only)
  // -------------------------------------------------------------------------
  const localesClientMinimalMock = {
    useI18n: () => (key) => key,
  }

  // -------------------------------------------------------------------------
  // @/locales/client (useI18n + useCurrentLocale, no useChangeLocale)
  // -------------------------------------------------------------------------
  const localesClientNoChangeMock = {
    useI18n: () => (key) => key,
    useCurrentLocale: () => "fr",
  }

  // -------------------------------------------------------------------------
  // next-international/server
  // -------------------------------------------------------------------------
  const nextInternationalServerMock = {
    setStaticParamsLocale: vi.fn(),
  }

  // -------------------------------------------------------------------------
  // @/locales/server
  // -------------------------------------------------------------------------
  const localesServerMock = {
    getI18n: vi.fn().mockResolvedValue((key) => key),
  }

  // -------------------------------------------------------------------------
  // @/components/ui/button (forwardRef variant with asChild stripped)
  // -------------------------------------------------------------------------
  const buttonMock = {
    Button: React.forwardRef(function MockButton({ children, asChild, ...props }, ref) {
      return React.createElement("button", { ref, ...props }, children)
    }),
  }

  // -------------------------------------------------------------------------
  // @/components/ui/button (simple variant — no forwardRef)
  // -------------------------------------------------------------------------
  const buttonSimpleMock = {
    Button: function MockButtonSimple({ children, ...props }) {
      return React.createElement("button", props, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/button (simple variant with asChild stripped)
  // -------------------------------------------------------------------------
  const buttonSimpleAsChildMock = {
    Button: function MockButtonAsChild({ children, asChild, ...props }) {
      return React.createElement("button", props, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/button (onClick variant)
  // -------------------------------------------------------------------------
  const buttonOnClickMock = {
    Button: function MockButtonOnClick({ children, onClick, ...props }) {
      return React.createElement("button", { onClick, ...props }, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/card (full)
  // -------------------------------------------------------------------------
  const cardMock = {
    Card: function MockCard({ children, ...props }) {
      return React.createElement("div", props, children)
    },
    CardContent: function MockCardContent({ children }) {
      return React.createElement("div", null, children)
    },
    CardDescription: function MockCardDescription({ children }) {
      return React.createElement("p", null, children)
    },
    CardFooter: function MockCardFooter({ children }) {
      return React.createElement("div", null, children)
    },
    CardHeader: function MockCardHeader({ children }) {
      return React.createElement("div", null, children)
    },
    CardTitle: function MockCardTitle({ children }) {
      return React.createElement("h3", null, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/card (cookie-consent variant with props-forwarding on CardFooter)
  // -------------------------------------------------------------------------
  const cardCookieConsentMock = {
    Card: function MockCard({ children, ...props }) {
      return React.createElement("div", props, children)
    },
    CardContent: function MockCardContent({ children }) {
      return React.createElement("div", null, children)
    },
    CardDescription: function MockCardDescription({ children }) {
      return React.createElement("p", null, children)
    },
    CardFooter: function MockCardFooter({ children, ...props }) {
      return React.createElement("div", props, children)
    },
    CardHeader: function MockCardHeader({ children }) {
      return React.createElement("div", null, children)
    },
    CardTitle: function MockCardTitle({ children }) {
      return React.createElement("h3", null, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/card (minimal: Card + CardContent only)
  // -------------------------------------------------------------------------
  const cardMinimalMock = {
    Card: function MockCard({ children, ...props }) {
      return React.createElement("div", props, children)
    },
    CardContent: function MockCardContent({ children }) {
      return React.createElement("div", null, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/badge
  // -------------------------------------------------------------------------
  const badgeMock = {
    Badge: function MockBadge({ children, ...props }) {
      return React.createElement("span", props, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/input (forwardRef)
  // -------------------------------------------------------------------------
  const inputMock = {
    Input: React.forwardRef(function MockInput(props, ref) {
      return React.createElement("input", { ref, ...props })
    }),
  }

  // -------------------------------------------------------------------------
  // @/components/ui/tabs
  // -------------------------------------------------------------------------
  const tabsMock = {
    Tabs: function MockTabs({ children, ...props }) {
      return React.createElement("div", props, children)
    },
    TabsContent: function MockTabsContent({ children, value }) {
      return React.createElement("div", { "data-value": value }, children)
    },
    TabsList: function MockTabsList({ children }) {
      return React.createElement("div", { role: "tablist" }, children)
    },
    TabsTrigger: function MockTabsTrigger({ children, value, ...props }) {
      return React.createElement("button", { role: "tab", "data-value": value, ...props }, children)
    },
  }

  // -------------------------------------------------------------------------
  // sonner
  // -------------------------------------------------------------------------
  const sonnerMock = {
    toast: { success: vi.fn(), error: vi.fn() },
  }

  // -------------------------------------------------------------------------
  // @hookform/resolvers/zod
  // -------------------------------------------------------------------------
  const zodResolverMock = {
    zodResolver: () => vi.fn(),
  }

  // -------------------------------------------------------------------------
  // @/components/ui/form (form element wrapper)
  // -------------------------------------------------------------------------
  const formMock = {
    Form: function MockForm({ children }) {
      return React.createElement("form", null, children)
    },
    FormField: function MockFormField({ render }) {
      return render({
        field: {
          value: "",
          onChange: vi.fn(),
          onBlur: vi.fn(),
          name: "email",
          ref: vi.fn(),
        },
      })
    },
    FormItem: function MockFormItem({ children }) {
      return React.createElement("div", null, children)
    },
    FormLabel: function MockFormLabel({ children }) {
      return React.createElement("label", null, children)
    },
    FormControl: function MockFormControl({ children }) {
      return React.createElement("div", null, children)
    },
    FormMessage: function MockFormMessage() {
      return null
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/form (div wrapper variant)
  // -------------------------------------------------------------------------
  const formDivMock = {
    Form: function MockFormDiv({ children, ...props }) {
      return React.createElement("div", props, children)
    },
    FormField: function MockFormField({ render }) {
      return render({
        field: {
          value: "",
          onChange: vi.fn(),
          onBlur: vi.fn(),
          name: "email",
          ref: vi.fn(),
        },
      })
    },
    FormItem: function MockFormItem({ children }) {
      return React.createElement("div", null, children)
    },
    FormLabel: function MockFormLabel({ children }) {
      return React.createElement("label", null, children)
    },
    FormControl: function MockFormControl({ children }) {
      return React.createElement("div", null, children)
    },
    FormMessage: function MockFormMessage() {
      return null
    },
  }

  // -------------------------------------------------------------------------
  // @/lib/schema/schema.newsletter
  // -------------------------------------------------------------------------
  const newsletterSchemaMock = {
    newsletterSchema: () => ({}),
    NewsletterSchemaType: {},
  }

  // -------------------------------------------------------------------------
  // @/components/ui/switch
  // -------------------------------------------------------------------------
  const switchMock = {
    Switch: function MockSwitch({ checked, onCheckedChange, disabled, ...props }) {
      return React.createElement("button", {
        role: "switch",
        "aria-checked": checked,
        disabled: disabled,
        onClick: () => onCheckedChange && onCheckedChange(!checked),
        ...props,
      })
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/label
  // -------------------------------------------------------------------------
  const labelMock = {
    Label: function MockLabel({ children, ...props }) {
      return React.createElement("label", props, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/dialog
  // -------------------------------------------------------------------------
  const dialogMock = {
    Dialog: function MockDialog({ children }) {
      return React.createElement("div", null, children)
    },
    DialogContent: function MockDialogContent({ children }) {
      return React.createElement("div", null, children)
    },
    DialogDescription: function MockDialogDescription({ children }) {
      return React.createElement("p", null, children)
    },
    DialogHeader: function MockDialogHeader({ children }) {
      return React.createElement("div", null, children)
    },
    DialogTitle: function MockDialogTitle({ children }) {
      return React.createElement("h4", null, children)
    },
    DialogTrigger: function MockDialogTrigger({ children }) {
      return React.createElement("div", null, children)
    },
  }

  // -------------------------------------------------------------------------
  // @/components/ui/dropdown-menu
  // -------------------------------------------------------------------------
  const dropdownMenuMock = {
    DropdownMenu: function MockDropdownMenu({ children }) {
      return React.createElement("div", null, children)
    },
    DropdownMenuContent: function MockDropdownMenuContent({ children }) {
      return React.createElement("div", null, children)
    },
    DropdownMenuItem: function MockDropdownMenuItem({ children, onClick, ...props }) {
      return React.createElement("button", { onClick, ...props }, children)
    },
    DropdownMenuTrigger: function MockDropdownMenuTrigger({ children }) {
      return React.createElement("div", null, children)
    },
  }

  // -------------------------------------------------------------------------
  // next-themes
  // -------------------------------------------------------------------------
  const nextThemesMock = {
    useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
  }

  return {
    framerMotionMock,
    framerMotionMinimalMock,
    framerMotionPopupMock,
    nextLinkMock,
    nextImageMock,
    nextImageNoPlaceholderMock,
    localesClientMock,
    localesClientMinimalMock,
    localesClientNoChangeMock,
    nextInternationalServerMock,
    localesServerMock,
    buttonMock,
    buttonSimpleMock,
    buttonSimpleAsChildMock,
    buttonOnClickMock,
    cardMock,
    cardCookieConsentMock,
    cardMinimalMock,
    badgeMock,
    inputMock,
    tabsMock,
    sonnerMock,
    zodResolverMock,
    formMock,
    formDivMock,
    newsletterSchemaMock,
    switchMock,
    labelMock,
    dialogMock,
    dropdownMenuMock,
    nextThemesMock,
  }
}

module.exports = { createMocks }
