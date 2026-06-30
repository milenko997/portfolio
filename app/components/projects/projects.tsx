import { projects } from '@/app/data/projects'
import Image from 'next/image';
import Link from 'next/link';
import styles from './projects.module.scss';

const Projects = () => {
    const featured = projects.slice(0, 4);

    return (
        <section id="projects" className={styles.projects}>
            <div className="container">
            <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>Portfolio</span>
                <h2 className={styles.sectionTitle}>Featured Projects</h2>
            </div>

            <div className={styles.projectsGrid}>
                {featured.map((project) => (
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
                        <h3 className={styles.projectTitle}>{project.title}</h3>
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
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            >
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

            <div className={styles.viewAll}>
                <Link href="/projects" className="btn btn-outline">
                    View All Projects
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
