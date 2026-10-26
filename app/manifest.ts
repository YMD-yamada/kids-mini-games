import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ぴょんのあそびじま",
    short_name: "あそびじま",
    description:
      "からだとあたまをつかう、子ども向けあそびのしま。反応・きおく・かず・いろかたち・おと。",
    start_url: "/",
    display: "standalone",
    lang: "ja",
    background_color: "#e8f7ff",
    theme_color: "#7dd3fc",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
