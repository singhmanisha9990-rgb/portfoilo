'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { AI_FLOW, AI_TOOLS } from '@/lib/data';
import { fx, initFlags } from '@/lib/fx';

export default function AiSection() {
  const [sel, setSel] = useState(null); // selected tool index
  const orbitRef = useRef(null);
  const wrapRef = useRef(null);

  /* pseudo-3D tool orbit */
  useEffect(() => {
    initFlags();
    const orbit = orbitRef.current;
    const wrap = wrapRef.current;
    const nodes = [...orbit.querySelectorAll('.tool')];

    let a = 0, tiltX = 0, tiltY = 0, tX = 0, tY = 0, raf;
    let onMove = null, onLeave = null;
    if (!fx.touch) {
      onMove = (e) => {
        const r = wrap.getBoundingClientRect();
        tX = ((e.clientX - r.left) / r.width - 0.5) * 18;
        tY = ((e.clientY - r.top) / r.height - 0.5) * -18;
      };
      onLeave = () => { tX = 0; tY = 0; };
      wrap.addEventListener('mousemove', onMove);
      wrap.addEventListener('mouseleave', onLeave);
    }

    (function o() {
      if (!fx.reduce) a += 0.005;
      tiltX += (tX - tiltX) * 0.06;
      tiltY += (tY - tiltY) * 0.06;
      const R = wrap.clientWidth * 0.4;
      nodes.forEach((n, i) => {
        const ang = a + (i / nodes.length) * Math.PI * 2;
        const x = Math.cos(ang) * R, z = Math.sin(ang) * R;
        const scale = ((z + R) / (2 * R)) * 0.5 + 0.6;
        n.style.transform = `translate(-50%,-50%) translate(${x}px,${Math.sin(ang * 1.4) * 10}px) scale(${scale})`;
        n.style.opacity = 0.35 + scale * 0.55;
        n.style.zIndex = Math.round(scale * 100);
      });
      orbit.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      raf = requestAnimationFrame(o);
    })();

    return () => {
      cancelAnimationFrame(raf);
      if (onMove) {
        wrap.removeEventListener('mousemove', onMove);
        wrap.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  const tool = sel == null ? null : AI_TOOLS[sel];

  return (
    <section id="ai" className="section-pad">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="reveal">Design × AI × Build</h2>
          <span className="n reveal">— How I work with AI</span>
        </div>
        <p
          className="reveal"
          style={{ maxWidth: 560, color: 'var(--grey)', fontSize: 17, lineHeight: 1.6, fontWeight: 300, marginBottom: 60 }}
        >
          I use AI not as a shortcut, but as a creative and problem-solving partner — from early thinking through to rapid, working prototypes.
        </p>
        <div className="ai-grid">
          <div className="ai-flow reveal">
            {AI_FLOW.map((s, i) => (
              <Fragment key={s[0]}>
                <div className="ai-stage reveal">
                  <div className="st">{s[0]}</div>
                  <div className="sl">{s[1]}</div>
                </div>
                {i < AI_FLOW.length - 1 && (
                  <div className="ai-arrow reveal" aria-hidden="true">↓</div>
                )}
              </Fragment>
            ))}
          </div>
          <div>
            <div className="orbit-wrap" data-cursor="drag" ref={wrapRef}>
              <div className="orbit" ref={orbitRef}>
                <div className="core">AI</div>
                {AI_TOOLS.map((t, i) => (
                  <button
                    key={t[0]}
                    className={`tool${sel === i ? ' sel' : ''}`}
                    type="button"
                    onClick={() => setSel(i)}
                  >
                    {t[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="orbit-info">
              <div className="ti">{tool ? tool[0] : 'Tap a tool'}</div>
              <div className="tx">
                {tool
                  ? tool[1]
                  : 'Each tool below plays a specific role in how I think, design and build. Select one to see how I use it.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
