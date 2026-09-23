// Gera a versão para o GitHub Pages e copia para ../leticia-gama-nutricionista
// Uso: npm run publish:pages   (depois: commit + push do repositório sites-prospeccao)
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const REPO = "sites-prospeccao";
const SLUG = "leticia-gama-nutricionista";
const OWNER = "eunataliavaz-sys";

const basePath = `/${REPO}/${SLUG}`;
const siteUrl = `https://${OWNER}.github.io${basePath}`;
const outDir = path.resolve("out");
const target = path.resolve("..", SLUG);

const build = spawnSync("npx next build", {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl },
});
if (build.status !== 0) process.exit(build.status ?? 1);

rmSync(target, { recursive: true, force: true });
cpSync(outDir, target, { recursive: true });

// Sem isso o GitHub Pages (Jekyll) ignora a pasta _next/
const nojekyll = path.resolve("..", ".nojekyll");
if (!existsSync(nojekyll)) writeFileSync(nojekyll, "");

console.log(`\nPublicado em ${target}\nLink após o push: ${siteUrl}/`);
