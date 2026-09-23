"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respeita prefers-reduced-motion em todas as animações de transform. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
