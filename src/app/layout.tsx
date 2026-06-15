import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Clash Display is self-hosted (woff2 in ./fonts) — no external request.
const clashDisplay = localFont({
  variable: "--font-clash",
  display: "swap",
  src: [
    { path: "./fonts/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Ọnà Studio — Digital Design from Nigeria, for the World",
  description:
    "Ọnà is a design studio from Lagos, Nigeria, crafting bold brands, interfaces and motion for ambitious teams across the world.",
  keywords: [
    "design studio Nigeria",
    "Lagos design agency",
    "UI UX design",
    "branding",
    "WebGL",
    "digital experiences",
  ],
  openGraph: {
    title: "Ọnà Studio — Digital Design from Nigeria, for the World",
    description:
      "A Nigerian design studio crafting digital experiences the whole world feels.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${clashDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
