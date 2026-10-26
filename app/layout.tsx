import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AppProviders } from "@/components/app-providers";
import { LegalDock } from "@/components/legal-dock";
import "./globals.css";

export const metadata: Metadata = {
  title: "ぴょんのあそびじま",
  description:
    "からだとあたまをつかう、子ども向けあそびのしま。反応・きおく・かず・いろかたち・おと。",
  appleWebApp: { title: "あそびじま", capable: true },
};

export const viewport: Viewport = {
  themeColor: "#7dd3fc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="flex min-h-full flex-col text-[var(--foreground)]">
        <AppProviders>
          {children}
          <LegalDock />
        </AppProviders>
        {/* Cookie なしの Vercel Web Analytics。子ども向けなので広告・追跡はしない */}
        <Analytics />
      </body>
    </html>
  );
}
