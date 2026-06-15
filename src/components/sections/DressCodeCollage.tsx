"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { ImageCard } from "@/components/ui/ImageCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { dressCodeExamples } from "@/resources";

const LONG_PRESS_MS = 400;
const MOVE_CANCEL_PX = 10;

export function DressCodeCollage() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const startPt = useRef<{ x: number; y: number } | null>(null);

  const clearTimer = () => {
    if (timer.current != null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const onPointerDown = (id: string) => (e: React.PointerEvent) => {
    startPt.current = { x: e.clientX, y: e.clientY };
    clearTimer();
    timer.current = window.setTimeout(() => setExpandedId(id), LONG_PRESS_MS);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!startPt.current || timer.current == null) return;
    const dx = e.clientX - startPt.current.x;
    const dy = e.clientY - startPt.current.y;
    if (Math.hypot(dx, dy) > MOVE_CANCEL_PX) clearTimer(); // it's a scroll
  };

  const release = () => {
    clearTimer();
    startPt.current = null;
    setExpandedId(null);
  };

  const active = dressCodeExamples.find((c) => c.id === expandedId) ?? null;

  if (!isMobile) return null;

  return (
    <section id="dresscode-collage" className="dc-collage" aria-label="Dress code inspiration">
      {dressCodeExamples.map((card) => (
        <motion.div
          key={card.id}
          layoutId={`m-${card.id}`}
          className="dc-collage-item"
          onPointerDown={onPointerDown(card.id)}
          onPointerMove={onPointerMove}
          onPointerUp={release}
          onPointerCancel={release}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            gridColumn: `span ${card.colSpan}`,
            gridRow: `span ${card.rowSpan}`,
            visibility: card.id === expandedId ? "hidden" : "visible",
          }}
        >
          <ImageCard src={card.src} alt={card.alt} tint={card.tint} sizes="50vw" />
        </motion.div>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            key="expanded"
            layoutId={`m-${active.id}`}
            className="dc-collage-expanded"
            onPointerUp={release}
            onPointerCancel={release}
          >
            <ImageCard src={active.src} alt={active.alt} tint={active.tint} sizes="100vw" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
