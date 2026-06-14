"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  CURSOR_ATTR,
  CURSOR_MAGNET,
  CURSOR_SCALE,
  LERP,
  LERP_POSITION,
  PROXIMITY_RADIUS,
  SNAP_RADIUS,
  type CursorState,
  type CursorTargetType,
} from "./cursor-config";
import { useCursor } from "./CursorProvider";

function resolveState(type: CursorTargetType | null): CursorState {
  if (!type || type === "interactive") return "hover";
  return type;
}

function getTargetCenter(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

export function useLensPhysics() {
  const { state, setState, setVisible } = useCursor();

  const pointer = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const rafId = useRef(0);
  const lensRef = useRef<HTMLDivElement>(null);
  const nearbyRef = useRef<HTMLElement | null>(null);
  const stateRef = useRef<CursorState>(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const start = useCallback(() => {
    const findNearestTarget = (x: number, y: number) => {
      const targets = document.querySelectorAll<HTMLElement>(`[${CURSOR_ATTR}]`);
      let nearest: HTMLElement | null = null;
      let nearestDist = Infinity;
      let nearestType: CursorTargetType | null = null;

      for (const el of targets) {
        const center = getTargetCenter(el);
        const dist = Math.hypot(center.x - x, center.y - y);

        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = el;
          nearestType =
            (el.getAttribute(CURSOR_ATTR) as CursorTargetType) ?? "interactive";
        }
      }

      return { nearest, nearestDist, nearestType };
    };

    const tick = () => {
      const lens = lensRef.current;
      if (!lens) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const { x: px, y: py } = pointer.current;
      const { nearest, nearestDist, nearestType } = findNearestTarget(px, py);

      let targetX = px;
      let targetY = py;
      let nextState: CursorState = "default";
      let targetScale = CURSOR_SCALE.default;

      if (nearest && nearestDist < SNAP_RADIUS) {
        const center = getTargetCenter(nearest);
        const magnet = CURSOR_MAGNET[resolveState(nearestType)];
        const pull = 1 - nearestDist / SNAP_RADIUS;
        const strength = magnet * pull;

        targetX = px + (center.x - px) * strength;
        targetY = py + (center.y - py) * strength;
        nextState = resolveState(nearestType);
        targetScale = CURSOR_SCALE[nextState];
      }

      if (nearest && nearestDist < PROXIMITY_RADIUS) {
        const el = nearest;
        if (nearbyRef.current !== el) {
          nearbyRef.current?.removeAttribute("data-cursor-nearby");
          el.setAttribute("data-cursor-nearby", "");
          nearbyRef.current = el;
        }
      } else if (nearbyRef.current) {
        nearbyRef.current.removeAttribute("data-cursor-nearby");
        nearbyRef.current = null;
      }

      position.current.x += (targetX - position.current.x) * LERP_POSITION;
      position.current.y += (targetY - position.current.y) * LERP_POSITION;
      scale.current += (targetScale - scale.current) * LERP;

      if (nextState !== stateRef.current) setState(nextState);

      const size = 48 * scale.current;
      lens.style.transform = `translate3d(${position.current.x - size / 2}px, ${position.current.y - size / 2}px, 0)`;
      lens.style.width = `${size}px`;
      lens.style.height = `${size}px`;

      rafId.current = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onPointerLeave = () => {
      setVisible(false);
      nearbyRef.current?.removeAttribute("data-cursor-nearby");
      nearbyRef.current = null;
      setState("default");
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [setVisible, setState]);

  return { lensRef, start };
}
