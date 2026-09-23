// Converte os originais (assets-originais/) em WebP otimizados dentro de public/assets.
// Uso: npm run assets
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-originais";
const OUT = "public/assets";

const jobs = [
  // Elementos flutuantes (PNG com transparência -> recorta bordas vazias)
  { src: "limão siciliano.png", out: "floating/lemon.webp", width: 640, trim: true },
  { src: "morango.png", out: "floating/strawberry.webp", width: 560, trim: true },
  { src: "brócolis.png", out: "floating/broccoli.webp", width: 640, trim: true },
  { src: "laranja.png", out: "floating/orange.webp", width: 640, trim: true },
  { src: "cereja.png", out: "floating/cherry.webp", width: 480, trim: true },
  { src: "espinafre.png", out: "floating/leaf-1.webp", width: 720, trim: true },
  { src: "rúcula.png", out: "floating/leaf-2.webp", width: 640, trim: true },
  { src: "fita métrica.png", out: "floating/measuring-tape.webp", width: 420, trim: true },
  // Fotos da Letícia
  { src: "leticia hero.jpg", out: "images/leticia-hero.webp", width: 1400, quality: 80 },
  { src: "leticia antes.png", out: "images/leticia-antes.webp", width: 1100, quality: 78 },
  { src: "leticia depois.jpg", out: "images/leticia-depois.webp", width: 1100, quality: 80 },
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
  if (job.trim) img = img.trim();
  const info = await img
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality ?? 82, alphaQuality: 90, effort: 5 })
    .toFile(outPath);
  console.log(`${job.out.padEnd(36)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
