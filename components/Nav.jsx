'use client';

import { useEffect, useState } from 'react';
import { initFlags, smoothY } from '@/lib/fx';

const LINKS = [
  ['#work', 'Work'],
  ['#about', 'About'],
  ['#lab', 'Lab'],
  ['#contact', 'Contact'],
];

const MENU = [
  ['#work', '01', 'Work'],
  ['#process', '02', 'Process'],
  ['#ai', '03', 'AI × Design'],
  ['#about', '04', 'About'],
  ['#lab', '05', 'Lab'],
  ['#contact', '06', 'Contact'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    initFlags();
    let raf;
    const ids = ['work', 'about', 'lab', 'contact'];

    (function tick() {
      setShrunk(smoothY() > 60);
      let a = '';
      for (const id of ids) {
        const sec = document.getElementById(id);
        if (!sec) continue;
        const r = sec.getBoundingClientRect();
        if (r.top <= innerHeight * 0.5 && r.bottom >= innerHeight * 0.5) a = id;
      }
      setActive(a);
      raf = requestAnimationFrame(tick);
    })();

    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <>
      <nav className={`nav${shrunk ? ' shrunk' : ''}`} id="nav">
        <a href="#hero" className="brand mag" data-cursor="open">MANISHA</a>
        <div className="links">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              data-cursor="open"
              className={active === href.slice(1) ? 'active' : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <button className="menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}>
          Menu +
        </button>
      </nav>

      <div id="mmenu" className={open ? 'open' : undefined} aria-hidden={!open}>
        <button className="mclose" onClick={() => setOpen(false)}>Close ✕</button>
        {MENU.map(([href, idx, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            <span className="idx">{idx}</span>
            {label}
          </a>
        ))}
        <div className="msoc">
          <a href="https://www.behance.net/manishasingh99" target="_blank" rel="noopener">Behance ↗</a>
          <a href="https://www.linkedin.com/in/maniisha-singh" target="_blank" rel="noopener">LinkedIn ↗</a>
        </div>
      </div>
    </>
  );
}
