'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ALL } from '@/lib/data';

const LIST = [...ALL, ...ALL];

// Hero strip of project tiles that drifts sideways with a 3D curve.
export default function Carousel() {
  const ref = useRef(null);

  useEffect(() => {
    const car = ref.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = [...car.children];
    let off = 0, speed = 0.45, target = 0.45, raf = 0;
    const hov = items.map(() => 0), hovT = items.map(() => 0);
    const offs = [];
    const on = (el, ev, fn) => { el.addEventListener(ev, fn); offs.push(() => el.removeEventListener(ev, fn)); };
    items.forEach((el, i) => {
      on(el, 'mouseenter', () => (hovT[i] = 1));
      on(el, 'mouseleave', () => (hovT[i] = 0));
      on(el, 'focus', () => (hovT[i] = 1));
      on(el, 'blur', () => (hovT[i] = 0));
    });
    on(car, 'mouseenter', () => (target = 0.12));
    on(car, 'mouseleave', () => (target = 0.45));

    const tick = () => {
      const W = car.clientWidth, w = items[0].offsetWidth, gap = 12, step = w + gap, total = step * items.length;
      speed += (target - speed) * 0.06;
      if (!reduce) off = (off + speed) % total;
      items.forEach((el, i) => {
        const x = (((i * step - off) % total) + total) % total - step;
        const c = x + w / 2;
        const d = Math.max(-1.3, Math.min(1.3, (c - W / 2) / (W / 2)));
        hov[i] += (hovT[i] - hov[i]) * 0.14;
        const pop = reduce ? 0 : Math.max(0, 1 - Math.abs(d) * 2.4), lift = pop * 0.18 + hov[i] * 0.1;
        el.style.transform = `translate3d(${x}px,${-(pop * 14 + hov[i] * 10)}px,${-Math.abs(d) * 60}px) rotateY(${-d * 28 * (1 - hov[i] * 0.6)}deg) scale(${1 - Math.abs(d) * 0.06 + lift})`;
        el.style.zIndex = hov[i] > 0.05 ? 200 : Math.round(100 - Math.abs(d) * 50);
        el.style.boxShadow = `0 ${10 + pop * 18 + hov[i] * 14}px ${24 + pop * 26 + hov[i] * 16}px rgba(0,0,0,${(0.14 + pop * 0.12 + hov[i] * 0.08).toFixed(3)})`;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); offs.forEach((f) => f()); };
  }, []);

  return (
    <div className="carousel" ref={ref} aria-label="Project previews">
      {LIST.map((p, i) => (
        <Link key={i} className="citem" href={`/work/${p.slug}`} aria-label={p.title}>
          <img src={`/img/${p.slug}_sq.jpg`} alt="" loading="lazy" />
        </Link>
      ))}
    </div>
  );
}
