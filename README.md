# Manisha Singh — Portfolio

Personal portfolio of **Manisha Singh**, UI/UX & Digital Product Designer.

Built with **Next.js** (App Router), no other runtime dependencies. Light and dark themes follow the system setting, with a toggle that is remembered per browser.

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
  layout.js          # font, metadata, sidebar shell, theme toggle
  globals.css        # all styles and theme tokens
  page.js            # home
  works/page.js      # all work
  about/page.js      # about + experience (/about#experience)
  work/[slug]/page.js  # case study (live sites) or concept page
components/
  Sections.jsx       # shared sections: featured work, process, timeline, tools, contact…
  Sidebar.jsx        # sticky profile sidebar / mobile menu
  Carousel.jsx       # home hero project strip
  Ring.jsx           # about page draggable image ring
  PageFX.jsx         # scroll reveals, mockup tilt, timeline drawing
  ContactForm.jsx    # opens a prefilled email
lib/
  data.js            # ALL editable content
public/img/          # images
```

## Editing content

Everything lives in [`lib/data.js`](lib/data.js): `FEATURED` (launched websites, with full case studies), `CONCEPTS` (personal projects), `TIMELINE`, `SKILLS`, `TOOLS` and `MORE_BEHANCE`. Each project needs two images in `public/img/`: `<slug>_full.jpg` (wide mockup) and `<slug>_sq.jpg` (square).
