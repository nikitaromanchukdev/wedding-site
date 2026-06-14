import { DateReveal } from "@/components/sections/DateReveal";
import { Details } from "@/components/sections/Details";
import { Hero } from "@/components/sections/Hero";
import { Rsvp } from "@/components/sections/Rsvp";
import { Timeline } from "@/components/sections/Timeline";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <Hero />
      <DateReveal />
      <Timeline />
      <Details />
      <Rsvp />
    </main>
  );
}
