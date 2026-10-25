import { Hero } from "@/components/templates/Home/Hero"

import { ServiceInfoSection } from "@/components/templates/Home/ServiceInfo"
import { PastorMessageSection } from "@/components/templates/Home/PastorMessage"
import { AboutCommunitySection } from "@/components/templates/Home/AboutCommunity"
import { NextStepsSection } from "@/components/templates/Home/NextSteps"

export default function Page() {
  return (
    <div className="">
      <Hero />
      <ServiceInfoSection />
      <PastorMessageSection />
      <AboutCommunitySection />
      <NextStepsSection />
    </div>
  )
}
