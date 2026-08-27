'use client';

import { useEffect, useRef } from 'react';
import { initFlags, smoothY } from '@/lib/fx';

const WORDS = ['Research', 'Strategy', 'UX', 'UI', 'AI', 'Motion', '3D', 'Prototyping', 'Systems'];
const POSITIONS = [[8, -40], [70, 10], [30, 80], [88, 120], [15, 180], [55, 150], [78, 220], [38, 260], [6, 320]];

export default function IntroSection() {
  const hostRef = useRef(null);

  /* floating keywords react to scroll velocity */
  useEffect(() => {
    initFlags();
    const spans = [...hostRef.current.querySelectorAll('.fw')];
    const items = spans.map((n) => ({ n, y: 0, speed: 0.3 + Math.random() * 0.5 }));
    let last = smoothY(), vel = 0, raf;
    (function f() {
      const cur = smoothY();
      vel += (cur - last - vel) * 0.1;
      last = cur;
      items.forEach((it) => {
        it.y += (vel * it.speed - it.y) * 0.08;
        it.n.style.transform = `translateY(${it.y * -1}px)`;
      });
      raf = requestAnimationFrame(f);
    })();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="intro" className="light section-pad">
      <div className="wrap">
        <div className="floatwords" aria-hidden="true" ref={hostRef}>
          {WORDS.map((w, i) => (
            <span
              key={w}
              className={`fw ${i % 3 === 0 ? 'lime' : ''}`}
              style={{ left: POSITIONS[i][0] + '%', top: POSITIONS[i][1] + 'px' }}
            >
              {w}
            </span>
          ))}
        </div>
        <h2 className="intro-h">
          <span className="line-mask"><span>I don't</span></span>
          <span className="line-mask"><span>just design</span></span>
          <span className="line-mask"><span className="thin">screens.</span></span>
        </h2>
        <p className="intro-p reveal">
          I design systems, interactions and digital experiences that solve real problems — moving from research and strategy through to interface, motion and working prototypes.
        </p>
      </div>
    </section>
  );
}
