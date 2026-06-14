"use client";

import { CursorProvider } from "@/components/cursor/CursorProvider";
import { LensCursor } from "@/components/cursor/LensCursor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      {children}
      <LensCursor />
    </CursorProvider>
  );
}
