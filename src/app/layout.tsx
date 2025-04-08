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
  icons: {
    icon: '/images/nextbyte_icon.png',
    shortcut: '/images/nextbyte_icon.png',
    apple: '/images/nextbyte_icon.png',
  },
  keywords: ["corporate services", "business solutions", "professional services", "consulting", "business support"],
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
