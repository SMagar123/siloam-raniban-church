import { Hero } from "@/components/templates/Home/Hero"

import { ServiceInfoSection } from "@/components/templates/Home/ServiceInfo"
import { PastorMessageSection } from "@/components/templates/Home/PastorMessage"

export default function Page() {
  return (
    <div className="">
      <Hero />
      <ServiceInfoSection />
      <PastorMessageSection />
    </div>
  )
}
