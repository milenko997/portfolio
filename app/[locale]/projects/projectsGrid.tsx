'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { projectCategories, projects, type ProjectCategory } from '@/app/data/projects';
import ProjectCard from '@/app/components/projectCard';
import styles from './page.module.scss';

type Filter = 'all' | ProjectCategory;

const filters: Filter[] = ['all', ...projectCategories];

const projectsFor = (filter: Filter) =>
  filter === 'all' ? projects : projects.filter((project) => project.categories.includes(filter));

export default function ProjectsGrid() {
  const t = useTranslations('projectsPage');
  const tCategories = useTranslations('categories');
  const [active, setActive] = useState<Filter>('all');

  return (
    <>
      <div className={styles.filters} role="group" aria-label={t('filterLabel')}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${styles.filter} ${active === filter ? styles.filterActive : ''}`}
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filter === 'all' ? t('all') : tCategories(filter)}
            <span className={styles.filterCount}>{projectsFor(filter).length}</span>
          </button>
        ))}
      </div>

      <div className={styles.projectsGrid}>
        {projectsFor(active).map((project) => (
          <ProjectCard key={project.id} project={project} titleTag="h2" />
        ))}
      </div>
    </>
  );
}
