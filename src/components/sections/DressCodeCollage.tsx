"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ImageCard } from "@/components/ui/ImageCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { dressCodeExamples } from "@/resources";

gsap.registerPlugin(Flip, useGSAP);

const FLIP_DUR = 0.55;
const FLIP_EASE = "power3.inOut";

export function DressCodeCollage() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduce = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const active = dressCodeExamples.find((c) => c.id === activeId) ?? null;

  // Open: Flip the centered modal FROM the tapped grid card TO its natural box.
  useGSAP(
    () => {
      if (!activeId) return;
      const modal = modalRef.current;
      const card = cardRefs.current[activeId];
      if (!modal || !card) return;

      if (reduce) {
        gsap.set(modal, { opacity: 1 });
        gsap.set(backdropRef.current, { opacity: 1 });
        return;
      }
      const natural = Flip.getState(modal); // modal at its centered size
      Flip.fit(modal, card); // snap onto the grid card
      gsap.set(modal, { opacity: 1 }); // reveal only once it's on the card
      Flip.to(natural, { duration: FLIP_DUR, ease: FLIP_EASE, absolute: true });
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, delay: 0.1 }
      );
    },
    { dependencies: [activeId] }
  );

  // Close: Flip the modal back onto the card, then unmount.
  const close = () => {
    const modal = modalRef.current;
    const card = activeId ? cardRefs.current[activeId] : null;
    if (reduce || !modal || !card) {
      setActiveId(null);
      return;
    }
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.4 });
    Flip.fit(modal, card, {
      duration: FLIP_DUR,
      ease: FLIP_EASE,
      absolute: true,
      onComplete: () => setActiveId(null),
    });
  };

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  if (!isMobile) return null;

  return (
    <section
      id="dresscode-collage"
      className="dc-collage"
      aria-label="Dress code inspiration"
    >
      {dressCodeExamples.map((card) => (
        <button
          key={card.id}
          ref={(el) => {
            cardRefs.current[card.id] = el;
          }}
          type="button"
          className="dc-collage-item"
          onClick={() => setActiveId(card.id)}
          aria-label={card.alt}
          style={{
            gridColumn: `span ${card.colSpan}`,
            gridRow: `span ${card.rowSpan}`,
            visibility: card.id === activeId ? "hidden" : "visible",
          }}
        >
          <ImageCard src={card.src} alt={card.alt} tint={card.tint} sizes="50vw" />
        </button>
      ))}

      {active &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              ref={backdropRef}
              className="dc-backdrop"
              onClick={close}
              style={{ opacity: 0 }}
            />
            <div
              ref={modalRef}
              className="dc-modal"
              onClick={close}
              style={{ opacity: 0 }}
            >
              <ImageCard
                src={active.src}
                alt={active.alt}
                tint={active.tint}
                sizes="92vw"
                instant
              />
            </div>
          </>,
          document.body
        )}
    </section>
  );
}
