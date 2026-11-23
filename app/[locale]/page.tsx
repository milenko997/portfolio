import Hero from '@/app/components/hero';
import Projects from '@/app/components/projects';
import About from '@/app/components/about';
import Contact from '@/app/components/contact';

export default function Home() {
  return (
    <main className="main">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
