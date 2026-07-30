import type { Metadata } from "next";
import { AppProviders } from "@/components/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ぴょんのあそびじま",
  description:
    "からだとあたまをつかう、子ども向けあそびのしま。反応・きおく・かず・いろかたち・おと。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="flex min-h-full flex-col text-[var(--foreground)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
