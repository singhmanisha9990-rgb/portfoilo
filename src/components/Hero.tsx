import { site } from "../data/site";

// The 3D canvas is intentionally not rendered here — it lives in App, outside
// ScrollSmoother's transformed content, so it can stay fixed while this scrolls.
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="hero-intro" data-reveal="load">
          {site.intro}
        </p>
        <h1 data-reveal="load">
          {site.first}
          <br />
          <em>{site.last}</em>
        </h1>
        <p className="hero-role" data-reveal="load">
          {site.role}
        </p>
        <p className="hero-roles" data-reveal="load">
          {site.blurb}
        </p>
      </div>
      <span className="scroll-cue">SCROLL ↓</span>
    </section>
  );
}
