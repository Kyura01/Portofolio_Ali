"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { pointer } from "@/lib/pointer";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Interactive Orb: eyes follow the cursor, it squashes with scroll speed and perks up over buttons. */
export default function Orb() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.PointLight(0xffb547, 60, 20);
    key.position.set(3, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x7a6cff, 50, 20);
    rim.position.set(-4, -1, 3);
    scene.add(rim);

    const body = new THREE.Group();
    scene.add(body);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x10131c,
        roughness: 0.25,
        metalness: 0.6,
        emissive: 0x2a1a06,
        emissiveIntensity: 0.6,
      }),
    );
    body.add(sphere);

    // glowing halo
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.62, 48, 48),
      new THREE.MeshBasicMaterial({
        color: 0xffb547,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      }),
    );
    body.add(halo);

    // face (eyes) rides on the surface and turns toward the cursor
    const face = new THREE.Group();
    body.add(face);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffb547 });
    const eyeGeo = new THREE.CapsuleGeometry(0.1, 0.34, 8, 16);
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.5, 0.1, 1.42);
    eyeR.position.set(0.5, 0.1, 1.42);
    face.add(eyeL, eyeR);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let raf = 0;
    let blinkAt = 2;
    let blink = 0;
    let squash = 0;
    const t0 = performance.now();

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;
      const m = reduced ? 0 : 1;

      // follow the cursor
      const ty = pointer.x * 0.7 * m;
      const tx = -pointer.y * 0.45 * m;
      face.rotation.y += (ty - face.rotation.y) * 0.1;
      face.rotation.x += (tx - face.rotation.x) * 0.1;
      body.rotation.y += (ty * 0.35 - body.rotation.y) * 0.06;
      body.rotation.x += (tx * 0.35 - body.rotation.x) * 0.06;

      // idle float
      body.position.y = Math.sin(t * 1.4) * 0.08 * m;

      // squash & stretch from scroll velocity
      const v = Math.min(Math.abs(pointer.scrollVelocity) * 0.012, 0.25) * m;
      squash += (v - squash) * 0.15;
      body.scale.set(1 + squash * 0.5, 1 - squash, 1 + squash * 0.5);

      // blink
      if (t > blinkAt) {
        blink = 1;
        blinkAt = t + 2 + Math.random() * 3;
      }
      blink = Math.max(0, blink - 0.12);
      const open = 1 - Math.sin(blink * Math.PI) * 0.92;

      // excited over interactive elements
      const excited = pointer.hoveringInteractive ? 1 : 0;
      const eyeScale = 1 + excited * 0.35;
      eyeL.scale.set(eyeScale, open * eyeScale, 1);
      eyeR.scale.copy(eyeL.scale);
      eyeMat.color.setHex(excited ? 0xffffff : 0xffb547);
      halo.material.opacity += ((excited ? 0.2 : 0.08) - halo.material.opacity) * 0.1;

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
      eyeGeo.dispose();
      sphere.geometry.dispose();
      halo.geometry.dispose();
      renderer.domElement.remove();
    };
  }, [reduced]);

  if (failed) {
    return (
      <div className="orb-fallback" role="img" aria-label="Maskot Orb">
        <i /> <i />
        <style>{`
          .orb-fallback { width: 100%; aspect-ratio: 1; border-radius: 50%; display: flex; gap: 14%;
            align-items: center; justify-content: center; background: radial-gradient(circle at 30% 30%, #1c2230, #07080d);
            box-shadow: 0 0 60px rgba(255,181,71,.25); }
          .orb-fallback i { width: 8%; height: 22%; border-radius: 99px; background: #ffb547; }
        `}</style>
      </div>
    );
  }

  return <div ref={host} className="orb" role="img" aria-label="Maskot Orb interaktif" />;
}
