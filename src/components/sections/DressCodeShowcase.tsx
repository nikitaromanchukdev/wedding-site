"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ImageCard } from "@/components/ui/ImageCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { brightnessFor, dressCodeExamples } from "@/resources";

gsap.registerPlugin(Flip, useGSAP);

const COLS = 6;
const ROWS = 4;
const FLIP_DUR = 0.55;
const FLIP_EASE = "power3.inOut";

type Cell = {
  uid: string;
  alt: string;
  src: (typeof dressCodeExamples)[number]["src"];
  tint: string;
  brightness: number;
};

export function DressCodeShowcase() {
  const reduce = usePrefersReducedMotion();
  const [activeUid, setActiveUid] = useState<string | null>(null);

  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const cells = useMemo<Cell[]>(() => {
    const out: Cell[] = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const ex = dressCodeExamples[i % dressCodeExamples.length];
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const cx = ((col + 0.5) / COLS) * 100;
      const cy = ((row + 0.5) / ROWS) * 100;
      out.push({
        uid: `${ex.id}-${i}`,
        alt: ex.alt,
        src: ex.src,
        tint: ex.tint,
        brightness: brightnessFor(cx, cy),
      });
    }
    return out;
  }, []);

  const active = cells.find((c) => c.uid === activeUid) ?? null;

  // Open: Flip the portal modal FROM the clicked grid card TO its natural box.
  useGSAP(
    () => {
      if (!activeUid) return;
      const modal = modalRef.current;
      const card = cardRefs.current[activeUid];
      if (!modal || !card) return;

      if (reduce) {
        gsap.set(backdropRef.current, { opacity: 1 });
        return;
      }
      const natural = Flip.getState(modal); // modal at its centered size
      Flip.fit(modal, card); // snap onto the grid card (box, not scale → radius stays)
      Flip.to(natural, { duration: FLIP_DUR, ease: FLIP_EASE, absolute: true });
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, delay: 0.1 },
      );
    },
    { dependencies: [activeUid] },
  );

  // Close: Flip the modal back onto the card, then unmount.
  const close = () => {
    const modal = modalRef.current;
    const card = activeUid ? cardRefs.current[activeUid] : null;
    if (reduce || !modal || !card) {
      setActiveUid(null);
      return;
    }
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.4 });
    Flip.fit(modal, card, {
      duration: FLIP_DUR,
      ease: FLIP_EASE,
      absolute: true,
      onComplete: () => setActiveUid(null),
    });
  };

  useEffect(() => {
    if (!activeUid) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUid]);

  return (
    <div className="dc-showcase" aria-hidden={activeUid ? undefined : "true"}>
      {cells.map((cell) => (
        <button
          key={cell.uid}
          ref={(el) => {
            cardRefs.current[cell.uid] = el;
          }}
          type="button"
          className="dc-cell"
          onClick={() => setActiveUid(cell.uid)}
          style={{
            filter: `brightness(${cell.brightness})`,
            visibility: cell.uid === activeUid ? "hidden" : "visible",
          }}
          aria-label={cell.alt}
        >
          <ImageCard src={cell.src} alt={cell.alt} tint={cell.tint} />
        </button>
      ))}

      {active &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div ref={backdropRef} className="dc-backdrop" onClick={close} style={{ opacity: 0 }} />
            <div ref={modalRef} className="dc-modal">
              <ImageCard src={active.src} alt={active.alt} tint={active.tint} sizes="80vw" instant />
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
