import { Fragment } from "react";

import { marqueeWords } from "@/lib/content";

/** Faixa infinita de valores. A animação pausa com prefers-reduced-motion. */
export function Marquee() {
  const sequence = (
    <div className="flex shrink-0 items-center">
      {marqueeWords.map((word) => (
        <Fragment key={word}>
          <span className="font-display px-6 text-3xl whitespace-nowrap text-green-dark sm:px-10 sm:text-[2.6rem]">
            {word}
          </span>
          <span className="text-lg text-wine">•</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-b border-ink/8 bg-cream py-8 sm:py-10">
      <p className="sr-only">{marqueeWords.join(", ")}</p>
      <div aria-hidden="true" className="flex w-max animate-marquee [--marquee-duration:70s]">
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
