import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/kids-mini-games",
        assetPrefix: "/kids-mini-games/",
      }
    : {}),
};

export default nextConfig;
