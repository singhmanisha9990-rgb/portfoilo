# Portfolio

A personal portfolio site built with Vite, React, TypeScript, three.js and GSAP.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle
npm run preview  # serve the built output
```

## Personalising it

Edit [`src/data/site.ts`](src/data/site.ts) — name, blurb, about copy, projects,
email and social links all live there. The components read from it, so content
changes shouldn't require touching JSX.

Colours and the type scale are CSS custom properties at the top of
[`src/index.css`](src/index.css):

```css
--bg: #08080a;      --fg: #f2efe9;
--muted: #7d7872;   --accent: #d98b4a;
--display: clamp(3rem, 11vw, 11rem);
```

## How it works

**Smooth scrolling.** [`useSmoothScroll`](src/hooks/useSmoothScroll.ts) creates a
GSAP `ScrollSmoother` over the `#smooth-wrapper` / `#smooth-content` pair in
`App.tsx`. Those two must stay adjacent with nothing between them.

**Text reveals.** [`useSplitReveal`](src/hooks/useSplitReveal.ts) finds every
`[data-reveal]` element, splits it into characters with `SplitText`, and staggers
them up from behind a line mask.

```tsx
<h1 data-reveal="load">…</h1>   {/* animates immediately */}
<h2 data-reveal>…</h2>          {/* animates when scrolled into view */}
```

It waits on `document.fonts.ready` first — splitting against the fallback face
measures the wrong line breaks, which puts the masks in the wrong places.

**The 3D hero.** [`HeroCanvas.tsx`](src/components/HeroCanvas.tsx) is plain
three.js, no React Three Fiber. Two decisions do most of the visual work:

- **A 14.5° field of view.** Three's default is 50°, and its wide-angle
  distortion is most of what makes hobby WebGL read as hobby WebGL. A telephoto
  lens flattens perspective the way a product photograph does.
- **ACES filmic tone mapping over a generated PMREM environment.** Metal needs
  something to reflect; `RoomEnvironment` supplies it without shipping an HDR
  file.

Scroll doesn't play a timeline — it *is* the timeline. Camera distance, mesh
rotation and material roughness are scrubbed directly off scroll position, which
is what keeps the 3D locked to the DOM instead of drifting alongside it.

The canvas renders in `App.tsx` **outside** `#smooth-content`, deliberately.
ScrollSmoother transforms that element, and a transformed ancestor becomes the
containing block for `position: fixed` — so a fixed child would scroll with it
instead of staying put.

## Notes

- GSAP 3.13+ ships `ScrollSmoother` and `SplitText` in the public package. Import
  from `gsap/*`; the old `gsap-trial` packages and GreenSock's private registry
  aren't needed.
- Both hooks no-op under `prefers-reduced-motion` — scroll hijacking is exactly
  what that preference asks you not to do.
- The render loop halts once the canvas has faded out, rather than drawing frames
  nobody sees.
- three.js loads as a lazy chunk so the headline paints before WebGL arrives.
- **The canvas disables itself on software rasterisers** (SwiftShader, llvmpipe,
  Basic Render Driver). This one is worth understanding: software WebGL needs
  hundreds of milliseconds per frame for this scene, which starves
  `requestAnimationFrame`. GSAP's ticker rides on rAF, so *every* animation on
  the page freezes — text reveals included — not just the 3D. The page ends up
  looking broken rather than slow. Detecting the renderer and skipping the canvas
  degrades to a clean typographic hero instead.

  Measured here: ~60fps with the canvas on a real GPU, versus 3 frames in 2.5s
  under SwiftShader. If you ever debug this in headless Chrome, know that headless
  defaults to SwiftShader — so the guard will trip and you will see no 3D. That is
  correct behaviour, not a bug.

## Swapping the torus knot for a character

**No code change needed.** Drop a `.glb` at `public/models/avatar.glb` and it
replaces the knot on next load. Absent or invalid, the knot is used instead.

What you get for free when a model is present:

- **Auto-framing.** The model's bounding box is measured, recentred on the
  origin, and the camera distance solved so it fills ~72% of frame height. Any
  scale of model lands composed — no hand-tuned camera numbers.
- **Cursor tracking.** The first node matching `/head/i` (Ready Player Me and
  Mixamo both name it `Head`) turns toward the pointer instead of the whole
  object tumbling.
- **Animation.** Every clip in the file is played through an `AnimationMixer`.
- **Draco.** Compressed models work out of the box. `DRACOLoader` is imported
  dynamically and three resolves its own decoder URLs, so the ~1.3MB of wasm
  never enters the network graph unless a model is actually present — and there
  is no hand-copied decoder in `public/` to drift out of sync with three.

To make one:

1. Export a rigged avatar — [Ready Player Me](https://readyplayer.me) does free
   ones — and retarget [Mixamo](https://mixamo.com) animations in Blender.
2. Compress it: `npx @gltf-transform/cli optimize in.glb out.glb --draco`.

Keep the camera FOV and tone mapping as they are — they matter more to the final
look than the model does.

### Testing that path without an avatar

`scripts/make-test-glb.mjs` generates a throwaway figure (capsule body, sphere
head named `Head`, one idle clip) to exercise loading, auto-framing, head
tracking and the mixer:

```bash
node scripts/make-test-glb.mjs public/models/avatar.glb   # knot -> figure
rm public/models/avatar.glb                               # back to the knot
```

Note that the loader validates the GLB **magic number**, not the HTTP status.
Vite's dev server — and Netlify, Vercel rewrites and GitHub Pages — answer
unknown paths with `200` plus `index.html`, so a status check alone would hand
HTML to the parser and throw on every load.

## Licence

MIT — see [LICENSE](LICENSE).
