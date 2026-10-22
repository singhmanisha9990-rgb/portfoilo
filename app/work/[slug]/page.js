import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL, FEATURED, CONCEPTS, bySlug, isFeatured } from '@/lib/data';
import { Arrow, Ext } from '@/components/Icons';
import PageFX from '@/components/PageFX';
import { Topbar, Contact } from '@/components/Sections';

export function generateStaticParams() {
  return ALL.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = bySlug(params.slug);
  return { title: p ? `${p.title} — Manisha Singh` : 'Manisha Singh' };
}

const host = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function Next({ p }) {
  const list = isFeatured(p) ? FEATURED : CONCEPTS;
  const n = list[(list.indexOf(p) + 1) % list.length];
  return (
    <Link className="next rv" href={`/work/${n.slug}`}>
      <div className="tx"><div><small>Next project</small><h4>{n.title}</h4></div><span className="btn">View project <Arrow /></span></div>
      <div className="im"><img src={`/img/${n.slug}_sq.jpg`} alt="" loading="lazy" /></div>
    </Link>
  );
}

function Head({ p }) {
  return (
    <>
      <Link className="back" href="/works"><Arrow /> All work</Link>
      <div className="cs-head"><span className="kind ld">{p.kind}</span><h2 className="cs-title ld" style={{ animationDelay: '.1s' }}>{p.title}</h2></div>
    </>
  );
}

function CaseStudy({ p }) {
  return (
    <>
      <Head p={p} />
      <dl className="cs-facts ld" style={{ animationDelay: '.2s' }}>
        <div><dt>My role</dt><dd>{p.role}</dd></div>
        <div><dt>Project type</dt><dd>{p.type}</dd></div>
        <div><dt>Platform</dt><dd>{p.platform}</dd></div>
        <div><dt>Status</dt><dd><span className="dot" />{p.status}</dd></div>
      </dl>
      <div className="cs-hero"><span className="flag"><span className="dot" />Live website</span><img src={`/img/${p.slug}_full.jpg`} alt={`${p.title} on laptop and phone`} /><span className="mock-note">Presentation mockup</span></div>
      <p className="cs-lead rv">{p.summary}</p>
      <div className="cs-block rv"><h3>Background &amp; problem</h3><div>{p.background.map((x) => <p key={x}>{x}</p>)}</div></div>
      <div className="cs-block rv"><h3>My role</h3><div><ul className="ticks">{p.roleList.map((x) => <li key={x}>{x}</li>)}</ul></div></div>
      <div className="cs-block rv"><h3>Information architecture</h3><div><div className="ia">{p.ia.map((x) => <span key={x}>{x}</span>)}</div><p>{p.iaNote}</p></div></div>
      <div className="cs-block rv"><h3>Key flows on the page</h3><div><ul className="ticks">{p.flow.map((x) => <li key={x}>{x}</li>)}</ul></div></div>
      <div className="cs-block rv"><h3>Visual design</h3><div>
        <div className="swatches">{p.palette.map(([hex, name]) => <div className="sw" key={hex}><i style={{ background: hex }} /><span><b>{name}</b>{hex}</span></div>)}</div>
        <p>{p.typeNote}</p>
      </div></div>
      <div className="cs-block rv"><h3>Responsive design</h3><div className="resp"><p>{p.responsive}</p><div className="sq"><img src={`/img/${p.slug}_sq.jpg`} alt={`${p.title} desktop and mobile views`} loading="lazy" /></div></div></div>
      <div className="live-band rv"><div><b>See {p.title} live</b><small>{host(p.live)}</small></div><a className="btn" href={p.live} target="_blank" rel="noopener">Visit live site <Ext /></a></div>
    </>
  );
}

function Concept({ p }) {
  const demo = p.slug === 'apex';
  return (
    <>
      <Head p={p} />
      <dl className="cs-facts ld" style={{ animationDelay: '.2s', gridTemplateColumns: 'repeat(2,1fr)' }}>
        <div><dt>Category</dt><dd>{p.label}</dd></div>
        <div><dt>Status</dt><dd>{demo ? 'Demo build' : 'Personal project'}</dd></div>
      </dl>
      <div className="cs-hero"><span className="flag c">{p.label}</span><img src={`/img/${p.slug}_full.jpg`} alt={`${p.title} preview`} /></div>
      <p className="cs-lead rv">{p.summary}</p>
      <div className="cs-block rv"><h3>Highlights</h3><div className="resp" style={{ alignItems: 'start' }}>
        <ul className="ticks">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
        <div className="sq"><img src={`/img/${p.slug}_sq.jpg`} alt="" loading="lazy" /></div>
      </div></div>
      <div className="live-band rv"><div><b>{p.linkText}</b><small>{demo ? 'Demo site' : 'Full process, research and screens'}</small></div><a className="btn" href={p.link} target="_blank" rel="noopener">Open <Ext /></a></div>
    </>
  );
}

export default function Work({ params }) {
  const p = bySlug(params.slug);
  if (!p) notFound();
  return (
    <div className="page">
      <PageFX />
      <Topbar />
      <section className="sec" style={{ border: 0, paddingTop: 30 }}><div className="wrap">
        {isFeatured(p) ? <CaseStudy p={p} /> : <Concept p={p} />}
        <Next p={p} />
      </div></section>
      <Contact />
    </div>
  );
}
