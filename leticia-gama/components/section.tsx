import type { ComponentProps, ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12", className)} {...props} />;
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className, id }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow text-wine">{eyebrow}</p>
      <h2 id={id} className="font-display mt-5 text-[2.35rem] leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {description && <p className="mt-6 text-base leading-relaxed text-ink/70 sm:text-lg">{description}</p>}
    </Reveal>
  );
}
