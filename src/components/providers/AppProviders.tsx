"use client";

import { ParticleCanvas } from "@/components/canvas/ParticleCanvas";
import { CursorRing } from "@/components/cursor/CursorRing";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ParticleCanvas />
      {children}
      <CursorRing />
    </>
  );
}
