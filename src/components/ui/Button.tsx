"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { CURSOR_ATTR, type CursorTargetType } from "@/components/cursor/cursor-config";
import { TOUCH_TARGET_MIN } from "@/lib/constants";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  cursorType?: CursorTargetType;
  fullWidth?: boolean;
};

const variants = {
  primary:
    "bg-hazelnut text-black hover:bg-hazelnut-light active:scale-[0.98]",
  secondary:
    "border border-snow/20 text-snow hover:border-hazelnut/50 hover:text-hazelnut active:scale-[0.98]",
  ghost: "text-snow/70 hover:text-snow active:scale-[0.98]",
};

export function Button({
  children,
  variant = "primary",
  cursorType = "cta",
  fullWidth = true,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ${fullWidth ? "w-full" : ""} ${variants[variant]} ${className}`}
      style={{ minHeight: TOUCH_TARGET_MIN }}
      {...{ [CURSOR_ATTR]: cursorType }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
