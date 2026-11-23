import { routing } from './routing';

export const SITE_URL = 'https://milenkoilic.dev';

export const ogLocale: Record<string, string> = { en: 'en_US', sr: 'sr_RS' };

// The default locale has no prefix ("/projects"), the others do ("/sr/projects").
export function localizedUrl(locale: string, path = '/') {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  if (path === '/') return prefix ? `${SITE_URL}${prefix}` : `${SITE_URL}/`;
  return `${SITE_URL}${prefix}${path}`;
}

// Each language version is its own canonical page, linked to the others through hreflang.
export function languageAlternates(path = '/') {
  return {
    ...Object.fromEntries(routing.locales.map((locale) => [locale, localizedUrl(locale, path)])),
    'x-default': localizedUrl(routing.defaultLocale, path),
  };
}

export function pageAlternates(locale: string, path = '/') {
  return { canonical: localizedUrl(locale, path), languages: languageAlternates(path) };
}
