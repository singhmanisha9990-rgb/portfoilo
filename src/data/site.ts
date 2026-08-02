/**
 * Everything you need to personalise lives here. Edit this file, not the
 * components.
 */
export const site = {
  name: "Himanshu",
  // Rendered as "FIRST / LAST" in the hero; the second line takes the accent.
  first: "Himanshu",
  last: "Singh",
  mark: "H.",
  role: "Creative Developer",
  intro: "Hello — I'm",
  blurb:
    "I build interfaces that move. Front-end engineering with a bias toward motion, 3D, and the details people feel but never name.",
  // Segments let you accent a phrase without hardcoding markup in the component.
  about: [
    { text: "I'm a developer who cares about " },
    { text: "how software feels", accent: true },
    {
      text:
        ". Most of my work sits where engineering meets motion design — WebGL, " +
        "scroll choreography, and interfaces that respond like physical objects.",
    },
  ],
  email: "you@example.com",
  links: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/in/" },
    { label: "Twitter", href: "https://x.com/" },
  ],
  projects: [
    { title: "Project One", meta: "React · WebGL", year: "2026", href: "#" },
    { title: "Project Two", meta: "TypeScript · GSAP", year: "2025", href: "#" },
    { title: "Project Three", meta: "Next.js · Three.js", year: "2025", href: "#" },
    { title: "Project Four", meta: "Node · Postgres", year: "2024", href: "#" },
  ],
};
