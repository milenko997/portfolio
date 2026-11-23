import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/app/data/projects';
import styles from './projectCard.module.scss';

type ProjectCardProps = {
    project: Project;
    // h3 under a section heading on the home page, h2 on the projects page.
    titleTag?: 'h2' | 'h3';
};

const ProjectCard = ({ project, titleTag: Title = 'h3' }: ProjectCardProps) => {
    const t = useTranslations();

    return (
        <div className={styles.projectCard}>
            <div className={styles.projectImage}>
                <Image src={project.img} alt={project.title} width={800} height={500} />
            </div>

            <div className={styles.projectContent}>
                <span className={styles.projectCategory}>
                    {project.categories.map((category) => t(`categories.${category}`)).join(' · ')}
                </span>
                <Title className={styles.projectTitle}>
                    <Link href={`/projects/${project.slug}`} className={styles.cardLink}>{project.title}</Link>
                </Title>
                <p className={styles.projectDescription}>{t(`projectItems.${project.slug}.summary`)}</p>

                <div className={styles.projectTags}>
                    {project.tech.map((tech) => (
                        <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                </div>

                <div className={styles.projectLinks}>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" x2="21" y1="14" y2="3" />
                        </svg>
                        {t('projects.liveDemo')}
                    </a>
                    {project.stores && (
                        <>
                            <a href={project.stores.appStore} target="_blank" rel="noopener noreferrer" className={styles.storeLink}>App Store</a>
                            <a href={project.stores.googlePlay} target="_blank" rel="noopener noreferrer" className={styles.storeLink}>Google Play</a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
