"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Send, Sparkles, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useI18n, useCurrentLocale } from "@/locales/client"
import RomainBlanchot from "@/public/photoProfilRomain.jpg"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useNewsletterForm } from "@/hooks/use-newsletter-form"

// 🕐 Délais en millisecondes - déplacés à l'extérieur du composant
const TIME_ON_SITE = 60 * 1000 // 60 secondes
const POPUP_INTERVAL = 24 * 60 * 60 * 1000 // 24 heures
const INACTIVITY_TIME = 60 * 1000 // 60 secondes
const PAGE_VIEW_THRESHOLD = 5 // 5 pages visitées

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false)
  const t = useI18n()
  const currentLocale = useCurrentLocale()

  const { form, onSubmit } = useNewsletterForm({ t, currentLocale })

  /* eslint-disable react-hooks/set-state-in-effect -- localStorage reads on mount require setState for hydration safety */
  useEffect(() => {
    const hasSubscribed = localStorage.getItem("newsletterSubscribed")
    if (hasSubscribed) {
      setHasCheckedStorage(true)
      return
    }

    const lastPopupShown = localStorage.getItem("lastNewsletterPopupShown")
    let pageViews = Number.parseInt(localStorage.getItem("pageViews") || "0", 10)
    const now = Date.now()

    const canShowPopup = !lastPopupShown || now - Number.parseInt(lastPopupShown) > POPUP_INTERVAL

    if (!canShowPopup) {
      setHasCheckedStorage(true)
      return
    }

    let popupTriggered = false

    const triggerPopupOnce = () => {
      if (popupTriggered || localStorage.getItem("newsletterSubscribed")) return
      popupTriggered = true
      setIsOpen(true)
      localStorage.setItem("lastNewsletterPopupShown", Date.now().toString())
    }

    const siteTimer = setTimeout(() => {
      if (canShowPopup) triggerPopupOnce()
    }, TIME_ON_SITE)

    pageViews += 1
    localStorage.setItem("pageViews", pageViews.toString())

    if (pageViews >= PAGE_VIEW_THRESHOLD && canShowPopup) {
      triggerPopupOnce()
      localStorage.setItem("pageViews", "0")
    }

    let inactivityTimer: NodeJS.Timeout
    const resetTimer = () => {
      if (localStorage.getItem("newsletterSubscribed") || popupTriggered) return

      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        if (canShowPopup) triggerPopupOnce()
      }, INACTIVITY_TIME)
    }

    document.addEventListener("mousemove", resetTimer)
    document.addEventListener("keydown", resetTimer)
    resetTimer()

    setHasCheckedStorage(true)

    return () => {
      clearTimeout(siteTimer)
      document.removeEventListener("mousemove", resetTimer)
      document.removeEventListener("keydown", resetTimer)
      clearTimeout(inactivityTimer)
    }
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  // ❌ Fermeture manuelle de la popup
  const handleClose = () => {
    setIsOpen(false)
  }

  if (!hasCheckedStorage) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-primary/10 overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="from-primary/80 to-primary relative h-32 overflow-hidden bg-gradient-to-r">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-20 w-20 text-white/20" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
                    onClick={handleClose}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">{t("newsletter-popup.close")}</span>
                  </Button>
                </div>

                <div className="relative p-6">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform">
                    <div className="bg-background h-24 w-24 rounded-full p-1 shadow-lg">
                      <div className="from-primary to-primary/60 flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br">
                        <Image
                          src={RomainBlanchot}
                          alt={t("newsletter-popup.image.alt")}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-14 space-y-3 text-center">
                    <h3 className="text-xl font-bold">{t("newsletter-popup.title")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t("newsletter-popup.description")}
                    </p>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("newsletter-popup.email.label")}</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder={t("newsletter-popup.email.placeholder")}
                                  {...field}
                                  className="h-10"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="group w-full"
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              {t("newsletter-popup.button")}
                              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>

                    <p className="text-muted-foreground pt-2 text-xs">
                      {t("newsletter-popup.disclaimer")}{" "}
                      <Link
                        href="/politique-de-confidentialite"
                        className="hover:text-primary underline"
                      >
                        {t("newsletter-popup.disclaimer.link")}
                      </Link>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
