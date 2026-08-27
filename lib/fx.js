// Shared client-side state for the animation layer:
// environment flags + the virtual scroll position used by the smooth scroller.

export const fx = {
  scroll: { y: 0 }, // virtual scroll position while smooth scrolling is active
  smooth: false,    // true once SmoothScroll has taken over
  reduce: false,
  touch: false,
  small: false,
  _init: false,
};

export function initFlags() {
  if (fx._init || typeof window === 'undefined') return;
  fx.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  fx.touch = window.matchMedia('(hover:none),(pointer:coarse)').matches;
  fx.small = window.matchMedia('(max-width:860px)').matches;
  fx._init = true;
}

// Current scroll position — the lerped virtual value when smooth scrolling,
// otherwise the native one. Mirrors `scrollProxy.y || window.scrollY`.
export const smoothY = () => (fx.smooth ? fx.scroll.y : window.scrollY);
