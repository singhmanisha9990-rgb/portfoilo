'use client';

import { useEffect, useRef } from 'react';
import { LAB } from '@/lib/data';

// Lab mini-experiments — lightweight per-card canvas sketches.
export default function Lab() {
  const gridRef = useRef(null);

  useEffect(() => {
    const cleanups = [];
    const dispFont =
      getComputedStyle(document.documentElement).getPropertyValue('--disp').trim() ||
      'Space Grotesk, sans-serif';

    gridRef.current.querySelectorAll('.lab-card').forEach((card) => {
      const type = card.dataset.lab;
      const cv = card.querySelector('canvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      let w, h, on = false, t = 0, mx = -999, my = -999, raf;
      const DPR = Math.min(devicePixelRatio || 1, 2);

      function size() {
        const r = cv.getBoundingClientRect();
        w = r.width; h = r.height;
        cv.width = w * DPR; cv.height = h * DPR;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }
      size();
      addEventListener('resize', size);

      const onEnter = () => (on = true);
      const onLeave = () => { on = false; mx = my = -999; };
      const onMove = (e) => {
        const r = cv.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
      };
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('mousemove', onMove);

      // seed dots for cursor field
      const dots = [];
      for (let i = 0; i < 46; i++) dots.push({ x: Math.random(), y: Math.random() });

      const io2 = new IntersectionObserver(
        (es) => es.forEach((e) => { card._vis = e.isIntersecting; }),
        { threshold: 0.05 }
      );
      io2.observe(card);

      function roundRect(c, x, y, ww, hh, r) {
        c.beginPath();
        c.moveTo(x + r, y);
        c.arcTo(x + ww, y, x + ww, y + hh, r);
        c.arcTo(x + ww, y + hh, x, y + hh, r);
        c.arcTo(x, y + hh, x, y, r);
        c.arcTo(x, y, x + ww, y, r);
        c.closePath();
      }

      function draw() {
        raf = requestAnimationFrame(draw);
        if (!card._vis) return;
        t += 0.016;
        ctx.clearRect(0, 0, w, h);
        if (type === 'cursor') {
          dots.forEach((d) => {
            const px = d.x * w, py = d.y * h;
            let ox = px, oy = py;
            if (mx > -900) {
              const dx = px - mx, dy = py - my, dist = Math.hypot(dx, dy);
              if (dist < 70) { const f = (70 - dist) / 70; ox += (dx / dist) * f * 22; oy += (dy / dist) * f * 22; }
            }
            ctx.fillStyle = 'rgba(184,255,90,.7)';
            ctx.beginPath(); ctx.arc(ox, oy, 1.6, 0, 7); ctx.fill();
          });
        } else if (type === 'grid') {
          const g = 22;
          for (let x = g; x < w; x += g)
            for (let y = g; y < h; y += g) {
              let s = 1;
              if (mx > -900) {
                const dist = Math.hypot(x - mx, y - my);
                s = 1 + Math.max(0, (60 - dist) / 60) * 2.4;
              }
              ctx.fillStyle = 'rgba(167,167,167,.35)';
              ctx.fillRect(x - s / 2, y - s / 2, s, s);
            }
        } else if (type === 'noise') {
          for (let y = 0; y < h; y += 3) {
            const a = 0.04 + 0.04 * Math.sin(y * 0.1 + t * 2);
            ctx.fillStyle = 'rgba(184,255,90,' + a + ')';
            ctx.fillRect(0, y + Math.sin(t + y) * 1, w, 1);
          }
          for (let i = 0; i < 40; i++) {
            ctx.fillStyle = 'rgba(243,241,236,.05)';
            ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
          }
        } else if (type === 'orb') {
          const cx = w / 2, cy = h / 2;
          const r = Math.min(w, h) * 0.28;
          const grd = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 2, cx, cy, r * 1.6);
          grd.addColorStop(0, 'rgba(184,255,90,.6)');
          grd.addColorStop(0.5, 'rgba(124,124,255,.35)');
          grd.addColorStop(1, 'rgba(8,9,11,0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(cx + Math.sin(t) * 8, cy + Math.cos(t * 0.8) * 8, r * 1.4, 0, 7);
          ctx.fill();
        } else if (type === 'type') {
          ctx.fillStyle = 'rgba(243,241,236,.9)';
          ctx.font = '700 ' + Math.min(w, h) * 0.4 + 'px ' + dispFont;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const shake = on ? Math.sin(t * 20) * 2 : 0;
          ctx.fillText('Aa', w / 2 + shake, h / 2);
        } else if (type === 'ui') {
          const cx = w / 2, cy = h / 2;
          const kx = on ? 18 : -18;
          ctx.fillStyle = 'rgba(255,255,255,.08)';
          roundRect(ctx, cx - 34, cy - 14, 68, 28, 14);
          ctx.fill();
          ctx.fillStyle = on ? '#B8FF5A' : '#6b6d73';
          ctx.beginPath();
          ctx.arc(cx + (card._kx = (card._kx || -18) + (kx - (card._kx || -18)) * 0.2), cy, 11, 0, 7);
          ctx.fill();
        }
      }
      draw();

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        removeEventListener('resize', size);
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
        card.removeEventListener('mousemove', onMove);
        io2.disconnect();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="lab" className="section-pad">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="reveal">The Lab</h2>
          <span className="n reveal">— Experiments &amp; concepts</span>
        </div>
        <div className="lab-grid" ref={gridRef}>
          {LAB.map((l) => (
            <div className="lab-card reveal" data-lab={l[0]} data-cursor="explore" key={l[0]}>
              <canvas className="labvis" />
              <div className="lc-top"><span>{l[2]}</span><span>{l[3]}</span></div>
              <div>
                <div className="lc-t">{l[1]}</div>
                <div className="play" style={{ marginTop: 8 }}>Play <span aria-hidden="true">→</span></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'clamp(60px,10vh,110px)' }}>
          <span className="eyebrow reveal">— Selected project experience</span>
          <div className="trust reveal">
            <span className="b">Apex Total Home Services</span>
            <span className="b">JFAM Design &amp; Build</span>
            <span className="b">Aronix Webtech</span>
            <span className="b">Fresh Breath Therapy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
