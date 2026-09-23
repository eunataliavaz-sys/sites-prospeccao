import type { SVGProps } from "react";

/** Símbolo da marca (flor da vida) desenhado em SVG para herdar a cor do texto. */
export function SeedOfLife({ strokeWidth = 3, ...props }: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  const r = 70;
  const centers = [
    [0, 0],
    ...[30, 90, 150, 210, 270, 330].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return [Math.cos(rad) * r, Math.sin(rad) * r];
    }),
  ];
  return (
    <svg viewBox="-150 -150 300 300" fill="none" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
      {centers.map(([cx, cy], i) => (
        <circle key={i} cx={cx.toFixed(2)} cy={cy.toFixed(2)} r={r} />
      ))}
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.3l-4.5 1.2Z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.4.9 1.2 1.7 2.2 2.2l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3-.2.6-.6.8-.9.4-2.2.3-3.9-.8a8.7 8.7 0 0 1-2.9-3c-.6-1.2-.4-2.1-.1-2.7Z" />
    </svg>
  );
}
