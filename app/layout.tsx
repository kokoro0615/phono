import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/phono/interactive";
import "./globals.css";

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
    <html lang="ja">
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
