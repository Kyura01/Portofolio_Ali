export type OrbitSlot = {
  x: number;
  z: number;
  scale: number;
  opacity: number;
  angle: number;
};

/**
 * Position of card `index` on a wide horizontal elliptical orbit.
 * `progress` is the (float) index of the card that should sit front-centre.
 * x spans ±rx (sideways), z spans ±rz (depth, +rz is nearest the camera).
 */
export function orbitPosition(
  index: number,
  count: number,
  progress: number,
  rx: number,
  rz: number,
): OrbitSlot {
  const angle = ((index - progress) / count) * Math.PI * 2;
  const x = Math.sin(angle) * rx;
  const z = Math.cos(angle) * rz;
  const front = (Math.cos(angle) + 1) / 2; // 1 at front, 0 at back
  return {
    x,
    z,
    angle,
    scale: 0.55 + 0.45 * front,
    opacity: front * front,
  };
}
