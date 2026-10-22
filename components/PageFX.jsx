'use client';

import { useEffect } from 'react';

// Page-level scroll effects: reveal-on-scroll, featured mockup parallax/tilt
// and the experience timeline that draws as you scroll. Mount once per page.
export default function PageFX() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // featured mockups: scroll parallax + pointer tilt
    const medias = [...document.querySelectorAll('.feat-media')];
    if (medias.length && !reduce) {
      const onScroll = () => {
        const vh = innerHeight;
        medias.forEach((m) => {
          const r = m.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const p = (r.top + r.height / 2 - vh / 2) / vh;
          m.querySelector('img').style.transform = `scale(1.04) translateY(${(p * -10).toFixed(1)}px)`;
        });
      };
      addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      cleanups.push(() => removeEventListener('scroll', onScroll));
      if (matchMedia('(hover:hover)').matches) {
        medias.forEach((m) => {
          const move = (e) => {
            const r = m.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
            m.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
          };
          const leave = () => { m.style.transform = ''; };
          m.addEventListener('pointermove', move);
          m.addEventListener('pointerleave', leave);
          cleanups.push(() => { m.removeEventListener('pointermove', move); m.removeEventListener('pointerleave', leave); });
        });
      }
    }

    // experience timeline: line draws as you scroll, dots and text light up in turn
    document.querySelectorAll('.tl').forEach((tl) => {
      const line = tl.querySelector('.tl-line'), fill = line.querySelector('i'), rows = [...tl.querySelectorAll('.tli')];
      let c = [];
      const place = () => {
        const tr = tl.getBoundingClientRect();
        c = rows.map((r) => {
          const w = r.querySelector('.who').getBoundingClientRect();
          return { y: w.top + w.height / 2 - tr.top, x: w.left + 4.5 - tr.left };
        });
        line.style.left = c[0].x + 'px';
        line.style.top = c[0].y + 'px';
        line.style.height = Math.max(0, c[c.length - 1].y - c[0].y) + 'px';
      };
      const upd = () => {
        const tr = tl.getBoundingClientRect();
        const mark = innerHeight * 0.62 - tr.top;
        const span = c[c.length - 1].y - c[0].y || 1;
        const p = Math.max(0, Math.min(1, (mark - c[0].y) / span));
        fill.style.height = (reduce ? 100 : p * 100) + '%';
        rows.forEach((r, i) => r.classList.toggle('on', reduce || mark >= c[i].y - 4));
      };
      const rs = () => { place(); upd(); };
      rs();
      addEventListener('scroll', upd, { passive: true });
      addEventListener('resize', rs);
      const t1 = setTimeout(rs, 400), t2 = setTimeout(rs, 1100);
      cleanups.push(() => { removeEventListener('scroll', upd); removeEventListener('resize', rs); clearTimeout(t1); clearTimeout(t2); });
    });

    return () => cleanups.forEach((f) => f());
  }, []);

  return null;
}
