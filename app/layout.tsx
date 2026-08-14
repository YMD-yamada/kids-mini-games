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
        <footer className="mt-auto border-t border-sky-100 bg-white/70 px-4 py-3 text-center text-xs text-slate-500">
          <p>アカウントなし。名前・位置はあつめません。</p>
          <p className="mt-1">
            <a
              className="underline"
              href="https://ymd-portfolio-site.pages.dev/legal/privacy"
              rel="noopener noreferrer"
            >
              プライバシー
            </a>
            {" · "}
            <a
              className="underline"
              href="https://ymd-portfolio-site.pages.dev/legal/terms"
              rel="noopener noreferrer"
            >
              利用規約
            </a>
            {" · "}
            <a
              className="underline"
              href="https://ymd-portfolio-site.pages.dev/legal/support"
              rel="noopener noreferrer"
            >
              サポート
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
