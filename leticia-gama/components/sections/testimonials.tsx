"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/section";
import { FloatingProduce, type FloatingItem } from "@/components/ui/floating-produce";
import { testimonials, type Testimonial } from "@/lib/content";

// Folhagem grande na lateral esquerda, atrás dos mockups
const testimonialsProduce: FloatingItem[] = [
  {
    name: "leaf-1",
    className: "hidden md:block top-[34%] left-[-7%] w-44 lg:w-56 xl:left-[calc(50%-760px)] xl:w-64",
    rotate: -18,
    depth: 0.25,
    flip: true,
  },
];

export function Testimonials() {
  const reduceMotion = useReducedMotion();

  if (testimonials.length === 0) return null;

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="relative overflow-x-clip bg-linen py-16 md:py-20 lg:py-24"
    >
      <FloatingProduce items={testimonialsProduce} />

      <Container className="relative">
        <SectionHeading
          id="depoimentos-title"
          eyebrow="Depoimentos"
          title={
            <>
              Palavras de quem <em className="text-wine">já está no caminho.</em>
            </>
          }
        />

        <div className="relative mt-8">
          <OrganicArcs />

          {/* Mobile: carrossel com snap · Tablet: 2 × 2 · Desktop: 4 em linha, alinhados pela base */}
          <ul
            aria-label="Depoimentos de pacientes"
            className="relative -mx-5 flex snap-x snap-mandatory items-end gap-5 overflow-x-auto px-5 py-6 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-auto md:grid md:max-w-[560px] md:grid-cols-2 md:overflow-visible md:px-0 xl:flex xl:max-w-none xl:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item, index) => (
              <motion.li
                key={item.src}
                className="w-[78%] max-w-[270px] shrink-0 snap-center md:w-full md:max-w-none xl:w-[260px]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: EASE_OUT }}
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                  transition={{ duration: 6.5 + index * 0.7, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                >
                  <PhoneMockup testimonial={item} index={index} total={testimonials.length} />
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Mockup de celular delicado: moldura fina off-white, cantos suaves e sombra mínima. */
function PhoneMockup({ testimonial, index, total }: { testimonial: Testimonial; index: number; total: number }) {
  return (
    <figure aria-label={`Depoimento ${index + 1} de ${total}`} className="w-full">
      <div className="flex aspect-[9/14] flex-col overflow-hidden rounded-[1.6rem] border border-white bg-[#efe7de] shadow-[0_18px_40px_-30px_rgba(43,43,43,0.3)]">
        <div aria-hidden="true" className="mx-auto mt-2.5 h-1 w-9 shrink-0 rounded-full bg-ink/15" />
        <div className="flex flex-1 items-center px-1.5">
          <Image
            src={testimonial.src}
            width={testimonial.width}
            height={testimonial.height}
            alt={testimonial.alt}
            sizes="(min-width: 1280px) 260px, (min-width: 768px) 270px, 78vw"
            className="h-auto w-full rounded-xl"
          />
        </div>
        <div aria-hidden="true" className="mx-auto mb-2.5 h-1 w-12 shrink-0 rounded-full bg-ink/15" />
      </div>
    </figure>
  );
}

/** Dois arcos orgânicos atrás dos mockups, em baixa opacidade. */
function OrganicArcs() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 520"
      fill="none"
      preserveAspectRatio="none"
      className="pointer-events-none absolute top-1/2 left-1/2 h-[92%] w-[112%] max-w-none -translate-x-1/2 -translate-y-1/2"
    >
      <path
        d="M20 470 C 200 80, 520 20, 720 120 S 1080 320, 1180 70"
        stroke="var(--brand-wine)"
        strokeOpacity="0.16"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M40 150 C 280 430, 600 490, 850 340 S 1130 140, 1190 400"
        stroke="var(--brand-green)"
        strokeOpacity="0.22"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
