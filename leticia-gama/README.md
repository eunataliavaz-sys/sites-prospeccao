# Letícia Gama | Site institucional

Next.js (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, e-mail, Instagram, CRN | `lib/site-config.ts` |
| Especialidades, etapas, diferenciais, depoimentos, marquee | `lib/content.ts` |
| Paleta e fontes | `app/globals.css` e `app/layout.tsx` |
| Seções | `components/sections/*` |

## Conteúdo pendente

- **WhatsApp**: preencher `siteConfig.whatsapp.number` (DDI + DDD + número, só dígitos).
- **Especialidades** e **Como funciona**: itens com `placeholder: true` em `lib/content.ts`.
- **Depoimentos**: suporta até 6. Adicione o print e inclua uma entrada em `testimonials`.
- **Fonte Black Mango**: é comercial. Coloque os `.woff2` em `public/fonts` e descomente o `@font-face` em `app/globals.css`. Até lá, os títulos usam Fraunces.
- **Abacate**: o slot `avocado.webp` existe em `components/ui/floating-produce.tsx`, mas o asset ainda não foi enviado.

## Imagens

Os originais ficam em `assets-originais/` (fora do git). Para regerar os WebP otimizados em `public/assets`:

```bash
npm run assets
```

Para trocar uma fruta ou foto, substitua o arquivo original e rode o comando (os nomes são mapeados em `scripts/optimize-assets.mjs`).
