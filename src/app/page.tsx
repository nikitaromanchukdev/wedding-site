import { DateReveal } from "@/components/sections/DateReveal";
import { Details } from "@/components/sections/Details";
import { DressCode } from "@/components/sections/DressCode";
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
      <DressCode />
      <Rsvp />
    </main>
  );
}
