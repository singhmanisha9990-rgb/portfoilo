export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="contact-glow" />
      <div className="wrap">
        <h2 className="contact-h">
          <span className="line-mask"><span>Let's make</span></span>
          <span className="line-mask"><span>something</span></span>
          <span className="line-mask"><span>worth remembering<span className="stop">.</span></span></span>
        </h2>
        <p className="contact-sub reveal">
          Have a product, idea or digital experience in mind? Let's build something meaningful.
        </p>
        <div className="contact-cta reveal">
          <a
            href="mailto:manisha.singh@gmail.com?subject=Let's%20start%20a%20project"
            className="btn btn-primary mag"
            data-cursor="open"
          >
            Start a project →
          </a>
        </div>
        <div className="contact-links reveal">
          <a href="https://www.behance.net/manishasingh99" target="_blank" rel="noopener" data-cursor="open">Behance ↗</a>
          <a href="https://www.linkedin.com/in/maniisha-singh" target="_blank" rel="noopener" data-cursor="open">LinkedIn ↗</a>
          <a href="mailto:manisha.singh@gmail.com" data-cursor="open">Email ↗</a>
        </div>
        <div className="contact-mail">manisha.singh@gmail.com &nbsp;·&nbsp; +91 98730 65723</div>
      </div>
    </section>
  );
}
