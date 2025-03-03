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

// const allowedOrigins = [
//   'https://www.romainblanchot.com',
//   'https://romainblanchot.com',
//   'https://www.romainblanchot.com/en',
//   'https://romainblanchot.com/en',
// ]
