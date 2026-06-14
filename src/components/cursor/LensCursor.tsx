"use client";

import { useEffect } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useCursor } from "./CursorProvider";
import { useLensPhysics } from "./useLensPhysics";

export function LensCursor() {
  const isFinePointer = useFinePointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isVisible, state } = useCursor();
  const { lensRef, start } = useLensPhysics();

  useEffect(() => {
    if (!isFinePointer || prefersReducedMotion) return;
    document.documentElement.classList.add("lens-cursor-active");
    return start();
  }, [isFinePointer, prefersReducedMotion, start]);

  if (!isFinePointer || prefersReducedMotion) return null;

  return (
    <div
      ref={lensRef}
      aria-hidden
      data-state={state}
      className={`lens-cursor pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="lens-cursor__glass" />
      <div className="lens-cursor__ring" />
    </div>
  );
}
