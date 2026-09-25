"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";

import { InstagramIcon, SeedOfLife } from "@/components/brand";
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

  // Menu aberto: Esc fecha, a página atrás não rola e ele se fecha se a tela virar desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.documentElement.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        open
          ? "bg-cream shadow-[0_1px_0_rgb(43_43_43/0.08)]"
          : scrolled
            ? "bg-cream/85 shadow-[0_1px_0_rgb(43_43_43/0.06)] backdrop-blur-md"
            : "bg-transparent",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        <a
          href="#inicio"
          className="flex min-w-0 items-center gap-2.5 rounded-full text-green-dark sm:gap-3"
          aria-label={`${siteConfig.name}, voltar ao início`}
        >
          <SeedOfLife className="size-7 shrink-0 sm:size-8" strokeWidth={4} aria-hidden="true" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.15rem] whitespace-nowrap text-ink sm:text-[1.3rem]">
              {siteConfig.name}
            </span>
            <span className="mt-1 text-[0.55rem] font-medium tracking-[0.26em] text-ink/55 uppercase sm:text-[0.6rem] sm:tracking-[0.3em]">
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

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button asChild size="sm" className="max-sm:h-8 max-sm:px-3.5 max-sm:text-[0.75rem]">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar consulta pelo WhatsApp"
            >
              <span className="sm:hidden">Agendar</span>
              <span className="hidden sm:inline">Agendar consulta</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="-mr-2 xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </Button>
        </div>
      </Container>

      {/* Menu mobile/tablet: painel de tela cheia abaixo do cabeçalho */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto overscroll-contain bg-cream xl:hidden"
          >
            <motion.nav
              aria-label="Menu"
              initial={{ y: -12 }}
              animate={{ y: 0 }}
              exit={{ y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-full flex-col"
            >
              <Container className="flex flex-1 flex-col pt-4 pb-8">
                <ul className="border-t border-ink/10">
                  {navLinks.map((link, index) => {
                    const active = activeId === link.href.slice(1);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="border-b border-ink/10"
                      >
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "location" : undefined}
                          className={cn(
                            "font-display flex items-center justify-between py-4 text-[1.45rem] leading-tight transition-colors sm:text-[1.7rem]",
                            active ? "text-green" : "text-ink",
                          )}
                        >
                          {link.label}
                          <span
                            aria-hidden="true"
                            className={cn("size-1.5 rounded-full", active ? "bg-green" : "bg-transparent")}
                          />
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                <Button asChild size="lg" className="mt-8 w-full">
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    Agendar minha consulta
                    <ArrowUpRight strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </Button>

                <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-10 text-sm text-ink/60">
                  <a
                    href={siteConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-wine"
                  >
                    <InstagramIcon className="size-4" aria-hidden="true" />
                    {siteConfig.instagram.handle}
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-wine">
                    <Mail className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    {siteConfig.email}
                  </a>
                </div>
              </Container>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
