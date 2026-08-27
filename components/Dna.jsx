'use client';

import { useEffect, useRef } from 'react';
import { DNA } from '@/lib/data';
import { fx, initFlags } from '@/lib/fx';

// Design DNA — rotating canvas point sphere with principles orbiting the ring.
export default function Dna() {
  const canvasRef = useRef(null);
  const hostRef = useRef(null);
  const tintRef = useRef(0);

  useEffect(() => {
    initFlags();
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    const host = hostRef.current;
    const pNodes = [...host.querySelectorAll('.dp')];

    let W, H;
    const DPR = Math.min(devicePixelRatio || 1, 2);
    function size() {
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * DPR; cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    const N = fx.small ? 260 : 520;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }

    function placeP() {
      const r = cv.getBoundingClientRect();
      const cx = r.width / 2, cy = r.height / 2, rad = r.width * 0.52;
      pNodes.forEach((n, i) => {
        const ang = (i / DNA.length) * Math.PI * 2 - Math.PI / 2;
        n.style.left = cx + Math.cos(ang) * rad + 'px';
        n.style.top = cy + Math.sin(ang) * rad + 'px';
      });
    }

    const onResize = () => { size(); placeP(); };
    size();
    placeP();
    addEventListener('resize', onResize);

    let ry = 0, rx = 0.35, running = true, raf;
    const vio = new IntersectionObserver((e) => { running = e[0].isIntersecting; }, { threshold: 0.05 });
    vio.observe(cv);

    (function frame() {
      if (running) {
        ctx.clearRect(0, 0, W, H);
        if (!fx.reduce) ry += 0.0035;
        tintRef.current *= 0.96;
        const cx = W / 2, cy = H / 2, scale = Math.min(W, H) * 0.36;
        const cosY = Math.cos(ry), sinY = Math.sin(ry), cosX = Math.cos(rx), sinX = Math.sin(rx);
        const proj = pts.map((p) => {
          let [x, y, z] = p;
          const x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY;
          const y1 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX;
          const pz = z2 * 0.5 + 0.5;
          return [cx + x1 * scale, cy + y1 * scale, pz];
        });
        // faint links
        ctx.strokeStyle = 'rgba(167,167,167,0.050)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < proj.length; i += 7) {
          const a = proj[i], b = proj[(i + 11) % proj.length];
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        }
        proj.forEach((p) => {
          const d = p[2];
          const rr = 0.6 + d * 2.2;
          const g = Math.round(167 + d * 80);
          const useLime = tintRef.current > 0.02;
          ctx.fillStyle = useLime
            ? `rgba(184,255,90,${0.25 + d * 0.7})`
            : `rgba(${g},${g},${g},${0.2 + d * 0.7})`;
          ctx.beginPath(); ctx.arc(p[0], p[1], rr, 0, 7); ctx.fill();
        });
      }
      raf = requestAnimationFrame(frame);
    })();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', onResize);
      vio.disconnect();
    };
  }, []);

  return (
    <section id="dna" className="section-pad">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="reveal">My Design DNA</h2>
          <span className="n reveal">— What guides the work</span>
        </div>
        <div className="dna-wrap reveal">
          <div className="dna-canvas-hold">
            <canvas id="dnaCanvas" ref={canvasRef} />
            <div className="dna-principles" ref={hostRef}>
              {DNA.map((d) => (
                <span key={d} className="dp" onMouseEnter={() => { tintRef.current = 1; }}>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
