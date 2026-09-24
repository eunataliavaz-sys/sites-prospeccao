"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Check, CheckCircle2, Circle, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TrackingStep {
  name: string;
  description?: string;
  /** Ícone do passo (padrão: círculo). */
  icon?: LucideIcon;
  /** Estado fixo, usado quando `fillOnScroll` está desligado. */
  isCompleted?: boolean;
}

export interface OrderTrackingProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TrackingStep[];
  /**
   * Preenche a linha e os ícones conforme a rolagem da página,
   * como um check que avança passo a passo (ignora `isCompleted`).
   */
  fillOnScroll?: boolean;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Linha do tempo vertical. Baseada no componente OrderTracking (shadcn). */
const OrderTracking = React.forwardRef<HTMLDivElement, OrderTrackingProps>(
  ({ steps = [], fillOnScroll = false, className, ...props }, ref) => {
    const listRef = React.useRef<HTMLOListElement>(null);
    const lineRef = React.useRef<HTMLDivElement>(null);
    const iconRefs = React.useRef<(HTMLDivElement | null)[]>([]);
    // Posição da linha (do centro do 1º ícone ao centro do último) e fração de cada ícone nela
    const [track, setTrack] = React.useState({ top: 0, height: 0, fractions: [] as number[] });
    const [filledCount, setFilledCount] = React.useState(0);

    React.useLayoutEffect(() => {
      const list = listRef.current;
      if (!list || steps.length === 0) return;
      // offsetTop ignora transforms, então a animação de entrada não desalinha a linha
      const measure = () => {
        const centers = iconRefs.current.map((el) => {
          const item = el?.parentElement;
          if (!el || !item) return 0;
          return item.offsetTop + el.offsetTop + el.offsetHeight / 2;
        });
        const top = centers[0] ?? 0;
        const height = Math.max((centers[centers.length - 1] ?? 0) - top, 0);
        setTrack({ top, height, fractions: centers.map((c) => (height ? (c - top) / height : 0)) });
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(list);
      return () => observer.disconnect();
    }, [steps.length]);

    // 0 quando o topo da linha cruza 65% da tela; 1 quando o fim da linha cruza o mesmo ponto
    const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 0.65", "end 0.65"] });

    const updateFilled = React.useCallback(
      (value: number) => {
        if (!fillOnScroll) return;
        setFilledCount(value <= 0 ? 0 : track.fractions.filter((f) => value >= f - 0.001).length);
      },
      [fillOnScroll, track.fractions],
    );
    useMotionValueEvent(scrollYProgress, "change", updateFilled);
    React.useEffect(() => updateFilled(scrollYProgress.get()), [updateFilled, scrollYProgress]);

    if (steps.length === 0) {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <p className="text-sm text-foreground/80">Nenhum passo para exibir.</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ol ref={listRef} className="relative">
          {/* Linha base + preenchimento ligado ao scroll */}
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute left-6 w-[1.5px] -translate-x-1/2 bg-ink/12 sm:left-7"
            style={{ top: track.top, height: track.height }}
          >
            {fillOnScroll ? (
              <motion.div className="h-full w-full origin-top bg-green" style={{ scaleY: scrollYProgress }} />
            ) : null}
          </div>

          {steps.map((step, index) => {
            const completed = fillOnScroll ? index < filledCount : Boolean(step.isCompleted);
            const Icon = step.icon ?? (completed ? CheckCircle2 : Circle);
            return (
              <motion.li
                key={step.name}
                className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7 sm:pb-12"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
              >
                <div
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative z-10 grid size-12 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500 sm:size-14",
                    completed ? "border-green-dark bg-green-dark text-cream" : "border-wine/25 bg-cream text-wine",
                  )}
                >
                  <Icon className="size-5 sm:size-6" strokeWidth={1.25} aria-hidden="true" />
                  {/* Selo de check */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-full bg-wine text-cream ring-2 ring-cream transition-[transform,opacity] duration-500",
                      completed ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                </div>

                <div className="pt-1.5 sm:pt-2.5">
                  <h3 className="font-display text-[1.35rem] leading-tight text-ink sm:text-[1.55rem]">{step.name}</h3>
                  {step.description && (
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{step.description}</p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    );
  },
);
OrderTracking.displayName = "OrderTracking";

export { OrderTracking };
