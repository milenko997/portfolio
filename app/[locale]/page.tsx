import Header from '@/app/components/siteHeader';
import Hero from '@/app/components/hero';
import Projects from '@/app/components/projects';
import About from '@/app/components/about';
import Contact from '@/app/components/contact';
import Footer from '@/app/components/siteFooter';

export default function Home() {
  return (
    <main className="main">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
