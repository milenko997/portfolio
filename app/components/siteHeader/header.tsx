'use client';

import { useState, useEffect } from 'react';
import styles from './header.module.scss';

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    function highlightNavOnScroll() {
      const scrollY = window.scrollY;

      sections.forEach((section) => {
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

    return () => {
      window.removeEventListener('scroll', highlightNavOnScroll);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <a href="/" className={styles.logo}>
          milenko<span>.</span>
        </a>

        <nav className={styles.navDesktop}>
          <a href="#home" className={`${styles.navLink} ${activeSection === 'home' ? styles.navLinkActive : ''}`}>Home</a>
          <a href="#projects" className={`${styles.navLink} ${activeSection === 'projects' ? styles.navLinkActive : ''}`}>Projects</a>
          <a href="#about" className={`${styles.navLink} ${activeSection === 'about' ? styles.navLinkActive : ''}`}>About</a>
          <a href="#contact" className={`${styles.navLink} ${activeSection === 'contact' ? styles.navLinkActive : ''}`}>Contact</a>
          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </nav>

        <button
          className={styles.mobileMenuBtn}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg
            className={`icon-menu ${isMobileOpen ? 'hidden' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>

          <svg
            className={`icon-close ${isMobileOpen ? '' : 'hidden'}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="M6 6 18 18" />
          </svg>
        </button>
      </div>

      <nav className={`${styles.navMobile} ${isMobileOpen ? '' : 'hidden'}`}>
        <a href="#home" className={styles.navLink} onClick={closeMobileMenu}>Home</a>
        <a href="#projects" className={styles.navLink} onClick={closeMobileMenu}>Projects</a>
        <a href="#about" className={styles.navLink} onClick={closeMobileMenu}>About</a>
        <a href="#contact" className={styles.navLink} onClick={closeMobileMenu}>Contact</a>
        <a href="#contact" className="btn btn-primary" onClick={closeMobileMenu}>Let's Talk</a>
      </nav>
    </header>
  );
};

export default Header;
