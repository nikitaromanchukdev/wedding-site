import type { StaticImageData } from "next/image";
import look1 from "@/assets/dress-code/look-1.jpeg";
import look2 from "@/assets/dress-code/look-2.jpeg";
import look3 from "@/assets/dress-code/look-3.jpeg";
import look4 from "@/assets/dress-code/look-4.jpeg";
import look5 from "@/assets/dress-code/look-5.jpeg";
import look6 from "@/assets/dress-code/look-6.jpeg";
import look7 from "@/assets/dress-code/look-7.jpeg";
import look8 from "@/assets/dress-code/look-8.jpeg";
import look9 from "@/assets/dress-code/look-9.jpeg";
import look10 from "@/assets/dress-code/look-10.jpeg";
import look11 from "@/assets/dress-code/look-11.jpeg";
import look12 from "@/assets/dress-code/look-12.jpeg";
import look13 from "@/assets/dress-code/look-13.jpeg";
import look14 from "@/assets/dress-code/look-14.jpeg";
import look15 from "@/assets/dress-code/look-15.jpeg";
import look16 from "@/assets/dress-code/look-16.jpeg";
import look17 from "@/assets/dress-code/look-17.jpeg";
import look18 from "@/assets/dress-code/look-18.jpeg";

export type DressCodeExample = {
  id: string;
  alt: string;
  /** Outfit photo — static import gives automatic blur-up lazy loading. */
  src: StaticImageData;
  /** Palette var used for the skeleton / ambient tint. */
  tint: string;
  /** Mobile collage span — columns and rows controlled independently. */
  colSpan: number;
  rowSpan: number;
};

const TINTS = ["--black", "--dark-chocolate", "--hazelnut", "--snow", "--columbia-blue"];

const PHOTOS: { id: string; src: StaticImageData }[] = [
  { id: "look-6", src: look6 },
  { id: "look-2", src: look2 },
  { id: "look-3", src: look3 },
  { id: "look-4", src: look4 },
  { id: "look-5", src: look5 },
  { id: "look-1", src: look1 },
  { id: "look-7", src: look7 },
  { id: "look-8", src: look8 },
  { id: "look-9", src: look9 },
  { id: "look-10", src: look10 },
  { id: "look-11", src: look11 },
  { id: "look-12", src: look12 },
  { id: "look-14", src: look14 },
  { id: "look-13", src: look13 },
  { id: "look-15", src: look15 },
  { id: "look-17", src: look17 },
  { id: "look-16", src: look16 },
  { id: "look-18", src: look18 },
];

// Deterministic collage spans (col x row), cycled across the photos.
// Assets are all portrait → only square (1x1) and vertical (1x2) cells.
const SPANS: Array<[number, number]> = [
  [1, 2], [1, 1], [1, 1], [1, 2], [1, 1], [1, 2],
  [1, 1], [1, 1], [1, 2], [1, 1], [1, 2], [1, 1], [1,2]
];

export const dressCodeExamples: DressCodeExample[] = PHOTOS.map((photo, i) => {
  const [colSpan, rowSpan] = SPANS[i % SPANS.length];

  return {
    id: photo.id,
    alt: `Образ для вдохновения по дресс-коду ${i + 1}`,
    src: photo.src,
    tint: TINTS[i % TINTS.length],
    colSpan,
    rowSpan,
  };
});

/** Lookup an example by its id (for layouts that reference ids directly). */
export const dressCodeById: Record<string, DressCodeExample> =
  Object.fromEntries(dressCodeExamples.map((ex) => [ex.id, ex]));

/**
 * Desktop showcase layout — 6 cols × 4 rows (row-major), 24 slots.
 *
 * Hand-tuned so that (a) the 6 central slots that the content card obscures
 * hold DUPLICATE looks, and (b) the 18 visible slots never place two looks of
 * the same colour next to each other (horizontally or vertically).
 *
 * Colour key (from the photos): brown 3,6,7,12,18 · blue 4,5,13,16,17 ·
 * black 2,9,14 · white 8,10,15 · hazelnut 1,11.
 */
export const dressCodeDesktopLayout: string[] = [
  // row 0 (all visible)
  "look-3", "look-4", "look-2", "look-6", "look-5", "look-8",
  // row 1 — cols 1-3 obscured (dups)
  "look-13", "look-6", "look-5", "look-8", "look-7", "look-16",
  // row 2 — cols 2-4 obscured (dups)
  "look-12", "look-17", "look-7", "look-4", "look-13", "look-18",
  // row 3 (all visible)
  "look-9", "look-10", "look-14", "look-1", "look-15", "look-11",
];

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
