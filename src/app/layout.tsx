import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kometaFont = localFont({
  src: [
    { path: "./fonts/Kometa-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Kometa-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Kometa-Regular.woff2", weight: "400", style: "normal" },
  ],
  display: "swap",
  variable: "--font-kometa",
});

export const metadata: Metadata = {
  title: "SimsTree",
  description: "Дерево династий симс",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kometaFont.variable} antialiased`}
      suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
