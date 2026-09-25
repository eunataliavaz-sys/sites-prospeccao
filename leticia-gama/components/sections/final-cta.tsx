import { ArrowUpRight } from "lucide-react";

import { SeedOfLife } from "@/components/brand";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/section";
import { Button } from "@/components/ui/button";
import { FloatingProduce, type FloatingItem } from "@/components/ui/floating-produce";
import { whatsappUrl } from "@/lib/site-config";

const ctaProduce: FloatingItem[] = [
  {
    name: "orange",
    className: "hidden md:block md:top-[-12%] md:right-[-4%] md:w-36 xl:top-[-4.5rem] xl:right-[3%] xl:w-56",
    rotate: -12,
    depth: 0.5,
  },
  // Desktop: folha atravessando a divisa inferior, sem alcançar as palavras da faixa abaixo
  { name: "leaf-1", className: "hidden xl:block bottom-[-0.5rem] left-[2%] w-44", rotate: 20, depth: 0.05 },
  // Mobile: laranja entre as seções (topo) e folha logo abaixo do botão, sem tocar texto
  { name: "orange", className: "md:hidden top-[-3rem] right-6 w-24", rotate: -12, depth: 0.1 },
  { name: "leaf-1", className: "md:hidden bottom-[-36px] left-4 w-20", rotate: 12, depth: 0 },
  {
    name: "leaf-1",
    className: "hidden md:block xl:hidden md:bottom-[-10%] md:left-[-4%] md:w-40",
    rotate: 32,
    depth: 0.35,
  },
  { name: "leaf-2", className: "hidden xl:block top-[10%] left-[10%] w-24", rotate: -24, depth: 0.2, blur: true },
];

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-green-dark max-md:overflow-x-clip max-md:overflow-y-visible xl:overflow-x-clip xl:overflow-y-visible py-16 text-cream md:py-20 lg:py-24"
    >
      <SeedOfLife
        aria-hidden="true"
        strokeWidth={0.6}
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square h-[92%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 text-cream/[0.07]"
      />
      <FloatingProduce items={ctaProduce} />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="cta-title" className="font-display text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-7xl">
            Seu caminho para uma vida <em className="text-[#d9c9a8]">mais leve</em> começa aqui.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            Nutrição sem dietas malucas. Estratégia, acompanhamento e uma alimentação que faça sentido para a sua
            rotina.
          </p>
          <Button asChild variant="cream" size="lg" className="mt-8 h-auto min-h-14 whitespace-normal py-3 text-center">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Quero começar meu acompanhamento
              <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
            </a>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
