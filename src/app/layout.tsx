import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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

import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
