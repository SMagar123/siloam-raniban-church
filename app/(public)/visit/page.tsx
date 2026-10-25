import { VisitAccessibility } from "@/components/templates/PlanYourVisit/VisitAccessibility"
import { VisitExpectations } from "@/components/templates/PlanYourVisit/VisitExpectation"
import { VisitFamilies } from "@/components/templates/PlanYourVisit/VisitFamilies"
import { VisitForm } from "@/components/templates/PlanYourVisit/VisitForm"
import { VisitHero } from "@/components/templates/PlanYourVisit/VisitHero"
import { VisitSchedule } from "@/components/templates/PlanYourVisit/VisitSchedule"

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-background">
      <VisitHero />
      <VisitSchedule />
      <VisitExpectations />
      <VisitFamilies />
      <VisitAccessibility />
      <VisitForm />
    </main>
  )
}
