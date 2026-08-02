import { site } from "../data/site";

export default function Toolkit() {
  return (
    <section className="toolkit" id="toolkit">
      <p className="eyebrow">TOOLKIT</p>
      <div className="toolkit-grid">
        {site.toolkit.map((column) => (
          <div className="toolkit-col" key={column.group}>
            <h3>{column.group}</h3>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="background">
        {site.background.map((entry) => (
          <div className="background-row" key={entry.label}>
            <span>{entry.label}</span>
            <span className="background-meta">{entry.meta}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
