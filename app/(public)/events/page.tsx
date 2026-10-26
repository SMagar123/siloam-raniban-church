import { EventsHero } from "@/components/templates/Events/EventsHero"
import { WeeklyServices } from "@/components/templates/Events/WeeklyServices"
import { SpecialEvents } from "@/components/templates/Events/SpecialEvents"
import { EventsLocation } from "@/components/templates/Events/EventsLocation"
import { eventsPageInfo, serviceInfo } from "@/lib/data/events-page"

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <EventsHero hero={eventsPageInfo.hero} />
      <WeeklyServices schedule={serviceInfo.schedule} />
      <SpecialEvents events={eventsPageInfo.specialEvents} />
      <EventsLocation location={serviceInfo.location} />
    </main>
  )
}
