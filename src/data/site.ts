/**
 * Everything you need to personalise lives here. Edit this file, not the
 * components.
 */
export const site = {
  name: "Manisha Singh",
  // Rendered as two lines in the hero; the second takes the accent colour.
  first: "Manisha",
  last: "Singh",
  mark: "M.",
  role: "UI/UX Designer",
  intro: "Hello — I'm",
  blurb:
    "I design responsive, accessible interfaces for web and mobile — from " +
    "research and wireframes through to prototypes that feel inevitable.",

  // Segments let you accent a phrase without hardcoding markup in the component.
  about: [
    { text: "I'm a UI/UX designer who cares about " },
    { text: "how an interface feels to use", accent: true },
    {
      text:
        ", not just how it looks. My work runs from user research and " +
        "information architecture through to high-fidelity prototypes — with " +
        "usability testing and WCAG accessibility treated as part of the " +
        "design, rather than a pass at the end.",
    },
  ],

  email: "manisha.singh@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/maniisha-singh" },
    { label: "Behance", href: "https://behance.net/manishasingh99" },
  ],

  projects: [
    {
      title: "Hospital Dashboard",
      note: "Patient scheduling, analytics and real-time updates, designed with clinical staff and tested with medical professionals.",
      meta: "Figma · Prototyping",
      year: "2024",
      href: "#",
    },
    {
      title: "Music Website",
      note: "A streaming platform with personalized recommendations, built out in Framer for smooth transitions and micro-interactions.",
      meta: "Figma · Framer",
      year: "2025",
      href: "#",
    },
    {
      title: "YouTube Music UX Redesign",
      note: "Navigation and search reworked around journey maps, with a simplified visual hierarchy and accessibility improvements.",
      meta: "UX Research · Wireframing",
      year: "2025",
      href: "#",
    },
    {
      title: "Language Learning App",
      note: "Cross-platform app with gamified lessons; onboarding reshaped through usability testing to improve retention.",
      meta: "Figma · Freelance",
      year: "2025",
      href: "#",
    },
    {
      title: "Email Design Project",
      note: "Responsive templates with A/B tested subject lines, visuals and CTAs, plus guidelines to keep campaigns consistent.",
      meta: "Figma · Canva",
      year: "2025",
      href: "#",
    },
  ],

  toolkit: [
    {
      group: "Design",
      items: ["Wireframing", "Prototyping", "Interaction Design", "Responsive Design"],
    },
    {
      group: "Research",
      items: ["User Research", "Usability Testing", "Competitive Analysis", "UX Laws"],
    },
    {
      group: "Method",
      items: ["Design Thinking", "Information Architecture", "Agile UX", "Accessibility (WCAG)"],
    },
    {
      group: "Tools",
      items: ["Figma", "Framer", "Protopie", "Spline", "Miro", "Adobe XD", "Photoshop", "Illustrator"],
    },
  ],

  background: [
    { label: "B.Com., Satyawati College, University of Delhi", meta: "2021 – 2024" },
    { label: "UI/UX Design Certification, Dice Academy", meta: "Certification" },
    { label: "Freelance UI/UX Designer — Language Learning App", meta: "2025" },
  ],
};
