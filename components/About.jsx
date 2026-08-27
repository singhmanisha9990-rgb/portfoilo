'use client';

import { useEffect, useRef } from 'react';
import { fx, initFlags } from '@/lib/fx';

// ABOUT — interactive identity experience (pinned scroll scene on desktop,
// static "lite" layout on touch / small screens / reduced motion).
// Ported from the original AboutXP module; the scene is built imperatively.

const PORTRAIT = '/images/portrait.jpg';
const NAME = 'MANISHA';

const WORDS = [
  ['RESEARCH', 'Understand before you design'],
  ['UX', 'Research → structure → experience'],
  ['UI', 'Clarity, rhythm & detail'],
  ['AI', 'AI-assisted workflows'],
  ['MOTION', 'Meaning through movement'],
  ['3D', 'Spatial & interactive design'],
  ['PROTOTYPING', 'Test the feel, not just the look'],
  ['SYSTEMS', 'Design that scales'],
];

const clampR = (v, a, b) => Math.max(0, Math.min(1, (v - a) / (b - a)));
const lerp = (a, b, t) => a + (b - a) * t;

export default function About() {
  const secRef = useRef(null);

  useEffect(() => {
    initFlags();
    const sec = secRef.current;
    const pin = sec.querySelector('.about-pin');
    const stage = sec.querySelector('.about-stage');
    const cleanups = [];
    const LITE = fx.reduce || fx.small || fx.touch;

    function fillWord(container, spans) {
      spans.forEach((s) => (s.style.transform = 'none'));
      const wr = container.getBoundingClientRect();
      spans.forEach((sp) => {
        const r = sp.getBoundingClientRect();
        sp.style.backgroundImage = 'url(' + PORTRAIT + ')';
        sp.style.backgroundSize = wr.width + 'px ' + wr.height + 'px';
        sp.style.backgroundPosition = -(r.left - wr.left) + 'px ' + -(r.top - wr.top) + 'px';
      });
    }

    if (LITE) buildLite();
    else buildFull();

    function buildLite() {
      sec.style.height = 'auto';
      pin.style.position = 'static';
      pin.style.height = 'auto';
      pin.style.overflow = 'visible';
      const wrap = document.createElement('div');
      wrap.className = 'about-lite section-pad wrap';
      wrap.innerHTML =
        '<div class="al-role reveal">Product Designer × AI Creative</div>' +
        '<div class="al-word" id="alWord">' + [...NAME].map((c) => '<span class="al">' + c + '</span>').join('') + '</div>' +
        '<p class="al-statement reveal">I design digital experiences that feel as good as they function.</p>' +
        '<p class="al-p reveal">I’m Manisha Singh, a Product Designer focused on UX, UI, interaction, prototyping and emerging technology.</p>' +
        '<p class="al-p reveal">I work across the product journey — from research and information architecture to wireframes, visual systems, interaction and responsive experiences.</p>' +
        '<div class="al-words reveal">' + WORDS.map((w) => '<span>' + w[0] + '</span>').join('') + '</div>' +
        '<div class="al-think reveal">How I think</div>' +
        '<div class="al-principles reveal"><span>Clarity</span><span>Curiosity</span><span>Detail</span></div>' +
        '<div class="al-final reveal"><span class="loc">Based in Delhi, India</span><span class="big">Design with intent.<br>Build with curiosity.</span><a class="cta" href="#contact">More about me →</a></div>';
      stage.appendChild(wrap);
      const word = wrap.querySelector('#alWord');
      const spans = [...word.querySelectorAll('.al')];
      const doFill = () => fillWord(word, spans);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setTimeout(doFill, 60));
      else setTimeout(doFill, 300);
      addEventListener('resize', doFill);
      cleanups.push(() => removeEventListener('resize', doFill));
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
        { threshold: 0.15 }
      );
      wrap.querySelectorAll('.reveal').forEach((n) => io.observe(n));
      cleanups.push(() => io.disconnect());
    }

    function buildFull() {
      const light = document.createElement('div'); light.className = 'a-light'; stage.appendChild(light);

      const objHold = document.createElement('div'); objHold.className = 'a-object';
      const cv = document.createElement('canvas'); objHold.appendChild(cv); stage.appendChild(objHold);

      const orbit = document.createElement('div'); orbit.className = 'a-orbit'; stage.appendChild(orbit);
      const readout = document.createElement('div'); readout.className = 'a-readout';
      const defRead = 'Move to explore'; readout.textContent = defRead; stage.appendChild(readout);
      let objBoost = 0;
      const ows = WORDS.map((w) => {
        const e = document.createElement('div'); e.className = 'ow'; e.textContent = w[0];
        e.addEventListener('mouseenter', () => { readout.textContent = w[1]; objBoost = 1; });
        e.addEventListener('mouseleave', () => { readout.textContent = defRead; });
        orbit.appendChild(e); return e;
      });

      const port = document.createElement('div'); port.className = 'a-portrait';
      port.innerHTML = '<img src="' + PORTRAIT + '" alt="Manisha Singh portrait">'; stage.appendChild(port);

      const center = document.createElement('div'); center.className = 'a-center';
      const word = document.createElement('div'); word.className = 'a-word';
      word.innerHTML = [...NAME].map((c) => '<span class="al">' + c + '</span>').join('');
      const role = document.createElement('div'); role.className = 'a-role';
      role.textContent = 'Product Designer × AI Creative';
      center.appendChild(word); center.appendChild(role); stage.appendChild(center);
      const letters = [...word.querySelectorAll('.al')];
      const dirs = letters.map((_, i) => {
        const ang = (i / letters.length) * Math.PI * 2 + (i % 2 ? 0.6 : -0.5);
        return { x: Math.cos(ang), y: Math.sin(ang) * 0.7, r: (i % 2 ? 1 : -1) * (0.6 + ((i * 37) % 10) / 14) };
      });

      const copy = document.createElement('div'); copy.className = 'a-copy';
      copy.innerHTML =
        '<span class="cl statement">I design digital experiences that feel as good as they function.</span>' +
        '<span class="cl small">I’m Manisha Singh, a Product Designer focused on UX, UI, interaction, prototyping and emerging technology.</span>' +
        '<span class="cl small">I work across the product journey — from research and information architecture to wireframes, visual systems, interaction and responsive experiences.</span>';
      stage.appendChild(copy);
      const clines = [...copy.querySelectorAll('.cl')];

      const think = document.createElement('div'); think.className = 'a-think';
      think.textContent = 'How I think'; stage.appendChild(think);

      const prin = document.createElement('div'); prin.className = 'a-principles';
      prin.innerHTML = '<span class="pr">Clarity</span><span class="pr">Curiosity</span><span class="pr">Detail</span>';
      stage.appendChild(prin);
      const prs = [...prin.querySelectorAll('.pr')];

      const fin = document.createElement('div'); fin.className = 'a-final';
      fin.innerHTML =
        '<span class="loc">Based in Delhi, India</span><span class="big">Design with intent.<br>Build with curiosity.</span><a class="cta" href="#contact" data-cursor="open">More about me →</a>';
      stage.appendChild(fin);

      const prog = document.createElement('div'); prog.className = 'a-progress'; stage.appendChild(prog);

      const doFill = () => fillWord(word, letters);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setTimeout(doFill, 60));
      else setTimeout(doFill, 300);

      // icosahedron
      const t = (1 + Math.sqrt(5)) / 2;
      let V = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
      const nm = Math.hypot(1, t);
      V = V.map((v) => v.map((x) => x / nm));
      const edges = [];
      for (let i = 0; i < V.length; i++)
        for (let j = i + 1; j < V.length; j++) {
          const d = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]);
          if (d < 1.2) edges.push([i, j]);
        }

      const ctx = cv.getContext('2d');
      const DPR = Math.min(devicePixelRatio || 1, 2);
      function sizeCv() {
        const r = objHold.getBoundingClientRect();
        cv.width = Math.max(2, r.width * DPR);
        cv.height = Math.max(2, r.height * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }
      const onResize = () => { sizeCv(); doFill(); };
      sizeCv();
      addEventListener('resize', onResize);
      cleanups.push(() => removeEventListener('resize', onResize));

      let mx = 0, my = 0, tmx = 0, tmy = 0;
      if (!fx.touch) {
        const onPinMove = (e) => {
          const r = pin.getBoundingClientRect();
          tmx = (e.clientX - r.left) / r.width - 0.5;
          tmy = (e.clientY - r.top) / r.height - 0.5;
          light.style.left = e.clientX - r.left + 'px';
          light.style.top = e.clientY - r.top + 'px';
        };
        pin.addEventListener('mousemove', onPinMove);
        cleanups.push(() => pin.removeEventListener('mousemove', onPinMove));
      }

      let ry = 0, rx = 0.4, oa = 0;
      function drawObject() {
        const w = cv.width / DPR, h = cv.height / DPR;
        ctx.clearRect(0, 0, w, h);
        ry += 0.0032 + objBoost * 0.02; rx += 0.0012;
        const cy_ = Math.cos(ry + mx * 0.6), sy_ = Math.sin(ry + mx * 0.6);
        const cx_ = Math.cos(rx + my * 0.4), sx_ = Math.sin(rx + my * 0.4);
        const R = Math.min(w, h) * 0.34, cx = w / 2, cy = h / 2;
        const pr = V.map((v) => {
          const [x, y, z] = v;
          const x1 = x * cy_ - z * sy_, z1 = x * sy_ + z * cy_;
          const y1 = y * cx_ - z1 * sx_, z2 = y * sx_ + z1 * cx_;
          const d = z2 * 0.5 + 0.6;
          return [cx + x1 * R, cy + y1 * R, d];
        });
        ctx.lineWidth = 1;
        edges.forEach((e) => {
          const A = pr[e[0]], B = pr[e[1]];
          const d = (A[2] + B[2]) / 2;
          ctx.strokeStyle = 'rgba(184,255,90,' + (0.1 + d * 0.22).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
        });
        pr.forEach((pt) => {
          ctx.fillStyle = 'rgba(124,124,255,' + (0.12 + pt[2] * 0.3).toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(pt[0], pt[1], 1.5, 0, 7); ctx.fill();
        });
      }

      function drawOrbit() {
        oa += 0.0022;
        const rr = orbit.clientWidth * 0.44;
        ows.forEach((e, i) => {
          const ang = oa + (i / ows.length) * Math.PI * 2;
          const x = Math.cos(ang) * rr;
          const z = Math.sin(ang);
          const scale = 0.7 + (z * 0.5 + 0.5) * 0.5;
          e.style.transform = 'translate(-50%,-50%) translate(' + x + 'px,' + (Math.sin(ang * 1.3) * 12 + my * 22) + 'px) scale(' + scale.toFixed(3) + ')';
          e.style.opacity = (0.35 + (z * 0.5 + 0.5) * 0.6).toFixed(3);
        });
        orbit.style.transform = 'translate(-50%,-50%) rotateX(' + (my * 8).toFixed(2) + 'deg) rotateY(' + (mx * 8).toFixed(2) + 'deg)';
      }

      function update(p) {
        const bt = clampR(p, 0.58, 0.72);
        stage.style.background = 'rgb(' + Math.round(lerp(8, 243, bt)) + ',' + Math.round(lerp(9, 241, bt)) + ',' + Math.round(lerp(11, 236, bt)) + ')';
        const spread = clampR(p, 0.12, 0.5), gone = clampR(p, 0.56, 0.66);
        letters.forEach((L, i) => {
          const d = dirs[i];
          const tx = d.x * (spread * 90 + gone * 300);
          const ty = d.y * (spread * 70 + gone * 240);
          const rot = d.r * (spread * 6 + gone * 26);
          L.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) rotate(' + rot.toFixed(2) + 'deg)';
          L.style.opacity = (1 - gone).toFixed(3);
        });
        role.style.opacity = (1 - clampR(p, 0.42, 0.55)).toFixed(3);
        const up = clampR(p, 0.4, 0.5), dn = clampR(p, 0.52, 0.62);
        port.style.opacity = (up * (1 - dn) * 0.55).toFixed(3);
        port.style.transform = 'translate(-50%,-50%) scale(' + (1.05 - up * 0.05).toFixed(3) + ')';
        const th = [[0.18, 0.3], [0.3, 0.4], [0.4, 0.5]];
        const outc = clampR(p, 0.54, 0.62);
        clines.forEach((c, i) => {
          const tt = clampR(p, th[i][0], th[i][1]);
          c.style.opacity = (tt * (1 - outc)).toFixed(3);
          c.style.transform = 'translateY(' + ((1 - tt) * 18).toFixed(1) + 'px)';
        });
        const thop = clampR(p, 0.62, 0.72) * (1 - clampR(p, 0.82, 0.9));
        think.style.opacity = thop.toFixed(3);
        think.style.transform = 'scale(' + lerp(0.94, 1, clampR(p, 0.62, 0.72)).toFixed(3) + ')';
        think.style.filter = 'blur(' + ((1 - clampR(p, 0.62, 0.72)) * 10).toFixed(2) + 'px)';
        const pout = clampR(p, 0.84, 0.9);
        const q0 = clampR(p, 0.7, 0.8), q1 = clampR(p, 0.73, 0.83), q2 = clampR(p, 0.76, 0.86);
        prs[0].style.opacity = (q0 * (1 - pout)).toFixed(3);
        prs[0].style.transform = 'translateY(' + ((1 - q0) * 44).toFixed(1) + 'px)';
        prs[1].style.opacity = (q1 * (1 - pout)).toFixed(3);
        prs[1].style.filter = 'blur(' + ((1 - q1) * 12).toFixed(2) + 'px)';
        prs[2].style.opacity = (q2 * (1 - pout)).toFixed(3);
        prs[2].style.letterSpacing = lerp(0.34, -0.02, q2).toFixed(3) + 'em';
        const fop = clampR(p, 0.88, 0.97);
        fin.style.opacity = fop.toFixed(3);
        const k = fin.children;
        k[0].style.transform = 'translateY(' + ((1 - clampR(p, 0.88, 0.94)) * 20).toFixed(1) + 'px)';
        k[1].style.transform = 'translateY(' + ((1 - clampR(p, 0.9, 0.97)) * 26).toFixed(1) + 'px)';
        k[2].style.transform = 'translateY(' + ((1 - clampR(p, 0.93, 1)) * 18).toFixed(1) + 'px)';
      }

      let raf;
      function frame() {
        raf = requestAnimationFrame(frame);
        const rect = sec.getBoundingClientRect();
        const vh = innerHeight;
        const denom = Math.max(1, rect.height - vh);
        pin.style.transform = 'translateY(' + Math.max(0, Math.min(denom, -rect.top)).toFixed(1) + 'px)';
        const p = Math.max(0, Math.min(1, -rect.top / denom));
        update(p);
        if (rect.bottom > 0 && rect.top < vh) {
          mx += (tmx - mx) * 0.05;
          my += (tmy - my) * 0.05;
          objBoost *= 0.94;
          objHold.style.opacity = (clampR(p, 0.04, 0.16) * (1 - clampR(p, 0.58, 0.72)) * 0.95).toFixed(3);
          drawObject();
          const oo = (clampR(p, 0.1, 0.24) * (1 - clampR(p, 0.55, 0.66))).toFixed(3);
          orbit.style.opacity = oo;
          readout.style.opacity = oo;
          drawOrbit();
          light.style.opacity = (0.85 * (1 - clampR(p, 0.55, 0.7))).toFixed(3);
        }
        prog.style.width = (p * 100).toFixed(2) + '%';
      }
      frame();
      cleanups.push(() => cancelAnimationFrame(raf));
    }

    return () => {
      cleanups.forEach((fn) => fn());
      stage.innerHTML = '';
      stage.removeAttribute('style');
      pin.removeAttribute('style');
      sec.removeAttribute('style');
    };
  }, []);

  return (
    <section id="about" ref={secRef}>
      <div className="about-pin">
        <div className="about-stage" />
      </div>
    </section>
  );
}
