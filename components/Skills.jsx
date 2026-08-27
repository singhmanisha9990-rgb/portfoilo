import { KIN } from '@/lib/data';

// kinetic-type letters pre-split with staggered transition delays
// (was done imperatively in the WOW pass)
function Letters({ text }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="kl" style={{ transitionDelay: `${i * 22}ms` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="reveal">The toolkit</h2>
          <span className="n reveal">— Hover a verb</span>
        </div>
      </div>
      <div className="kin">
        {KIN.map(([verb, tools]) => (
          <div className="kin-row" data-cursor="explore" key={verb}>
            <span className="kw"><Letters text={verb} /></span>
            <div className="tools">
              {tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
