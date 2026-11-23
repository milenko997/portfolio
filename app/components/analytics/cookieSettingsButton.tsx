'use client';

import { OPEN_CONSENT_EVENT } from './analytics';
import styles from './analytics.module.scss';

// Lets visitors change their analytics choice after closing the banner.
export default function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" className={styles.settings} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      {label}
    </button>
  );
}
