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

const PHOTOS: StaticImageData[] = [
  look1, look2, look3, look4, look5, look6, look7, look8, look9,
  look10, look11, look12, look13, look14, look15, look16, look17, look18,
];

// Deterministic collage spans (col x row), cycled across the photos.
const SPANS: Array<[number, number]> = [
  [1, 2], [1, 1], [2, 1], [1, 1], [1, 2], [1, 1],
  [2, 1], [1, 1], [1, 2], [1, 1], [1, 1], [2, 1],
];

export const dressCodeExamples: DressCodeExample[] = PHOTOS.map((src, i) => {
  const [colSpan, rowSpan] = SPANS[i % SPANS.length];
  return {
    id: `look-${i + 1}`,
    alt: `Dress code inspiration ${i + 1}`,
    src,
    tint: TINTS[i % TINTS.length],
    colSpan,
    rowSpan,
  };
});

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
