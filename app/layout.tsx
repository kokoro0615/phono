import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Jost, Zen_Kaku_Gothic_New } from "next/font/google";
import { SiteHeader } from "@/components/phono/interactive";
import { MotionRuntime } from "@/components/phono/motion";
import { MOTION_BOOT_SCRIPT, revealBaseCss } from "@/components/phono/motion-config";
import "./globals.css";
// Loaded after globals.css so the motion layer wins the cascade without
// raising specificity anywhere.
import "./motion.css";

const zenKakuGothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-kaku-gothic"
});

// The Figma source sets every Latin display string in Futura PT Heavy, which is
// a licensed Adobe face and cannot be self-hosted here. Jost is the closest open
// geometric substitute; its tracking is calibrated in app/globals.css against the
// advance widths Figma reports (see scripts/fontcal2.mjs).
const displaySans = Jost({
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-sans"
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
  // The boot script stamps data-motion on <html> before React hydrates, which
  // is a deliberate server/client difference.
  return (
    <html lang="ja" className={`${zenKakuGothic.variable} ${displaySans.variable}`} suppressHydrationWarning>
      <body>
        {/* Both of these run/apply during parse, before anything below them
            paints: the script decides whether motion is allowed at all, and
            the style carries the reveal hidden state so no block is ever seen
            at full opacity and then hidden again. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
        <style dangerouslySetInnerHTML={{ __html: revealBaseCss() }} />
        <a href="#main-content" className="skip-link">
          本文へスキップ
        </a>
        <SiteHeader />
        <MotionRuntime />
        {children}
      </body>
    </html>
  );
}
