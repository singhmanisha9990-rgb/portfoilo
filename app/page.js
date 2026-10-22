import { Arrow } from '@/components/Icons';
import Carousel from '@/components/Carousel';
import PageFX from '@/components/PageFX';
import {
  Topbar, Featured, Concepts, Process, Timeline, Philosophy, Tools, Certs, Contact,
} from '@/components/Sections';

export default function Home() {
  return (
    <div className="page">
      <PageFX />
      <Topbar />
      <section className="hero">
        <span className="hero-portrait ld"><img src="/img/avatar.jpg" alt="" />Open to freelance &amp; full-time roles</span>
        <h2>
          <span className="ld hi" style={{ animationDelay: '.1s', fontWeight: 400, fontSize: 'clamp(22px,2.6cqi,30px)' }}>Hi, I’m</span>
          <span className="ld nm" style={{ animationDelay: '.25s' }}>Manisha Singh.</span>
        </h2>
        <p className="hero-desc ld" style={{ animationDelay: '.4s' }}>UI/UX Designer · Digital Product Designer · AI Product Design</p>
        <p className="hero-sub ld" style={{ animationDelay: '.52s' }}>Designing thoughtful digital experiences through user-centered design, product thinking, and visual storytelling.</p>
        <div className="hero-cta ld" style={{ animationDelay: '.64s' }}>
          <a className="btn" href="#work">Explore My Work <Arrow /></a>
          <a className="btn ghost" href="#contact">Let’s Connect</a>
        </div>
      </section>
      <Carousel />
      <Featured />
      <Concepts />
      <Process />
      <Timeline />
      <Philosophy />
      <Tools />
      <Certs />
      <Contact />
    </div>
  );
}
