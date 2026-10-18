import { describe, it, expect } from "vitest";
import { filterProjects } from "./filter";
import type { Project } from "@/data/content";

const make = (id: string, category: Project["category"]): Project => ({
  id,
  title: id,
  category,
  description: "",
  tags: [],
  image: "",
  role: "",
  period: "",
  client: "",
  stack: [],
  details: [],
  gallery: [],
  status: "",
});

const list = [make("a", "real"), make("b", "exploration"), make("c", "real")];

describe("filterProjects", () => {
  it("returns every project for 'all'", () => {
    expect(filterProjects(list, "all")).toHaveLength(3);
  });

  it("returns only matching category", () => {
    expect(filterProjects(list, "real").map((p) => p.id)).toEqual(["a", "c"]);
    expect(filterProjects(list, "exploration").map((p) => p.id)).toEqual(["b"]);
  });
});
