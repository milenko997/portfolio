import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './not-found.module.scss';

// not-found gets no params, so the title stays language-neutral.
export const metadata: Metadata = {
  title: '404 | Milenko Ilić',
  robots: { index: false, follow: true },
  // Don't inherit the layout's home-page canonical, hreflang and social tags.
  alternates: null,
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <main className="main">
      <section className={styles.notFound}>
        <div className="container">
          <span className={styles.code}>404</span>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.text}>{t('text')}</p>
          <div className={styles.actions}>
            <Link href="/" className="btn btn-primary btn-lg">
              {t('home')}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link href="/projects" className="btn btn-outline btn-lg">{t('projects')}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
