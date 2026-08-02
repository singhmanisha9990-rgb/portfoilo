import { site } from "../data/site";

export default function About() {
  return (
    <section className="about" id="about">
      <p className="eyebrow">ABOUT</p>
      <p data-reveal>
        {site.about.map((segment, i) =>
          segment.accent ? (
            <strong key={i}>{segment.text}</strong>
          ) : (
            <span key={i}>{segment.text}</span>
          )
        )}
      </p>
    </section>
  );
}
