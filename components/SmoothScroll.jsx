'use client';

import { useEffect, useRef } from 'react';
import { fx, initFlags } from '@/lib/fx';

// Lerped smooth scrolling — desktop only. The wrapper is fixed and translated
// against the native scroll position; body height mirrors the content height.
export default function SmoothScroll({ children }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    initFlags();
    if (fx.touch || fx.reduce) return;

    const wrap = wrapRef.current;
    document.body.classList.remove('native');
    wrap.style.position = 'fixed';
    wrap.style.top = '0';
    wrap.style.left = '0';
    wrap.style.width = '100%';

    let target = window.scrollY;
    let current = target;
    let raf;

    const setH = () => {
      document.body.style.height = wrap.getBoundingClientRect().height + 'px';
    };
    const onScroll = () => { target = window.scrollY; };

    setH();
    addEventListener('resize', setH);
    addEventListener('scroll', onScroll);

    fx.smooth = true;
    fx.scroll.y = current;

    (function s() {
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.05) current = target;
      wrap.style.transform = `translate3d(0,${-current}px,0)`;
      fx.scroll.y = current;
      raf = requestAnimationFrame(s);
    })();

    // re-measure page height once everything has settled
    const t = setTimeout(setH, 400);
    if (document.readyState !== 'complete') addEventListener('load', setH);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      removeEventListener('resize', setH);
      removeEventListener('scroll', onScroll);
      removeEventListener('load', setH);
      wrap.style.cssText = '';
      document.body.style.height = '';
      document.body.classList.add('native');
      fx.smooth = false;
    };
  }, []);

  return (
    <div id="scroll" ref={wrapRef}>
      {children}
    </div>
  );
}
