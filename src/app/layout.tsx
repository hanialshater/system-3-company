import type { Metadata, Viewport } from "next";
import "./globals.css";
import AccountSync from "@/components/account/AccountSync";

export const metadata: Metadata = {
  title: "System 3 — 60-second lessons",
  description: "Interactive lessons that ask you to predict before they explain. Made by a company of narrow AI agents that check each other.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0f14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <AccountSync />
      </body>
    </html>
  );
}
