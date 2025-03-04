"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    sector: "",
    budget: "",
    timeline: "",
    mainObjective: "",
    projectIdea: "",
    targetAudience: "",
    expectedResults: "",
    technicalPreferences: "",
    otherDetails: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Ici, vous ajouteriez la logique pour envoyer le formulaire à votre backend
    console.log("Formulaire soumis:", formData)
    toast.success("Formulaire envoyé !", {
      description: "Je vous contacterai dans les plus brefs délais pour discuter de votre projet.",
    })
    setFormData({
      name: "",
      email: "",
      company: "",
      sector: "",
      budget: "",
      timeline: "",
      mainObjective: "",
      projectIdea: "",
      targetAudience: "",
      expectedResults: "",
      technicalPreferences: "",
      otherDetails: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} required />
        <Input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        type="text"
        name="company"
        placeholder="Nom de l'entreprise ou du projet"
        value={formData.company}
        onChange={handleChange}
      />
      <Select name="sector" onValueChange={(value) => setFormData((prev) => ({ ...prev, sector: value }))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Secteur d'activité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tech">Technologie</SelectItem>
          <SelectItem value="health">Santé</SelectItem>
          <SelectItem value="finance">Finance</SelectItem>
          <SelectItem value="education">Éducation</SelectItem>
          <SelectItem value="ecommerce">E-commerce</SelectItem>
          <SelectItem value="other">Autre</SelectItem>
        </SelectContent>
      </Select>
      <Select name="budget" onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Budget estimé" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="<1000">Moins de 1000€</SelectItem>
          <SelectItem value="1000-5000">1000€ - 5000€</SelectItem>
          <SelectItem value="5000-10000">5000€ - 10000€</SelectItem>
          <SelectItem value="10000+">Plus de 10000€</SelectItem>
        </SelectContent>
      </Select>
      <Select name="timeline" onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Délais souhaités" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="urgent">Urgent (moins d'un mois)</SelectItem>
          <SelectItem value="1-3months">1 - 3 mois</SelectItem>
          <SelectItem value="3+months">Plus de 3 mois</SelectItem>
          <SelectItem value="flexible">Flexible</SelectItem>
        </SelectContent>
      </Select>
      <Select
        name="mainObjective"
        onValueChange={(value) => setFormData((prev) => ({ ...prev, mainObjective: value }))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Objectif principal" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="present">Présenter une activité</SelectItem>
          <SelectItem value="sell">Vendre des produits</SelectItem>
          <SelectItem value="automate">Automatiser une tâche</SelectItem>
          <SelectItem value="community">Créer une communauté</SelectItem>
          <SelectItem value="other">Autre</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        name="projectIdea"
        placeholder="Décrivez votre idée ou votre besoin en quelques phrases"
        value={formData.projectIdea}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="targetAudience"
        placeholder="Public cible (ex: professionnels, grand public, jeunes...)"
        value={formData.targetAudience}
        onChange={handleChange}
      />
      <Textarea
        name="expectedResults"
        placeholder="Quels sont les résultats attendus ? (ex: générer des leads, ventes en ligne, automatisation...)"
        value={formData.expectedResults}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="technicalPreferences"
        placeholder="Avez-vous une préférence pour une technologie spécifique ? (optionnel)"
        value={formData.technicalPreferences}
        onChange={handleChange}
      />
      <Textarea
        name="otherDetails"
        placeholder="Autres précisions ou besoins particuliers ?"
        value={formData.otherDetails}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        Envoyer ma demande
      </Button>
    </form>
  )
}

