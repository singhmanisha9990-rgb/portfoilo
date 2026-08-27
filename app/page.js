import Cursor from '@/components/Cursor';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import GlobalFX from '@/components/GlobalFX';
import SmoothScroll from '@/components/SmoothScroll';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import IntroSection from '@/components/IntroSection';
import Work from '@/components/Work';
import Process from '@/components/Process';
import AiSection from '@/components/AiSection';
import Dna from '@/components/Dna';
import About from '@/components/About';
import Journey from '@/components/Journey';
import Skills from '@/components/Skills';
import Lab from '@/components/Lab';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Loader />
      <Nav />
      <GlobalFX />
      <SmoothScroll>
        <Hero />
        <Ticker />
        <IntroSection />
        <Work />
        <Process />
        <AiSection />
        <Dna />
        <About />
        <Journey />
        <Skills />
        <Lab />
        <Contact />
        <Footer />
      </SmoothScroll>
    </>
  );
}
