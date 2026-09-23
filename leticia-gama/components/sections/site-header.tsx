"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { SeedOfLife } from "@/components/brand";
import { Container } from "@/components/section";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig, whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("inicio");

  // ScrollSpy: a seção que cruza a faixa central da viewport define o item ativo
  useEffect(() => {
    // A Hero também é observada para que nenhum item fique ativo no topo da página
    const sections = ["#inicio", ...navLinks.map((link) => link.href)]
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled || open ? "bg-cream/85 shadow-[0_1px_0_rgb(43_43_43/0.06)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="#inicio"
          className="flex items-center gap-3 rounded-full text-green-dark"
          aria-label={`${siteConfig.name}, voltar ao início`}
        >
          <SeedOfLife className="size-8" strokeWidth={4} aria-hidden="true" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.3rem] whitespace-nowrap text-ink">{siteConfig.name}</span>
            <span className="mt-1 text-[0.6rem] font-medium tracking-[0.3em] text-ink/55 uppercase">
              {siteConfig.role}
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeId === link.href.slice(1) ? "location" : undefined}
              className={cn(
                "relative text-[0.85rem] whitespace-nowrap transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-wine after:transition-transform after:duration-300 hover:after:scale-x-100",
                activeId === link.href.slice(1) ? "text-green" : "text-ink/75 hover:text-ink",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Agendar consulta
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </Button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden xl:hidden"
          >
            <Container className="flex flex-col gap-1 pt-2 pb-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={activeId === link.href.slice(1) ? "location" : undefined}
                  className={cn(
                    "font-display rounded-lg py-3 text-2xl transition-colors",
                    activeId === link.href.slice(1) ? "text-green" : "text-ink",
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild size="lg" className="mt-4 self-start">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  Agendar minha consulta
                </a>
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
