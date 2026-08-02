import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { gsap, ScrollTrigger } from "../lib/gsap";

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
 * rotation and roughness are scrubbed straight off scroll position, which is
 * what keeps the 3D locked to the DOM instead of drifting alongside it.
 */
export default function HeroCanvas() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mount.current;
    if (!container) return;

    const { clientWidth: w, clientHeight: h } = container;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    // Bail out on software rasterisers (SwiftShader, llvmpipe, Basic Render
    // Driver). They take hundreds of milliseconds per frame for a scene like
    // this, which starves requestAnimationFrame — and since GSAP's ticker rides
    // on rAF, every animation on the page freezes, not just the 3D. Better to
    // show no canvas than a stalled page.
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
    camera.position.set(0, 0, 26);

    // Generated room environment: PBR reflections, zero external assets.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const geometry = new THREE.TorusKnotGeometry(1.55, 0.5, 160, 28);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#b9b3ab"),
      metalness: 1,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.28,
      envMapIntensity: 1.25,
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    // A warm rim light picks the silhouette off the near-black background.
    const rim = new THREE.DirectionalLight("#d98b4a", 2.4);
    rim.position.set(-4, 2, 3);
    scene.add(rim);

    // --- scroll drives the camera -------------------------------------------

    // Once the canvas has faded out there is nothing worth drawing, so stop.
    let visible = true;

    const scrollTl = gsap.timeline({
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
      .to(camera.position, { z: 46, y: -2, ease: "none" }, 0)
      .to(knot.rotation, { y: Math.PI * 1.1, z: Math.PI * 0.4, ease: "none" }, 0)
      .to(material, { roughness: 0.6, ease: "none" }, 0)
      // Hand the page over to the content sections rather than leaving a fixed
      // canvas sitting behind them.
      .to(container, { opacity: 0, ease: "power2.in" }, 0.45);

    // --- pointer parallax ----------------------------------------------------

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    // --- render loop ---------------------------------------------------------

    let frame = 0;
    let last = performance.now();

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!visible) return;

      pointer.x = THREE.MathUtils.lerp(pointer.x, target.x, 0.05);
      pointer.y = THREE.MathUtils.lerp(pointer.y, target.y, 0.05);

      // Idle drift keeps it alive while the page is still.
      knot.rotation.x += delta * 0.12;
      knot.position.x = pointer.x * 0.55;
      knot.position.y = -pointer.y * 0.35;

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
    };
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
      geometry.dispose();
      material.dispose();
      envRT.texture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-canvas" ref={mount} aria-hidden="true" />;
}
