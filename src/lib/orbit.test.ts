import { describe, it, expect } from "vitest";
import { orbitPosition } from "./orbit";

const RX = 10;
const RZ = 4;

describe("orbitPosition", () => {
  it("puts the active card front-centre at full scale", () => {
    const p = orbitPosition(2, 6, 2, RX, RZ);
    expect(p.x).toBeCloseTo(0);
    expect(p.z).toBeCloseTo(RZ);
    expect(p.scale).toBeCloseTo(1);
    expect(p.opacity).toBeCloseTo(1);
  });

  it("spreads neighbours sideways and shrinks them", () => {
    const right = orbitPosition(3, 6, 2, RX, RZ);
    const left = orbitPosition(1, 6, 2, RX, RZ);
    expect(Math.abs(right.x)).toBeGreaterThan(1);
    expect(right.scale).toBeLessThan(1);
    expect(right.opacity).toBeLessThan(1);
    expect(right.z).toBeLessThan(RZ);
    expect(left.x).toBeCloseTo(-right.x);
    expect(left.scale).toBeCloseTo(right.scale);
  });

  it("wraps around the ring", () => {
    const a = orbitPosition(0, 6, 5, RX, RZ);
    const b = orbitPosition(0, 6, -1, RX, RZ);
    expect(a.x).toBeCloseTo(b.x);
    expect(a.z).toBeCloseTo(b.z);
  });

  it("places the opposite card at the back", () => {
    const back = orbitPosition(5, 6, 2, RX, RZ);
    expect(back.z).toBeCloseTo(-RZ);
    expect(back.opacity).toBeLessThan(0.5);
  });
});
