import './globals.scss';
import Header from './components/siteHeader';
import Hero from './components/hero';
import Projects from './components/projects';
import About from './components/about';
import Contact from './components/contact';
import Footer from './components/siteFooter';

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
