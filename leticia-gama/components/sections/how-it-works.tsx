"use client";

import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bone,
  BookOpenText,
  Camera,
  Clock3,
  Globe,
  Grab,
  HeartPulse,
  House,
  Info,
  MapPin,
  PersonStanding,
  Ruler,
  Weight,
} from "lucide-react";

import { WhatsAppIcon } from "@/components/brand";
import { EASE_OUT, Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/section";
import { FloatingProduce, type FloatingItem } from "@/components/ui/floating-produce";
import { consultationHighlights, consultationModes, type ConsultationIcon, type ConsultationMode } from "@/lib/content";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;

const icons: Record<ConsultationIcon, IconComponent> = {
  weight: Weight,
  pressure: HeartPulse,
  ruler: Ruler,
  skinfold: Grab,
  bone: Bone,
  camera: Camera,
  height: PersonStanding,
  home: House,
  globe: Globe,
  whatsapp: WhatsAppIcon,
  clock: Clock3,
  book: BookOpenText,
};

// Fita métrica decorativa: lateral esquerda no desktop, deitada no canto inferior esquerdo no mobile
const tapeDecor: FloatingItem[] = [
  {
    name: "measuring-tape",
    // Vertical como a foto original, entrando pelo topo da seção na margem esquerda do conteúdo
    className: "hidden xl:block top-[-3rem] w-32 left-[calc(50%-724px)] 2xl:w-40 2xl:left-[calc(50%-756px)]",
    rotate: 0,
    depth: 0.3,
  },
  // Tablet: deitada no canto inferior esquerdo
  { name: "measuring-tape", className: "hidden md:block xl:hidden bottom-[-54px] left-2 w-12", rotate: -78, depth: 0 },
  // Mobile: vertical, entrando pelo topo da seção no canto direito
  { name: "measuring-tape", className: "md:hidden top-[-4.5rem] right-[-2px] w-14", rotate: 0, depth: 0.1 },
];

function Icon({ name, className }: { name: ConsultationIcon; className?: string }) {
  const Component = icons[name];
  return <Component className={className} strokeWidth={1.25} aria-hidden />;
}

export function HowItWorks() {
  const [active, setActive] = useState<ConsultationMode["id"]>(consultationModes[0].id);
  const activeMode = consultationModes.find((mode) => mode.id === active) ?? consultationModes[0];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % consultationModes.length,
      ArrowLeft: (index - 1 + consultationModes.length) % consultationModes.length,
      Home: 0,
      End: consultationModes.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    setActive(consultationModes[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative overflow-x-clip bg-sand/60 py-16 md:py-20 lg:py-24"
    >
      <FloatingProduce items={tapeDecor} />

      <Container className="relative">
        <SectionHeading
          id="como-funciona-title"
          eyebrow="Como funciona"
          title={
            <>
              Um caminho <em className="text-wine">leve</em>, passo a passo.
            </>
          }
          description="Escolha a modalidade de atendimento e conheça como funciona sua consulta."
        />

        {/* Abas */}
        <Reveal delay={0.1} className="mt-8">
          <p id="selecione-modalidade" className="eyebrow mb-3 pl-1 text-ink/45">
            Selecione
          </p>
          <div
            role="tablist"
            aria-label="Modalidade de atendimento"
            className="grid w-full grid-cols-2 rounded-full border border-ink/10 bg-cream/70 p-1.5 sm:inline-grid sm:w-auto"
          >
            {consultationModes.map((mode, index) => {
              const selected = active === mode.id;
              return (
                <button
                  key={mode.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`tab-${mode.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="painel-consulta"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(mode.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cn(
                    "relative h-12 cursor-pointer rounded-full px-4 text-[0.82rem] font-medium whitespace-nowrap transition-colors duration-300 outline-none focus-visible:ring-[3px] focus-visible:ring-wine/40 sm:px-8 sm:text-sm",
                    selected ? "text-cream" : "text-ink/65 hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="consulta-tab"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-green-dark shadow-[0_10px_24px_-12px_rgb(70_89_2/0.6)]"
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                    />
                  )}
                  <span className="relative">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* A altura acompanha o conteúdo da aba ativa, sem espaço vazio */}
        <Reveal delay={0.15} className="mt-8">
          <AutoHeight>
            <AnimatePresence mode="wait" initial={false}>
              <ModePanel key={activeMode.id} mode={activeMode} />
            </AnimatePresence>
          </AutoHeight>
        </Reveal>

        {/* Faixa de informações importantes */}
        <Reveal className="mt-8 grid gap-6 rounded-[1.75rem] border border-ink/8 bg-cream/80 px-7 py-9 sm:px-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-ink/10">
          {consultationHighlights.map((item) => (
            <div key={item.title} className="flex items-start gap-4 md:px-8 md:first:pl-0 md:last:pr-0">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-green-dark/25 text-green-dark">
                <Icon name={item.icon} className="size-5" />
              </span>
              <div>
                <p className="eyebrow text-ink/50">{item.title}</p>
                <p className="mt-2 text-[0.95rem] leading-snug text-ink">{item.text}</p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* A consulta é sobre você */}
        <Reveal className="mt-6 grid gap-12 rounded-[2rem] bg-linen px-7 py-12 sm:px-12 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-20">
          <div className="lg:col-span-7">
            <p className="eyebrow text-wine">A consulta é sobre você</p>
            <h3 className="font-display mt-5 text-[2rem] leading-[1.08] text-ink sm:text-[2.6rem]">
              Muito além de um <em className="text-wine">plano alimentar.</em>
            </h3>
            <div className="mt-6 max-w-xl space-y-5 text-[1rem] leading-[1.85] text-ink/70">
              <p>
                Durante aproximadamente 1h15, teremos uma conversa leve e descontraída para entender sua rotina,
                horários, hábitos, lazer, histórico de saúde, uso de medicamentos, preferências alimentares e seus
                objetivos.
              </p>
              <p>
                Cada estratégia é construída de forma individual, respeitando sua realidade para que o planejamento seja
                possível de manter no dia a dia.
              </p>
            </div>
          </div>

          <figure className="flex flex-col justify-center lg:col-span-5 lg:border-l lg:border-wine/20 lg:pl-10">
            <span aria-hidden="true" className="font-display text-7xl leading-none text-wine/30">
              &ldquo;
            </span>
            <blockquote className="font-display -mt-4 text-[1.6rem] leading-snug text-green-dark sm:text-[1.9rem]">
              Meu papel não é criar restrições, mas construir um caminho possível para você.
            </blockquote>
            <figcaption className="eyebrow mt-6 text-ink/45">Letícia Gama</figcaption>
          </figure>
        </Reveal>

        {/* Informação adicional */}
        <Reveal>
          <p className="mt-6 flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-ink/55">
            <Info className="mt-0.5 size-4 shrink-0 text-green-dark/70" strokeWidth={1.5} aria-hidden="true" />
            Também é possível realizar apenas a avaliação física, sem a consultoria nutricional.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/** Anima a altura do conteúdo quando ele muda (troca de aba). */
function AutoHeight({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="-mx-2 overflow-hidden px-2"
      initial={false}
      animate={{ height }}
      transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_OUT }}
    >
      <div ref={innerRef} className="py-1">
        {children}
      </div>
    </motion.div>
  );
}

function ModePanel({ mode }: { mode: ConsultationMode }) {
  return (
    <motion.div
      id="painel-consulta"
      role="tabpanel"
      aria-labelledby={`tab-${mode.id}`}
      tabIndex={0}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="grid gap-8 rounded-[1.75rem] outline-none focus-visible:ring-[3px] focus-visible:ring-wine/30 lg:grid-cols-2"
    >
      {/* Como funciona + vantagens */}
      <div className="flex flex-col">
        <span className="self-start rounded-full border border-wine/30 px-3.5 py-1.5 text-[0.62rem] font-medium tracking-[0.26em] text-wine">
          {mode.badge}
        </span>
        <h3 className="font-display mt-6 text-[1.9rem] leading-tight text-ink sm:text-[2.2rem]">Como funciona</h3>
        <p className="mt-6 max-w-lg text-[1.02rem] leading-[1.8] text-ink/70">{mode.howItWorks}</p>

        <p className="eyebrow mt-8 text-ink/50">Vantagens</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {mode.advantages.map((advantage) => (
            <li
              key={advantage.text}
              className="flex items-start gap-4 rounded-[1.25rem] border border-ink/8 bg-cream/80 p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-moss text-green-dark">
                <Icon name={advantage.icon} className="size-[1.15rem]" />
              </span>
              <span className="text-[0.92rem] leading-snug text-ink/85">{advantage.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Avaliação */}
      <div className="flex flex-col rounded-[1.75rem] border border-ink/8 bg-linen/80 p-7 sm:p-9">
        <h3 className="font-display text-[1.6rem] leading-tight text-ink">{mode.assessmentTitle}</h3>
        <ul className="mt-6 divide-y divide-ink/8">
          {mode.assessment.map((item) => (
            <li key={item.label} className="flex items-center gap-4 py-4 first:pt-0">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-green-dark/25 text-green-dark">
                <Icon name={item.icon} className="size-[1.1rem]" />
              </span>
              <span className="text-[0.95rem] text-ink/85">{item.label}</span>
            </li>
          ))}
        </ul>

        {mode.assessmentNote && (
          <p className="mt-6 text-[0.82rem] leading-relaxed text-ink/55 italic">{mode.assessmentNote}</p>
        )}

        {mode.observation && (
          <div className="mt-auto pt-6">
            <p className="flex items-start gap-2.5 border-t border-ink/8 pt-6 text-[0.82rem] leading-relaxed text-ink/60">
              <MapPin className="mt-0.5 size-4 shrink-0 text-wine/70" strokeWidth={1.5} aria-hidden="true" />
              {mode.observation}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
