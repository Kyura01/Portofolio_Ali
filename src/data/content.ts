// All site copy lives here. Replace the placeholders with real CV / LinkedIn data.

export type Project = {
  id: string;
  title: string;
  category: "real" | "exploration";
  description: string;
  tags: string[];
  image: string; // path under /public, or a data URL
  href: string;
};

export const profile = {
  name: "ALI",
  fullName: "Nama Lengkap Anda",
  role: "Software Engineer",
  tagline:
    "Membangun produk digital yang cepat, interaktif, dan enak dilihat. (placeholder)",
  email: "email@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Email", href: "mailto:email@example.com" },
  ],
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Project Satu",
    category: "real",
    description: "Deskripsi singkat proyek pertama. Ganti dengan proyek asli Anda.",
    tags: ["Next.js", "TypeScript"],
    image: "/projects/p1.svg",
    href: "#",
  },
  {
    id: "p2",
    title: "Project Dua",
    category: "real",
    description: "Deskripsi singkat proyek kedua. Ganti dengan proyek asli Anda.",
    tags: ["Python", "ML"],
    image: "/projects/p2.svg",
    href: "#",
  },
  {
    id: "p3",
    title: "Project Tiga",
    category: "exploration",
    description: "Eksperimen visual dan interaksi. Ganti dengan proyek asli Anda.",
    tags: ["Three.js", "GSAP"],
    image: "/projects/p3.svg",
    href: "#",
  },
  {
    id: "p4",
    title: "Project Empat",
    category: "real",
    description: "Deskripsi singkat proyek keempat. Ganti dengan proyek asli Anda.",
    tags: ["Mobile", "API"],
    image: "/projects/p4.svg",
    href: "#",
  },
  {
    id: "p5",
    title: "Project Lima",
    category: "exploration",
    description: "Eksperimen lain. Ganti dengan proyek asli Anda.",
    tags: ["WebGL", "Shader"],
    image: "/projects/p5.svg",
    href: "#",
  },
  {
    id: "p6",
    title: "Project Enam",
    category: "real",
    description: "Deskripsi singkat proyek keenam. Ganti dengan proyek asli Anda.",
    tags: ["Cloud", "DevOps"],
    image: "/projects/p6.svg",
    href: "#",
  },
];

export const services = [
  { title: "Web Development", text: "Situs dan aplikasi web yang cepat dan responsif." },
  { title: "Interactive 3D", text: "Pengalaman visual interaktif dengan WebGL." },
  { title: "UI Engineering", text: "Antarmuka rapi dengan animasi yang halus." },
  { title: "Consulting", text: "Arahan teknis dan review arsitektur." },
];

export const experience = [
  { period: "2024 — Sekarang", role: "Posisi Anda", org: "Perusahaan A", text: "Ringkasan tanggung jawab dan hasil." },
  { period: "2023 — 2024", role: "Posisi Sebelumnya", org: "Perusahaan B", text: "Ringkasan tanggung jawab dan hasil." },
  { period: "2022 — 2023", role: "Magang", org: "Perusahaan C", text: "Ringkasan tanggung jawab dan hasil." },
];

export const certifications = [
  { title: "Nama Sertifikasi", issuer: "Penerbit", year: "2025" },
];
