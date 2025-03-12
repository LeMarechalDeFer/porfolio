"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { X, Send, Sparkles, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useI18n, useCurrentLocale } from "@/locales/client"
import RomainBlanchot from "@/public/photoProfilRomain.jpg"

import { newsletterSchema, NewsletterSchemaType } from "@/lib/schema/schema.newsletter"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { subscribeToNewsletter } from "@/app/[locale]/actions/action.newsletter"

// 🕐 Délais en millisecondes - déplacés à l'extérieur du composant
const TIME_ON_SITE = 60 * 1000; // 60 secondes
const POPUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 heures
const INACTIVITY_TIME = 60 * 1000; // 60 secondes
const PAGE_VIEW_THRESHOLD = 5; // 5 pages visitées

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false)
  const t = useI18n()
  const currentLocale = useCurrentLocale(); 

  const form = useForm<NewsletterSchemaType>({
    resolver: zodResolver(newsletterSchema(t)),
    defaultValues: {
      email: "",
      // name: "",
      language: currentLocale,
    },
  })

  
  useEffect(() => {
    form.setValue("language", currentLocale);
  }, [currentLocale, form.setValue, form]);


  const onSubmit = async (data: NewsletterSchemaType) => {
    
    try {
      console.log("data", data);
      const response = await subscribeToNewsletter(data);

      if (response.success) {
        toast.success(t("newsletter.success.title"), {
          description: t("newsletter.success.description"),
        });
        form.reset();
      } else {
        toast.error(t("newsletter.error.title"), {
          description: t("newsletter.error.description"),
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      toast.error(t("newsletter.error.title"), {
        description: t("newsletter.error.description"),
      });
    } 
    
  };

    useEffect(() => {
    const hasSubscribed = localStorage.getItem("newsletterSubscribed");
    if (hasSubscribed) {
        setHasCheckedStorage(true);
        return; // ⛔ Ne rien exécuter si l'utilisateur est déjà abonné
    }

    const lastPopupShown = localStorage.getItem("lastNewsletterPopupShown");
    let pageViews = parseInt(localStorage.getItem("pageViews") || "0", 10);
    const now = Date.now();

    // ⏳ Vérifier si l'intervalle s'est écoulé depuis la dernière popup
    const canShowPopup = !lastPopupShown || now - parseInt(lastPopupShown) > POPUP_INTERVAL;
    
    if (!canShowPopup) {
        setHasCheckedStorage(true);
        return; // Ne pas continuer si on ne peut pas encore afficher la popup
    }

    // Variable pour éviter les déclenchements multiples
    let popupTriggered = false;
    
    // Fonction de déclenchement avec protection contre les multiples appels
    const triggerPopupOnce = () => {
        if (popupTriggered || localStorage.getItem("newsletterSubscribed")) return;
        popupTriggered = true;
        setIsOpen(true);
        localStorage.setItem("lastNewsletterPopupShown", Date.now().toString());
    };

    // ⏱️ Affichage après TIME_ON_SITE
    const siteTimer = setTimeout(() => {
        if (canShowPopup) triggerPopupOnce();
    }, TIME_ON_SITE);

    // 📄 Incrémenter le nombre de pages vues
    pageViews += 1;
    localStorage.setItem("pageViews", pageViews.toString());

    // 📌 Affichage après PAGE_VIEW_THRESHOLD pages vues
    if (pageViews >= PAGE_VIEW_THRESHOLD && canShowPopup) {
        triggerPopupOnce();
        localStorage.setItem("pageViews", "0"); // Réinitialisation après affichage
    }

    // 🔴 Gestion de l'inactivité (Seulement si pas encore abonné)
    let inactivityTimer: NodeJS.Timeout;
    const resetTimer = () => {
        if (localStorage.getItem("newsletterSubscribed") || popupTriggered) return;

        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if (canShowPopup) triggerPopupOnce();
        }, INACTIVITY_TIME);
    };

    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    resetTimer();

    setHasCheckedStorage(true);

    return () => {
        clearTimeout(siteTimer);
        document.removeEventListener("mousemove", resetTimer);
        document.removeEventListener("keydown", resetTimer);
        clearTimeout(inactivityTimer);
    };
    }, []); // Suppression des dépendances car les constantes sont maintenant à l'extérieur

    // ❌ Fermeture manuelle de la popup
    const handleClose = () => {
    setIsOpen(false);
    };

  if (!hasCheckedStorage) return null;


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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{t("newsletter-popup.email.label")}</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder={t("newsletter-popup.email.placeholder")} {...field} className="h-10" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full group" disabled={form.formState.isSubmitting}>
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
      )
    }
    </AnimatePresence>
  )
}

