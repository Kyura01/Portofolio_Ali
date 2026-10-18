import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Effects from "@/components/Effects";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Ali Mukti — Software Engineer",
  description:
    "Portfolio of Ahmad Ali Mukti: web and mobile developer building backend systems, IoT pipelines and applied AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Effects />
        {children}
      </body>
    </html>
  );
}
