import PageFX from '@/components/PageFX';
import { Topbar, Chips, Featured, Concepts, Contact } from '@/components/Sections';

export const metadata = { title: 'Works — Manisha Singh' };

export default function Works() {
  return (
    <div className="page">
      <PageFX />
      <Topbar />
      <section className="sec" style={{ border: 0, paddingBottom: 20 }}><div className="wrap">
        <div className="works-hero">
          <h2 className="h2"><span className="ld">Selected Work</span></h2>
          <p className="ld" style={{ animationDelay: '.15s' }}>Live websites for real businesses, followed by personal case studies and concepts.</p>
        </div>
        <Chips />
      </div></section>
      <Featured />
      <Concepts more />
      <Contact />
    </div>
  );
}
