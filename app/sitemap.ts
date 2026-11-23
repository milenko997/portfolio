import { MetadataRoute } from 'next'
import { projects } from '@/app/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://milenkoilic.dev/',
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://milenkoilic.dev/projects',
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `https://milenkoilic.dev/projects/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `https://milenkoilic.dev/projects/${project.slug}`,
          sr: `https://milenkoilic.dev/sr/projects/${project.slug}`,
        },
      },
    })),
  ]
}
