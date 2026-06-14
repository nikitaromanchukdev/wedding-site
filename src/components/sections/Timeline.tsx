"use client";

import { useEffect, useRef } from "react";
import { timeline } from "@/resources";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(
      ".journey-head, .t-item"
    );

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay ?? 0);
          setTimeout(() => el.classList.add("in"), delay);
          obs.unobserve(el);
        });
      },
      { threshold: 0.14 }
    );

    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="timeline" aria-label="Wedding day programme">
      <div className="journey-head">
        <span className="section-eyebrow">{timeline.label}</span>
        <h2 className="section-heading">{timeline.title}</h2>
      </div>

      <div className="t-timeline" role="list" aria-label="Wedding day schedule">
        {timeline.milestones.map((item, i) => {
          const isEven = i % 2 === 0;

          const mainContent = (
            <>
              <span className="t-year">{item.time}</span>
              <span className="t-title">{item.event}</span>
            </>
          );

          const sideContent = <p className="t-detail">{item.description}</p>;

          return (
            <div
              key={item.roman}
              className="t-item"
              role="listitem"
              data-delay={String(i * 90)}
            >
              <div className="t-left">{isEven ? mainContent : sideContent}</div>
              <div className="t-node">
                <div className="t-dot" />
              </div>
              <div className="t-right">
                {isEven ? sideContent : mainContent}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
