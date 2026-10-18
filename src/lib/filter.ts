import type { Project } from "@/data/content";

export type ProjectFilter = "all" | Project["category"];

export function filterProjects(list: Project[], category: ProjectFilter): Project[] {
  return category === "all" ? list : list.filter((p) => p.category === category);
}
