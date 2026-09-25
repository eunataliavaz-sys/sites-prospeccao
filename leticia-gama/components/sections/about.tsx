import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/section";
import { FloatingProduce, type FloatingItem } from "@/components/ui/floating-produce";
import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider";
import { images } from "@/lib/content";

const aboutProduce: FloatingItem[] = [
  // Folha grande atravessando a divisa com a Hero (desktop/tablet), acima do título
  {
    name: "leaf-1",
    // xl+: fica na margem à esquerda do conteúdo (container 1240px), inteira em telas largas
    className:
      "hidden md:block lg:hidden xl:block top-[-7rem] left-[-3%] w-40 xl:top-[-5rem] xl:left-[calc(50%-796px)] xl:w-52",
    rotate: -28,
    depth: 0.35,
    flip: true,
  },
  // Mobile: folha atravessando a divisa com a Hero, no respiro acima do título
  { name: "leaf-1", className: "md:hidden top-[-4.75rem] left-[-7%] w-28", rotate: -28, depth: 0.15, flip: true },
  // Brócolis no canto inferior
  { name: "broccoli", className: "hidden xl:block bottom-[4%] left-[38%] w-28", rotate: 12, depth: 0.55, blur: true },
  // Limão junto ao slider; no mobile fica no respiro superior da seção
  {
    name: "lemon",
    className:
      "top-[-1.5rem] right-[-6%] w-20 md:top-[14%] md:right-[-3%] md:w-28 lg:top-[45%] lg:right-[-4%] xl:top-[14%] xl:right-[calc(50%-732px)] xl:w-36 wide:right-[-40px] 2xl:w-40",
    rotate: 16,
    depth: 0.45,
  },
];

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="relative overflow-x-clip bg-linen py-16 md:py-20 lg:py-24"
    >
      <FloatingProduce items={aboutProduce} />

      <Container className="relative grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* História */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <p className="eyebrow text-wine">Sobre a Letícia</p>
            <h2
              id="sobre-title"
              className="font-display mt-5 text-[2.5rem] leading-[1.04] text-ink sm:text-5xl lg:text-[3.6rem]"
            >
              Eu também já estive <em className="text-wine">do outro lado.</em>
            </h2>
          </Reveal>

          <div className="mt-6 max-w-xl space-y-6 text-[1.02rem] leading-[1.85] text-ink/75">
            <Reveal delay={0.05}>
              <p className="text-lg text-ink">
                Olá, sou Letícia Gama, nutricionista especialista em emagrecimento e nutrição esportiva.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Me especializei por meio de diversos cursos nas áreas de academias, suplementação, antropometria,
                emagrecimento e doenças crônicas.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Passei por um longo processo de emagrecimento e senti as dificuldades de viver em efeito sanfona, sem
                qualidade de vida, sempre cansada e indisposta, fazendo dietas malucas e restritivas.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Descobri na nutrição o caminho certo e duradouro, que melhorou minha qualidade de vida, meu humor, minha
                disposição e me mostrou que existe um caminho sem sofrimento.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-8 border-l border-wine/40 pl-6">
            <p className="font-display text-2xl leading-snug text-green-dark sm:text-[1.75rem]">
              Hoje, meu propósito é compartilhar esse caminho com você.
            </p>
          </Reveal>
        </div>

        {/* Transformação (parte do Sobre) */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ink/60">
                <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
                Minha transformação
              </p>
              <p className="mt-4 text-[0.95rem] text-ink/70">Arraste para conhecer um pouco da minha transformação.</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <ImageComparisonSlider
                before={{ ...images.before, position: "50% 28%" }}
                after={{ ...images.after, position: "50% 50%" }}
                beforeLabel="ANTES"
                afterLabel="MINHA TRANSFORMAÇÃO"
                aspectClassName="aspect-[4/5] sm:aspect-[2/3]"
                className="mx-auto max-w-md shadow-[0_40px_80px_-45px_rgba(43,43,43,0.55)] lg:max-w-none"
              />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-8 max-w-md text-[0.98rem] leading-[1.8] text-ink/70 lg:max-w-none">
                Mais do que emagrecer, aprendi a construir uma relação saudável com a alimentação, com meu corpo e com a
                minha rotina. É exatamente esse caminho que quero compartilhar com cada paciente.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
