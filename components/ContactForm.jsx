'use client';

import { useState } from 'react';
import { EMAIL } from '@/lib/data';
import { User, Mail } from './Icons';

// No backend: the form opens the visitor's email app with the message prefilled.
export default function ContactForm() {
  const [note, setNote] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const n = f.elements.name.value.trim(), m = f.elements.email.value.trim();
    if (!n || !/^\S+@\S+\.\S+$/.test(m)) { setNote('Add your name and a valid email so I can reply.'); return; }
    const body = `Hi Manisha,%0D%0A%0D%0A${encodeURIComponent(f.elements.msg.value.trim() || 'I’d love to talk about a project.')}%0D%0A%0D%0A${encodeURIComponent(n)} (${encodeURIComponent(m)})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry from ' + n)}&body=${body}`;
    setNote('Your email app is opening with the message ready to send.');
  };

  return (
    <form className="cf" noValidate onSubmit={submit}>
      <label className="field"><input name="name" placeholder="Enter your name" autoComplete="name" required aria-label="Your name" /><span className="fi"><User /></span></label>
      <label className="field"><input name="email" type="email" placeholder="Enter your e-mail" autoComplete="email" required aria-label="Your email" /><span className="fi"><Mail /></span></label>
      <label className="field"><textarea name="msg" rows={2} placeholder="Tell me about your project" aria-label="Message" /></label>
      <button type="submit">Send message</button>
      <p className="note" role="status">{note}</p>
    </form>
  );
}
