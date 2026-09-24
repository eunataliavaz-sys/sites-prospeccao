"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Assets em /public/assets/floating. Para trocar um elemento, basta
 * substituir o .webp mantendo o nome (e ajustar width/height se mudar a proporção).
 */
export const produceAssets = {
  lemon: { src: asset("/assets/floating/lemon.webp"), width: 640, height: 566 },
  strawberry: { src: asset("/assets/floating/strawberry.webp"), width: 560, height: 510 },
  broccoli: { src: asset("/assets/floating/broccoli.webp"), width: 640, height: 845 },
  orange: { src: asset("/assets/floating/orange.webp"), width: 640, height: 432 },
  cherry: { src: asset("/assets/floating/cherry.webp"), width: 480, height: 485 },
  "leaf-1": { src: asset("/assets/floating/leaf-1.webp"), width: 720, height: 670 },
  "leaf-2": { src: asset("/assets/floating/leaf-2.webp"), width: 640, height: 689 },
  "measuring-tape": { src: asset("/assets/floating/measuring-tape.webp"), width: 420, height: 1151 },
  // Aguardando asset: coloque avocado.webp na pasta para habilitar
  avocado: { src: asset("/assets/floating/avocado.webp"), width: 600, height: 600 },
} as const;

export type ProduceName = keyof typeof produceAssets;

export type FloatingItem = {
  name: ProduceName;
  /** Posição, tamanho e visibilidade responsiva (classes Tailwind). */
  className: string;
  /** Rotação base em graus. */
  rotate?: number;
  /** Intensidade do parallax (0 a 1). Valores altos parecem mais próximos. */
  depth?: number;
  /** Duração do loop de flutuação, entre 12 e 22s. */
  duration?: number;
  /** Atraso extra de entrada, em segundos. */
  delay?: number;
  /** Desfoque leve para sugerir profundidade de campo. */
  blur?: boolean;
  /** Espelha horizontalmente para variar a composição. */
  flip?: boolean;
};

type FloatingProduceProps = {
  items: FloatingItem[];
  className?: string;
  /** Atraso base de entrada (a Hero usa um atraso maior que o texto). */
  enterDelay?: number;
  /** Carrega sem lazy loading (apenas na primeira dobra). */
  eager?: boolean;
  /** `mount` anima ao montar; `view` anima quando a seção entra na tela. */
  trigger?: "mount" | "view";
  /**
   * Faz o grupo inteiro orbitar no sentido horário em volta do centro do container
   * conforme a rolagem (como ponteiros de relógio), em graus a cada 100px.
   * Cada item continua "em pé": só muda de posição na órbita.
   */
  orbitOnScroll?: number;
};

const MAX_FLOAT = 12; // px
const MAX_TILT = 3; // graus
// Movimento ligado ao scroll (por depth = 1). No desktop é mais amplo; em telas menores,
// mais contido para que nada alcance os textos.
const MOTION_DESKTOP = { parallax: 170, tilt: 14 };
const MOTION_COMPACT = { parallax: 70, tilt: 6 };

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export function FloatingProduce({
  items,
  className,
  enterDelay = 0.2,
  eager = false,
  trigger = "view",
  orbitOnScroll,
}: FloatingProduceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const amplitude = useIsDesktop() ? MOTION_DESKTOP : MOTION_COMPACT;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const { scrollY } = useScroll();
  // Ângulo da órbita (positivo = horário) e a contra-rotação que mantém cada item em pé
  const orbitAngle = useTransform(scrollY, (value) =>
    reduceMotion || !orbitOnScroll ? 0 : (value / 100) * orbitOnScroll,
  );
  const counterRotate = useTransform(orbitAngle, (value) => -value);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-x-clip select-none", className)}
      style={orbitOnScroll ? { rotate: orbitAngle } : undefined}
    >
      {items.map((item, index) => (
        <FloatingPiece
          // remonta ao cruzar o breakpoint para aplicar a nova amplitude
          key={`${item.name}-${index}-${amplitude.parallax}`}
          item={item}
          index={index}
          progress={scrollYProgress}
          counterRotate={orbitOnScroll ? counterRotate : undefined}
          amplitude={amplitude}
          reduceMotion={reduceMotion}
          enterDelay={enterDelay}
          eager={eager}
          trigger={trigger}
        />
      ))}
    </motion.div>
  );
}

type FloatingPieceProps = {
  item: FloatingItem;
  index: number;
  progress: MotionValue<number>;
  counterRotate?: MotionValue<number>;
  amplitude: { parallax: number; tilt: number };
  reduceMotion: boolean;
  enterDelay: number;
  eager: boolean;
  trigger: "mount" | "view";
};

function FloatingPiece({
  item,
  index,
  progress,
  counterRotate,
  amplitude,
  reduceMotion,
  enterDelay,
  eager,
  trigger,
}: FloatingPieceProps) {
  const asset = produceAssets[item.name];
  const depth = item.depth ?? 0.4;
  const baseRotate = item.rotate ?? 0;
  const duration = clamp(item.duration ?? 14 + ((index * 3) % 8), 12, 22);
  // Direção alternada para que os elementos não flutuem em sincronia
  const direction = index % 2 === 0 ? 1 : -1;

  const parallaxY = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [amplitude.parallax * depth, -amplitude.parallax * depth],
  );
  const scrollRotate = useTransform(
    progress,
    [0, 1],
    reduceMotion ? [0, 0] : [-amplitude.tilt * depth * direction, amplitude.tilt * depth * direction],
  );

  const enter = {
    initial: { opacity: 0, scale: 0.94 },
    transition: {
      duration: 1.1,
      delay: enterDelay + (item.delay ?? index * 0.12),
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <motion.div
      className={cn("absolute", item.className)}
      style={{ y: parallaxY, rotate: counterRotate ?? scrollRotate }}
      initial={enter.initial}
      {...(trigger === "mount"
        ? { animate: { opacity: 1, scale: 1 } }
        : { whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, amount: 0.1 } })}
      transition={enter.transition}
    >
      <motion.div
        style={{ rotate: baseRotate }}
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -MAX_FLOAT * direction, 0],
                rotate: [baseRotate, baseRotate + MAX_TILT * direction, baseRotate],
              }
        }
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={asset.src}
          width={asset.width}
          height={asset.height}
          alt=""
          draggable={false}
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 220px, 140px"
          className={cn(
            "h-auto w-full drop-shadow-[0_22px_28px_rgba(43,43,43,0.16)]",
            item.flip && "-scale-x-100",
            item.blur && "blur-[2px] opacity-90",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
