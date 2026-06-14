"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { DressCodeCollage } from "@/components/sections/DressCodeCollage";
import { DressCodeShowcase } from "@/components/sections/DressCodeShowcase";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { dressCode } from "@/resources";

export function DressCode() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(".dresscode-head, .swatch");

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

  const titleLines = dressCode.title.split("\n");

  return (
    <section ref={sectionRef} id="dresscode" aria-label="Dress code">
      {mounted && isDesktop && <DressCodeShowcase />}

      <div className="dresscode-head">
        <span className="section-eyebrow">{dressCode.label}</span>
        <h2 className="section-heading" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}>
          {titleLines.map((line, i) => (
            <Fragment key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </Fragment>
          ))}
        </h2>
        <p className="dresscode-desc">{dressCode.description}</p>
      </div>

      <ul className="swatch-grid" aria-label="Featured colours">
        {dressCode.palette.map((color, i) => (
          <li
            key={color.name}
            className="swatch"
            data-delay={String(i * 80)}
            data-dark={String(color.dark)}
          >
            <span
              className="swatch-chip"
              style={{ background: `var(${color.var})` }}
              aria-hidden="true"
            />
            <span className="swatch-name">{color.name}</span>
            <span className="swatch-hex">{color.hex}</span>
          </li>
        ))}
      </ul>

      {mounted && !isDesktop && <DressCodeCollage />}
    </section>
  );
}
