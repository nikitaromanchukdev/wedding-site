"use client";

import { useGsapScrollReveal } from "@/hooks/useGsapScrollReveal";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useGsapScrollReveal<HTMLDivElement>();

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
