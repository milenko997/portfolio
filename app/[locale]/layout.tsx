import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL, localizedUrl, ogLocale, pageAlternates } from '@/i18n/metadata';
import Analytics from '@/app/components/analytics';
import '../globals.css';
import '../globals.scss';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type MetadataProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('home.title');
  const description = t('home.description');
  const image = { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: t('imageAlt') };

  return {
    metadataBase: new URL(SITE_URL),
    alternates: pageAlternates(locale),
    title,
    description,
    keywords: ["Milenko Ilic", "Full Stack Developer", "Laravel developer", "React developer", "WordPress developer"],
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: localizedUrl(locale),
      siteName: t('siteName'),
      locale: ogLocale[locale],
      images: [image],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
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
              sameAs: ["https://github.com/milenko997", "https://www.linkedin.com/in/milenko-ilic-637b7915b/"],
              address: { "@type": "PostalAddress", addressLocality: "Novi Sad", addressCountry: "RS" },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Analytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
