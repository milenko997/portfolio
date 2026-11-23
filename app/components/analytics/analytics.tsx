'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import styles from './analytics.module.scss';

type Consent = 'granted' | 'denied';

const STORAGE_KEY = 'cookie-consent';
// Fired by the "Cookie settings" link in the footer to show the banner again.
export const OPEN_CONSENT_EVENT = 'cookie-consent:open';

const readConsent = (): Consent | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

const saveConsent = (value: Consent) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: the choice only lasts for this page view.
  }
};

// Removes Google Analytics cookies (_ga, _ga_<id>) left from an earlier "allow".
const clearAnalyticsCookies = () => {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
};

type AnalyticsProps = {
  measurementId?: string;
};

// Google Analytics loads only after the visitor allows it; until then no script runs and no cookies are set.
export default function Analytics({ measurementId }: AnalyticsProps) {
  const t = useTranslations('cookies');
  const [consent, setConsent] = useState<Consent | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    // Reading storage has to wait for the client, so the first render always matches the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(saved);
    setBannerOpen(saved === null);

    const open = () => setBannerOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  if (!measurementId) return null;

  const choose = (value: Consent) => {
    const revoked = consent === 'granted' && value === 'denied';
    saveConsent(value);
    setConsent(value);
    setBannerOpen(false);
    if (revoked) {
      clearAnalyticsCookies();
      // The analytics script is already running; a reload is the only way to stop it.
      window.location.reload();
    }
  };

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}');
            `}
          </Script>
        </>
      )}

      {bannerOpen && (
        <div className={styles.banner} role="dialog" aria-live="polite" aria-label={t('label')}>
          <p>{t('text')}</p>
          <div className={styles.actions}>
            <button type="button" className="btn btn-outline" onClick={() => choose('denied')}>
              {t('decline')}
            </button>
            <button type="button" className="btn btn-primary" onClick={() => choose('granted')}>
              {t('accept')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
