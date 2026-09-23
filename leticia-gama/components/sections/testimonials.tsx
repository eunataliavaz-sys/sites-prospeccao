"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelected(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  if (testimonials.length === 0) return null;

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="relative overflow-x-clip bg-linen py-16 md:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="depoimentos-title"
          eyebrow="Depoimentos"
          title={
            <>
              Palavras de quem <em className="text-wine">já está no caminho.</em>
            </>
          }
        />

        <Reveal delay={0.1} className="mt-8">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", containScroll: "trimSnaps" }}
            aria-label="Depoimentos de pacientes"
          >
            <CarouselContent className="-ml-6">
              {testimonials.map((item, index) => (
                <CarouselItem
                  key={item.src}
                  className="basis-[82%] pl-6 sm:basis-1/2 lg:basis-1/3"
                  aria-label={`Depoimento ${index + 1} de ${testimonials.length}`}
                >
                  <PhoneFrame testimonial={item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-8 flex items-center justify-between gap-6">
              <div className="flex gap-2" role="group" aria-label="Escolher depoimento">
                {Array.from({ length: snapCount }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Ir para o grupo ${index + 1}`}
                    aria-current={selected === index}
                    className={cn(
                      "h-1.5 cursor-pointer rounded-full transition-all duration-500",
                      selected === index ? "w-8 bg-green-dark" : "w-1.5 bg-ink/20 hover:bg-ink/40",
                    )}
                  />
                ))}
              </div>
              <div className="hidden gap-3 sm:flex">
                <CarouselPrevious className="static size-11 translate-y-0 border-ink/15 bg-transparent hover:bg-cream disabled:opacity-30" />
                <CarouselNext className="static size-11 translate-y-0 border-ink/15 bg-transparent hover:bg-cream disabled:opacity-30" />
              </div>
            </div>
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}

/** Moldura de celular moderno que recebe o print do depoimento. */
function PhoneFrame({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="mx-auto w-full max-w-[20rem]">
      <div className="rounded-[2.75rem] bg-ink p-2.5 shadow-[0_40px_70px_-40px_rgba(43,43,43,0.6)]">
        <div className="relative flex aspect-[9/16] flex-col overflow-hidden rounded-[2.2rem] bg-[#efe7de]">
          {/* Dynamic island */}
          <div aria-hidden="true" className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
          {/* Barra superior neutra */}
          <div aria-hidden="true" className="flex h-16 shrink-0 items-end border-b border-ink/5 bg-[#f6f2ec] px-5 pb-3">
            <span className="h-2 w-16 rounded-full bg-ink/10" />
          </div>
          <div className="flex flex-1 items-center px-2.5">
            <Image
              src={testimonial.src}
              width={testimonial.width}
              height={testimonial.height}
              alt={testimonial.alt}
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 80vw"
              className="h-auto w-full rounded-xl"
            />
          </div>
          <div aria-hidden="true" className="mx-auto mb-2 h-1 w-28 shrink-0 rounded-full bg-ink/25" />
        </div>
      </div>
    </figure>
  );
}
