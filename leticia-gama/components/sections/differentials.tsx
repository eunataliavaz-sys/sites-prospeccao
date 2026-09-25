"use client";

import { HeartHandshake, Microscope, NotebookPen, Salad, Sprout, type LucideIcon } from "lucide-react";

import { Container, SectionHeading } from "@/components/section";
import { FloatingProduce, type FloatingItem } from "@/components/ui/floating-produce";
import { OrderTracking } from "@/components/ui/order-tracking";
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
    className:
      "hidden md:block top-[-2%] right-[3%] w-16 lg:top-[-3rem] lg:right-[4%] lg:w-20 xl:top-[-3.75rem] xl:w-24",
    rotate: 10,
    depth: 0.4,
    noShadow: true,
  },
  // Mobile: cereja entrando pela divisa superior, no canto direito
  { name: "cherry", className: "md:hidden top-[-2.25rem] right-3 w-16", rotate: 10, depth: 0.1, noShadow: true },
];

const steps = differentials.map((item) => ({
  name: item.title,
  description: "description" in item ? item.description : undefined,
  icon: icons[item.icon],
}));

export function Differentials() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-title"
      className="relative overflow-x-clip py-16 md:py-20 lg:py-24"
    >
      <FloatingProduce items={differentialsProduce} />

      <Container className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="diferenciais-title"
              eyebrow="Diferenciais"
              title={
                <>
                  Um cuidado que <em className="text-wine">respeita você.</em>
                </>
              }
            />
          </div>
        </div>

        {/* Linha do tempo vertical: ícones se preenchem como um check conforme a rolagem */}
        <OrderTracking steps={steps} fillOnScroll className="lg:col-span-7 lg:pt-3" />
      </Container>
    </section>
  );
}
