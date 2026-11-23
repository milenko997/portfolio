import type { StaticImageData } from 'next/image';
import nourishmates from '@/assets/images/nourishmates-new.png';
import strn from '@/assets/images/strn.png';
import mpka from '@/assets/images/mpka.png';
import flameguard from '@/assets/images/flameguard.png';
import framia from '@/assets/images/framia.png';
import milionxl from '@/assets/images/milionxl.png';
import popgor from '@/assets/images/popgor.png';
import transporteri from '@/assets/images/transporteri.png';
import decem from '@/assets/images/decem.png';
import barkop from '@/assets/images/barkop.png';
import nenadprevoz from '@/assets/images/nenadprevoz.png';
import itvoddsfinder from '@/assets/images/itvoddsfinder.png';

export type ProjectCategory = 'webApp' | 'mobileApp' | 'website' | 'ecommerce';

// Order of the filter buttons on the projects page.
export const projectCategories: ProjectCategory[] = ['webApp', 'mobileApp', 'website', 'ecommerce'];

export type Project = {
  id: number;
  // Key of the project's description in messages/*.json (projectItems).
  slug: string;
  img: StaticImageData;
  title: string;
  // The first category is the main one; the project shows up under every listed filter.
  categories: ProjectCategory[];
  tech: string[];
  link: string;
  // App Store and Google Play pages, shown next to the main link for mobile apps.
  stores?: { appStore: string; googlePlay: string };
};

export const projects: Project[] = [
  {
    id: 12,
    img: itvoddsfinder,
    slug: 'itv-odds-finder',
    title: 'ITV Odds Finder',
    categories: ['mobileApp', 'webApp'],
    tech: ['Flutter', 'Java', 'Go', 'Python'],
    link: 'https://www.itvoddsfinder.com/',
    stores: {
      appStore: 'https://apps.apple.com/gb/app/itvoddsfinder/id6759786536',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.funteron.itvoddsfinder',
    },
  },
  {
    id: 1,
    img: nourishmates,
    slug: 'nourishmates',
    title: 'Nourishmates',
    categories: ['webApp'],
    tech: ['Laravel', 'Svelte', 'MySql', 'REST API'],
    link: 'https://nourishmates.com/',
  },
  {
    id: 2,
    img: transporteri,
    slug: 'transporteri',
    title: 'Transporteri',
    categories: ['webApp'],
    tech: ['Laravel', 'MySql', 'React', 'PHPUnit'],
    link: 'https://transporteri.rs/',
  },
  {
    id: 3,
    img: strn,
    slug: 'strn',
    title: 'STRN',
    categories: ['website'],
    tech: ['NEXT.js', 'React', 'Tailwind CSS', 'API Integration'],
    link: 'https://strn-dev.com/',
  },
  {
    id: 4,
    img: milionxl,
    slug: 'caffe-milion-xl',
    title: 'Caffe Milion XL',
    categories: ['website'],
    tech: ['NEXT.js', 'React', 'SCSS'],
    link: 'https://milionxl.rs/',
  },
  {
    id: 5,
    img: popgor,
    slug: 'popgor',
    title: 'PopGor',
    categories: ['website'],
    tech: ['NEXT.js', 'React', 'SCSS'],
    link: 'https://popgor.rs/',
  },
  {
    id: 6,
    img: mpka,
    slug: 'mpka',
    title: 'MPKA',
    categories: ['website'],
    tech: ['WordPress', 'PHP', 'SCSS', 'Beaver Builder'],
    link: 'https://mobiler-pflegedienst-karlsruhe.de/',
  },
  {
    id: 7,
    img: flameguard,
    slug: 'flameguard',
    title: 'Flameguard',
    categories: ['ecommerce'],
    tech: ['WordPress', 'PHP', 'WooCommerce'],
    link: 'https://flameguard.se/',
  },
  {
    id: 8,
    img: framia,
    slug: 'framia',
    title: 'Framia',
    categories: ['ecommerce'],
    tech: ['WordPress', 'PHP', 'WooCommerce', 'Beaver Builder'],
    link: 'https://framia.se/',
  },
  {
    id: 9,
    img: decem,
    slug: 'decem-development',
    title: 'Decem Development',
    categories: ['website'],
    tech: ['WordPress', 'PHP', 'MySql', 'SCSS'],
    link: 'https://decem.co/',
  },
  {
    id: 10,
    img: barkop,
    slug: 'barkop',
    title: 'BarKop',
    categories: ['website'],
    tech: ['NEXT.js', 'React', 'SCSS'],
    link: 'https://barkop.rs/',
  },
  {
    id: 11,
    img: nenadprevoz,
    slug: 'nenad-prevoz',
    title: 'Nenad Prevoz',
    categories: ['website'],
    tech: ['NEXT.js', 'React', 'SCSS'],
    link: 'https://nenadprevoz.rs/',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
