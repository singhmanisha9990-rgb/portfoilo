'use client';

import { useEffect, useRef } from 'react';

function Seq() {
  return (
    <span>
      <b>UX</b><i>/</i><b>UI</b><i>/</i><b>AI</b><i>/</i><b>3D</b><i>/</i>
      <b>Motion</b><i>/</i><b>Prototyping</b><i>/</i><b>Interaction</b><i>/</i><b>Systems</b><i>/</i>
    </span>
  );
}

export default function Ticker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const tr = trackRef.current;
    let tx = 0, raf;
    (function t() {
      tx -= 0.4;
      if (tx < -tr.scrollWidth / 2) tx = 0;
      tr.style.transform = `translateX(${tx}px)`;
      raf = requestAnimationFrame(t);
    })();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="ticker" aria-hidden="true">
      <div className="track" ref={trackRef}>
        <Seq />
        <Seq />
      </div>
    </div>
  );
}
