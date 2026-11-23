import { useTranslations } from 'next-intl';
import { projects } from '@/app/data/projects'
import { Link } from '@/i18n/navigation';
import ProjectCard from '@/app/components/projectCard';
import styles from './projects.module.scss';

const Projects = () => {
    const t = useTranslations('projects');
    const featured = projects.slice(0, 4);

    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
            <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>{t('label')}</span>
                <h2 className={styles.sectionTitle}>{t('title')}</h2>
            </div>

            <div className={styles.projectsGrid}>
                {featured.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            <div className={styles.viewAll}>
                <Link href="/projects" className="btn btn-outline">
                    {t('viewAll')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                </Link>
            </div>
            </div>
        </section>
    )
}

export default Projects;
