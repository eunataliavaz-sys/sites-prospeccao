"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  /** Elemento renderizado (use "li" dentro de listas). */
  as?: "div" | "li";
  delay?: number;
  /** Deslocamento vertical inicial (20 a 30px). */
  distance?: number;
};

/** Fade-up suave ao entrar na viewport. */
export function Reveal({ as = "div", delay = 0, distance = 24, children, ...props }: RevealProps) {
  const Component = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </Component>
  );
}
