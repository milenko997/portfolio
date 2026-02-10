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
  title: "Milenko Ilic - Full Stack Developer",
  description:
    "Portfolio of Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress projects.",
  openGraph: {
    title: "Milenko Ilic - Full Stack Developer",
    description:
      "Portfolio of Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress projects.",
    siteName: "Milenko Ilic Full Stack Developer",
    images: [
      {
        url: "https://portfolio-pi-vert-10.vercel.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Milenko Ilic Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Milenko Ilic - Full Stack Developer",
    description:
      "Portfolio of Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress projects.",
    images: ["https://portfolio-pi-vert-10.vercel.app/assets/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
