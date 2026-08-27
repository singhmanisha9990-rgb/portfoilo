import { TIMELINE } from '@/lib/data';

export default function Journey() {
  return (
    <section id="journey" className="section-pad">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="reveal">Journey</h2>
          <span className="n reveal">— Growth &amp; work</span>
        </div>
        <div id="timeline">
          {TIMELINE.map(([year, items]) => (
            <div className="tl-year reveal" key={year}>
              <div className="yr">{year}</div>
              <div className="tl-items">
                {items.map((it) => (
                  <div className="tl-item" key={it[0]}>
                    <div className="it-t">{it[0]}</div>
                    <div className="it-m">{it[1]}</div>
                    <div className="it-d">{it[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
