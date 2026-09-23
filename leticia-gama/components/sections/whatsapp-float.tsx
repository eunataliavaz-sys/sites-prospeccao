import { WhatsAppIcon } from "@/components/brand";
import { whatsappUrl } from "@/lib/site-config";

/** Botão fixo de WhatsApp (sem pulso; hover apenas com leve escala). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar consulta pelo WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-[58px] place-items-center rounded-full bg-green-dark text-cream shadow-[0_14px_30px_-10px_rgb(70_89_2/0.55)] transition-transform duration-300 ease-out outline-none hover:scale-105 focus-visible:ring-[3px] focus-visible:ring-wine/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:right-6 sm:bottom-6 lg:size-16"
    >
      <WhatsAppIcon className="size-7 lg:size-[1.9rem]" strokeWidth={1.6} aria-hidden="true" />
    </a>
  );
}
