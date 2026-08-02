import { useEffect } from "react";
import { gsap, SplitText } from "../lib/gsap";

/**
 * Splits every [data-reveal] element into characters and staggers them in.
 *
 * data-reveal="load"   fires immediately (hero copy, above the fold)
 * data-reveal="scroll" fires when the element scrolls into view (default)
 */
export function useSplitReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The context is created inside an async callback, so cleanup can run before
    // it exists. Without this guard StrictMode's double mount leaves the first
    // pass un-reverted, every element gets split twice, and the rival tweens
    // strand characters at opacity 0.
    let cancelled = false;
    let ctx: gsap.Context | undefined;

    // Splitting before webfonts land measures the fallback face, which puts the
    // line breaks — and so the masks — in the wrong places.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    fontsReady.then(() => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const onLoad = el.dataset.reveal === "load";

          SplitText.create(el, {
            type: "lines,chars",
            mask: "lines",
            // Re-split on resize so the line masks follow the new wrapping.
            autoSplit: true,
            onSplit(self) {
              // fromTo, not from: an interrupted `from` parks elements at the
              // start values, which reads as permanently invisible text.
              // Explicit end values mean a killed tween still lands legible.
              const to: gsap.TweenVars = {
                yPercent: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.1,
                ease: "power3.out",
                stagger: 0.018,
                // Drop the filter once it reaches 0 — leaving it set keeps a
                // compositing layer per character alive for nothing.
                clearProps: "filter",
              };

              // Only add the key when it is wanted. `scrollTrigger: undefined`
              // still counts as asking for one, and a ScrollTrigger with no
              // trigger never fires — pinning the tween at progress 0.
              if (onLoad) {
                to.delay = 0.15;
              } else {
                to.scrollTrigger = { trigger: el, start: "top 85%", once: true };
              }

              return gsap.fromTo(
                self.chars,
                { yPercent: 110, opacity: 0, filter: "blur(6px)" },
                to
              );
            },
          });
        });
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
}
