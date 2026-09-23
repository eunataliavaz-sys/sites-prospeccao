import { About } from "@/components/sections/about";
import { Differentials } from "@/components/sections/differentials";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Marquee } from "@/components/sections/marquee";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Specialties } from "@/components/sections/specialties";
import { Testimonials } from "@/components/sections/testimonials";
import { WhatsAppFloat } from "@/components/sections/whatsapp-float";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-green-dark focus:px-5 focus:py-3 focus:text-sm focus:text-cream"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <About />
        <Specialties />
        <HowItWorks />
        <Differentials />
        <Testimonials />
        <FinalCta />
        <Marquee />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
