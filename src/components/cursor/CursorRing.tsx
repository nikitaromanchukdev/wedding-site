"use client";

import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CURSOR_ATTR } from "./cursor-config";

const FOLLOW = 0.05;
const MAGNET_PULL = 0.25;
const BASE_SIZE = 32; // keep in sync with #cursor width/height
const HIT_RADIUS = BASE_SIZE / 2;

function intersects(cx: number, cy: number, r: number, rect: DOMRect) {
  const nx = Math.max(rect.left, Math.min(cx, rect.right));
  const ny = Math.max(rect.top, Math.min(cy, rect.bottom));
  return Math.hypot(cx - nx, cy - ny) <= r;
}

/**
 * Custom cursor: a ring that trails the pointer, squashes/stretches with
 * velocity, and reacts when the RING itself overlaps a target (not the point):
 * grows + shows the [data-cursor] label, and pulls `.magnetic` elements.
 * Disabled on touch / reduced-motion.
 */
export function CursorRing() {
  const finePointer = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const active = finePointer && !reduce;

  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active) return;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    document.documentElement.classList.add("cursor-hidden");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let prevX = mouseX;
    let prevY = mouseY;
    let hovering = false;
    let magnetEl: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ring.style.opacity = "1";
    };
    const onLeave = () => {
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let raf = requestAnimationFrame(function tick() {
      curX += (mouseX - curX) * FOLLOW;
      curY += (mouseY - curY) * FOLLOW;

      // Hit-test the ring (circle around the lerped center) against targets.
      let hit: HTMLElement | null = null;
      for (const el of document.querySelectorAll<HTMLElement>(
        `[${CURSOR_ATTR}]`
      )) {
        if (intersects(curX, curY, HIT_RADIUS, el.getBoundingClientRect())) {
          hit = el;
          break;
        }
      }
      const nextHovering = hit !== null;
      if (nextHovering !== hovering) {
        hovering = nextHovering;
        ring.classList.toggle("is-hover", hovering);
        label.textContent = hit?.getAttribute(CURSOR_ATTR) || "";
      } else if (hovering && hit) {
        label.textContent = hit.getAttribute(CURSOR_ATTR) || "";
      }

      // Magnetic pull when the ring overlaps a `.magnetic` element.
      let mag: HTMLElement | null = null;
      for (const el of document.querySelectorAll<HTMLElement>(".magnetic")) {
        if (intersects(curX, curY, HIT_RADIUS, el.getBoundingClientRect())) {
          mag = el;
          break;
        }
      }
      if (mag !== magnetEl) {
        if (magnetEl) magnetEl.style.transform = "translate(0, 0)";
        magnetEl = mag;
      }
      if (magnetEl) {
        const r = magnetEl.getBoundingClientRect();
        const x = mouseX - r.left - r.width / 2;
        const y = mouseY - r.top - r.height / 2;
        magnetEl.style.transform = `translate(${x * MAGNET_PULL}px, ${
          y * MAGNET_PULL
        }px)`;
      }

      // Velocity squash/stretch + rotation, only in the small (non-hover) state.
      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const speed = Math.hypot(dx, dy);
      let sx = 1;
      let sy = 1;
      let angle = 0;
      if (!hovering) {
        sx = Math.min(1 + speed * 0.015, 1.8);
        sy = Math.max(1 - speed * 0.008, 0.6);
        angle = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      ring.style.left = `${curX}px`;
      ring.style.top = `${curY}px`;
      ring.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${sx}, ${sy})`;

      prevX = mouseX;
      prevY = mouseY;
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (magnetEl) magnetEl.style.transform = "translate(0, 0)";
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div id="cursor" ref={ringRef} aria-hidden="true">
      <span id="cursor-label" ref={labelRef} />
    </div>
  );
}
