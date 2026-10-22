// Inline SVG icons used across the site.

const line = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' };

export const Up = () => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth="2.2"><path d="M7 17L17 7M8 7h9v9" /></svg>
);
export const Ext = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" {...line} strokeWidth="2"><path d="M7 17L17 7M8 7h9v9" /></svg>
);
export const Arrow = ({ className, size = 18 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth="2"><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
export const Search = () => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
export const Spark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></svg>
);
export const Grid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="6.5" height="6.5" rx="2" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="2" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="2" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" /></svg>
);
export const Rocket = () => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth="1.8" strokeLinejoin="round"><path d="M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5z" /><path d="M8 10l-4 1 3-4h4M14 16l-1 4 4-3v-4" /></svg>
);
export const User = () => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
);
export const Mail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Bulb = () => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth="2"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" /></svg>
);
export const Sliders = () => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth="2"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
);
export const Bolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
);
export const Award = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 22l5-3 5 3-1.5-8" /></svg>
);
export const Trophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8" /></svg>
);
