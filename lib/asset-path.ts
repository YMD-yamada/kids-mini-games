const basePath =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_BASE_PATH ?? ""
    : "";

/** Public asset path (works with GitHub Pages basePath). */
export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
