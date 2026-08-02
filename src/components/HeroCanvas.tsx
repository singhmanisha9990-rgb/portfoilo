import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Path to an optional hero model. Drop a (optionally Draco-compressed) .glb
 * here and it replaces the fallback torus knot automatically — no code change.
 * Absent or unreadable, the knot is used instead.
 */
const MODEL_URL = "/models/avatar.glb";

/** Fraction of the frame height the hero object should occupy at rest. */
const FILL = 0.72;

/**
 * How far right to push the object, as a fraction of frame width, so it clears
 * the copy column. Centred art behind grey body text is unreadable; on narrow
 * screens the copy sits over it anyway, so the shift only applies to desktop.
 */
const SHIFT = 0.17;
const SHIFT_MIN_WIDTH = 1024;

/**
 * The hero object. Two things do the heavy lifting visually:
 *
 *  1. A 14.5deg field of view. Three's default is 50deg, whose wide-angle
 *     distortion is most of what makes hobby WebGL read as hobby WebGL. A
 *     telephoto lens flattens perspective the way a product shot does.
 *  2. ACES filmic tone mapping over a generated PMREM environment, so metal has
 *     something real to reflect without shipping an HDR file.
 *
 * Scroll does not play a timeline here — it *is* the timeline. Camera distance,
 * rotation and material are scrubbed straight off scroll position, which is what
 * keeps the 3D locked to the DOM instead of drifting alongside it.
 */
export default function HeroCanvas() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mount.current;
    if (!container) return;

    const { clientWidth: w, clientHeight: h } = container;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    // Bail out on software rasterisers (SwiftShader, llvmpipe, Basic Render
    // Driver). They need hundreds of milliseconds per frame for a scene like
    // this, which starves requestAnimationFrame — and since GSAP's ticker rides
    // on rAF, every animation on the page freezes, not just the 3D. Showing no
    // canvas is better than showing a stalled page.
    const gl = renderer.getContext();
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const gpuName = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      : "";
    if (/swiftshader|llvmpipe|software|basic render/i.test(gpuName)) {
      renderer.dispose();
      return;
    }

    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(14.5, w / h, 0.1, 100);

    // Generated room environment: PBR reflections, zero external assets.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    // A warm rim light picks the silhouette off the near-black background.
    const rim = new THREE.DirectionalLight("#d98b4a", 2.4);
    rim.position.set(-4, 2, 3);
    scene.add(rim);

    // A stable pivot means the scroll timeline has one rotation target, whether
    // the child ends up being the loaded model or the fallback knot.
    const pivot = new THREE.Group();
    scene.add(pivot);

    let disposed = false;
    let frame = 0;
    let mixer: THREE.AnimationMixer | null = null;
    let headBone: THREE.Object3D | null = null;
    let scrollTl: gsap.core.Timeline | null = null;
    const trash: Array<{ dispose(): void }> = [];

    /** Resolves to the GLTF, or null when there is no usable model. */
    const loadModel = async (): Promise<GLTF | null> => {
      // Fetched by hand rather than via loader.loadAsync so that a missing
      // model — the default state of this repo — is one request and a quiet
      // null, instead of a probe plus a load plus a console error.
      let buffer: ArrayBuffer;
      try {
        const response = await fetch(MODEL_URL);
        if (!response.ok) return null;
        buffer = await response.arrayBuffer();
      } catch {
        return null;
      }

      // A 200 does not mean we got a model. Vite's dev server — and Netlify,
      // Vercel rewrites and GitHub Pages in production — answer any unknown
      // path with 200 plus index.html. Trust the GLB magic number ("glTF")
      // rather than the status code, or the parser gets fed HTML and throws.
      if (buffer.byteLength < 12) return null;
      if (new DataView(buffer).getUint32(0, false) !== 0x676c5446) return null;

      // Imported here rather than at module scope so the Draco decoder (~1.3MB
      // of wasm and glue) only enters the network graph once a model actually
      // exists. three resolves its own decoder URLs via import.meta.url, so the
      // bundler hashes and serves them — no manual copy into public/ required,
      // and no chance of the decoder drifting out of sync with three.
      const { DRACOLoader } = await import("three/addons/loaders/DRACOLoader.js");
      const loader = new GLTFLoader();
      const draco = new DRACOLoader();
      loader.setDRACOLoader(draco);
      try {
        // Second argument is the base path used to resolve any external
        // textures the .glb refers to.
        return await loader.parseAsync(buffer, "/models/");
      } catch (err) {
        console.warn(`[hero] ${MODEL_URL} could not be parsed, using fallback`, err);
        return null;
      } finally {
        draco.dispose();
      }
    };

    const buildFallback = () => {
      const geometry = new THREE.TorusKnotGeometry(1.55, 0.5, 160, 28);
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#b9b3ab"),
        metalness: 1,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.28,
        envMapIntensity: 1.25,
      });
      trash.push(geometry, material);
      pivot.add(new THREE.Mesh(geometry, material));
      return material;
    };

    let baseDistance = 0;
    let shiftX = 0;

    /** World-space x offset that lands the object clear of the copy column. */
    const recomputeShift = () => {
      if (!baseDistance || window.innerWidth < SHIFT_MIN_WIDTH) {
        shiftX = 0;
        return;
      }
      const vFov = (camera.fov * Math.PI) / 180;
      const frameWidth = 2 * baseDistance * Math.tan(vFov / 2) * camera.aspect;
      shiftX = frameWidth * SHIFT;
    };

    /**
     * Centres the pivot's contents on the origin and returns the camera distance
     * that makes them fill FILL of the frame. Auto-framing means an arbitrary
     * .glb lands composed instead of needing hand-tuned camera numbers.
     */
    const frameContents = () => {
      const box = new THREE.Box3().setFromObject(pivot);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      pivot.children.forEach((child) => child.position.sub(centre));

      const vFov = (camera.fov * Math.PI) / 180;
      const spread = Math.max(size.y, size.x / camera.aspect) || 1;
      return spread / FILL / (2 * Math.tan(vFov / 2));
    };

    (async () => {
      const gltf = await loadModel();
      if (disposed) return;

      let fallbackMaterial: THREE.MeshPhysicalMaterial | null = null;

      if (gltf) {
        pivot.add(gltf.scene);
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = child.receiveShadow = true;
          }
          // Ready Player Me and Mixamo rigs both name the head bone "Head".
          if (/head/i.test(child.name) && !headBone) headBone = child;
        });
        if (gltf.animations.length) {
          mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => mixer!.clipAction(clip).play());
        }
      } else {
        fallbackMaterial = buildFallback();
      }

      const base = frameContents();
      camera.position.set(0, 0, base);
      camera.updateProjectionMatrix();
      baseDistance = base;
      recomputeShift();

      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            visible = Number(gsap.getProperty(container, "opacity")) > 0.01;
          },
        },
      });
      scrollTl
        .to(camera.position, { z: base * 1.75, y: -base * 0.08, ease: "none" }, 0)
        .to(pivot.rotation, { y: Math.PI * 1.1, z: Math.PI * 0.4, ease: "none" }, 0)
        // Hand the page over to the content sections rather than leaving a fixed
        // canvas sitting behind them.
        .to(container, { opacity: 0, ease: "power2.in" }, 0.45);

      // Only meaningful for the knot; a loaded model brings its own materials.
      if (fallbackMaterial) {
        scrollTl.to(fallbackMaterial, { roughness: 0.6, ease: "none" }, 0);
      }

      ScrollTrigger.refresh();
    })();

    // --- pointer parallax ----------------------------------------------------

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let visible = true;

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    // --- render loop ---------------------------------------------------------

    let last = performance.now();

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!visible) return;

      pointer.x = THREE.MathUtils.lerp(pointer.x, target.x, 0.05);
      pointer.y = THREE.MathUtils.lerp(pointer.y, target.y, 0.05);

      if (headBone) {
        // Let a rigged model glance at the cursor instead of spinning.
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, pointer.x * 0.3, 0.1);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, pointer.y * 0.2, 0.1);
      } else {
        // Idle drift keeps the abstract fallback alive while the page is still.
        pivot.rotation.x += delta * 0.12;
      }

      pivot.position.x = shiftX + pointer.x * 0.55;
      pivot.position.y = -pointer.y * 0.35;

      mixer?.update(delta);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);

    // --- resize --------------------------------------------------------------

    // Named handler, so removeEventListener can actually find it. Passing a
    // fresh arrow function to remove is a no-op that leaks the listener.
    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      recomputeShift();
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      mixer?.stopAllAction();
      scrollTl?.scrollTrigger?.kill();
      scrollTl?.kill();
      trash.forEach((item) => item.dispose());
      envRT.texture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-canvas" ref={mount} aria-hidden="true" />;
}
