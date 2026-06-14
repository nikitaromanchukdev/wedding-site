"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

type ScrollRevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  childSelector?: string;
};

export function useGsapScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    y = 48,
    duration = 1,
    stagger = 0.12,
    start = "top 85%",
    childSelector = "[data-reveal]",
  } = options;

  useGSAP(
    () => {
      registerGsapPlugins();
      const el = ref.current;
      if (!el) return;

      const targets = el.querySelectorAll(childSelector);
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref },
  );

  return ref;
}
