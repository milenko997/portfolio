'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import styles from './header.module.scss';

// Sections live on the home page. Linking to "/#section" (not just "#section") makes the links
// work from other pages too, e.g. /projects -> home page, scrolled to About.
const sections = ['home', 'projects', 'about', 'contact'] as const;

const locales = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'sr', label: 'SR', name: 'Srpski' },
] as const;

const Header = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileOpen(false);

  const switchLocale = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const sectionEls = document.querySelectorAll<HTMLElement>('section[id]');

    function highlightNavOnScroll() {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 8);
      sectionEls.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight && sectionId) {
          setActiveSection(sectionId);
        }
      });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll();
    return () => window.removeEventListener('scroll', highlightNavOnScroll);
  }, []);

  useEffect(() => {
    // The mobile menu is hidden on desktop, so close it when the viewport grows past the breakpoint
    const desktop = window.matchMedia('(min-width: 900px)');
    const closeOnDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileOpen(false);
    };

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled || isMobileOpen ? styles.headerScrolled : ''} ${isMobileOpen ? styles.headerOpen : ''}`}>
      <div className={`container ${styles.headerContent}`}>
        <Link href="/" className={styles.logo}>
          milenko<span>.</span>
        </Link>

        <nav className={styles.navDesktop} aria-label={t('mainNav')}>
          {sections.map((section) => (
            <Link
              key={section}
              href={`/#${section}`}
              className={`${styles.navLink} ${activeSection === section ? styles.navLinkActive : ''}`}
            >
              {t(section)}
            </Link>
          ))}

          <div className={styles.localeSwitcher} role="group" aria-label={t('language')}>
            {locales.map((item) => (
              <button
                key={item.code}
                type="button"
                lang={item.code}
                aria-label={item.name}
                aria-pressed={locale === item.code}
                className={`${styles.localeBtn} ${locale === item.code ? styles.localeBtnActive : ''}`}
                onClick={() => switchLocale(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link href="/#contact" className={`btn btn-primary ${styles.cta}`}>{t('cta')}</Link>
        </nav>

        <button
          type="button"
          className={styles.mobileMenuBtn}
          onClick={toggleMobileMenu}
          aria-label={isMobileOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
        >
          <svg className={`icon-menu ${isMobileOpen ? 'hidden' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <svg className={`icon-close ${isMobileOpen ? '' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="M6 6 18 18" />
          </svg>
        </button>
      </div>

      <nav id="mobile-menu" className={`${styles.navMobile} ${isMobileOpen ? '' : 'hidden'}`} aria-label={t('mobileNav')}>
        {sections.map((section) => (
          <Link key={section} href={`/#${section}`} className={styles.navLink} onClick={closeMobileMenu}>
            {t(section)}
          </Link>
        ))}
        <div className={styles.localeSwitcher} role="group" aria-label={t('language')}>
          {locales.map((item) => (
            <button
              key={item.code}
              type="button"
              lang={item.code}
              aria-label={item.name}
              aria-pressed={locale === item.code}
              className={`${styles.localeBtn} ${locale === item.code ? styles.localeBtnActive : ''}`}
              onClick={() => { switchLocale(item.code); closeMobileMenu(); }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Link href="/#contact" className="btn btn-primary" onClick={closeMobileMenu}>{t('cta')}</Link>
      </nav>
    </header>
  );
};

export default Header;
