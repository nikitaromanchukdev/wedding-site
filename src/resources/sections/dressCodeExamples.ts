import type { StaticImageData } from "next/image";

export type DressCodeExample = {
  id: string;
  alt: string;
  /**
   * Outfit photo. Static import (blur-up) or a URL string. Placeholder URLs are
   * used for now; swap to static imports from src/assets/dress-code/ later.
   */
  src: StaticImageData | string | null;
  /** Palette var used for the fallback gradient + ambient tint. */
  tint: string;
  /** Desktop scatter (percent of the showcase box). */
  x: number;
  y: number;
  size: "s" | "m" | "l";
  /** Deterministic z-rotation jitter (deg) so the scatter looks hand-placed. */
  rotate: number;
  /** Depth 0..1 — higher = closer (larger, more opaque). */
  depth: number;
  /** Mobile collage span — columns and rows controlled independently. */
  colSpan: number;
  rowSpan: number;
};

/** Deterministic placeholder portrait until real assets are wired in. */
const ph = (id: string) => `https://picsum.photos/seed/${id}/800/1100`;

/**
 * Outfit inspiration cards. Layout values are hand-tuned and deterministic
 * (no Math.random) so SSR and client render identically. Cards avoid the
 * dead-center where the heading sits.
 *
 * To add real photos: drop files in src/assets/dress-code/, `import` them here,
 * and set each `src`. Static imports give automatic blur-up lazy loading.
 */
export const dressCodeExamples: DressCodeExample[] = [
  { id: "look-1", alt: "Evening look in black", src: ph("look-1"), tint: "--black", x: 16, y: 22, size: "m", rotate: -7, depth: 0.45, colSpan: 1, rowSpan: 2 },
  { id: "look-2", alt: "Tailored suit in dark chocolate", src: ph("look-2"), tint: "--dark-chocolate", x: 82, y: 18, size: "l", rotate: 6, depth: 0.7, colSpan: 1, rowSpan: 1 },
  { id: "look-3", alt: "Soft hazelnut gown", src: ph("look-3"), tint: "--hazelnut", x: 28, y: 70, size: "l", rotate: 4, depth: 0.85, colSpan: 2, rowSpan: 1 },
  { id: "look-4", alt: "Snow-toned cocktail dress", src: ph("look-4"), tint: "--snow", x: 74, y: 74, size: "m", rotate: -5, depth: 0.6, colSpan: 1, rowSpan: 1 },
  { id: "look-5", alt: "Columbia blue accent outfit", src: ph("look-5"), tint: "--columbia-blue", x: 50, y: 14, size: "s", rotate: 9, depth: 0.3, colSpan: 1, rowSpan: 2 },
  { id: "look-6", alt: "Classic dark formalwear", src: ph("look-6"), tint: "--dark-chocolate", x: 9, y: 50, size: "s", rotate: -10, depth: 0.35, colSpan: 1, rowSpan: 1 },
  { id: "look-7", alt: "Neutral palette ensemble", src: ph("look-7"), tint: "--hazelnut", x: 91, y: 48, size: "m", rotate: 8, depth: 0.55, colSpan: 1, rowSpan: 2 },
  { id: "look-8", alt: "Evening attire detail", src: ph("look-8"), tint: "--snow", x: 55, y: 88, size: "s", rotate: -3, depth: 0.4, colSpan: 2, rowSpan: 1 },
];

export const SIZE_PX: Record<DressCodeExample["size"], { w: number; h: number }> = {
  s: { w: 120, h: 160 },
  m: { w: 170, h: 230 },
  l: { w: 220, h: 300 },
};

/**
 * Static brightness as a function of distance from the showcase center (50,50).
 * Darkest at the center ⇒ 0.3, brightest toward the edges ⇒ 0.8 (cap).
 */
export function brightnessFor(x: number, y: number): number {
  const dx = x - 50;
  const dy = y - 50;
  const dist = Math.hypot(dx, dy); // 0 .. ~70 for in-bounds points
  const maxDist = 70;
  const t = Math.min(dist / maxDist, 1); // 0 near center, 1 far
  const BRIGHT = 0.8;
  const DIM = 0.3;
  return DIM + (BRIGHT - DIM) * t;
}
