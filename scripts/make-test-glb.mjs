/**
 * Generates a throwaway .glb used to exercise HeroCanvas's model-loading path
 * (auto-framing, head-bone lookup, AnimationMixer). Not shipped — see README.
 *
 *   node scripts/make-test-glb.mjs public/models/avatar.glb
 */
import * as THREE from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import fs from "node:fs";
import path from "node:path";

// GLTFExporter reaches for the browser's FileReader to drain its output Blob.
// Node has Blob but not FileReader, so supply the two methods it calls.
if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        this.onloadend?.();
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = `data:${blob.type};base64,${Buffer.from(buf).toString("base64")}`;
        this.onloadend?.();
      });
    }
  };
}

const out = process.argv[2] ?? "public/models/avatar.glb";

const root = new THREE.Group();
root.name = "TestFigure";

const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#c9c3ba"),
  metalness: 0.9,
  roughness: 0.3,
});

const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.1, 8, 16), material);
body.name = "Body";
body.position.y = 0.9;
root.add(body);

// Named so HeroCanvas's /head/i lookup finds it and drives cursor tracking.
const head = new THREE.Group();
head.name = "Head";
head.position.y = 1.95;
const skull = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 20), material);
skull.name = "Skull";
head.add(skull);
root.add(head);

// A clip so the AnimationMixer branch has something to play.
const bob = new THREE.AnimationClip("idle", 2, [
  new THREE.VectorKeyframeTrack(
    `${body.name}.position`,
    [0, 1, 2],
    [0, 0.9, 0, 0, 0.98, 0, 0, 0.9, 0]
  ),
]);

new GLTFExporter().parse(
  root,
  (result) => {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, Buffer.from(result));
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    console.log(
      `wrote ${out} (${(fs.statSync(out).size / 1024).toFixed(1)} kB) ` +
        `bbox=${size.x.toFixed(2)}x${size.y.toFixed(2)}x${size.z.toFixed(2)}`
    );
  },
  (err) => {
    console.error("export failed:", err);
    process.exit(1);
  },
  { binary: true, animations: [bob] }
);
