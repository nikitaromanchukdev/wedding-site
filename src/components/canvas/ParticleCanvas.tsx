"use client";

import { useLayoutEffect, useRef } from "react";

const COLORS = ["207,181,158", "185,217,235", "255,250,250", "156,107,72"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  op: number;
  life: number;
  max: number;
  col: string;
}

function mkParticle(w: number, h: number, scatter = false): Particle {
  return {
    x: Math.random() * w,
    y: scatter ? Math.random() * h : h + 10,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -(Math.random() * 0.35 + 0.08),
    r: Math.random() * 1.4 + 0.2,
    op: Math.random() * 0.45 + 0.08,
    life: 0,
    max: Math.random() * 350 + 180,
    col: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
      particles.push(mkParticle(canvas.width, canvas.height, true));
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.map((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const t = p.life / p.max;
        const a = p.op * (t < 0.1 ? t * 10 : t > 0.85 ? (1 - t) * 6.67 : 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${a})`;
        ctx.fill();
        if (p.life >= p.max || p.y < -5) {
          return mkParticle(canvas!.width, canvas!.height);
        }
        return p;
      });
      animId = requestAnimationFrame(animate);
    }
    animate();

    const timeout = setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    }, 800);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timeout);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ transition: "opacity 2s ease", opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}
