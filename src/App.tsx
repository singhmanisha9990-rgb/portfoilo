import { lazy, Suspense } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Toolkit from "./components/Toolkit";
import Contact from "./components/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useSplitReveal } from "./hooks/useSplitReveal";

// three.js is most of the bundle and nothing above the fold needs it to lay out,
// so it loads in its own chunk after the text has painted.
const HeroCanvas = lazy(() => import("./components/HeroCanvas"));

export default function App() {
  useSmoothScroll();
  useSplitReveal();

  return (
    <>
      <Nav />
      {/* Outside #smooth-content so it can be position:fixed — see index.css. */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>
      {/* ScrollSmoother requires exactly this wrapper/content pair with nothing
          between them. Everything that scrolls goes inside #smooth-content. */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <About />
          <Work />
          <Toolkit />
          <Contact />
        </div>
      </div>
    </>
  );
}
