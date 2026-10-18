// Shared, mutable input state read every frame by the 3D scenes.
// Written by Effects (pointer + scroll); never triggers React renders.
export const pointer = {
  /** normalised cursor position, -1..1 (y up) */
  x: 0,
  y: 0,
  /** pixel position */
  px: 0,
  py: 0,
  /** smoothed scroll velocity in px/frame-ish units */
  scrollVelocity: 0,
  /** true while hovering an interactive element */
  hoveringInteractive: false,
};

/** Set by Effects so any component can scroll with the smooth-scroll engine. */
export const scrollBus: { to: (y: number) => void } = {
  to: (y) => window.scrollTo({ top: y, behavior: "smooth" }),
};

let started = false;

export function startPointerTracking(): () => void {
  if (started || typeof window === "undefined") return () => {};
  started = true;

  const onMove = (e: PointerEvent) => {
    pointer.px = e.clientX;
    pointer.py = e.clientY;
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    const t = e.target as Element | null;
    pointer.hoveringInteractive = !!t?.closest?.("a, button, [data-magnetic]");
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  return () => {
    window.removeEventListener("pointermove", onMove);
    started = false;
  };
}
