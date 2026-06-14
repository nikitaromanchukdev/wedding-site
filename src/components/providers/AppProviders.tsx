"use client";

import { ParticleCanvas } from "@/components/canvas/ParticleCanvas";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { LensCursor } from "@/components/cursor/LensCursor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <ParticleCanvas />
      {children}
      <LensCursor />
    </CursorProvider>
  );
}
