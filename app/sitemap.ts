import { MetadataRoute } from 'next'
import { projects } from '@/app/data/projects'
import { routing } from '@/i18n/routing'
import { languageAlternates, localizedUrl } from '@/i18n/metadata'

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency']

// One entry per language version, each listing all versions as alternates.
const entries = (path: string, changeFrequency: ChangeFrequency, priority: number) =>
  routing.locales.map((locale) => ({
    url: localizedUrl(locale, path),
    changeFrequency,
    priority,
    alternates: { languages: languageAlternates(path) },
  }))

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries('/', 'monthly', 1),
    ...entries('/projects', 'monthly', 0.8),
    ...projects.flatMap((project) => entries(`/projects/${project.slug}`, 'yearly', 0.6)),
  ]
}
