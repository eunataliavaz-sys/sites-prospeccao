import type { Metadata, Viewport } from "next";
import { Fraunces, Poppins } from "next/font/google";

import { MotionProvider } from "@/components/motion/motion-provider";
import { siteConfig } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

// Substituta editorial até os arquivos da Black Mango serem adicionados (ver globals.css)
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteConfig.name} | Nutricionista em Emagrecimento e Nutrição Esportiva`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | Nutricionista`,
    description: siteConfig.description,
    locale: "pt_BR",
    type: "website",
    images: [{ url: `${siteUrl}/assets/images/leticia-hero.webp`, width: 1400, height: 1417 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EFEB",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${fraunces.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
