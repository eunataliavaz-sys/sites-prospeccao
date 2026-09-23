import { asset } from "@/lib/asset";

/**
 * Conteúdo das seções. Para atualizar textos, basta editar aqui.
 */

export const images = {
  hero: {
    src: asset("/assets/images/leticia-hero.webp"),
    alt: "Letícia Gama sorrindo e segurando duas metades de laranja",
  },
  before: {
    src: asset("/assets/images/leticia-antes.webp"),
    alt: "Letícia Gama antes do seu processo de emagrecimento",
  },
  after: {
    src: asset("/assets/images/leticia-depois.webp"),
    alt: "Letícia Gama hoje, após a sua transformação",
  },
} as const;

export type Specialty = {
  title: string;
  description: string;
  /** Complemento do título, exibido em corpo menor. */
  note?: string;
  /** Especialidade principal: recebe destaque sutil no card. */
  featured?: boolean;
};

export const specialties: Specialty[] = [
  {
    title: "Emagrecimento",
    description:
      "Estratégias sustentáveis para perda de gordura, melhora da composição corporal e construção de hábitos duradouros.",
    featured: true,
  },
  {
    title: "Nutrição Esportiva",
    description: "Nutrição personalizada para melhorar desempenho, recuperação muscular e resultados nos treinos.",
    featured: true,
  },
  {
    title: "Reeducação Alimentar",
    description: "Aprenda a comer com equilíbrio, sem restrições extremas e com mais liberdade alimentar.",
  },
  {
    title: "Nutrição Clínica",
    description: "Planejamento nutricional individualizado para diferentes condições clínicas e necessidades de saúde.",
  },
  {
    title: "Doenças Crônicas",
    description: "Acompanhamento nutricional para diabetes, hipertensão, dislipidemias e outras condições crônicas.",
  },
  {
    title: "Acompanhamento para Tirzepatida",
    note: "(Mounjaro® e similares)",
    description: "Suporte nutricional priorizando preservação de massa muscular, adesão alimentar e saúde metabólica.",
  },
];

/** Ícones disponíveis (mapeados em components/sections/how-it-works.tsx). */
export type ConsultationIcon =
  | "weight"
  | "pressure"
  | "ruler"
  | "skinfold"
  | "bone"
  | "camera"
  | "height"
  | "home"
  | "globe"
  | "whatsapp"
  | "clock"
  | "book";

export type ConsultationMode = {
  id: "presencial" | "online";
  label: string;
  badge: string;
  howItWorks: string;
  assessmentTitle: string;
  assessment: { label: string; icon: ConsultationIcon }[];
  assessmentNote?: string;
  advantages: { text: string; icon: ConsultationIcon }[];
  observation?: string;
};

export const consultationModes: ConsultationMode[] = [
  {
    id: "presencial",
    label: "Consulta Presencial",
    badge: "PERSONAL DIET",
    howItWorks:
      "Vou até você com todos os equipamentos necessários para realizar uma avaliação física completa, no conforto da sua casa.",
    assessmentTitle: "Avaliação física",
    assessment: [
      { label: "Aferição de peso", icon: "weight" },
      { label: "Aferição de pressão arterial", icon: "pressure" },
      { label: "Medidas de circunferências corporais", icon: "ruler" },
      { label: "Dobras cutâneas", icon: "skinfold" },
      { label: "Diâmetros ósseos", icon: "bone" },
      { label: "Fotos comparativas", icon: "camera" },
    ],
    advantages: [
      { text: "Atendimento personalizado no conforto da sua casa.", icon: "home" },
      { text: "Avaliação física completa + suporte via WhatsApp.", icon: "whatsapp" },
    ],
    observation: "Atendimento domiciliar no Grande ABC e algumas regiões de São Paulo (consulte disponibilidade).",
  },
  {
    id: "online",
    label: "Consulta Online",
    badge: "VIDEOCONSULTA",
    howItWorks:
      "Atendimento realizado por videoconferência, permitindo acompanhamento personalizado de qualquer lugar do mundo.",
    assessmentTitle: "Avaliação",
    assessment: [
      { label: "Peso e estatura", icon: "height" },
      { label: "Circunferências corporais (quando possível)", icon: "ruler" },
      { label: "Fotos comparativas", icon: "camera" },
    ],
    assessmentNote: "Você receberá orientação para realizar corretamente todas as medidas.",
    advantages: [
      { text: "Atendimento personalizado de qualquer lugar do mundo.", icon: "globe" },
      { text: "Suporte via WhatsApp durante 30 dias.", icon: "whatsapp" },
    ],
  },
];

export const consultationHighlights: { title: string; text: string; icon: ConsultationIcon }[] = [
  { title: "Duração", text: "Aproximadamente 1h15", icon: "clock" },
  { title: "Suporte", text: "Via WhatsApp por 30 dias", icon: "whatsapp" },
  { title: "Planejamento", text: "Materiais de apoio para adesão ao planejamento alimentar", icon: "book" },
];

export const differentials = [
  {
    title: "Atendimento humanizado",
    description: "Escuta atenta e acolhimento em cada etapa, respeitando sua história, sua rotina e o seu tempo.",
    icon: "heart",
  },
  {
    title: "Estratégias sustentáveis",
    description: "Mudanças possíveis de manter no dia a dia, para resultados que permanecem, sem efeito sanfona.",
    icon: "sprout",
  },
  {
    title: "Nutrição baseada em ciência",
    description: "Condutas fundamentadas em evidências científicas atualizadas, sem modismos ou promessas milagrosas.",
    icon: "microscope",
  },
  {
    title: "Plano alimentar individualizado",
    description: "Um planejamento feito para você, considerando seus objetivos, preferências, horários e necessidades.",
    icon: "notebook",
  },
  {
    title: "Comida de verdade, sem terrorismo alimentar",
    description:
      "Aprenda a construir uma alimentação equilibrada, sem extremismos, restrições desnecessárias ou culpa ao comer.",
    icon: "salad",
  },
] as const satisfies readonly { title: string; description?: string; icon: string }[];

export type Testimonial = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * Prints reais de conversas (suporta até 6).
 * Para adicionar: rode `npm run assets` com o novo print em assets-originais
 * (ou coloque o .webp em /public/assets/testimonials) e inclua aqui.
 */
export const testimonials: Testimonial[] = [
  {
    src: asset("/assets/testimonials/depoimento-01.webp"),
    width: 900,
    height: 613,
    alt: "Paciente conta que amou o novo plano alimentar, com tudo o que gosta de comer, e agradece pelos muitos quilos eliminados.",
  },
  {
    src: asset("/assets/testimonials/depoimento-02.webp"),
    width: 900,
    height: 614,
    alt: "Paciente diz que não tem dificuldades, o plano respeita seus horários e rotina, sente mais força nos treinos e as calças continuam largas.",
  },
  {
    src: asset("/assets/testimonials/depoimento-03.webp"),
    width: 900,
    height: 620,
    alt: "Paciente conta que se sentiu à vontade na primeira consulta, como um bate papo entre amigas, consegue seguir a dieta sem passar fome e já indicou para amigas.",
  },
  {
    src: asset("/assets/testimonials/depoimento-04.webp"),
    width: 900,
    height: 437,
    alt: "Paciente relata que não sente fome, que em outras dietas passava muita fome e agora parece ter comida até demais.",
  },
].slice(0, 6);

export const marqueeWords = ["SAÚDE", "BEM-ESTAR", "ENERGIA", "LEVEZA", "EQUILÍBRIO", "QUALIDADE DE VIDA"];
