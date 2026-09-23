import { Star } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/section";
import { FloatingProduce, type FloatingItem } from "@/components/ui/floating-produce";
import { specialties } from "@/lib/content";
import { cn } from "@/lib/utils";

const servicesProduce: FloatingItem[] = [
  {
    name: "cherry",
    className: "hidden md:block top-[-2%] right-[3%] w-16 lg:top-[8%] lg:right-[4%] lg:w-24",
    rotate: 10,
    depth: 0.4,
  },
  { name: "leaf-2", className: "hidden xl:block bottom-[6%] left-[-3%] w-32", rotate: 40, depth: 0.3, blur: true },
];

export function Specialties() {
  return (
    <section
      id="especialidades"
      aria-labelledby="especialidades-title"
      className="relative overflow-x-clip py-16 md:py-20 lg:py-24"
    >
      <FloatingProduce items={servicesProduce} />

      <Container className="relative">
        <SectionHeading
          id="especialidades-title"
          eyebrow="Especialidades"
          title={
            <>
              Cuidado pensado para <em className="text-wine">o seu momento.</em>
            </>
          }
        />

        <ul className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {specialties.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(index % 3) * 0.08}
              className={cn(
                "relative flex flex-col rounded-[1.5rem] border px-7 py-6 transition-colors duration-500 xl:h-[185px] xl:px-6",
                item.featured
                  ? "border-green/70 bg-[#f7f1e7] hover:bg-[#f4ede1]"
                  : "border-ink/10 bg-linen/70 hover:bg-linen",
              )}
            >
              {item.featured && (
                <Star
                  className="absolute top-6 right-6 size-[1.1rem] text-green"
                  strokeWidth={1.25}
                  aria-label="Especialidade principal"
                  role="img"
                />
              )}
              <div className="flex items-baseline justify-between gap-4 pr-8">
                <span
                  className={cn(
                    "font-display text-[1.6rem] leading-none",
                    item.featured ? "text-green" : "text-green/35",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.note && (
                  <span aria-hidden="true" className="hidden text-[0.72rem] text-ink/50 xl:inline">
                    {item.note}
                  </span>
                )}
              </div>
              <h3 className="font-display mt-3 text-[1.2rem] leading-[1.2] text-ink">
                {item.title}
                {/* Abaixo de 1280px o complemento aparece sob o título; no 3x2 ele sobe para a linha do número */}
                {item.note && (
                  <span className="mt-1 block font-sans text-[0.72rem] leading-snug text-ink/50 xl:sr-only">
                    {" "}
                    {item.note}
                  </span>
                )}
              </h3>
              <p className="mt-2 text-[0.8rem] leading-[1.55] text-ink/60">{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
