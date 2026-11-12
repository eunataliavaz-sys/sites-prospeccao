import type { NextConfig } from "next";

// Definido apenas no build de publicação (npm run publish:pages)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

// Cloudflare Pages define CF_PAGES=1 no build: lá o site também sai estático (pasta out/)
const isCloudflare = !!process.env.CF_PAGES;

const nextConfig: NextConfig = basePath || isCloudflare
  ? {
      // GitHub Pages / Cloudflare: gera HTML/CSS/JS prontos; animações e interações continuam no navegador
      output: "export",
      ...(basePath ? { basePath } : {}),
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
      },
    };

export default nextConfig;
