import { Mail } from "lucide-react";

import { InstagramIcon, SeedOfLife, WhatsAppIcon } from "@/components/brand";
import { Container } from "@/components/section";
import { siteConfig, whatsappUrl } from "@/lib/site-config";

const contacts = [
  { label: "WhatsApp", value: "Agendar pelo WhatsApp", href: whatsappUrl(), icon: WhatsAppIcon, external: true },
  {
    label: "Instagram",
    value: siteConfig.instagram.handle,
    href: siteConfig.instagram.url,
    icon: InstagramIcon,
    external: true,
  },
  { label: "E-mail", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail, external: false },
];

export function SiteFooter() {
  return (
    <footer className="bg-cream pt-24 pb-10 sm:pt-28">
      <Container>
        <div className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
          <div>
            <SeedOfLife aria-hidden="true" className="size-12 text-green-dark" strokeWidth={4} />
            <p className="font-display mt-8 text-4xl text-ink sm:text-5xl">{siteConfig.name}</p>
            <p className="mt-4 text-sm text-ink/70">
              {siteConfig.role}{" "}
              <span aria-hidden="true" className="mx-1.5 text-wine">
                •
              </span>{" "}
              CRN {siteConfig.crn}
            </p>
            <p className="mt-1.5 text-sm text-ink/55">{siteConfig.specialty}</p>
          </div>

          <address className="not-italic">
            <p className="eyebrow text-ink/45">Contatos</p>
            <ul className="mt-6 space-y-4">
              {contacts.map(({ label, value, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-4 rounded-md text-ink/80 transition-colors hover:text-wine"
                  >
                    <span className="grid size-10 place-items-center rounded-full border border-ink/12 transition-colors group-hover:border-wine/40">
                      <Icon className="size-[1.1rem]" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="text-[0.95rem]">
                      <span className="sr-only">{label}: </span>
                      {value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-ink/10 pt-8 text-xs text-ink/45 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p>
            {siteConfig.role} • CRN {siteConfig.crn}
          </p>
        </div>
      </Container>
    </footer>
  );
}
