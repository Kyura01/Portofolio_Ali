import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { experience, projects } from "./content";

const pub = (p: string) => join(process.cwd(), "public", p);

describe("content", () => {
  it("has unique project ids", () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
  });

  it("fills every project's required fields", () => {
    for (const p of projects) {
      expect(["real", "exploration"]).toContain(p.category);
      for (const field of [p.title, p.description, p.role, p.period, p.client, p.status]) {
        expect(field.trim(), `${p.id} has an empty text field`).not.toBe("");
      }
      expect(p.stack.length, `${p.id} stack`).toBeGreaterThan(0);
      expect(p.details.length, `${p.id} details`).toBeGreaterThan(0);
    }
  });

  it("points every project image at a file that exists", () => {
    for (const p of projects) {
      for (const img of [p.image, ...p.gallery]) {
        expect(existsSync(pub(img)), `${p.id}: missing ${img}`).toBe(true);
      }
    }
  });

  it("gives every experience item at least one bullet", () => {
    for (const e of experience) expect(e.bullets.length, e.role).toBeGreaterThan(0);
  });
});
