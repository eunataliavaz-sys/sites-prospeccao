import { HeartHandshake, Microscope, NotebookPen, Salad, Sprout, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/section";
import { FloatingProduce, type FloatingItem } from "@/components/ui/floating-produce";
import { differentials } from "@/lib/content";

const icons: Record<(typeof differentials)[number]["icon"], LucideIcon> = {
  heart: HeartHandshake,
  sprout: Sprout,
  microscope: Microscope,
  notebook: NotebookPen,
  salad: Salad,
};

const differentialsProduce: FloatingItem[] = [
  {
    name: "cherry",
    className: "hidden md:block top-[-2%] right-[3%] w-16 lg:top-[8%] lg:right-[4%] lg:w-24",
    rotate: 10,
    depth: 0.4,
  },
  // Mobile: cereja entrando pela divisa superior, no canto direito
  { name: "cherry", className: "md:hidden top-[-2.25rem] right-3 w-16", rotate: 10, depth: 0.1 },
];

export function Differentials() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-title"
      className="relative overflow-x-clip py-16 md:py-20 lg:py-24"
    >
      <FloatingProduce items={differentialsProduce} />

      <Container className="relative">
        <SectionHeading
          id="diferenciais-title"
          eyebrow="Diferenciais"
          align="center"
          title={
            <>
              Um cuidado que <em className="text-wine">respeita você.</em>
            </>
          }
        />

        {/* 3 na primeira linha e 2 centralizados na segunda (desktop) */}
        <ul className="mt-8 flex flex-wrap justify-center gap-6">
          {differentials.map((item, index) => {
            const Icon = icons[item.icon];
            const description = "description" in item ? item.description : undefined;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={(index % 3) * 0.08}
                className="group flex w-full flex-col items-center rounded-[1.75rem] border border-ink/8 bg-linen px-6 py-12 text-center transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(70,89,2,0.5)] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <span className="grid size-16 place-items-center rounded-full border border-wine/25 text-wine transition-colors duration-500 group-hover:bg-wine group-hover:text-cream">
                  <Icon className="size-6" strokeWidth={1.25} aria-hidden="true" />
                </span>
                <h3 className="font-display mt-8 max-w-[16rem] text-[1.45rem] leading-tight text-ink">{item.title}</h3>
                {description && <p className="mt-3 max-w-[20rem] text-sm leading-relaxed text-ink/60">{description}</p>}
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
