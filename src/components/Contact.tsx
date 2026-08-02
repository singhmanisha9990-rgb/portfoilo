import { site } from "../data/site";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div>
        <p className="eyebrow">CONTACT</p>
        <h2 data-reveal>Let's talk</h2>
        <a className="contact-mail" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </div>
      <div className="footer">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <div className="footer-links">
          {site.links.map((link) => (
            <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
