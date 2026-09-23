"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronsLeftRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ComparisonImage = {
  src: string;
  alt: string;
  /** object-position para enquadrar o rosto/corpo, ex.: "50% 30%". */
  position?: string;
};

type ImageComparisonSliderProps = {
  before: ComparisonImage;
  after: ComparisonImage;
  beforeLabel?: string;
  afterLabel?: string;
  /** Posição inicial do divisor, de 0 a 100. */
  initialPosition?: number;
  /** Controla a proporção do quadro (classe Tailwind). */
  aspectClassName?: string;
  sizes?: string;
  className?: string;
};

const KEYBOARD_STEP = 5;

export function ImageComparisonSlider({
  before,
  after,
  beforeLabel = "ANTES",
  afterLabel = "DEPOIS",
  initialPosition = 50,
  aspectClassName = "aspect-[2/3]",
  sizes = "(min-width: 1024px) 480px, 92vw",
  className,
}: ImageComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(() => clamp(initialPosition));
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(event.clientX);
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? KEYBOARD_STEP * 2 : KEYBOARD_STEP;
    const next: Record<string, number> = {
      ArrowLeft: position - step,
      ArrowDown: position - step,
      ArrowRight: position + step,
      ArrowUp: position + step,
      Home: 0,
      End: 100,
    };
    if (event.key in next) {
      event.preventDefault();
      setPosition(clamp(next[event.key]));
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-[1.75rem] bg-sand select-none",
        aspectClassName,
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onDragStart={(event) => event.preventDefault()}
    >
      {/* Depois: camada de base, visível à direita do divisor */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes={sizes}
        draggable={false}
        className="pointer-events-none object-cover"
        style={{ objectPosition: after.position ?? "50% 50%" }}
      />

      {/* Antes: camada superior recortada até o divisor */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes={sizes}
          draggable={false}
          className="pointer-events-none object-cover"
          style={{ objectPosition: before.position ?? "50% 50%" }}
        />
      </div>

      {/* Etiquetas */}
      <span
        aria-hidden="true"
        className="eyebrow absolute top-4 left-4 rounded-full bg-cream/85 px-3 py-1.5 text-[0.62rem] text-ink backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: position < 22 ? 0 : 1 }}
      >
        {beforeLabel}
      </span>
      <span
        aria-hidden="true"
        className="eyebrow absolute right-4 bottom-4 rounded-full bg-green-dark/85 px-3 py-1.5 text-[0.62rem] text-cream backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: position > 70 ? 0 : 1 }}
      >
        {afterLabel}
      </span>

      {/* Divisor + alça (também é o controle acessível por teclado) */}
      <div
        className="absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-cream/90 shadow-[0_0_12px_rgba(0,0,0,0.25)]"
        style={{ left: `${position}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparar fotos de antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% mostrando o antes`}
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className={cn(
            "absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-cream text-green-dark shadow-[0_8px_24px_-6px_rgba(43,43,43,0.45)] transition-transform duration-300 outline-none",
            "focus-visible:ring-[3px] focus-visible:ring-wine/60 focus-visible:ring-offset-2",
            isDragging ? "scale-95" : "group-hover:scale-105",
          )}
        >
          <ChevronsLeftRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}
