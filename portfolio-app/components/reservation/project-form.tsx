"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useI18n } from "@/locales/client"

export default function ProjectForm() {
  const t = useI18n()
  
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
    toast.success(t("project-form.success.title"), {
      description: t("project-form.success.description"),
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
        <Input type="text" name="name" placeholder={t("project-form.name")} value={formData.name} onChange={handleChange} required />
        <Input
          type="email"
          name="email"
          placeholder={t("project-form.email")}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        type="text"
        name="company"
        placeholder={t("project-form.company")}
        value={formData.company}
        onChange={handleChange}
      />
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select name="sector" onValueChange={(value) => setFormData((prev) => ({ ...prev, sector: value }))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("project-form.sector")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">{t("project-form.sector.tech")}</SelectItem>
            <SelectItem value="health">{t("project-form.sector.health")}</SelectItem>
            <SelectItem value="finance">{t("project-form.sector.finance")}</SelectItem>
            <SelectItem value="education">{t("project-form.sector.education")}</SelectItem>
            <SelectItem value="ecommerce">{t("project-form.sector.ecommerce")}</SelectItem>
            <SelectItem value="other">{t("project-form.sector.other")}</SelectItem>
          </SelectContent>
        </Select>
        
        <Select name="budget" onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("project-form.budget")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<1000">{t("project-form.budget.less1000")}</SelectItem>
            <SelectItem value="1000-5000">{t("project-form.budget.1000-5000")}</SelectItem>
            <SelectItem value="5000-10000">{t("project-form.budget.5000-10000")}</SelectItem>
            <SelectItem value="10000+">{t("project-form.budget.more10000")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select name="timeline" onValueChange={(value) => setFormData((prev) => ({ ...prev, timeline: value }))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("project-form.timeline")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgent">{t("project-form.timeline.urgent")}</SelectItem>
            <SelectItem value="1-3months">{t("project-form.timeline.1-3months")}</SelectItem>
            <SelectItem value="3+months">{t("project-form.timeline.3+months")}</SelectItem>
            <SelectItem value="flexible">{t("project-form.timeline.flexible")}</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          name="mainObjective"
          onValueChange={(value) => setFormData((prev) => ({ ...prev, mainObjective: value }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("project-form.mainObjective")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="present">{t("project-form.mainObjective.present")}</SelectItem>
            <SelectItem value="sell">{t("project-form.mainObjective.sell")}</SelectItem>
            <SelectItem value="automate">{t("project-form.mainObjective.automate")}</SelectItem>
            <SelectItem value="community">{t("project-form.mainObjective.community")}</SelectItem>
            <SelectItem value="other">{t("project-form.mainObjective.other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Textarea
        name="projectIdea"
        placeholder={t("project-form.projectIdea")}
        value={formData.projectIdea}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="targetAudience"
        placeholder={t("project-form.targetAudience")}
        value={formData.targetAudience}
        onChange={handleChange}
      />
      <Textarea
        name="expectedResults"
        placeholder={t("project-form.expectedResults")}
        value={formData.expectedResults}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="technicalPreferences"
        placeholder={t("project-form.technicalPreferences")}
        value={formData.technicalPreferences}
        onChange={handleChange}
      />
      <Textarea
        name="otherDetails"
        placeholder={t("project-form.otherDetails")}
        value={formData.otherDetails}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        {t("project-form.submit")}
      </Button>
    </form>
  )
}

