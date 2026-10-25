import { AboutBeliefs } from "@/components/templates/About/AboutBeliefs"
import { AboutCulture } from "@/components/templates/About/AboutCulture"
import { AboutHero } from "@/components/templates/About/AboutHero"
import { AboutLeadership } from "@/components/templates/About/AboutLeaderships"
import { AboutMissionVision } from "@/components/templates/About/AboutMissionAndVision"
import { AboutStory } from "@/components/templates/About/AboutStory"
import { AboutValues } from "@/components/templates/About/AboutValues"

export const metadata = {
  title: "About Us",
  description:
    "Discover the heart, history, and people behind Siloam Raniban Church.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <AboutHero />
      <AboutStory />
      <AboutMissionVision />
      <AboutBeliefs />
      <AboutValues />
      <AboutLeadership />
      <AboutCulture />
    </main>
  )
}
