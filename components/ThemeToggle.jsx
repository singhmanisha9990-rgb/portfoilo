'use client';

// The stored theme is applied before paint by the inline script in app/layout.js.
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('ms-theme', root.dataset.theme); } catch (e) {}
  };
  return (
    <button className="theme-t" aria-label="Switch colour theme" onClick={toggle}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" /></svg>
    </button>
  );
}
