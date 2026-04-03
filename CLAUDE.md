# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Freelance portfolio website for Romain Blanchot (romainblanchot.com). Built with Next.js 16 (App Router, Turbopack), React 19.2, TypeScript 5.9, and deployed on Vercel. Bilingual (FR/EN) with French as the primary language.

## Commands

```bash
pnpm dev              # Start dev server with Turbopack (localhost:3000)
pnpm build            # Production build (Turbopack by default)
pnpm lint             # ESLint (eslint .)
pnpm format           # Prettier — format all files
pnpm format:check     # Prettier — check formatting (CI)
pnpm test             # Run all Vitest tests
pnpm test -- tests/unit/utils.test.ts   # Run a single test file
pnpm test:watch       # Vitest in watch mode
pnpm test:coverage    # Vitest with V8 coverage
pnpm test:e2e         # Playwright E2E tests (Chromium + Mobile Chrome)
pnpm test:e2e:ui      # Playwright with interactive UI
```

Prisma commands (when database is connected):

```bash
npx prisma migrate dev --name <migration_name>
npx prisma migrate deploy
```

## Architecture

### Routing & i18n

All pages live under `src/app/[locale]/` using the `next-international` library. The `[locale]` param is `fr` or `en`.

- **Server-side i18n**: Import `getI18n` / `getScopedI18n` from `@/locales/server`
- **Client-side i18n**: Import `useI18n` / `useScopedI18n` from `@/locales/client`
- **Translation files**: `src/locales/fr.ts` and `src/locales/en.ts` (TypeScript objects, not JSON)

The root layout at `src/app/[locale]/layout.tsx` wraps the app in `I18nProviderClient`, `ThemeProvider` (next-themes), and `MyStatsig` (feature flags).

### Proxy (i18n routing)

`src/proxy.ts` handles locale detection/rewriting via `next-international/middleware`. Next.js 16 uses the `proxy` convention (renamed from `middleware`).

### Server Actions

Backend logic uses Next.js Server Actions (not API routes):

- `src/app/[locale]/actions/action.newsletter.ts` - Newsletter subscription
- `src/app/[locale]/actions/action.project-form.ts` - Project quote form

### Key Directories

- `src/components/ui/` - Shadcn/ui components (new-york style, Radix primitives). Do not manually edit these.
- `src/components/email/` - React Email templates (sent via Resend)
- `src/components/landingPage/` - Main site layout components (header, footer, hero, etc.)
- `src/lib/schema/` - Zod v4 validation schemas for forms (uses `{ error: "..." }` not `{ message: "..." }`)
- `src/lib/utils.ts` - `cn()` helper (clsx + tailwind-merge)

### Testing

- **Unit/Integration**: Vitest + React Testing Library + MSW for mocking
- **E2E**: Playwright (Chromium desktop + Pixel 5 mobile)
- **Test files**: `tests/unit/`, `tests/integration/`, `tests/e2e/`
- **Mock handlers**: `tests/mocks/`
- **Coverage excludes**: `src/locales/**`, `src/components/ui/**`, `src/components/email/**`

### Database

PostgreSQL via Prisma. Two models: `NewsletterSubscription` and `ProjectForm`. Requires `DATABASE_URL` and `DIRECT_URL` env vars. Database connections are currently disconnected (TODO state).

### Styling

Tailwind CSS v4 with `@tailwindcss/postcss`. CSS variables (HSL) for theming, dark mode via class strategy. Framer Motion for animations. Path alias: `@/*` maps to `./src/*`.

Note: Tailwind v4 renames — use `shadow-xs` (not `shadow-sm`), `rounded-xs` (not `rounded-sm`), `outline-hidden` (not `outline-none`), `backdrop-blur-xs` (not `backdrop-blur-sm`).

## CI/CD

GitHub Actions CI at `.github/workflows/ci.yml` runs on push/PR to `main` and `integration`:

```
ci-lint ─────────┐
ci-format ───────┤
ci-typecheck ────┼──→ ci-build ──→ ci-e2e
ci-test ─────────┘
       └────────────→ ci-sonarqube
```

Playwright uses `pnpm start` (production server) in CI and `pnpm dev` locally. SonarCloud receives LCOV coverage from the test job.

## Environment Variables

See `.env.example`. Required: `RESEND_API_KEY` for email sending.
