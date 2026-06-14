"use client";

import { Fragment, useEffect, useRef } from "react";
import { details } from "@/resources";

export function Details() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(".details-head, .detail-card");

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
      { threshold: 0.14 },
    );

    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const titleLines = details.title.split("\n");

  return (
    <section ref={sectionRef} id="details" aria-label="Wedding details">
      <div className="details-head">
        <span className="section-eyebrow">{details.label}</span>
        <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}>
          {titleLines.map((line, i) => (
            <Fragment key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </Fragment>
          ))}
        </h2>
      </div>

      <div className="details-grid">
        {details.cards.map((card, i) => (
          <div key={card.title} className="detail-card" data-delay={String(i * 100)}>
            <span className="dc-icon" aria-hidden="true">{card.icon}</span>
            <span className="dc-title">{card.title}</span>
            <p className="dc-body">
              {card.body.map((seg, j) =>
                seg.strong
                  ? <strong key={j}>{seg.text}</strong>
                  : <Fragment key={j}>{seg.text}</Fragment>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
