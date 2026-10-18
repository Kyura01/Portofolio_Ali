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
  title: "Portofolio Ali",
  description: "Portofolio interaktif dengan animasi 3D.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Effects />
        {children}
      </body>
    </html>
  );
}
