# Manisha Singh — Portfolio

Personal portfolio of **Manisha Singh**, Product Designer × AI Creative.

Built with **Next.js** (App Router). Three.js and GSAP are installed from npm and lazy-loaded on the client.

## Run locally

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/
  layout.js        # fonts (next/font), metadata, global CSS
  page.js          # composes all sections
  globals.css      # full design system / styles
components/        # one component per section + effects
  Hero.jsx         # WebGL sphere, intro timeline, portrait motion
  Work.jsx         # projects grid + case-study overlay
  About.jsx        # pinned scroll "identity" experience
  SmoothScroll.jsx # lerped virtual scrolling (desktop)
  ...
lib/
  data.js          # ALL editable content (projects, process, tools, timeline…)
  mocks.js         # drawn browser/dashboard mock fallbacks
  fx.js            # shared scroll/motion state
public/images/     # portrait + project screenshots
```

## Editing content

Projects, process steps, AI tools, timeline, skills and lab experiments all live in [`lib/data.js`](lib/data.js) (`PROJECTS`, `PROCESS`, `AI_FLOW`, `AI_TOOLS`, `DNA`, `TIMELINE`, `KIN`, `LAB`). To add a project screenshot, drop a `.jpg` in `public/images/` and add its key to `SHOTS` in `lib/mocks.js` — projects without one get a drawn mockup automatically.

## Tech

Next.js • React • Three.js • GSAP • Canvas 2D
