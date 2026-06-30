import type { Metadata } from 'next';
import '@/app/globals.scss';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/siteHeader';
import Footer from '@/app/components/siteFooter';
import { projects } from '@/app/data/projects';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Projects - Milenko Ilic | Full Stack Developer',
  description: 'All projects by Milenko Ilic - Full Stack Developer specializing in Laravel, React, and WordPress.',
  alternates: {
    canonical: 'https://milenkoilic.dev/projects',
  },
};

export default function ProjectsPage() {
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
              Back
            </Link>
            <span className={styles.sectionLabel}>Portfolio</span>
            <h1 className={styles.sectionTitle}>All Projects</h1>
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectImage}>
                  <Image
                    src={project.img}
                    alt={project.title}
                    width={800}
                    height={500}
                    className={styles.roundedMd}
                  />
                </div>

                <div className={styles.projectContent}>
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <div className={styles.projectTags}>
                    {project.tech.map((tech, index) => (
                      <span key={index} className={styles.tag}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.projectLinks}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" x2="21" y1="14" y2="3" />
                      </svg>
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
