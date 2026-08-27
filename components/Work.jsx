'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { PROJECTS } from '@/lib/data';
import { mockInnerHTML } from '@/lib/mocks';
import { fx, initFlags, smoothY } from '@/lib/fx';
import Mock from './Mock';

export default function Work() {
  const [active, setActive] = useState(null); // project shown in the overlay
  const [mounted, setMounted] = useState(false); // portal needs document
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => setMounted(true), []);

  /* project tilt + scroll parallax + velocity skew (from the WOW pass) */
  useEffect(() => {
    initFlags();
    const projs = [...sectionRef.current.querySelectorAll('.project')].map((pr) => ({
      pr, vis: pr.querySelector('.p-visual'), tx: 0, ty: 0, cx: 0, cy: 0,
    }));
    const bound = [];
    if (!fx.touch) {
      projs.forEach((o) => {
        const move = (e) => {
          const r = o.pr.getBoundingClientRect();
          o.tx = (e.clientX - r.left) / r.width - 0.5;
          o.ty = (e.clientY - r.top) / r.height - 0.5;
        };
        const leave = () => { o.tx = 0; o.ty = 0; };
        o.pr.addEventListener('mousemove', move);
        o.pr.addEventListener('mouseleave', leave);
        bound.push([o.pr, move, leave]);
      });
    }

    let lastY = smoothY(), gv = 0, raf;
    (function tick() {
      const y = smoothY();
      gv += (y - lastY - gv) * 0.12;
      lastY = y;
      const skew = Math.max(-3, Math.min(3, gv * 0.1));
      if (!fx.reduce) {
        projs.forEach((o) => {
          if (!o.vis) return;
          o.cx += (o.tx - o.cx) * 0.08;
          o.cy += (o.ty - o.cy) * 0.08;
          const r = o.vis.getBoundingClientRect();
          let py = 0;
          if (r.bottom > 0 && r.top < innerHeight) {
            py = ((r.top + r.height / 2 - innerHeight / 2) / innerHeight) * -24;
          }
          o.vis.style.transform =
            'translateY(' + py + 'px) rotateX(' + o.cy * -6 + 'deg) rotateY(' + o.cx * 7 + 'deg) skewY(' + skew * 0.5 + 'deg)';
        });
      }
      raf = requestAnimationFrame(tick);
    })();

    return () => {
      cancelAnimationFrame(raf);
      bound.forEach(([n, m, l]) => {
        n.removeEventListener('mousemove', m);
        n.removeEventListener('mouseleave', l);
      });
    };
  }, []);

  /* overlay side effects: lock scroll, close on Escape */
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  /* cinematic open — the project visual expands to fill the screen */
  const openProject = async (p, articleEl) => {
    const vis = articleEl.querySelector('.p-visual');
    if (fx.reduce || !vis) { setActive(p); return; }
    const r = vis.getBoundingClientRect();

    let gsap;
    try {
      gsap = (await import('gsap')).default;
    } catch (e) {
      setActive(p);
      return;
    }

    const panel = document.createElement('div');
    panel.style.cssText =
      'position:fixed;inset:0;z-index:9650;overflow:hidden;background:var(--panel);transform-origin:top left;will-change:transform;';
    panel.innerHTML = '<div class="mock" style="position:absolute;inset:0">' + mockInnerHTML(p.mock) + '</div>';
    document.body.appendChild(panel);

    const sx = r.width / innerWidth, sy = r.height / innerHeight;
    gsap.set(panel, { x: r.left, y: r.top, scaleX: sx, scaleY: sy });
    gsap.to(panel, {
      x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.6, ease: 'power3.inOut',
      onComplete: () => {
        const ov = overlayRef.current;
        if (ov) ov.style.transition = 'none';
        flushSync(() => setActive(p));
        requestAnimationFrame(() => {
          panel.remove();
          requestAnimationFrame(() => {
            if (overlayRef.current) overlayRef.current.style.transition = '';
          });
        });
      },
    });
  };

  return (
    <>
      <section id="work" className="section-pad" ref={sectionRef}>
        <div className="wrap">
          <div className="sec-head">
            <h2 className="reveal">Selected Work</h2>
            <span className="n reveal">— Live projects</span>
          </div>

          <div className="projects">
            {PROJECTS.map((p) => (
              <article
                key={p.id}
                className="project reveal"
                data-id={p.id}
                data-cursor="view"
                onClick={(e) => openProject(p, e.currentTarget)}
              >
                <div className="p-visual">
                  <span className="p-index">{p.index}</span>
                  <Mock kind={p.mock} />
                  <span className="p-view">View case <i>→</i></span>
                </div>
                <div className="p-info">
                  <div className="cat" dangerouslySetInnerHTML={{ __html: p.cat }} />
                  <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
                  <p dangerouslySetInnerHTML={{ __html: p.blurb }} />
                  <span className="go">View project <span aria-hidden="true">→</span></span>
                </div>
              </article>
            ))}
          </div>

          <div className="morework reveal">
            <a href="https://www.behance.net/manishasingh99" target="_blank" rel="noopener" data-cursor="open">
              Explore more work <span aria-hidden="true">↗</span>
            </a>
            <span className="sub">Additional case studies, concepts and experiments on Behance.</span>
          </div>
        </div>
      </section>

      {/* Overlay is fixed-position — portal it out of the transformed scroll wrapper */}
      {mounted &&
        createPortal(
          <div
            id="overlay"
            ref={overlayRef}
            className={active ? 'open' : undefined}
            aria-hidden={!active}
          >
            <button className="ov-close" onClick={() => setActive(null)}>Close ✕</button>
            {active && <OverlayInner p={active} />}
          </div>,
          document.body
        )}
    </>
  );
}

function OverlayInner({ p }) {
  return (
    <div className="ov-inner">
      <div className="ov-cat" dangerouslySetInnerHTML={{ __html: p.cat }} />
      <h2 className="ov-title" dangerouslySetInnerHTML={{ __html: p.title }} />
      <p
        style={{ maxWidth: 620, color: 'var(--cream-dim)', fontSize: 18, lineHeight: 1.6, fontWeight: 300 }}
        dangerouslySetInnerHTML={{ __html: p.blurb }}
      />
      <div className="ov-hero">
        <Mock kind={p.mock} style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div className="ov-steps">
        {p.steps.map((s, i) => (
          <div className="ov-step" key={i}>
            <div className="sn" dangerouslySetInnerHTML={{ __html: s[0] }} />
            <h4 dangerouslySetInnerHTML={{ __html: s[1] }} />
            <p dangerouslySetInnerHTML={{ __html: s[2] }} />
          </div>
        ))}
      </div>
      <a className="ov-live mag" href={p.url} target="_blank" rel="noopener" data-cursor="open">
        Visit live project ↗
      </a>
      <p className="ov-note">
        Case-study structure follows Overview · Problem · Role · Research · Structure · Design · Interaction · Outcome. Qualitative outcomes only — no invented metrics. Live link opens the real, shipped project.
      </p>
    </div>
  );
}
