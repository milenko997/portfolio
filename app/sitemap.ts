import { MetadataRoute } from 'next'

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
  ]
}
