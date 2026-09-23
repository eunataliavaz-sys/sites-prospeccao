/**
 * Dados da profissional e contatos.
 * Único lugar para editar telefone, e-mail e redes.
 */
export const siteConfig = {
  name: "Letícia Gama",
  role: "Nutricionista",
  crn: "72815",
  specialty: "Especialista em Emagrecimento e Nutrição Esportiva",
  description:
    "Letícia Gama, nutricionista especialista em emagrecimento e nutrição esportiva. Um caminho leve, sustentável e sem dietas malucas.",
  email: "leticiagamanutri@gmail.com",
  instagram: {
    handle: "@leticiagamanutri",
    url: "https://www.instagram.com/leticiagamanutri/",
  },
  whatsapp: {
    // DDI + DDD + número, só dígitos (+55 11 96116-2233)
    number: "5511961162233",
    defaultMessage: "Olá, Letícia! Gostaria de agendar minha consulta.",
  },
} as const;

export function whatsappUrl(message: string = siteConfig.whatsapp.defaultMessage) {
  const text = encodeURIComponent(message);
  const number = siteConfig.whatsapp.number;
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#depoimentos", label: "Depoimentos" },
] as const;
