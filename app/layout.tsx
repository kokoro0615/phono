import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { SiteHeader } from "@/components/phono/interactive";
import "./globals.css";

const zenKakuGothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-kaku-gothic"
});

export const metadata: Metadata = {
  title: "phono | ありのままを響かせる会社",
  description: "phono corporate website reproduction",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja" className={zenKakuGothic.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          本文へスキップ
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
