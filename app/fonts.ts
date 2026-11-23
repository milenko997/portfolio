import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Shared by the locale layout and the root 404 page, which renders without a layout.
export const fontClassName = `${geistSans.variable} ${geistMono.variable} antialiased`;
