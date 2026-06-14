"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CursorState } from "./cursor-config";

type CursorContextValue = {
  state: CursorState;
  setState: (state: CursorState) => void;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setVisible] = useState(false);

  const value = useMemo(
    () => ({ state, setState, isVisible, setVisible }),
    [state, isVisible],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
