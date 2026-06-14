"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { CURSOR_ATTR } from "@/components/cursor/cursor-config";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { timeline } from "@/resources";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const line = sectionRef.current?.querySelector(".timeline-line");
      if (!line) return;

      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <Section id="timeline" ref={sectionRef}>
      <ScrollReveal>
        <p data-reveal className="label mb-4 text-champagne/70">
          {timeline.label}
        </p>
        <h2 data-reveal className="font-display text-display-md text-cream">
          {timeline.title}
        </h2>

        <div className="relative mt-12">
          <div
            className="timeline-line absolute top-0 left-[7px] h-full w-px origin-top scale-y-0 bg-gradient-to-b from-champagne/60 via-champagne/30 to-transparent"
            aria-hidden
          />

          <ul className="flex flex-col gap-8">
            {timeline.milestones.map((item) => (
              <li
                key={item.time}
                data-reveal
                {...{ [CURSOR_ATTR]: "interactive" }}
                className="timeline-item relative pl-8"
              >
                <span
                  className="absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border border-champagne/50 bg-ink"
                  aria-hidden
                />
                <time className="label text-champagne">{item.time}</time>
                <p className="mt-1 text-body text-cream/70">{item.event}</p>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </Section>
  );
}
