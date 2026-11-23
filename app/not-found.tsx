import type { Metadata } from 'next';
import Link from 'next/link';
import { fontClassName } from './fonts';
import './globals.css';
import './globals.scss';
import styles from './[locale]/not-found.module.scss';

// Rendered outside [locale], so there is no layout around it and no way to know the language.
export const metadata: Metadata = {
  title: '404 | Milenko Ilić',
  robots: { index: false, follow: true },
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className={fontClassName}>
        <main className={styles.notFound}>
          <div className="container">
            <span className={styles.code}>404</span>
            <h1 className={styles.title}>Page not found</h1>
            <p className={styles.text}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            <div className={styles.actions}>
              <Link href="/" className="btn btn-primary btn-lg">Back to home</Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
