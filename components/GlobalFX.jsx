'use client';

import { useEffect, useRef } from 'react';
import { fx, initFlags, smoothY } from '@/lib/fx';

// Page-wide behaviour: reveal-on-scroll, smooth anchor scrolling (works with
// the virtual scroller), the cursor click ripple, and the scroll progress bar.
export default function GlobalFX() {
  const barRef = useRef(null);

  useEffect(() => {
    initFlags();

    /* reveal on scroll */
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal,.line-mask').forEach((n) => io.observe(n));

    /* smooth anchor scroll for the virtual scroller + native */
    const onClick = (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + smoothY();
      window.scrollTo({ top: y, behavior: fx.reduce ? 'auto' : 'smooth' });
    };
    document.addEventListener('click', onClick);

    /* cursor click ripple */
    let onDown = null;
    if (!fx.touch) {
      onDown = (e) => {
        const d = document.createElement('div');
        d.className = 'cripple';
        d.style.left = e.clientX + 'px';
        d.style.top = e.clientY + 'px';
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 560);
      };
      addEventListener('mousedown', onDown);
    }

    /* scroll progress bar */
    const bar = barRef.current;
    let raf;
    (function tick() {
      const y = smoothY();
      const max = (document.body.scrollHeight || document.documentElement.scrollHeight) - innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      io.disconnect();
      document.removeEventListener('click', onClick);
      if (onDown) removeEventListener('mousedown', onDown);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div id="progress" ref={barRef} />;
}
