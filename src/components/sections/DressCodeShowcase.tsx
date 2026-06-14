"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ImageCard } from "@/components/ui/ImageCard";
import { brightnessFor, dressCodeExamples } from "@/resources";

const COLS = 6;
const ROWS = 4;

type Cell = {
  uid: string;
  exId: string;
  alt: string;
  src: ReturnType<typeof exampleSrc>;
  tint: string;
  brightness: number;
};

function exampleSrc(id: string) {
  return dressCodeExamples.find((e) => e.id === id)?.src ?? null;
}

export function DressCodeShowcase() {
  const reduce = useReducedMotion() ?? false;
  const [activeUid, setActiveUid] = useState<string | null>(null);

  // Fill the section background with a deterministic grid; brightness rises
  // toward the center for a spacious, lit-from-the-middle feel.
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
        exId: ex.id,
        alt: ex.alt,
        src: ex.src,
        tint: ex.tint,
        brightness: brightnessFor(cx, cy),
      });
    }
    return out;
  }, []);

  useEffect(() => {
    if (!activeUid) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveUid(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeUid]);

  const active = cells.find((c) => c.uid === activeUid) ?? null;

  return (
    <div className="dc-showcase" aria-hidden={activeUid ? undefined : "true"}>
      {cells.map((cell) =>
        cell.uid === activeUid ? (
          <div key={cell.uid} className="dc-cell dc-cell--placeholder" />
        ) : (
          <motion.button
            key={cell.uid}
            type="button"
            layoutId={cell.uid}
            className="dc-cell"
            onClick={() => setActiveUid(cell.uid)}
            style={{ filter: `brightness(${cell.brightness})` }}
            aria-label={cell.alt}
          >
            <ImageCard src={cell.src} alt={cell.alt} tint={cell.tint} />
          </motion.button>
        ),
      )}

      {/* Portal to body so the masked / overflow-hidden / transformed section
          ancestors don't clip the full-screen overlay. */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {active && (
              <>
                <motion.div
                  key="backdrop"
                  className="dc-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  // lands together with the card flight, not before it
                  transition={{ duration: 0.45, delay: reduce ? 0 : 0.1 }}
                  onClick={() => setActiveUid(null)}
                />
                <motion.div
                  key="modal"
                  layoutId={active.uid}
                  className="dc-modal"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 28 }}
                >
                  <ImageCard src={active.src} alt={active.alt} tint={active.tint} sizes="80vw" />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
