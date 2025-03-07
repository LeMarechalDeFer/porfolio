// middleware.ts
import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'
 
const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  urlMappingStrategy: 'rewriteDefault'
})
 
export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}
 
export const config = {
  matcher: ['/((?!api|ingest|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}

// {
//   source: '/en/demarrer-votre-projet',
//   destination: '/en/start-your-project',
// },
// {
//   source: '/en/mes-services',
//   destination: '/en/my-services',
// },
// {
//   source: '/en/mes-projets',
//   destination: '/en/my-projects',
// },
// {
//   source: '/en/mes-competences',
//   destination: '/en/my-skills',
// },
// {
//   source: '/en/me-contacter',
//   destination: '/en/contact-me',
// },
// {
//   source: '/en/a-propos',
//   destination: '/en/about-me',
// },