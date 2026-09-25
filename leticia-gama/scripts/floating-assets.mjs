// Gera os elementos flutuantes (frutas/folhas) com a sombra já gravada na imagem.
// Motivo: o Safari (iPhone) às vezes desenha um retângulo em volta de imagens animadas
// que usam `filter: drop-shadow`/`blur`. Gravando sombra e desfoque no arquivo, o site
// não precisa de filtros CSS nesses elementos.
// Uso: npm run assets
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Mantenha em sincronia com SHADOW_PAD em components/ui/floating-produce.tsx
// Sombra discreta e difusa; a margem cobre 3 desvios do desfoque para a sombra nunca ser cortada
const SHADOW = { offsetY: 0.025, sigma: 0.04, opacity: 0.08, rgb: [43, 43, 43] }; // frações da largura da fruta
export const SHADOW_PAD = { side: 0.12, top: 0.12, bottom: 0.145 }; // idem
const SOFT_SIGMA = 0.02; // desfoque das versões "-soft" (profundidade de campo)

const SRC = "assets-originais";
const OUT = "public/assets/floating";

const jobs = [
  { src: "limão siciliano.png", name: "lemon", width: 640, soft: true },
  { src: "morango.png", name: "strawberry", width: 560 },
  { src: "brócolis.png", name: "broccoli", width: 640, soft: true },
  { src: "laranja.png", name: "orange", width: 640 },
  { src: "cereja.png", name: "cherry", width: 480 },
  { src: "espinafre.png", name: "leaf-1", width: 720 },
  { src: "rúcula.png", name: "leaf-2", width: 640, soft: true },
  { src: "fita métrica.png", name: "measuring-tape", width: 420 },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  // 1) Recorta, redimensiona e zera a transparência "quase zero" (ruído de borda)
  const { data, info } = await sharp(`${SRC}/${job.src}`)
    .ensureAlpha()
    .trim()
    .resize({ width: job.width, withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 8) data[i] = 0;

  // 2) Sombra: silhueta da fruta, na cor da tinta, com opacidade baixa
  const shadow = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    shadow[i] = SHADOW.rgb[0];
    shadow[i + 1] = SHADOW.rgb[1];
    shadow[i + 2] = SHADOW.rgb[2];
    shadow[i + 3] = Math.round(data[i + 3] * SHADOW.opacity);
  }

  const padSide = Math.round(W * SHADOW_PAD.side);
  const padTop = Math.round(W * SHADOW_PAD.top);
  const padBottom = Math.round(W * SHADOW_PAD.bottom);
  const canvas = { width: W + padSide * 2, height: H + padTop + padBottom, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } };
  const raw = { raw: { width: W, height: H, channels: 4 } };

  const shadowLayer = await sharp({ create: canvas })
    .composite([{ input: shadow, ...raw, left: padSide, top: padTop + Math.round(W * SHADOW.offsetY) }])
    .blur(Math.max(0.3, W * SHADOW.sigma))
    .png()
    .toBuffer();

  const composed = await sharp(shadowLayer)
    .composite([{ input: data, ...raw, left: padSide, top: padTop }])
    .raw()
    .toBuffer({ resolveWithObject: true });
  // cauda do desfoque vira transparência total
  for (let i = 3; i < composed.data.length; i += 4) if (composed.data[i] < 2) composed.data[i] = 0;

  const flat = await sharp({ create: canvas })
    .composite([{ input: data, ...raw, left: padSide, top: padTop }])
    .raw()
    .toBuffer();

  const toWebp = (buffer, file) =>
    sharp(buffer, { raw: { width: canvas.width, height: canvas.height, channels: 4 } })
      .webp({ quality: 82, alphaQuality: 100, effort: 5 })
      .toFile(`${OUT}/${file}`);

  const out = await toWebp(composed.data, `${job.name}.webp`);
  await toWebp(flat, `${job.name}-flat.webp`); // sem sombra (Hero)
  let softInfo = "";
  if (job.soft) {
    const blurred = async (buffer) => {
      const b = await sharp(buffer, { raw: { width: canvas.width, height: canvas.height, channels: 4 } })
        .blur(W * SOFT_SIGMA)
        .raw()
        .toBuffer();
      for (let i = 3; i < b.length; i += 4) if (b[i] < 2) b[i] = 0;
      return b;
    };
    const s = await toWebp(await blurred(composed.data), `${job.name}-soft.webp`);
    await toWebp(await blurred(flat), `${job.name}-soft-flat.webp`);
    softInfo = ` + soft ${(s.size / 1024).toFixed(0)} KB`;
  }
  console.log(`${job.name.padEnd(16)} ${out.width}x${out.height}  ${(out.size / 1024).toFixed(0)} KB${softInfo}`);
}
