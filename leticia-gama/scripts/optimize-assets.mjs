// Converte os originais (assets-originais/) em WebP otimizados dentro de public/assets.
// Uso: npm run assets
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-originais";
const OUT = "public/assets";

const jobs = [
  // Elementos flutuantes: ver scripts/floating-assets.mjs (sombra gravada na imagem)
  // Fotos da Letícia
  { src: "leticia hero.jpg", out: "images/leticia-hero.webp", width: 1400, quality: 80 },
  { src: "leticia antes.png", out: "images/leticia-antes.webp", width: 1100, quality: 78 },
  { src: "leticia depois.jpg", out: "images/leticia-depois.webp", width: 1100, quality: 80 },
  // Avatar: recorte de rosto e ombros da foto "A consulta é sobre você"
  {
    src: "A consulta é sobre você.png",
    out: "images/leticia-perfil.webp",
    extract: { left: 405, top: 150, width: 500, height: 500 },
    width: 240,
    quality: 85,
  },
  // Logos
  { src: "logo verde escuro.png", out: "brand/logo-verde-escuro.webp", width: 240, trim: true },
  { src: "logo bege.png", out: "brand/logo-bege.webp", width: 240, trim: true },
  { src: "logo vinho.png", out: "brand/logo-vinho.webp", width: 240, trim: true },
  { src: "logo verde claro.png", out: "brand/logo-verde-claro.webp", width: 240, trim: true },
  // Depoimentos (prints reais)
  ...[1, 2, 3, 4].map((n) => ({
    src: `depoimento 0${n}.jpeg`,
    out: `testimonials/depoimento-0${n}.webp`,
    width: 900,
    quality: 82,
  })),
];

for (const job of jobs) {
  const outPath = path.join(OUT, job.out);
  await mkdir(path.dirname(outPath), { recursive: true });
  let img = sharp(path.join(SRC, job.src)).rotate();
  if (job.extract) img = img.extract(job.extract);
  if (job.trim) img = img.trim();
  const info = await img
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality ?? 82, alphaQuality: 90, effort: 5 })
    .toFile(outPath);
  console.log(`${job.out.padEnd(36)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
