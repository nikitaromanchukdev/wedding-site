import { Details } from "@/components/sections/Details";
import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/OurStory";
import { Rsvp } from "@/components/sections/Rsvp";
import { Timeline } from "@/components/sections/Timeline";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <OurStory />
      <Details />
      <Timeline />
      <Rsvp />
    </main>
  );
}
