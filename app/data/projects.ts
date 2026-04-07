import type { StaticImageData } from 'next/image';
import nourishmates from '@/assets/images/nourishmates-new.png';
import strn from '@/assets/images/strn.png';
import mpka from '@/assets/images/mpka.png';
import flameguard from '@/assets/images/flameguard.png';
import framia from '@/assets/images/framia.png';
import decem from '@/assets/images/decem.png';
import milionxl from '@/assets/images/milionxl.png';
import popgor from '@/assets/images/popgor.png';

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
    img: nourishmates,
    title: 'Nourishmates',
    tech: ['Laravel', 'Svelte', 'MySql', 'REST API'],
    link: 'https://nourishmates.com/',
  },
  {
    id: 2,
    img: strn,
    title: 'STRN',
    tech: ['NEXT.js', 'React', 'Tailwind CSS', 'API Integration'],
    link: 'https://strn-dev.com/',
  },
  {
    id: 3,
    img: milionxl,
    title: 'Caffe Milion XL',
    tech: ['NEXT.js', 'React', 'SCSS'],
    link: 'https://milionxl.rs/',
  },
  {
    id: 4,
    img: popgor,
    title: 'PopGor',
    tech: ['NEXT.js', 'React', 'SCSS'],
    link: 'https://popgor.rs/',
  },
  {
    id: 5,
    img: mpka,
    title: 'MPKA',
    tech: ['WordPress', 'PHP', 'SCSS', 'Beaver Builder'],
    link: 'https://mobiler-pflegedienst-karlsruhe.de/',
  },
  {
    id: 6,
    img: flameguard,
    title: 'Flameguard',
    tech: ['WordPress', 'PHP', 'WooCommerce'],
    link: 'https://flameguard.se/',
  },
  {
    id: 7,
    img: framia,
    title: 'Framia',
    tech: ['WordPress', 'PHP', 'WooCommerce', 'Beaver Builder'],
    link: 'https://framia.se/',
  },
  {
    id: 8,
    img: decem,
    title: 'Decem Development',
    tech: ['WordPress', 'PHP', 'MySql', 'SCSS'],
    link: 'https://www.decem.co/',
  },
];
