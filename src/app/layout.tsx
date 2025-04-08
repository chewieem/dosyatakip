import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: 'Nextbyte - Kurumsal Teknoloji Çözümleri',
  description: 'Kurumsal teknoloji çözümleri ve danışmanlık hizmetleri.',
  icons: [
    { rel: 'icon', url: '/images/nextbyte_icon.png' },
    { rel: 'apple-touch-icon', url: '/images/nextbyte_icon.png' },
  ],
  keywords: ["kurumsal hizmetler", "teknoloji çözümleri", "danışmanlık", "dijital dönüşüm", "yazılım"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
