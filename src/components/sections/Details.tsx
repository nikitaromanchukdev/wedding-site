"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { details } from "@/resources";

export function Details() {
  return (
    <Section id="details">
      <ScrollReveal>
        <p data-reveal className="label mb-4 text-champagne/70">
          {details.label}
        </p>
        <h2 data-reveal className="font-display text-display-md text-cream">
          {details.title}
        </h2>

        <ul className="mt-10 flex flex-col gap-6">
          {details.items.map((item) => (
            <li
              key={item.label}
              data-reveal
              data-cursor="interactive"
              className="detail-card rounded-2xl border border-cream/8 bg-cream/[0.03] px-6 py-5 backdrop-blur-sm transition-transform duration-500"
            >
              <span className="label text-champagne/60">{item.label}</span>
              <p className="mt-1 font-display text-xl text-cream">{item.value}</p>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </Section>
  );
}
