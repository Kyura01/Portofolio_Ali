"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import type { Project } from "@/data/content";
import { orbitPosition } from "@/lib/orbit";
import { pointer } from "@/lib/pointer";

type Props = {
  items: Project[];
  /** float index of the card that should be front-centre (written by scroll) */
  targetRef: MutableRefObject<number>;
  onActive: (index: number) => void;
  onSelect: (index: number) => void;
  onFail: () => void;
};

const CARD_W = 3.6;
const CARD_H = 2.25;

function drawCard(ctx: CanvasRenderingContext2D, p: Project, i: number, img?: HTMLImageElement) {
  const W = 1024;
  const H = 640;
  ctx.fillStyle = "#0b0d14";
  ctx.fillRect(0, 0, W, H);
  if (img) {
    const r = Math.max(W / img.width, H / img.height);
    const w = img.width * r;
    const h = img.height * r;
    ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
  }
  const g = ctx.createLinearGradient(0, H * 0.45, 0, H);
  g.addColorStop(0, "rgba(5,6,10,0)");
  g.addColorStop(1, "rgba(5,6,10,0.92)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.font = "600 26px ui-monospace, monospace";
  ctx.fillStyle = "#ffb547";
  ctx.fillText(`0${i + 1} · ${p.period.toUpperCase()}`, 44, H - 112);
  ctx.font = "700 54px system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  const title = p.title.length > 26 ? p.title.slice(0, 25) + "…" : p.title;
  ctx.fillText(title, 44, H - 48);
}

export default function OrbitScene({ items, targetRef, onActive, onSelect, onFail }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const cbs = useRef({ onActive, onSelect, onFail });
  cbs.current = { onActive, onSelect, onFail };

  useEffect(() => {
    const el = host.current;
    if (!el || items.length === 0) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      cbs.current.onFail();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 0, 10); // z is set from the canvas size in resize()

    const n = items.length;
    const disposables: { dispose: () => void }[] = [];
    const cards: THREE.Mesh[] = [];
    const glows: THREE.Mesh[] = [];

    const cardGeo = new THREE.PlaneGeometry(CARD_W, CARD_H);
    disposables.push(cardGeo);

    items.forEach((p, i) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 640;
      const ctx = canvas.getContext("2d")!;
      drawCard(ctx, p, i);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      disposables.push(tex);

      const img = new Image();
      img.onload = () => {
        drawCard(ctx, p, i, img);
        tex.needsUpdate = true;
      };
      img.src = p.image;

      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
      disposables.push(mat);
      const card = new THREE.Mesh(cardGeo, mat);
      card.userData.index = i;

      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xffb547,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      disposables.push(glowMat);
      const glow = new THREE.Mesh(new THREE.PlaneGeometry(CARD_W + 0.12, CARD_H + 0.12), glowMat);
      disposables.push(glow.geometry);
      glow.position.z = -0.02;
      card.add(glow);

      scene.add(card);
      cards.push(card);
      glows.push(glow);
    });

    let rx = 6.5;
    const rz = 3.2;
    const TAN = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const FILL = 0.74; // share of the canvas height the front card should occupy
    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // dolly so the front card fills FILL of the canvas height, whatever the canvas size
      camera.position.z = CARD_H / FILL / (2 * TAN);
      camera.updateProjectionMatrix();
      // keep the side cards inside the visible width at their depth
      const halfW = TAN * (camera.position.z + rz) * camera.aspect;
      rx = THREE.MathUtils.clamp(halfW - CARD_W * 0.95, 3, 7);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    // click a side card to bring it to the front
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const hit = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const found = ray.intersectObjects(cards, false)[0];
      return found ? (found.object.userData.index as number) : -1;
    };
    const onClick = (e: PointerEvent) => {
      const i = hit(e);
      if (i >= 0) cbs.current.onSelect(i);
    };
    const onMove = (e: PointerEvent) => {
      renderer.domElement.style.cursor = hit(e) >= 0 ? "pointer" : "default";
    };
    renderer.domElement.addEventListener("pointerdown", onClick);
    renderer.domElement.addEventListener("pointermove", onMove);

    let disp = targetRef.current;
    let lastActive = -1;
    let raf = 0;
    const t0 = performance.now();

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;

      disp += (targetRef.current - disp) * 0.08;
      const active = THREE.MathUtils.clamp(Math.round(disp), 0, n - 1);
      if (active !== lastActive) {
        lastActive = active;
        cbs.current.onActive(active);
      }

      cards.forEach((card, i) => {
        const s = orbitPosition(i, n, disp, rx, rz);
        const front = (Math.cos(s.angle) + 1) / 2;
        card.position.set(s.x, Math.sin(t * 1.2 + i) * 0.06, s.z - rz);
        card.rotation.y = -Math.sin(s.angle) * 0.6;
        card.scale.setScalar(s.scale);
        (card.material as THREE.MeshBasicMaterial).opacity = Math.max(0.05, s.opacity);
        (glows[i].material as THREE.MeshBasicMaterial).opacity = front ** 8 * 0.5;
        card.renderOrder = Math.round(s.z * 100);
      });

      // cursor parallax
      camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -rz);

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onClick);
      renderer.domElement.removeEventListener("pointermove", onMove);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [items, targetRef]);

  return <div ref={host} className="orbit-canvas" />;
}
