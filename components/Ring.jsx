'use client';

import { useEffect, useRef } from 'react';

const N = 14;

// About page: a draggable ring of image tiles that slowly rotates.
export default function Ring() {
  const stageRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tiles = [...ringRef.current.children];
    let ang = 0, vel = reduce ? 0 : 0.06, drag = false, lx = 0, raf = 0;
    const R = () => (innerWidth <= 900 ? 260 : 340);
    const draw = () => {
      const r = R();
      tiles.forEach((t, i) => { t.style.transform = `rotate(${ang + (i * 360) / N}deg) translateY(-${r}px)`; });
    };
    const loop = () => {
      if (!drag) { ang += vel; vel += ((reduce ? 0 : 0.06) - vel) * 0.02; }
      draw();
      raf = requestAnimationFrame(loop);
    };
    const down = (e) => { drag = true; lx = e.clientX; stage.setPointerCapture(e.pointerId); };
    const move = (e) => { if (!drag) return; const dx = e.clientX - lx; lx = e.clientX; ang += dx * 0.18; vel = dx * 0.18; };
    const up = () => { drag = false; };
    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <div className="ring-stage" ref={stageRef}>
      <div className="ring" ref={ringRef}>
        {Array.from({ length: N }, (_, i) => (
          <div className="rt" key={i}><img src={`/img/tile${i}.jpg`} alt="" draggable="false" /></div>
        ))}
      </div>
      <div className="ring-text">
        <h2 className="ld">Every screen is a conversation with someone.</h2>
        <p className="ld" style={{ animationDelay: '.2s' }}>I combine research, interaction design and visual craft to understand people, spot friction and turn it into interfaces that feel easy.</p>
      </div>
    </div>
  );
}
