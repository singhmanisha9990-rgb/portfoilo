'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BEHANCE } from '@/lib/data';

const arr = (
  <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
const icon = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };

const NAV = [
  { key: 'about', href: '/about', label: 'About', svg: <svg viewBox="0 0 24 24" {...icon}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg> },
  { key: 'works', href: '/works', label: 'Works', svg: <svg viewBox="0 0 24 24" {...icon}><path d="M16 3l5 5L9 20H4v-5z" /><path d="M13 6l5 5" /></svg> },
  { key: 'exp', href: '/about#experience', label: 'Experience', svg: <svg viewBox="0 0 24 24" {...icon}><path d="M3 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3zM21 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z" /></svg> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState('');

  useEffect(() => {
    setOpen(false);
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [pathname]);

  let active = '';
  if (pathname.startsWith('/about')) active = hash === '#experience' ? 'exp' : 'about';
  else if (pathname.startsWith('/work')) active = 'works';

  return (
    <aside className={`side${open ? ' open' : ''}`} id="side">
      <div className="cover"><img src="/img/cover.jpg" alt="" /></div>
      <div className="idrow">
        <div className="avatar"><img src="/img/avatar.jpg" alt="Manisha Singh" /></div>
        <div>
          <h1><Link href="/">Manisha Singh</Link></h1>
          <span className="sub">UI/UX Designer</span>
          <div className="tags"><span className="tag">UI/UX Designer</span><span className="tag">Digital Product Designer</span><span className="tag">AI Product Design</span></div>
        </div>
        <button className="menu-t" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
        </button>
      </div>
      <p className="bio">I’m Manisha, a UI/UX and Digital Product Designer creating responsive, accessible web and mobile experiences, grounded in research and finished with care.</p>
      <ul className="nav">
        {NAV.map((n) => (
          <li key={n.key}>
            <Link
              href={n.href}
              className={active === n.key ? 'active' : undefined}
              onClick={() => { setHash(n.key === 'exp' ? '#experience' : ''); setOpen(false); }}
            >
              {n.svg}{n.label}{arr}
            </Link>
          </li>
        ))}
      </ul>
      <div className="side-cta">
        <a className="btn-be" href={BEHANCE} target="_blank" rel="noopener" aria-label="Behance profile">Bē</a>
        <a className="btn-lc" href="#contact" onClick={() => setOpen(false)}>Let’s Connect</a>
      </div>
    </aside>
  );
}
