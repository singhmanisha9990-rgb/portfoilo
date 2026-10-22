import Link from 'next/link';
import {
  ALL, FEATURED, CONCEPTS, MORE_BEHANCE, TIMELINE, SKILLS, TOOLS,
  EMAIL, BEHANCE, LINKEDIN,
} from '@/lib/data';
import { Up, Ext, Arrow, Search, Spark, Grid, Rocket, Award, Trophy } from './Icons';
import ContactForm from './ContactForm';

export function Topbar() {
  return (
    <div className="topbar">
      <div className="status"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>New work <span className="dot" />Available</span></div>
      <div className="based">Based in<b>Delhi, India</b></div>
    </div>
  );
}

export function Chips() {
  return (
    <div className="chips rv">
      {ALL.map((p) => (
        <Link key={p.slug} className="chip" href={`/work/${p.slug}`}><span>{p.title}</span><span className="ic"><Up /></span></Link>
      ))}
    </div>
  );
}

function Feat({ p }) {
  return (
    <article className="feat rv">
      <Link className="feat-media" href={`/work/${p.slug}`} aria-label={`${p.title} case study`}>
        <span className="flag"><span className="dot" />Live website</span>
        <img src={`/img/${p.slug}_full.jpg`} alt={`${p.title} shown on a laptop and a phone`} loading="lazy" />
        <span className="mock-note">Presentation mockup</span>
      </Link>
      <div className="feat-body">
        <div><span className="kind">{p.kind}</span><h3>{p.title}</h3></div>
        <div>
          <p>{p.summary}</p>
          <dl className="facts"><div><dt>My role</dt><dd>{p.role}</dd></div><div><dt>Type</dt><dd>{p.type}</dd></div></dl>
          <div className="cta-row">
            <Link className="btn" href={`/work/${p.slug}`}>Read case study <Arrow /></Link>
            <a className="btn ghost" href={p.live} target="_blank" rel="noopener">Visit live site <Ext /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

function ConceptCard({ p }) {
  return (
    <div className="rv">
      <Link className="card" href={`/work/${p.slug}`} aria-label={p.title}>
        <span className="lbl">{p.label}</span>
        <img src={`/img/${p.slug}_sq.jpg`} alt={`${p.title} — ${p.kind}`} loading="lazy" />
        <span className="ov"><span>{p.title} <Arrow /></span></span>
      </Link>
      <div className="cap">{p.title} · {p.label}</div>
    </div>
  );
}

export function Featured() {
  return (
    <section className="sec" id="work"><div className="wrap">
      <div className="sec-intro rv">
        <div><span className="pill">Live Projects</span><h2 className="h2">Websites out in the world.</h2></div>
        <p>Launched sites for real businesses, shown on desktop and mobile.</p>
      </div>
      <div className="feats">{FEATURED.map((p) => <Feat key={p.slug} p={p} />)}</div>
    </div></section>
  );
}

export function Concepts({ more = false }) {
  return (
    <section className="sec"><div className="wrap">
      <div className="sec-intro rv">
        <div><span className="pill">Concepts &amp; Case Studies</span><h2 className="h2">Personal projects and explorations.</h2></div>
        <p>Self-initiated case studies, demos and interaction concepts.</p>
      </div>
      <div className="grid">{CONCEPTS.map((p) => <ConceptCard key={p.slug} p={p} />)}</div>
      {more && (
        <div className="behance rv">
          <h4>More on Behance</h4>
          <div className="blist">{MORE_BEHANCE.map(([t, u]) => <a key={u} href={u} target="_blank" rel="noopener">{t}</a>)}</div>
        </div>
      )}
    </div></section>
  );
}

const STEPS = [
  ['Discover', Search, ['User research', 'Competitive analysis', 'Context']],
  ['Define', Spark, ['Problem', 'Information architecture', 'Journeys']],
  ['Design', Grid, ['Wireframes', 'Prototypes', 'Design systems']],
  ['Test & Refine', Rocket, ['Usability testing', 'Accessibility', 'Iteration']],
];

export function Process() {
  return (
    <section className="sec"><div className="wrap">
      <div className="proc-head rv"><div><span className="pill">Process</span><h2 className="h2">How I approach design</h2></div><div className="steps-n">04 Steps</div></div>
      <p className="lead rv">I start by listening to users, to the business and to the problem behind the brief. Then I map, sketch, prototype and test until the experience feels effortless.</p>
      <div className="steps rv">
        {STEPS.map(([name, Ic, tags], i) => (
          <div className="step" key={name}>
            <div className="step-top">Step 0{i + 1}<span className="step-ic"><Ic /></span></div>
            <h3>{name}</h3>
            <div className="mini">{tags.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="banner rv"><b>Every interface starts with a person.</b><small>Listen closely. Design clearly. Refine with real users.</small><div className="track"><i /></div></div>
    </div></section>
  );
}

export function Timeline({ id }) {
  return (
    <section className="sec" id={id}><div className="wrap">
      {id && <div className="center rv" style={{ marginBottom: 36 }}><span className="pill">Experience</span><h2 className="h2">Making complex things feel simple</h2></div>}
      <div className="tl-wrap rv">
        <header><h3>My work sits at the intersection of</h3><p>user research, interface design and interaction, turning what people need into responsive, accessible products.</p></header>
        <div className="tl">
          <span className="tl-line" aria-hidden="true"><i /></span>
          {TIMELINE.map((t) => (
            <div className="tli" key={t.org}>
              <div className="who"><div><h4>{t.role} - <em>{t.org}</em></h4><time>{t.time}</time></div></div>
              {t.cats
                ? <div className="cats">{t.cats.map(([k, v]) => <p key={k}>{k}: {v}</p>)}</div>
                : <ul>{t.pts.map((x) => <li key={x}>{x}</li>)}</ul>}
            </div>
          ))}
        </div>
      </div>
    </div></section>
  );
}

export function Philosophy() {
  return (
    <section className="sec"><div className="wrap"><div className="philo rv">
      <img src="/img/philo.jpg" alt="" />
      <span className="pill w">My Philosophy</span>
      <h2>Good design feels obvious once it’s done.</h2>
      <div className="pcols">
        <div><p>I don’t design to decorate. Every screen starts with a question: who is this for, what are they trying to do, and what’s in their way? Research, wireframes and prototypes are how I find the answer.</p></div>
        <div><p>Design for everyone. Accessibility and responsive behaviour belong in the first draft, not a final checklist.</p><p>Test early. Usability sessions shape the design while it’s still easy to change.</p></div>
        <div><p>The best products don’t make people think about the interface. They simply work.</p></div>
      </div>
    </div></div></section>
  );
}

export function Tools() {
  return (
    <section className="sec"><div className="wrap">
      <span className="pill rv">Toolkit</span>
      <h2 className="h2 rv">The skills and tools I use to turn ideas into experiences.</h2>
      <div className="skills rv">{SKILLS.map((s) => <span key={s}>{s}</span>)}</div>
      <h3 className="tools-h rv">Tools</h3>
      <div className="tools rv">{TOOLS.map(([n, d]) => <div className="tool" key={n}><b>{n}</b><small>{d}</small></div>)}</div>
    </div></section>
  );
}

export function Certs() {
  return (
    <section className="sec"><div className="wrap center">
      <span className="pill rv">Certification</span>
      <div className="certs">
        <div className="cert rv">
          <div className="thumb"><Award /><small>Certificate</small><b>UI/UX Design</b></div>
          <div className="tx"><div><h3>UI/UX Design Certification</h3><p>Dice Academy</p></div><span className="badge">Certified</span></div>
        </div>
        <div className="cert rv">
          <div className="thumb"><Trophy /><small>Inter-college</small><b>Designathon</b></div>
          <div className="tx"><div><h3>Finalist, UI/UX challenge</h3><p>Represented my college at inter-college hackathons and designathons</p></div><span className="badge">Achievement</span></div>
        </div>
      </div>
    </div></section>
  );
}

export function Contact() {
  return (
    <section className="sec" id="contact"><div className="wrap">
      <div className="contact rv">
        <h2>Let’s build something<br />together.</h2>
        <p>Whether it’s a project, a collaboration or just an interesting conversation, I’m always open to connecting.</p>
        <ContactForm />
      </div>
      <footer className="foot rv">
        <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <div className="frow">
          <div className="fcol"><span>Links</span><ul><li><Link href="/">Home</Link></li><li><Link href="/about">About</Link></li><li><Link href="/works">Works</Link></li></ul></div>
          <div className="fcol"><span>Elsewhere</span><ul><li><a href={BEHANCE} target="_blank" rel="noopener">Behance</a></li><li><a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a></li><li><a href="tel:+919873065723">+91 98730 65723</a></li></ul></div>
          <div className="copy">© 2026 Manisha Singh. All rights reserved.</div>
        </div>
      </footer>
    </div></section>
  );
}
