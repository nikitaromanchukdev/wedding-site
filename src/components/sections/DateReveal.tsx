"use client";

import { useEffect, useRef, useState } from "react";
import { dateReveal, site } from "@/resources";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const calc = () => Math.max(0, target.getTime() - Date.now());
    setDiff(calc());
    const id = setInterval(() => setDiff(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function DateReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const countdown = useCountdown(site.weddingDateTime);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Wedding date and venue"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-snow px-3 py-[8svh] text-center text-black sm:px-8"
    >
      {/* Eyebrow */}
      <p
        className="label mb-12 text-hazelnut transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transitionDelay: "100ms",
        }}
      >
        {dateReveal.eyebrow}
      </p>

      {/* Giant date */}
      <div
        aria-label={`Wedding date: ${site.dateDisplay.day} ${site.dateDisplay.month} ${site.dateDisplay.year}`}
        style={{
          clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 1.3s cubic-bezier(0.76,0,0.24,1) 0s",
        }}
      >
        <span
          className="font-display block text-black leading-[0.85]"
          style={{ fontSize: "clamp(7rem,32vw,16rem)", fontWeight: 400 }}
        >
          {site.dateDisplay.day}
        </span>
      </div>

      <div
        style={{
          clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 1.1s cubic-bezier(0.76,0,0.24,1) 250ms",
        }}
      >
        <span
          className="font-display block italic text-black"
          style={{ fontSize: "clamp(2rem,9vw,5rem)", fontWeight: 400, letterSpacing: "0.04em" }}
        >
          {site.dateDisplay.month}
        </span>
      </div>

      <div
        style={{
          clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 0.9s cubic-bezier(0.76,0,0.24,1) 500ms",
        }}
      >
        <span
          className="mt-3 block text-hazelnut"
          style={{ fontSize: "clamp(0.8rem,3.5vw,1.6rem)", fontWeight: 300, letterSpacing: "0.5em" }}
        >
          {site.dateDisplay.year}
        </span>
      </div>

      {/* Ornamental rule */}
      <div
        className="my-12 flex items-center gap-4"
        aria-hidden="true"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scaleX(1)" : "scaleX(0.4)",
          transition: "opacity 0.7s ease 850ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) 850ms",
        }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-hazelnut" />
        <div className="h-[5px] w-[5px] rotate-45 bg-hazelnut" />
        <div className="h-[3px] w-[3px] rotate-45 bg-hazelnut/35" />
        <div className="h-[5px] w-[5px] rotate-45 bg-hazelnut" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-hazelnut" />
      </div>

      {/* Venue */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 1100ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) 1100ms",
        }}
      >
        <span
          className="font-display mb-2 block italic text-black"
          style={{ fontSize: "clamp(1.5rem,6vw,2.5rem)", fontWeight: 400 }}
        >
          {site.venue}
        </span>
        <span className="label mb-1 block text-hazelnut">{site.location}</span>
        <span className="label block text-hazelnut/60">{site.dateDisplay.time}</span>
      </div>

      {/* Countdown */}
      <div
        className="mt-12 flex items-start justify-center gap-6"
        aria-label="Countdown to the wedding"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 1350ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) 1350ms",
        }}
      >
        {[
          { value: countdown.days, label: dateReveal.countdown.days },
          { value: countdown.hours, label: dateReveal.countdown.hours },
          { value: countdown.minutes, label: dateReveal.countdown.minutes },
          { value: countdown.seconds, label: dateReveal.countdown.seconds },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-start">
            <div className="flex flex-col items-center gap-1">
              <span
                className="font-display min-w-[2ch] text-center text-black leading-none"
                style={{ fontSize: "clamp(1.8rem,8vw,3.5rem)", fontWeight: 400 }}
              >
                {pad(value)}
              </span>
              <span className="label text-hazelnut">{label}</span>
            </div>
            {i < 3 && (
              <span
                className="font-display px-1 text-black/15 leading-none"
                style={{ fontSize: "clamp(1.8rem,8vw,3.5rem)", fontWeight: 400 }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
