import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, localizedUrl, ogLocale, pageAlternates } from '@/i18n/metadata';
import Header from '@/app/components/siteHeader';
import Footer from '@/app/components/siteFooter';
import ProjectsGrid from './projectsGrid';
import styles from './page.module.scss';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('projects.title');
  const description = t('projects.description');
  const image = { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: t('imageAlt') };

  return {
    title,
    description,
    keywords: ['Milenko Ilic', 'Full Stack Developer', 'Laravel developer', 'React developer', 'WordPress developer', 'web development projects', 'portfolio'],
    alternates: pageAlternates(locale, '/projects'),
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, '/projects'),
      siteName: t('siteName'),
      locale: ogLocale[locale],
      images: [image],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

export default function ProjectsPage() {
  const t = useTranslations('projectsPage');

  return (
    <main className="main">
      <Header />

      <section className={styles.projectsPage}>
        <div className="container">
          <div className={styles.pageHeader}>
            <Link href="/#projects" className={styles.backLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
              </svg>
              {t('back')}
            </Link>
            <span className={styles.sectionLabel}>{t('label')}</span>
            <h1 className={styles.sectionTitle}>{t('title')}</h1>
          </div>

          <ProjectsGrid />
        </div>
      </section>

      <Footer />
    </main>
  );
}
