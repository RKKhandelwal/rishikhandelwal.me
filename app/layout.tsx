import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishi Khandelwal — A little world of curiosity",
  description:
    "A playful collection of Rishi's learning, leadership, and community experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}
      >
        <div className="site-background" aria-hidden="true">
          <span />
        </div>
        {children}
      </body>
    </html>
  );
}
