// app/[locale]/client/layout.tsx
import { ReactElement } from 'react'
import { I18nProviderClient } from '../../locales/client'
 
// If you are using Next.js < 15, you don't need to await `params`:
// export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: ReactElement }) {
export default async function SubLayout({ params, children }: { params: Promise<{ locale: string }>, children: ReactElement }) {
  const { locale } = await params
 
  return (
    
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  )
}