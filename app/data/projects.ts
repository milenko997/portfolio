import type { StaticImageData } from 'next/image';
import project1 from '@/assets/images/nourishmates.png';
import project2 from '@/assets/images/strn.png';
import project3 from '@/assets/images/mpka.png';
import project4 from '@/assets/images/flameguard.png';
import project5 from '@/assets/images/framia.png';
import project6 from '@/assets/images/decem.png';

export type Project = {
  id: number;
  img: StaticImageData;
  title: string;
  tech: string[];
  link: string;
};

export const projects: Project[] = [
  {
    id: 1,
    img: project1,
    title: 'Nourishmates',
    tech: ['Laravel', 'Svelte', 'MySql', 'REST API'],
    link: 'https://nourishmates.com/',
  },
  {
    id: 2,
    img: project2,
    title: 'STRN',
    tech: ['NEXT.js', 'React', 'Tailwind CSS', 'API Integration'],
    link: 'https://strn-dev.com/',
  },
  {
    id: 3,
    img: project3,
    title: 'MPKA',
    tech: ['WordPress', 'PHP', 'SCSS', 'Beaver Builder'],
    link: 'https://mobiler-pflegedienst-karlsruhe.de/',
  },
  {
    id: 4,
    img: project4,
    title: 'Flameguard',
    tech: ['WordPress', 'PHP', 'WooCommerce'],
    link: 'https://flameguard.se/',
  },
  {
    id: 5,
    img: project5,
    title: 'Framia',
    tech: ['WordPress', 'PHP', 'WooCommerce', 'Beaver Builder'],
    link: 'https://framia.se/',
  },
  {
    id: 6,
    img: project6,
    title: 'Decem Development',
    tech: ['WordPress', 'PHP', 'MySql', 'SCSS'],
    link: 'https://www.decem.co/',
  },
];
