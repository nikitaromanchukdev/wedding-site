"use client";

import { useCallback } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  CURSOR_ATTR,
  CURSOR_MAGNET,
  CURSOR_SCALE,
  PROXIMITY_RADIUS,
  SNAP_RADIUS,
  type CursorState,
  type CursorTargetType,
} from "./cursor-config";
import { useCursor } from "./CursorProvider";

const BASE_SIZE = 48;
// Spring tuning: lower stiffness = more trailing/magnetic glide.
const POS_SPRING = { stiffness: 150, damping: 20, mass: 0.6 };
const SIZE_SPRING = { stiffness: 200, damping: 26, mass: 0.5 };

function resolveState(type: CursorTargetType | null): CursorState {
  if (!type || type === "interactive") return "hover";
  return type;
}

function getTargetCenter(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export function useLensPhysics() {
  const { setState, setVisible } = useCursor();

  // Targets the springs chase. Springs supply the magnetic glide/trailing.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetSize = useMotionValue(BASE_SIZE);

  const x = useSpring(targetX, POS_SPRING);
  const y = useSpring(targetY, POS_SPRING);
  const size = useSpring(targetSize, SIZE_SPRING);

  // Top-left from center + current size, so width/height changes stay centered.
  const left = useTransform([x, size], ([cx, s]: number[]) => cx - s / 2);
  const top = useTransform([y, size], ([cy, s]: number[]) => cy - s / 2);

  const start = useCallback(() => {
    let nearby: HTMLElement | null = null;
    let lastState: CursorState = "default";

    const findNearest = (px: number, py: number) => {
      const targets = document.querySelectorAll<HTMLElement>(`[${CURSOR_ATTR}]`);
      let nearest: HTMLElement | null = null;
      let nearestDist = Infinity;
      let nearestType: CursorTargetType | null = null;
      for (const el of targets) {
        const c = getTargetCenter(el);
        const d = Math.hypot(c.x - px, c.y - py);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = el;
          nearestType = (el.getAttribute(CURSOR_ATTR) as CursorTargetType) ?? "interactive";
        }
      }
      return { nearest, nearestDist, nearestType };
    };

    const onPointerMove = (e: PointerEvent) => {
      setVisible(true);
      const px = e.clientX;
      const py = e.clientY;
      const { nearest, nearestDist, nearestType } = findNearest(px, py);

      let tx = px;
      let ty = py;
      let nextState: CursorState = "default";
      let scale = CURSOR_SCALE.default;

      // Magnetic pull toward the nearest target's center within snap range.
      if (nearest && nearestDist < SNAP_RADIUS) {
        const c = getTargetCenter(nearest);
        const st = resolveState(nearestType);
        const strength = CURSOR_MAGNET[st] * (1 - nearestDist / SNAP_RADIUS);
        tx = px + (c.x - px) * strength;
        ty = py + (c.y - py) * strength;
        nextState = st;
        scale = CURSOR_SCALE[st];
      }

      targetX.set(tx);
      targetY.set(ty);
      targetSize.set(BASE_SIZE * scale);

      if (nextState !== lastState) {
        lastState = nextState;
        setState(nextState);
      }

      // Proximity highlight on the element itself.
      if (nearest && nearestDist < PROXIMITY_RADIUS) {
        if (nearby !== nearest) {
          nearby?.removeAttribute("data-cursor-nearby");
          nearest.setAttribute("data-cursor-nearby", "");
          nearby = nearest;
        }
      } else if (nearby) {
        nearby.removeAttribute("data-cursor-nearby");
        nearby = null;
      }
    };

    const onPointerLeave = () => {
      setVisible(false);
      nearby?.removeAttribute("data-cursor-nearby");
      nearby = null;
      lastState = "default";
      setState("default");
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [setState, setVisible, targetX, targetY, targetSize]);

  return { left, top, size, start };
}
