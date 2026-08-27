'use client';

import { useEffect, useRef } from 'react';
import { SHOTS, mockInnerHTML } from '@/lib/mocks';

// Project visual: real screenshot when one exists, otherwise the drawn
// browser/dashboard mockup (client-only because it uses Math.random()).
export default function Mock({ kind, style }) {
  if (SHOTS.includes(kind)) {
    return (
      <div className="mock" data-mock={kind} style={style}>
        <img className="shot" src={`/images/${kind}.jpg`} alt={`${kind} project screenshot`} loading="lazy" />
      </div>
    );
  }
  return <DrawnMock kind={kind} style={style} />;
}

function DrawnMock({ kind, style }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.innerHTML = mockInnerHTML(kind);
  }, [kind]);
  return <div className="mock" data-mock={kind} style={style} ref={ref} />;
}
