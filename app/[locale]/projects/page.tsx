import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/app/components/siteHeader';
import Footer from '@/app/components/siteFooter';
import ProjectsGrid from './projectsGrid';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Projects - Milenko Ilic | Full Stack Developer',
  description: 'Browse all projects by Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress.',
  keywords: ['Milenko Ilic', 'Full Stack Developer', 'Laravel developer', 'React developer', 'WordPress developer', 'web development projects', 'portfolio'],
  alternates: { canonical: 'https://milenkoilic.dev/projects' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Projects - Milenko Ilic | Full Stack Developer',
    description: 'Browse all projects by Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress.',
    url: 'https://milenkoilic.dev/projects',
    siteName: 'Milenko Ilic Full Stack Developer',
    images: [{ url: 'https://milenkoilic.dev/og-image.png', width: 1200, height: 630, alt: 'Milenko Ilic Portfolio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Milenko Ilic | Full Stack Developer',
    description: 'Browse all projects by Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress.',
    images: ['https://milenkoilic.dev/og-image.png'],
  },
};

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
