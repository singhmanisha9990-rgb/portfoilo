'use client';

import { useEffect, useRef } from 'react';
import { fx, initFlags } from '@/lib/fx';

const LABELS = { view: 'View', open: 'Open →', explore: 'Explore', drag: 'Drag' };

// Custom cursor + magnetic buttons. Uses event delegation so elements mounted
// later (e.g. overlay content) get cursor behaviour automatically.
export default function Cursor() {
  const curRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    initFlags();
    if (fx.touch) return;

    const cur = curRef.current;
    const dot = dotRef.current;
    const lab = cur.querySelector('.clabel');

    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, dx = mx, dy = my;
    let raf, hoverEl = null, magEl = null;
    const magOn = !fx.reduce;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      const el = e.target instanceof Element ? e.target : null;

      const t = el ? el.closest('[data-cursor]') : null;
      if (t !== hoverEl) {
        hoverEl = t;
        cur.classList.remove('is-active', 'is-drag');
        lab.textContent = '';
        if (t) {
          const k = t.dataset.cursor;
          cur.classList.add(k === 'drag' ? 'is-drag' : 'is-active');
          lab.textContent = LABELS[k] || '';
        }
      }

      if (magOn) {
        const m = el ? el.closest('.mag') : null;
        if (m !== magEl) {
          if (magEl) magEl.style.transform = '';
          magEl = m;
        }
        if (magEl) {
          const r = magEl.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          magEl.style.transform = `translate(${x * 0.25}px,${y * 0.35}px)`;
        }
      }
    };
    addEventListener('mousemove', onMove);

    (function loop() {
      cx += (mx - cx) * 0.16; cy += (my - cy) * 0.16;
      dx += (mx - dx) * 0.5; dy += (my - dy) * 0.5;
      cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('mousemove', onMove);
      if (magEl) magEl.style.transform = '';
    };
  }, []);

  return (
    <>
      <div className="cursor" aria-hidden="true" ref={curRef}>
        <span className="clabel" />
      </div>
      <div className="cursor-dot" aria-hidden="true" ref={dotRef} />
    </>
  );
}
