"use client";

import { motion } from "framer-motion";
import { hero } from "@/resources";

export function Hero() {
  return (
    <section className="hero relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
      <div className="hero__glow pointer-events-none absolute inset-0" aria-hidden />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-champagne/80"
      >
        {hero.eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-display-xl text-cream"
      >
        {hero.couple}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 max-w-xs text-body-lg text-cream/60"
      >
        {hero.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-cream/40">{hero.scrollHint}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-champagne/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
