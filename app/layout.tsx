import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

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
        url: "https://milenkoilic.dev/og-image.png",
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
    images: ["https://milenkoilic.dev/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
