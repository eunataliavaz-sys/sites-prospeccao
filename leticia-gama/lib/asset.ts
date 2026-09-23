/**
 * Prefixo das URLs públicas. Vazio no dev; no build do GitHub Pages recebe
 * o caminho do repositório (ex.: /sites-prospeccao/leticia-gama-nutricionista).
 * O next/image não aplica o basePath sozinho em src de string, por isso este helper.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
