import { useTranslations } from 'next-intl';
import style from './about.module.scss';

type Job = {
  title: string;
  company: string;
  period: string;
  description: string;
};

const About = () => {
    const t = useTranslations('about');
    const jobs = t.raw('jobs') as Job[];

    return (
        <section id="about" className={style.about}>
            <div className="container">
                <div className={style.aboutGrid}>
                    <div className={style.aboutContent}>
                        <div className={style.sectionHeader}>
                            <span className={style.sectionLabel}>{t('label')}</span>
                            <h2 className={style.sectionTitle}>{t('title')}</h2>
                        </div>

                        <p className={style.aboutBio}>{t('bio')}</p>

                        <div className={style.location}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>{t('location')}</span>
                        </div>

                        <div className={style.experience}>
                            <h3 className={style.experienceTitle}>{t('experience')}</h3>
                            <div className={style.experienceList}>
                                {jobs.map((job, index) => (
                                    <div key={index} className={style.experienceItem}>
                                        <h4>{job.title}</h4>
                                        <p className={style.experienceMeta}>{job.company} • {job.period}</p>
                                        <p className={style.experienceDesc}>{job.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={style.skillsSection}>
                    <h3 className={style.skillsTitle}>{t('skills')}</h3>
                    <div className={style.skillsGrid}>
                        <div className={style.skillCard}>
                        <div className={style.skillHeader}>
                            <div className={style.skillIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                            </div>
                            <h4>{t('skillCategories.frontend')}</h4>
                        </div>
                        <div className={style.skillTags}>
                            <span>React</span><span>Next.js</span><span>TypeScript</span>
                            <span>SCSS</span><span>Tailwind</span><span>Gutenberg Blocks</span>
                        </div>
                        </div>

                        <div className={style.skillCard}>
                        <div className={style.skillHeader}>
                            <div className={style.skillIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
                            </div>
                            <h4>{t('skillCategories.backend')}</h4>
                        </div>
                        <div className={style.skillTags}>
                            <span>PHP</span><span>Laravel</span><span>MySQL</span>
                            <span>REST APIs</span><span>WordPress</span>
                        </div>
                        </div>

                        <div className={style.skillCard}>
                        <div className={style.skillHeader}>
                            <div className={style.skillIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                            </div>
                            <h4>{t('skillCategories.devops')}</h4>
                        </div>
                        <div className={style.skillTags}>
                            <span>Linux</span><span>Docker</span><span>Git</span>
                            <span>CI/CD</span><span>Nginx/Apache</span>
                        </div>
                        </div>

                        <div className={style.skillCard}>
                        <div className={style.skillHeader}>
                            <div className={style.skillIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                            </div>
                            <h4>{t('skillCategories.tools')}</h4>
                        </div>
                        <div className={style.skillTags}>
                            <span>VS Code</span><span>Figma</span><span>Postman</span>
                            <span>Jira</span><span>Elementor</span><span>WooCommerce</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;
