'use client';

import { useEffect, useRef } from 'react';
import { fx, initFlags } from '@/lib/fx';

// headline chars pre-split for the intro stagger (was splitChars() originally)
function Chars({ text }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="ch">{c}</span>
      ))}
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const introRan = useRef(false);

  useEffect(() => {
    initFlags();
    const sec = sectionRef.current;
    const canvas = sec.querySelector('#gl');
    const fallbackOrbs = sec.querySelector('.hero-orb-fallback');
    const cleanups = [];
    let dead = false;

    const showFallback = () => {
      canvas.style.display = 'none';
      fallbackOrbs.style.display = 'block';
    };

    /* =====================================================
       HERO WEBGL (three.js) — metallic sphere + wire + particles
       ===================================================== */
    if (fx.small || fx.reduce) {
      showFallback();
    } else {
      import('three')
        .then((THREE) => {
          if (dead) return;
          let renderer, scene, camera, sphere, wire, points, raf, running = true;
          try {
            renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
            renderer.setSize(innerWidth, innerHeight);
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
            camera.position.z = 6;

            // env from canvas gradient for metallic reflections
            let envMap = null;
            try {
              const ec = document.createElement('canvas');
              ec.width = 512; ec.height = 256;
              const g = ec.getContext('2d');
              const grd = g.createLinearGradient(0, 0, 0, 256);
              grd.addColorStop(0, '#1a2233'); grd.addColorStop(0.45, '#0a0c12');
              grd.addColorStop(0.55, '#0a0c12'); grd.addColorStop(1, '#05060a');
              g.fillStyle = grd; g.fillRect(0, 0, 512, 256);
              // glints
              g.fillStyle = 'rgba(184,255,90,.55)'; g.beginPath(); g.arc(140, 90, 60, 0, 7); g.fill();
              g.fillStyle = 'rgba(124,124,255,.5)'; g.beginPath(); g.arc(380, 150, 80, 0, 7); g.fill();
              const et = new THREE.CanvasTexture(ec);
              et.mapping = THREE.EquirectangularReflectionMapping;
              const pmrem = new THREE.PMREMGenerator(renderer);
              pmrem.compileEquirectangularShader();
              envMap = pmrem.fromEquirectangular(et).texture;
              scene.environment = envMap;
            } catch (e) {}

            const sMat = new THREE.MeshStandardMaterial({
              color: 0x0c0e13, metalness: 1, roughness: 0.22, envMap, envMapIntensity: 1.1,
            });
            sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, 6), sMat);
            scene.add(sphere);

            wire = new THREE.Mesh(
              new THREE.IcosahedronGeometry(2.35, 1),
              new THREE.MeshBasicMaterial({ color: 0x2a2e37, wireframe: true, transparent: true, opacity: 0.5 })
            );
            scene.add(wire);

            // particles
            const N = 420, pos = new Float32Array(N * 3);
            for (let i = 0; i < N; i++) {
              const r = 3 + Math.random() * 6;
              const t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
              pos[i * 3] = r * Math.sin(p) * Math.cos(t);
              pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
              pos[i * 3 + 2] = r * Math.cos(p);
            }
            const pg = new THREE.BufferGeometry();
            pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            points = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xb8ff5a, size: 0.02, transparent: true, opacity: 0.55 }));
            scene.add(points);

            const key = new THREE.PointLight(0xb8ff5a, 3.2, 30); key.position.set(4, 3, 4); scene.add(key);
            const fill = new THREE.PointLight(0x7c7cff, 2.6, 30); fill.position.set(-5, -2, 3); scene.add(fill);
            const rim = new THREE.DirectionalLight(0xffffff, 1.1); rim.position.set(-2, 4, -5); scene.add(rim);
            scene.add(new THREE.AmbientLight(0x223, 0.5));

            let mx = 0, my = 0, tmx = 0, tmy = 0;
            const onMove = (e) => { tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5; };
            const onResize = () => {
              camera.aspect = innerWidth / innerHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(innerWidth, innerHeight);
            };
            addEventListener('mousemove', onMove);
            addEventListener('resize', onResize);
            const hio = new IntersectionObserver((e) => { running = e[0].isIntersecting; }, { threshold: 0.01 });
            hio.observe(sec);

            (function tick() {
              raf = requestAnimationFrame(tick);
              if (!running) return;
              mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
              sphere.rotation.y += 0.0022; sphere.rotation.x += 0.0011;
              wire.rotation.y -= 0.0016; wire.rotation.x += 0.0008;
              points.rotation.y += 0.0006;
              camera.position.x = mx * 1.2; camera.position.y = -my * 1.0;
              camera.lookAt(0, 0, 0);
              renderer.render(scene, camera);
            })();

            cleanups.push(() => {
              cancelAnimationFrame(raf);
              removeEventListener('mousemove', onMove);
              removeEventListener('resize', onResize);
              hio.disconnect();
              renderer.dispose();
            });
          } catch (err) {
            showFallback();
          }
        })
        .catch(showFallback);
    }

    /* =====================================================
       HERO PORTRAIT — 2.5D tilt + gentle float
       ===================================================== */
    (function portraitMotion() {
      const fr = sec.querySelector('.hero-portrait .frame');
      if (!fr || fx.touch || fx.reduce) return;
      let tx = 0, ty = 0, cx = 0, cy = 0, ft = Math.random() * 6, raf;
      const onMove = (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; };
      addEventListener('mousemove', onMove);
      (function loop() {
        ft += 0.017; cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05;
        const fl = Math.sin(ft) * 7;
        fr.style.transform = `translateY(${fl}px) rotateY(${cx * 9}deg) rotateX(${cy * -7}deg)`;
        raf = requestAnimationFrame(loop);
      })();
      cleanups.push(() => { cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); });
    })();

    /* =====================================================
       HERO INTRO TIMELINE (loader + reveal)
       ===================================================== */
    const runIntro = async () => {
      if (introRan.current) return;
      introRan.current = true;

      const loader = document.getElementById('loader');
      const spark = loader.querySelector('.spark');
      const lname = loader.querySelector('.lname span');
      const lcount = loader.querySelector('.lcount');
      const chars = sec.querySelectorAll('.hero-h1 .ch');
      const frame = sec.querySelector('.hero-portrait .frame');
      const heroImg = sec.querySelector('#heroImg');

      const staticReveal = () => {
        loader.style.display = 'none';
        chars.forEach((c) => { c.style.transform = 'none'; c.style.opacity = 1; });
        if (frame) frame.style.clipPath = 'inset(0 0 0% 0)';
        if (heroImg) heroImg.style.transform = 'scale(1.02)';
      };

      if (fx.reduce) { staticReveal(); return; }

      let gsap;
      try {
        gsap = (await import('gsap')).default;
      } catch (e) {
        staticReveal();
        return;
      }
      if (dead) return;

      // count up
      let c = 0;
      const ci = setInterval(() => {
        c += Math.ceil(Math.random() * 9);
        if (c > 100) c = 100;
        lcount.textContent = String(c).padStart(3, '0');
        if (c >= 100) clearInterval(ci);
      }, 90);
      cleanups.push(() => clearInterval(ci));

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(lname, { y: 0, duration: 0.9, ease: 'power4.out' }, 0)
        .fromTo(spark, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.2)
        .to(spark, { scale: 26, duration: 1.0, ease: 'power3.inOut' }, 1.15)
        .to(spark, { opacity: 0, duration: 0.4 }, '-=.5')
        .to(loader, { opacity: 0, duration: 0.5, onComplete: () => (loader.style.display = 'none') }, '-=.2')
        // headline
        .to(chars, { y: 0, opacity: 1, duration: 0.9, stagger: 0.028, ease: 'power4.out' }, '-=.45')
        // portrait mask reveal
        .fromTo(frame, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut' }, '-=.9')
        .fromTo(heroImg, { scale: 1.18 }, { scale: 1.02, duration: 1.4, ease: 'power2.out' }, '-=1.1');
      cleanups.push(() => tl.kill());
    };

    // run after fonts/images settle a touch
    const start = () => setTimeout(runIntro, 80);
    if (document.readyState === 'complete') start();
    else {
      addEventListener('load', start, { once: true });
      cleanups.push(() => removeEventListener('load', start));
    }
    // safety: never leave loader stuck
    const safety = setTimeout(() => {
      const l = document.getElementById('loader');
      if (l && l.style.display !== 'none' && getComputedStyle(l).opacity !== '0') runIntro();
    }, 2600);
    cleanups.push(() => clearTimeout(safety));

    return () => {
      dead = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef}>
      <canvas id="gl" />
      <div className="hero-orb-fallback">
        <div className="o" style={{ width: 340, height: 340, background: 'var(--violet)', right: '14%', top: '24%' }} />
        <div className="o" style={{ width: 220, height: 220, background: 'var(--lime)', right: '32%', top: '46%', opacity: 0.35 }} />
      </div>
      <div className="hero-grad" />
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-tag reveal">
            <span className="dot" />
            <span className="hero-name">Manisha Singh</span>
          </div>
          <div className="hero-role reveal">Product Designer × AI Creative</div>
          <h1 className="hero-h1">
            <span className="ln"><Chars text="Designing" /></span>
            <span className="ln"><Chars text="Digital" /></span>
            <span className="ln"><Chars text="Experiences" /><span className="stop ch">.</span></span>
          </h1>
          <p className="hero-sub reveal">
            I combine UX thinking, visual design, AI, interaction and emerging technology to create thoughtful digital experiences.
          </p>
          <div className="hero-meta reveal">UX / UI / AI / 3D / MOTION / PROTOTYPING</div>
          <div className="hero-cta reveal">
            <a href="#work" className="btn btn-primary mag" data-cursor="open">Explore my work →</a>
            <a href="#contact" className="btn btn-ghost mag" data-cursor="open">Let's connect ↗</a>
          </div>
        </div>
        <div className="hero-portrait" data-cursor="explore">
          <div className="frame">
            <img id="heroImg" src="/images/portrait.jpg" alt="Portrait of Manisha Singh" />
            <div className="duo" />
            <div className="vig" />
            <div className="rim" />
          </div>
          <div className="pcap">Fig. 01 — the designer</div>
        </div>
      </div>
      <div className="scrollcue"><span>Scroll</span><span className="bar" /></div>
    </section>
  );
}
