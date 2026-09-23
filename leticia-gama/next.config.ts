import type { NextConfig } from "next";

// Definido apenas no build de publicação (npm run publish:pages)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = basePath
  ? {
      // GitHub Pages: gera HTML/CSS/JS prontos; animações e interações continuam no navegador
      output: "export",
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
      },
    };

export default nextConfig;
