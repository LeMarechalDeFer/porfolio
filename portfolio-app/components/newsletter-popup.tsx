"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { X, Send, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useI18n } from "@/locales/client"
import RomainBlanchot from "@/public/photoProfilRomain.jpg"

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useI18n()
  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fermé la popup ou s'est inscrit
    const hasClosedPopup = localStorage.getItem("newsletterPopupClosed")
    const hasSubscribed = localStorage.getItem("newsletterSubscribed")

    if (!hasClosedPopup && !hasSubscribed) {
      // Afficher la popup après 30 secondes
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 30000) // 30 secondes

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Mémoriser que l'utilisateur a fermé la popup
    localStorage.setItem("newsletterPopupClosed", "true")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Ici, vous ajouteriez la logique pour envoyer l'email à votre service de newsletter
    console.log("Email soumis:", email)

    toast.success(t("newsletter-popup.toast.success.title"), {
      description: t("newsletter-popup.toast.success.description"),
    })

    // Mémoriser que l'utilisateur s'est inscrit
    localStorage.setItem("newsletterSubscribed", "true")

    setEmail("")
    setIsSubmitting(false)
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="overflow-hidden border-primary/10 shadow-xl">
              <CardContent className="p-0">
                <div className="relative h-32 bg-gradient-to-r from-primary/80 to-primary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-20 w-20 text-white/20" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:bg-white/20 z-10"
                    onClick={handleClose}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">{t("newsletter-popup.close")}</span>
                  </Button>
                </div>

                <div className="relative p-6">
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 rounded-full bg-background p-1 shadow-lg">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
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

                  <div className="mt-14 text-center space-y-3">
                    <h3 className="text-xl font-bold">{t("newsletter-popup.title")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("newsletter-popup.description")}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <Input
                        type="email"
                        placeholder={t("newsletter-popup.email.placeholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-10"
                      />

                      <Button type="submit" className="w-full group" disabled={isSubmitting}>
                        {isSubmitting ? (
                          t("newsletter-popup.button.loading")
                        ) : (
                          <>
                            {t("newsletter-popup.button")}
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground pt-2">
                      {t("newsletter-popup.disclaimer")}{" "}
                      <Link href="/politique-de-confidentialite" className="underline hover:text-primary">
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

