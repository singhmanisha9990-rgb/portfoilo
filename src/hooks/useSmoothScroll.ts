import { useEffect } from "react";
import { gsap, ScrollSmoother } from "../lib/gsap";

/**
 * Creates the ScrollSmoother instance over #smooth-wrapper / #smooth-content.
 * Returns nothing — read the singleton via ScrollSmoother.get() if you need to
 * drive it (e.g. anchor navigation).
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Bail on reduced-motion: smoothing hijacks native scroll, which is exactly
    // what people who set this preference are asking us not to do.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Browsers restore the previous scroll offset on reload. On a page whose
    // hero animation only plays once, that drops returning visitors halfway
    // down with the intro already spent — so opt out and start at the top.
    const priorRestoration = history.scrollRestoration;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        // No `speed` override: keeping content 1:1 with the scrollbar means
        // scroll position stays predictable for anchors and ScrollTriggers.
        effects: true,
        normalizeScroll: true,
      });

      // The smoother keeps its own scroll offset, so resetting the window above
      // is not enough — it has to be told as well.
      smoother.scrollTop(0);

      // Anchor clicks hand off to the smoother so they ease instead of jumping.
      gsap.utils.toArray<HTMLAnchorElement>("a[data-anchor]").forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const target = link.getAttribute("href");
          if (target) smoother.scrollTo(target, true, "top top");
        });
      });
    });

    return () => {
      ctx.revert();
      if ("scrollRestoration" in history) history.scrollRestoration = priorRestoration;
    };
  }, []);
}
