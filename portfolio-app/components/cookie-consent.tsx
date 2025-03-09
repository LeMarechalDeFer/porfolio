// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { CheckCircle, Shield, BarChart, Settings, ChevronRight } from "lucide-react"
// import Link from "next/link"
// import { cn } from "@/lib/utils"

// type CookiePreferences = {
//   necessary: boolean
//   preferences: boolean
//   analytics: boolean
//   marketing: boolean
// }

// export function CookieConsent() {
//   const [showBanner, setShowBanner] = useState(false)
//   const [showPreferences, setShowPreferences] = useState(false)
//   const [preferences, setPreferences] = useState<CookiePreferences>({
//     necessary: true,
//     preferences: true,
//     analytics: true,
//     marketing: true,
//   })

//   useEffect(() => {
//     // Vérifier si l'utilisateur a déjà fait son choix
//     const consentGiven = localStorage.getItem("cookieConsent")
//     if (!consentGiven) {
//       setShowBanner(true)
//     } else {
//       // Charger les préférences sauvegardées
//       try {
//         const savedPreferences = JSON.parse(consentGiven)
//         setPreferences(savedPreferences)
//       } catch (e) {
//         // En cas d'erreur, réinitialiser
//         setShowBanner(true)
//       }
//     }
//   }, [])

//   const handleAcceptAll = () => {
//     const allAccepted = {
//       necessary: true,
//       preferences: true,
//       analytics: true,
//       marketing: true,
//     }
//     savePreferences(allAccepted)
//   }

//   const handleRejectAll = () => {
//     const allRejected = {
//       necessary: true, // Toujours activé
//       preferences: false,
//       analytics: false,
//       marketing: false,
//     }
//     savePreferences(allRejected)
//   }

//   const handleSavePreferences = () => {
//     savePreferences(preferences)
//   }

//   const savePreferences = (prefs: CookiePreferences) => {
//     localStorage.setItem("cookieConsent", JSON.stringify(prefs))
//     setPreferences(prefs)
//     setShowBanner(false)
//     setShowPreferences(false)

//     // Ici, vous pourriez implémenter la logique pour activer/désactiver les services
//     // en fonction des préférences de l'utilisateur
//     if (prefs.analytics) {
//       // Activer Google Analytics et PostHog
//       console.log("Analytics activé")
//     } else {
//       // Désactiver Google Analytics et PostHog
//       console.log("Analytics désactivé")
//     }

//     if (prefs.marketing) {
//       // Activer les cookies marketing
//       console.log("Marketing activé")
//     } else {
//       // Désactiver les cookies marketing
//       console.log("Marketing désactivé")
//     }
//   }

//   const togglePreferences = () => {
//     setShowPreferences(!showPreferences)
//   }

//   if (!showBanner && !showPreferences) {
//     return (
//       <Button
//         variant="outline"
//         size="sm"
//         className="fixed bottom-4 left-4 z-50 text-xs opacity-70 hover:opacity-100"
//         onClick={togglePreferences}
//       >
//         Gérer les cookies
//       </Button>
//     )
//   }

//   return (
//     <div
//       className={`fixed ${showPreferences ? "inset-0 bg-black/50 flex items-center justify-center z-50" : "bottom-0 left-0 right-0 z-50"}`}
//     >
//       {showPreferences ? (
//         <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
//           <CardHeader>
//             <CardTitle>Préférences de cookies</CardTitle>
//             <CardDescription>Configurez vos préférences en matière de cookies pour notre site web.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue="all">
//               <TabsList className="grid w-full grid-cols-4">
//                 <TabsTrigger value="all">Tous</TabsTrigger>
//                 <TabsTrigger value="necessary">Nécessaires</TabsTrigger>
//                 <TabsTrigger value="preferences">Préférences</TabsTrigger>
//                 <TabsTrigger value="analytics">Analytiques</TabsTrigger>
//               </TabsList>

//               <TabsContent value="all" className="space-y-4 mt-4">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium">Cookies strictement nécessaires</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
//                       </p>
//                     </div>
//                     <Switch checked={preferences.necessary} disabled />
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium">Cookies de préférences</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Ces cookies permettent de mémoriser vos préférences, comme le thème ou la langue.
//                       </p>
//                     </div>
//                     <Switch
//                       checked={preferences.preferences}
//                       onCheckedChange={(checked) => setPreferences({ ...preferences, preferences: checked })}
//                     />
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium">Cookies analytiques</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site.
//                       </p>
//                     </div>
//                     <Switch
//                       checked={preferences.analytics}
//                       onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
//                     />
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="font-medium">Cookies marketing</h3>
//                       <p className="text-sm text-muted-foreground">
//                         Ces cookies sont utilisés pour suivre les visiteurs sur les sites web et afficher des publicités
//                         pertinentes.
//                       </p>
//                     </div>
//                     <Switch
//                       checked={preferences.marketing}
//                       onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
//                     />
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="necessary" className="space-y-4 mt-4">
//                 <div>
//                   <h3 className="font-medium">Cookies strictement nécessaires</h3>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés.
//                   </p>
//                   <div className="bg-muted p-4 rounded-md">
//                     <p className="text-sm mb-2">
//                       <strong>__vercel</strong> - Utilisé pour le routage et la gestion des sessions
//                     </p>
//                     <p className="text-sm mb-2">
//                       <strong>next-auth.session-token</strong> - Gestion de l'authentification (si applicable)
//                     </p>
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="preferences" className="space-y-4 mt-4">
//                 <div>
//                   <h3 className="font-medium">Cookies de préférences</h3>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     Ces cookies permettent de mémoriser vos préférences, comme le thème ou la langue.
//                   </p>
//                   <div className="bg-muted p-4 rounded-md">
//                     <p className="text-sm mb-2">
//                       <strong>theme</strong> - Stocke vos préférences de thème (clair/sombre)
//                     </p>
//                     <p className="text-sm mb-2">
//                       <strong>language</strong> - Stocke vos préférences de langue
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2 mt-4">
//                     <Switch
//                       id="preferences-switch"
//                       checked={preferences.preferences}
//                       onCheckedChange={(checked) => setPreferences({ ...preferences, preferences: checked })}
//                     />
//                     <Label htmlFor="preferences-switch">Activer les cookies de préférences</Label>
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="analytics" className="space-y-4 mt-4">
//                 <div>
//                   <h3 className="font-medium">Cookies analytiques</h3>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site.
//                   </p>
//                   <div className="bg-muted p-4 rounded-md">
//                     <p className="text-sm mb-2">
//                       <strong>Google Analytics 4</strong> - Mesure de l'audience et analyse du comportement des
//                       utilisateurs
//                     </p>
//                     <p className="text-sm mb-2">
//                       <strong>PostHog</strong> - Analyse du comportement utilisateur et amélioration de l'expérience
//                     </p>
//                     <p className="text-sm mb-2">
//                       <strong>Vercel Analytics</strong> - Analyse des performances et de l'utilisation du site
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2 mt-4">
//                     <Switch
//                       id="analytics-switch"
//                       checked={preferences.analytics}
//                       onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
//                     />
//                     <Label htmlFor="analytics-switch">Activer les cookies analytiques</Label>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>

//             <div className="mt-6 text-sm">
//               <p>
//                 Pour plus d'informations sur les cookies que nous utilisons, veuillez consulter notre{" "}
//                 <Link href="/politique-cookies" className="text-primary hover:underline">
//                   politique de cookies
//                 </Link>
//                 .
//               </p>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button variant="outline" onClick={() => setShowPreferences(false)}>
//               Annuler
//             </Button>
//             <div className="space-x-2">
//               <Button variant="outline" onClick={handleRejectAll}>
//                 Tout refuser
//               </Button>
//               <Button variant="outline" onClick={handleAcceptAll}>
//                 Tout accepter
//               </Button>
//               <Button onClick={handleSavePreferences}>Enregistrer les préférences</Button>
//             </div>
//           </CardFooter>
//         </Card>
//       ) : (
//         <div className="m-2 sm:m-4 max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
//           <div className="p-4 sm:p-6 md:p-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
//               <div className="hidden md:block flex-shrink-0 bg-primary/10 p-4 rounded-full">
//                 <Shield className="h-8 w-8 text-primary" />
//               </div>

//               <div className="flex-grow">
//                 <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Améliorez votre expérience</h2>
//                 <p className="text-sm text-muted-foreground mb-2 sm:mb-4">
//                   Nous utilisons des cookies pour personnaliser votre expérience et analyser notre trafic.
//                 </p>

//                 <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div className="flex items-start gap-3">
//                     <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
//                     <div>
//                       <h3 className="font-medium text-sm">Navigation optimisée</h3>
//                       <p className="text-xs text-muted-foreground">Expérience fluide et personnalisée</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <BarChart className="h-5 w-5 text-blue-500 mt-0.5" />
//                     <div>
//                       <h3 className="font-medium text-sm">Analyse anonymisée</h3>
//                       <p className="text-xs text-muted-foreground">Amélioration continue du site</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <Settings className="h-5 w-5 text-amber-500 mt-0.5" />
//                     <div>
//                       <h3 className="font-medium text-sm">Préférences sauvegardées</h3>
//                       <p className="text-xs text-muted-foreground">Thème et langue mémorisés</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 border-t pt-6">
//               <Link
//                 href="/politique-cookies"
//                 className="text-xs text-muted-foreground hover:underline order-4 sm:order-1"
//               >
//                 En savoir plus dans notre politique de cookies
//               </Link>

//               <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={togglePreferences}
//                   className="text-xs text-muted-foreground w-full sm:w-auto"
//                 >
//                   Personnaliser
//                 </Button>

//                 <Button variant="outline" size="sm" onClick={handleRejectAll} className="w-full sm:w-auto">
//                   Refuser
//                 </Button>

//                 <Button
//                   onClick={handleAcceptAll}
//                   className={cn("w-full sm:w-auto relative overflow-hidden group", "bg-primary hover:bg-primary/90")}
//                   size="lg"
//                 >
//                   <span className="relative z-10 flex items-center">
//                     Accepter tous les cookies
//                     <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
//                   </span>
//                   <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

