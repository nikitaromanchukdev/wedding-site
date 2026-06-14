"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { story } from "@/resources";

export function OurStory() {
  return (
    <Section id="story">
      <ScrollReveal>
        <p data-reveal className="label mb-4 text-champagne/70">
          {story.label}
        </p>
        <h2 data-reveal className="font-display text-display-md text-cream">
          {story.title}
        </h2>
        {story.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            data-reveal
            className={`text-body text-cream/55 ${index === 0 ? "mt-6" : "mt-4"}`}
          >
            {paragraph}
          </p>
        ))}
      </ScrollReveal>
    </Section>
  );
}
