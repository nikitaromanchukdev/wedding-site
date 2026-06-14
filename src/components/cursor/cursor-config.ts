export type CursorState = "default" | "hover" | "cta" | "video" | "form";

export type CursorTargetType = CursorState | "interactive";

export const CURSOR_ATTR = "data-cursor";

export const CURSOR_SCALE: Record<CursorState, number> = {
  default: 1,
  hover: 1.35,
  cta: 1.6,
  video: 1.5,
  form: 0.85,
};

export const CURSOR_MAGNET: Record<CursorState, number> = {
  default: 0.18,
  hover: 0.32,
  cta: 0.48,
  video: 0.38,
  form: 0.55,
};

export const SNAP_RADIUS = 140;
export const PROXIMITY_RADIUS = 200;
