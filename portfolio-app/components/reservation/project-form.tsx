"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useI18n } from "@/locales/client"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { projectFormSchema, ProjectFormSchema } from "@/lib/schema/schema.project-form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { projectFormRequest } from "@/app/[locale]/actions/action.project-form"

export default function ProjectForm() {
  const t = useI18n()
  
  const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(projectFormSchema(t)),
    // resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      surname: "",
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
    },
  });
  

  async function onSubmit(data: ProjectFormSchema) {
    try {
      const result = await projectFormRequest(data);
      
      if (result.success) {
        form.reset();
        toast.success(t("project-form.success.title"), {
          description: t("project-form.success.description"),
        });
      } else {
        toast.error(t("project-form.error.title"), {
          description: result.message || t("project-form.error.description"),
        });
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error(t("project-form.error.title"), {
        description: t("project-form.error.description"),
      });
    }
  };

 

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Champs prioritaires */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("project-form.name")}</FormLabel>
              <FormControl>
                <Input type="text" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("project-form.surname")}</FormLabel>
              <FormControl>
                <Input type="text" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="email"
        render={({field}) => (
          <FormItem>
            <FormLabel>{t("project-form.email")}</FormLabel>
            <FormControl>
              <Input type="email" {...field}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
          control={form.control}
          name="company"
          render={({field}) => (
            <FormItem>
              <FormLabel>{t("project-form.company")}</FormLabel>
              <FormControl>
                <Input type="text" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FormField
            control={form.control}
            name="sector"
            render={({field}) => (
              <FormItem>
                <FormLabel id="sector-label">{t("project-form.sector")}</FormLabel>
                <FormControl>
                  <Select name="sector" onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full" aria-labelledby="sector-label">
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <div>
          <FormField
            control={form.control}
            name="budget"
            render={({field}) => (
              <FormItem>
                <FormLabel id="budget-label">{t("project-form.budget")}</FormLabel> 
                  <FormControl>
                  <Select name="budget" onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full" aria-labelledby="budget-label">
                      <SelectValue placeholder={t("project-form.budget")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<1000">{t("project-form.budget.less1000")}</SelectItem>
                      <SelectItem value="1000-5000">{t("project-form.budget.1000-5000")}</SelectItem>
                      <SelectItem value="5000-10000">{t("project-form.budget.5000-10000")}</SelectItem>
                      <SelectItem value="10000+">{t("project-form.budget.more10000")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FormField
            control={form.control}
            name="timeline"
            render={({field}) => (
              <FormItem>
                <FormLabel id="timeline-label">{t("project-form.timeline")}</FormLabel>
                <FormControl>
                  <Select name="timeline" onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full" aria-labelledby="timeline-label">
                      <SelectValue placeholder={t("project-form.timeline")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">{t("project-form.timeline.urgent")}</SelectItem>
                      <SelectItem value="1-3months">{t("project-form.timeline.1-3months")}</SelectItem>
                      <SelectItem value="3+months">{t("project-form.timeline.3+months")}</SelectItem>
                      <SelectItem value="flexible">{t("project-form.timeline.flexible")}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        



        
        <div>
          <FormField
            control={form.control}
            name="mainObjective"
            render={({field}) => (
              <FormItem>
                <FormLabel id="objective-label">{t("project-form.mainObjective")}</FormLabel>
                <FormControl>
                  <Select name="mainObjective" onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full" aria-labelledby="objective-label">
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>


      <FormField
        control={form.control}
        name="projectIdea"
        render={({field}) => (
          <FormItem>
            <FormLabel>{t("project-form.projectIdea")}</FormLabel>
            <FormControl>
              <Textarea {...field}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="targetAudience"
        render={({field}) => (
          <FormItem>
            <FormLabel>{t("project-form.targetAudience")}</FormLabel>
            <FormControl>
              <Textarea {...field}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expectedResults"
        render={({field}) => (
          <FormItem>
            <FormLabel>{t("project-form.expectedResults")}</FormLabel>
            <FormControl>
              <Textarea {...field}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="technicalPreferences"
        render={({field}) => (
          <FormItem>
            <FormLabel>{t("project-form.technicalPreferences")}</FormLabel>
            <FormControl>
              <Textarea {...field}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="otherDetails"
        render={({field}) => (
          <FormItem>
            <FormLabel>{t("project-form.otherDetails")}</FormLabel>
            <FormControl>
              <Textarea {...field}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          t("project-form.submit")
        )}
      </Button>
    </form>
    </Form>
  )
}

