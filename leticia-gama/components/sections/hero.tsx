"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { SeedOfLife } from "@/components/brand";
import { EASE_OUT } from "@/components/motion/reveal";
import { Container } from "@/components/section";
import { Button } from "@/components/ui/button";
import { FloatingProduce, type FloatingItem } from "@/components/ui/floating-produce";
import { images } from "@/lib/content";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

// Camada atrás da foto (folhas, profundidade)
const backProduce: FloatingItem[] = [
  { name: "leaf-1", className: "top-[-3%] right-[2%] w-[30%] sm:w-[24%] lg:w-[30%]", rotate: 18, depth: 0.2 },
  { name: "lemon", className: "hidden lg:block top-[46%] right-[-9%] w-[13%]", rotate: -20, depth: 0.15, blur: true },
  // Mobile/tablet: o mesmo limão desfocado, na margem à direita do arco
  {
    name: "lemon",
    className: "lg:hidden top-[44%] right-[-1%] w-[11%] sm:right-[9%] sm:w-[9%]",
    rotate: -20,
    depth: 0.15,
    blur: true,
  },
];

// Camada à frente da foto
const frontProduce: FloatingItem[] = [
  {
    name: "lemon",
    className: "top-[8%] left-[0%] w-[27%] sm:left-[8%] sm:w-[21%] lg:left-[-4%] lg:w-[27%]",
    rotate: -8,
    depth: 0.5,
  },
  {
    name: "strawberry",
    className: "bottom-[14%] left-[4%] w-[19%] sm:left-[12%] sm:w-[15%] lg:left-[0%] lg:w-[19%]",
    rotate: -14,
    depth: 0.7,
  },
  {
    name: "leaf-2",
    className: "bottom-[0%] right-[2%] w-[26%] sm:right-[10%] sm:w-[20%] lg:right-[-3%] lg:w-[26%]",
    rotate: -10,
    depth: 0.45,
    flip: true,
  },
];

const textItem = (index: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.35 + index * 0.1, ease: EASE_OUT },
});

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="paper-grain relative overflow-x-clip pt-[4.5rem]">
      {/* Manchas de luz suaves */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-moss/70 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-15%] size-[34rem] rounded-full bg-sand/80 blur-3xl" />
      </div>

      <Container className="relative grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-10 lg:grid-cols-12 lg:gap-8 lg:py-16">
        {/* Texto */}
        <div className="relative z-10 lg:col-span-6 xl:col-span-6">
          <motion.p {...textItem(0)} className="eyebrow text-wine">
            {siteConfig.role} <span className="mx-2 text-ink/30">•</span> CRN {siteConfig.crn}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...textItem(1)}
            className="font-display mt-6 text-[2.75rem] leading-[1.02] text-ink sm:text-6xl lg:text-[4.35rem] xl:text-[4.9rem]"
          >
            Nutrição para <em className="text-wine">transformar</em> sua relação com a alimentação.
          </motion.h1>

          <motion.p {...textItem(2)} className="mt-7 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
            Emagrecimento, saúde e performance através de um caminho leve, sustentável e sem dietas malucas.
          </motion.p>

          <motion.div
            {...textItem(3)}
            className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
          >
            <Button asChild size="lg">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                Agendar minha consulta
                <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="link" className="h-auto px-0 text-ink/75 hover:text-ink">
              <a href="#sobre">
                Conheça minha história
                <ArrowDown strokeWidth={1.5} aria-hidden="true" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            {...textItem(4)}
            className="mt-14 hidden items-center gap-4 text-[0.72rem] tracking-[0.22em] text-ink/50 uppercase sm:flex"
          >
            <span aria-hidden="true" className="h-px w-10 bg-ink/25" />
            Emagrecimento <span aria-hidden="true">•</span> Nutrição Esportiva
          </motion.p>
        </div>

        {/* Imagem */}
        <div className="relative lg:col-span-6 xl:col-span-6">
          <div className="relative mx-auto w-full max-w-[34rem]">
            <FloatingProduce items={backProduce} trigger="mount" enterDelay={0.9} eager className="overflow-visible" />

            <SeedOfLife
              aria-hidden="true"
              strokeWidth={0.8}
              className="pointer-events-none absolute top-1/2 left-1/2 w-[112%] -translate-x-1/2 -translate-y-1/2 text-green/25"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 1.02 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
              className="relative mx-auto w-[70%] sm:w-[56%] lg:w-[74%]"
            >
              {/* Contorno deslocado para dar profundidade */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[50%_40%] rounded-b-[2.5rem] border border-wine/25"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[50%_40%] rounded-b-[2.5rem] bg-linen shadow-[0_40px_80px_-40px_rgba(70,89,2,0.45)]">
                <Image
                  src={images.hero.src}
                  alt={images.hero.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 56vw, 70vw"
                  className="object-cover object-[55%_30%]"
                />
              </div>
            </motion.div>

            <FloatingProduce items={frontProduce} trigger="mount" enterDelay={1} eager className="overflow-visible" />
          </div>
        </div>
      </Container>
    </section>
  );
}
