import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/app/components/siteHeader';
import Footer from '@/app/components/siteFooter';
import { getProject, type Project } from '@/app/data/projects';
import styles from './page.module.scss';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const SITE_URL = 'https://milenkoilic.dev';

// The default locale has no prefix ("/projects/strn"), the others do ("/sr/projects/strn").
const projectUrl = (locale: string, slug: string) =>
  `${SITE_URL}${locale === routing.defaultLocale ? '' : `/${locale}`}/projects/${slug}`;

async function getContext(params: Props['params']) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations({ locale });
  const category = (p: Project) => p.categories.map((c) => t(`categories.${c}`)).join(' · ');
  return { locale, project, t, category };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, project, t, category } = await getContext(params);
  const title = t('projectPage.metaTitle', { title: project.title, category: category(project) });
  const description = t(`projectItems.${project.slug}.summary`);
  const url = projectUrl(locale, project.slug);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, projectUrl(l, project.slug)])),
        'x-default': projectUrl(routing.defaultLocale, project.slug),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Milenko Ilic Full Stack Developer',
      images: [{ url: project.img.src, width: project.img.width, height: project.img.height, alt: project.title }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: [project.img.src] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { project, t, category } = await getContext(params);
  const solution = t.raw(`projectItems.${project.slug}.solution`) as string[];

  return (
    <main className="main">
      <Header />

      <section className={styles.projectPage}>
        <div className="container">
          <Link href="/projects" className={styles.backLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
            </svg>
            {t('projectPage.back')}
          </Link>

          <span className={styles.sectionLabel}>{category(project)}</span>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.lead}>{t(`projectItems.${project.slug}.summary`)}</p>

          <div className={styles.image}>
            <Image src={project.img} alt={project.title} sizes="(max-width: 1200px) 100vw, 1152px" priority />
          </div>

          <div className={styles.details}>
            <div className={styles.overview}>
              <section>
                <h2>{t('projectPage.challenge')}</h2>
                <p>{t(`projectItems.${project.slug}.challenge`)}</p>
              </section>
              <section>
                <h2>{t('projectPage.solution')}</h2>
                {solution.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            </div>

            <aside className={styles.facts}>
              <dl>
                <div>
                  <dt>{t('projectPage.role')}</dt>
                  <dd>{t(`projectItems.${project.slug}.role`)}</dd>
                </div>
                <div>
                  <dt>{t('projectPage.industry')}</dt>
                  <dd>{t(`projectItems.${project.slug}.industry`)}</dd>
                </div>
                <div>
                  <dt>{t('projectPage.type')}</dt>
                  <dd>{category(project)}</dd>
                </div>
                <div>
                  <dt>{t('projectPage.technologies')}</dt>
                  <dd className={styles.tags}>
                    {project.tech.map((tech) => (
                      <span key={tech} className={styles.tag}>{tech}</span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className={styles.links}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  {t('projects.liveDemo')}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
                  </svg>
                </a>
                {project.stores && (
                  <div className={styles.stores}>
                    <a href={project.stores.appStore} target="_blank" rel="noopener noreferrer" className="btn btn-outline">App Store</a>
                    <a href={project.stores.googlePlay} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Google Play</a>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
