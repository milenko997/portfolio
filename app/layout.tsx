import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milenkoilic.dev"),
  alternates: {
    canonical: "https://milenkoilic.dev/",
  },
  title: "Milenko Ilic - Full Stack Developer based in Novi Sad, Serbia",
  description:
    "Portfolio of Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress projects.",
  keywords: [
    "Milenko Ilic",
    "Full Stack Developer",
    "Laravel developer",
    "React developer",
    "WordPress developer",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Milenko Ilic - Full Stack Developer based in Novi Sad, Serbia",
    description:
      "Portfolio of Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress projects.",
    url: "https://milenkoilic.dev/",
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
    title: "Milenko Ilic - Full Stack Developer based in Novi Sad, Serbia",
    description:
      "Portfolio of Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress projects.",
    images: ["https://milenkoilic.dev/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Milenko Ilić",
              jobTitle: "Full Stack Developer",
              url: "https://milenkoilic.dev/",
              email: "milenko.ilic997@gmail.com",
              description: "Full Stack Developer specializing in Laravel, React, and WordPress projects.",
              sameAs: [
                "https://github.com/milenko997",
                "https://www.linkedin.com/in/milenko-ilic-637b7915b/",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Novi Sad",
                addressCountry: "RS",
              },
            }),
          }}
        />
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
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
