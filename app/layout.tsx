import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
