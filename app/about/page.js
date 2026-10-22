import { Bulb, Sliders, Bolt } from '@/components/Icons';
import PageFX from '@/components/PageFX';
import Ring from '@/components/Ring';
import { Topbar, Timeline, Tools, Contact } from '@/components/Sections';

export const metadata = { title: 'About — Manisha Singh' };

export default function About() {
  return (
    <div className="page">
      <PageFX />
      <Topbar />
      <Ring />
      <h2 className="giant ld" style={{ animationDelay: '.3s' }}>UI/UX DESIGNER</h2>
      <section className="sec" style={{ border: 0, paddingTop: 0 }}><div className="wrap">
        <div className="split rv">
          <div className="ph"><img src="/img/portrait.jpg" alt="Portrait of Manisha Singh" /></div>
          <div className="cards">
            <div className="wcard"><span className="pill">About me</span><p className="big">I design websites, dashboards and mobile apps, from launched sites for an interiors studio, a tech company and a startup partner to self-initiated case studies.</p></div>
            <div className="wcard">
              <p>I love the moment a confusing flow becomes obvious. I’m happiest digging into the “why” behind a problem, prototyping in Figma or Framer, and watching real people try it.</p>
              <ul className="vals"><li><i><Bulb /></i>Curiosity</li><li><i><Sliders /></i>Research</li><li><i><Bolt /></i>Craft</li></ul>
              <a className="btn" href="#contact">Connect with me</a>
            </div>
          </div>
        </div>
        <div className="beyond rv">
          <div><small>Education</small>B.Com, Satyawati College, University of Delhi · 2021 — 2024</div>
          <div><small>Certification</small>UI/UX Design Certification, Dice Academy</div>
          <div><small>Community</small>Led college design workshops and competitions, mentoring peers in design thinking and prototyping</div>
          <div><small>Beyond the screen</small>Cultural committee branding, community awareness campaigns, public speaking and debate</div>
        </div>
      </div></section>
      <Timeline id="experience" />
      <Tools />
      <Contact />
    </div>
  );
}
