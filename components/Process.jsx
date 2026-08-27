'use client';

import { useEffect, useRef } from 'react';
import { PROCESS } from '@/lib/data';

export default function Process() {
  const listRef = useRef(null);
  const progRef = useRef(null);

  useEffect(() => {
    /* active-on-scroll rows */
    const rows = [...listRef.current.querySelectorAll('.proc-row')];
    const pio = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          e.target.classList.toggle('on', e.isIntersecting && e.intersectionRatio > 0.6);
        });
      },
      { threshold: [0, 0.6, 1], rootMargin: '-30% 0px -30% 0px' }
    );
    rows.forEach((r) => pio.observe(r));

    /* progress line (from the WOW pass) */
    const pList = listRef.current;
    const pProg = progRef.current;
    let raf;
    (function tick() {
      const r = pList.getBoundingClientRect();
      const frac = Math.max(0, Math.min(1, (innerHeight * 0.5 - r.top) / r.height));
      pProg.style.height = frac * 100 + '%';
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      pio.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="process" className="section-pad">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="reveal">How I turn ideas<br />into experiences.</h2>
          <span className="n reveal">— The process</span>
        </div>
        <div className="proc-list" ref={listRef}>
          {PROCESS.map((s, i) => (
            <div className="proc-row" key={s[0]}>
              <span className="pn">{String(i + 1).padStart(2, '0')}</span>
              <span className="pt">{s[0]}</span>
              <span className="pd">{s[1]}</span>
            </div>
          ))}
          <div className="proc-progress" ref={progRef} />
        </div>
      </div>
    </section>
  );
}
