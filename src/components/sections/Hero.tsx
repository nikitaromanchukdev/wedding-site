"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import heroPhoto from "@/assets/hero.jpg";
import { hero } from "@/resources";

export function Hero() {
  // Two-stage load: low-q first (priority), full-q only after the page finishes loading.
  const [hiRes, setHiRes] = useState(false);
  const [hiResLoaded, setHiResLoaded] = useState(false);

  useEffect(() => {
    const start = () => {
      const idle =
        "requestIdleCallback" in window
          ? window.requestIdleCallback
          : (cb: () => void) => window.setTimeout(cb, 200);
      idle(() => setHiRes(true));
    };
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <section className="hero relative flex min-h-[100svh] flex-col items-center overflow-hidden px-3 py-20 text-center">
      {/* Layer 1 — ambient color background */}
      <div
        className="hero__glow pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* Layer 2 — photo, masked brighter at center / darker toward edges */}
      <div
        className="hero__photo pointer-events-none absolute inset-0"
        aria-hidden
      >
        {/* Stage 1 — low quality, loads immediately */}
        <Image
          src={heroPhoto}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={20}
          placeholder="blur"
          className="object-cover"
        />
        {/* Stage 2 — full quality, fetched after page load, fades in on top */}
        {hiRes && (
          <Image
            src={heroPhoto}
            alt=""
            fill
            sizes="100vw"
            quality={90}
            className="object-cover transition-opacity duration-700"
            style={{ opacity: hiResLoaded ? 1 : 0 }}
            onLoad={() => setHiResLoaded(true)}
          />
        )}
      </div>

      {/* Eyebrow — top on mobile, grouped above the title on desktop */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-0 mb-6 text-xs font-medium uppercase tracking-[0.35em] text-hazelnut/80 md:mt-auto"
      >
        {hero.eyebrow}
      </motion.p>

      {/* Name + tagline — bottom on mobile */}
      <div className="relative z-10 mt-auto flex flex-col items-center md:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display-xl text-snow"
        >
          {hero.couple
            .split(" & ")
            .reduce<ReactNode[]>(
              (acc, part, i) =>
                i === 0 ? [part] : [...acc, <em key="amp"> &amp; </em>, part],
              []
            )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xs text-body-lg text-snow/60"
        >
          {hero.tagline}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex flex-col items-center gap-2 pt-16"
      >
        <span className="text-sm text-snow/40">{hero.scrollHint}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-hazelnut/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
