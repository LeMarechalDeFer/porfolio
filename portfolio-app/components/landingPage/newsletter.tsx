"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useI18n } from "@/locales/client"
import Link from "next/link"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const t = useI18n()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Ici, vous ajouteriez la logique pour envoyer l'email à votre service de newsletter
    console.log("Email soumis:", email)
    toast.success(t("newsletter.success.title"), {
      description: t("newsletter.success.description"),
    })
    setEmail("")
  }

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">{t("newsletter.title")}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {t("newsletter.description")}
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex space-x-2">
          <Input
            type="email"
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow"
            aria-label={t("newsletter.placeholder")}
          />
          <Button type="submit">{t("newsletter.button")}</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {t("newsletter.disclaimer")}{" "}
          <Link href="/politique-de-confidentialite" className="underline hover:text-primary">
            {t("newsletter.privacy")}
          </Link>
          .
        </p>
      </form>
    </div>
  )
}
