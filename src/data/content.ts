// All site copy lives here. Sources: CV, Apple Developer Academy portfolio deck and LinkedIn profile.

export type Project = {
  id: string;
  title: string;
  category: "real" | "exploration";
  description: string; // one-liner shown on cards and in the orbit info panel
  tags: string[]; // short chips for cards
  image: string; // path under /public, or a data URL
  role: string;
  period: string;
  client: string;
  stack: string[];
  details: string[]; // bullet points shown in the detail modal
  gallery: string[]; // extra images under /public/projects/<id>/
  status: string; // repository / hosting status
};

export type ExperienceCategory = "work" | "teaching" | "organization" | "certification";

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  category: ExperienceCategory;
  bullets: string[]; // teaching items render only the first bullet, as a compact row
};

export const profile = {
  name: "ALI",
  fullName: "Ahmad Ali Mukti",
  role: "Software Engineer",
  subtitle: "Web & Mobile Developer",
  tagline:
    "AI enthusiast building robust web and mobile platforms, scalable backends and IoT data pipelines.",
  about:
    "I'm an Informatics Engineering student at Institut Teknologi Sumatera who builds end-to-end platforms: web and mobile apps with Laravel, Kotlin and Flutter, smart farming and GIS powered by MQTT. I'm now exploring Artificial Intelligence and computer vision, and I thrive in fast-paced, collaborative environments with active experience in mentoring and organizational leadership.",
  email: "alimukti1140@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ahmad-ali-mukti/" },
    { label: "Instagram", href: "https://www.instagram.com/ahmadali.m1/" },
    { label: "Email", href: "mailto:alimukti1140@gmail.com" },
  ],
};

export const education = {
  school: "Institut Teknologi Sumatera",
  program: "Informatics Engineering",
  period: "Aug 2023 – Present",
};

export const projects: Project[] = [
  {
    id: "batang-hari-ogan",
    title: "Village Website — Batang Hari Ogan",
    category: "real",
    description:
      "Official digital platform for Batang Hari Ogan Village, built with HMIF ITERA for the village government.",
    tags: ["Laravel", "Express.js", "RBAC"],
    image: "/projects/batang-hari-ogan/thumb.jpg",
    role: "Backend Developer",
    period: "Sep 2025 – Jan 2026",
    client: "Batang Hari Ogan Village Government, South Lampung",
    stack: ["Laravel", "Express.js", "RESTful API", "RBAC", "VPS"],
    details: [
      "Built the core server-side logic and database architecture that securely manages village data, public services and community engagement features.",
      "Implemented Role-Based Access Control and managed relational databases for the demographic and administrative data of 1,000+ villagers.",
      "Deployed and configured the server (VPS/hosting) and kept the village information system stable through regular troubleshooting.",
      "Contributed to the responsive frontend and integrated it with the backend APIs.",
      "Worked closely with the village government and the HMIF Technopreneur Division to match backend modules and workflows to real bureaucratic needs.",
    ],
    gallery: [
      "/projects/batang-hari-ogan/cover.jpg",
    ],
    status: "Client project for a government body",
  },
  {
    id: "simta",
    title: "SIMTA — Final Project System",
    category: "real",
    description:
      "Paid platform for the Mathematics department that digitizes the whole final-project lifecycle, from proposal to comprehensive exam.",
    tags: ["Laravel Blade", "Tailwind", "Paid"],
    image: "/projects/simta/thumb.jpg",
    role: "Frontend Developer · team of 4",
    period: "Jan – Apr 2026",
    client: "Mathematics Study Program, Institut Teknologi Sumatera",
    stack: ["Laravel Blade", "Tailwind CSS", "JavaScript"],
    details: [
      "Engineered dynamic interfaces for multi-level document approvals.",
      "Built rubric-driven exam scoring screens.",
      "Designed a context-switching dashboard for professors.",
      "Built responsive interfaces and integrated backend APIs for the final-project administration of hundreds of students.",
      "Optimized interface performance and cross-device compatibility.",
    ],
    gallery: [
      "/projects/simta/cover.jpg",
      "/projects/simta/shot-1.jpg",
      "/projects/simta/shot-2.jpg",
      "/projects/simta/shot-3.jpg",
    ],
    status: "Private repository · 90% complete, in final department review, not yet hosted",
  },
  {
    id: "pplk-itera-2025",
    title: "Website PPLK ITERA 2025",
    category: "real",
    description:
      "Central hub of ITERA's annual student orientation program: registration, participant data and daily agenda for 5,000+ users.",
    tags: ["Laravel", "MySQL", "5,000+ users"],
    image: "/projects/pplk-itera-2025/thumb.jpg",
    role: "Staff, Backend Developer",
    period: "May – Aug 2025",
    client: "PPLK ITERA campus committee",
    stack: ["Laravel", "MySQL", "RBAC", "Load balancing"],
    details: [
      "Co-developed the server-side logic for user authentication, participant data handling and dynamic content publishing.",
      "Served 5,000+ active users registering and tracking their daily agenda, with zero downtime.",
      "Applied application-level load balancing to keep the server stable during peak registration periods.",
      "Built a Role-Based Access Control system with the right access rights for each user type.",
    ],
    gallery: [
      "/projects/pplk-itera-2025/cover.jpg",
      "/projects/pplk-itera-2025/shot-1.jpg",
      "/projects/pplk-itera-2025/shot-2.jpg",
      "/projects/pplk-itera-2025/shot-3.jpg",
    ],
    status: "Offline — the 2025 edition has ended",
  },
  {
    id: "drone-flight-path",
    title: "Drone Flight Path Reconstruction",
    category: "real",
    description:
      "Rebuilds drone routes from SRT telemetry on an interactive map and reports covered distance and surveyed area.",
    tags: ["Laravel", "Flask", "Leaflet"],
    image: "/projects/drone-flight-path/thumb.jpg",
    role: "Fullstack Developer (Internship)",
    period: "Jul – Aug 2026",
    client: "PT Great Giant Pineapple",
    stack: ["Laravel", "Flask", "Leaflet", "SRT telemetry", "YOLO pipeline"],
    details: [
      "Built a Laravel-based .srt processing module for the Ai Banana Girth website that extracts drone telemetry, integrated with the YOLO video pipeline.",
      "Reconstructed flight-path trajectories from SRT log coordinates and displayed them on an interactive web map.",
      "Reports covered distance and surveyed area so the plantation team can verify coverage without replaying footage.",
      "Engineered the Flask backend microservice that processes the geospatial data alongside the existing Laravel platform.",
      "Also annotated 1,500+ banana stem images for the girth-measurement and tree-counting dataset.",
    ],
    gallery: [
      "/projects/drone-flight-path/cover.jpg",
      "/projects/drone-flight-path/shot-1.jpg",
      "/projects/drone-flight-path/shot-2.jpg",
      "/projects/drone-flight-path/shot-3.jpg",
    ],
    status: "Private — company-owned repository",
  },
  {
    id: "iterahero",
    title: "ITERAHERO App",
    category: "exploration",
    description:
      "Centralized smart greenhouse platform unifying sensor telemetry and AI plant classification in one real-time dashboard.",
    tags: ["Laravel", "MQTT", "Kotlin"],
    image: "/projects/iterahero/thumb.jpg",
    role: "Team Lead · Backend Developer",
    period: "Feb – Jul 2026",
    client: "MBKM Research Program · Kelompok Tani Agro Lestari",
    stack: ["Laravel", "MQTT", "Kotlin", "PostgreSQL", "YOLO"],
    details: [
      "Led the informatics team of the ITERAHERO MBKM research program.",
      "Built the backend architecture and configured the MQTT server connections for real-time smart greenhouse data.",
      "Integrated hardware subsystems from the electrical, biosystems and automation engineering teams into one monitoring platform.",
      "Implemented a YOLO-based plant health classifier with 86% accuracy, being optimized to speed up land-condition diagnosis.",
      "Researched IoT remote monitoring that reduced manual inspection time at partner farms.",
    ],
    gallery: [
      "/projects/iterahero/cover.jpg",
    ],
    status: "Private repository",
  },
  {
    id: "nuve",
    title: "Nuve — AI Fashion Recommendation",
    category: "exploration",
    description:
      "AI-driven web platform that curates complete casual outfit suggestions from age, location, occupation and budget.",
    tags: ["Express.js", "Firebase", "REST API"],
    image: "/projects/nuve/thumb.jpg",
    role: "Backend Developer · two-person backend team",
    period: "Sep – Nov 2025",
    client: "Nuve",
    stack: ["Express.js", "Firebase", "RESTful API"],
    details: [
      "Developed RESTful APIs that capture user inputs from the frontend and pass them securely to the AI recommendation engine.",
      "Designed the Firebase database structure for diverse clothing catalogs with fast, efficient retrieval.",
      "Built secure CRUD endpoints for the admin CMS to manage products, categories and pricing.",
      "Kept data flowing between the interface, the recommendation logic and the database.",
    ],
    gallery: [
      "/projects/nuve/cover.jpg",
      "/projects/nuve/shot-1.jpg",
      "/projects/nuve/shot-2.jpg",
    ],
    status: "Private repository",
  },
];

export const skills = [
  { title: "Backend", items: ["Laravel", "Express.js", "RESTful API", "RBAC", "Server architecture"] },
  { title: "Frontend", items: ["React.js", "HTML/CSS", "Responsive design", "UI implementation", "API integration"] },
  { title: "Languages", items: ["PHP", "JavaScript", "Python", "Kotlin", "C++"] },
  { title: "Data & AI", items: ["Computer vision", "YOLO", "Image annotation", "Dataset preparation"] },
  { title: "Database & Infra", items: ["PostgreSQL", "MySQL", "Google Cloud", "Docker", "Load balancing"] },
  { title: "Tools", items: ["Git/GitHub", "VS Code", "Postman", "Google Workspace", "MQTT"] },
];

// Newest first. Teaching items render only their first bullet, as a compact row.
export const experience: ExperienceItem[] = [
  {
    period: "Aug – Dec 2025 · Aug 2026 – Present",
    role: "Lab Assistant, Programming",
    org: "Institut Teknologi Sumatera",
    category: "teaching",
    bullets: [
      "Runs intensive 5-hour C++ lab sessions: control logic, arrays and structs, recursion, searching and sorting, with code reviews to train debugging.",
    ],
  },
  {
    period: "Jul – Aug 2026",
    role: "Software Engineer & Data Annotator Intern",
    org: "Great Giant Pineapple",
    category: "work",
    bullets: [
      "Annotated 1,500+ banana stem images for a computer-vision girth-measurement and tree-counting dataset.",
      "Built a Laravel .srt processing module for the Ai Banana Girth website, integrated with the YOLO video pipeline.",
      "Built an interactive map that reconstructs drone flight paths from SRT coordinates.",
    ],
  },
  {
    period: "Mar 2026 – Present",
    role: "Teaching Assistant, Fundamentals of Software Engineering",
    org: "Institut Teknologi Sumatera",
    category: "teaching",
    bullets: [
      "Mentors 64 students through requirements engineering and guides 10 project groups on stakeholders and SRS documents.",
    ],
  },
  {
    period: "Feb 2026 – Present",
    role: "Senior Staff, Technopreneur Division",
    org: "HMIF ITERA",
    category: "organization",
    bullets: [
      "Evaluates and gives strategic direction to 3+ main division programs and prepares risk-mitigation plans.",
      "Monitors project lifecycles and keeps communication smooth among stakeholders.",
    ],
  },
  {
    period: "Feb – Jul 2026",
    role: "Research Intern",
    org: "Kelompok Tani Agro Lestari",
    category: "work",
    bullets: [
      "Built the backend architecture for the ITERAHERO app and configured MQTT connections for a real-time smart greenhouse.",
      "Implemented a YOLO-based plant health classifier with 86% accuracy.",
      "Researched IoT remote monitoring that reduced manual inspection time at partner farms.",
    ],
  },
  {
    period: "Jan – Apr 2026",
    role: "Frontend Developer (Freelance)",
    org: "Mathematics Study Program, ITERA",
    category: "work",
    bullets: [
      "Built responsive UI and integrated backend APIs for the SIMTA final-project administration used by hundreds of students.",
    ],
  },
  {
    period: "Nov 2025",
    role: "Project Lead, Training For Mass",
    org: "HMIF ITERA",
    category: "organization",
    bullets: [
      "Led a team of 8 to run a technology seminar for 50+ first-year students covering VS Code and AI tools.",
    ],
  },
  {
    period: "Sep 2025 – Jan 2026",
    role: "Backend Developer (Freelance)",
    org: "Batang Hari Ogan Village Government",
    category: "work",
    bullets: [
      "Implemented RBAC and managed relational databases supporting 1,000+ villagers.",
      "Handled deployment, VPS configuration and ongoing troubleshooting of the village information system.",
    ],
  },
  {
    period: "Aug – Dec 2025",
    role: "Lab Assistant, Digital Technology Fundamentals",
    org: "Institut Teknologi Sumatera",
    category: "teaching",
    bullets: [
      "Guided 60+ students in Google Docs, Word, Excel and Spreadsheets and evaluated lab assignments.",
    ],
  },
  {
    period: "2025",
    role: "Speaker, HTML Material",
    org: "Latihan Dasar Organisasi dan Profesi 7.0, HMIF ITERA",
    category: "organization",
    bullets: ["Delivered the HTML session at HMIF's LDOP 7.0 training."],
  },
  {
    period: "May – Aug 2025",
    role: "Staff, Backend Developer Division",
    org: "PPLK ITERA",
    category: "organization",
    bullets: [
      "Optimized the campus orientation backend for 5,000+ active users with zero downtime.",
      "Applied application-level load balancing and built the RBAC system.",
    ],
  },
  {
    period: "Mar 2025 – Feb 2026",
    role: "Staff, Technopreneur Division",
    org: "HMIF ITERA",
    category: "organization",
    bullets: [
      "Led project management for LendEase, an IoT lab reservation system.",
      "Built backend and RESTful APIs for the Batang Hari Ogan village site and the official HMIF website frontend.",
    ],
  },
  {
    period: "Feb – Jun 2025",
    role: "Lab Assistant, Computer and Software Introduction 2",
    org: "Institut Teknologi Sumatera",
    category: "teaching",
    bullets: ["Gave weekly C++ and flowchart guidance to 60+ students and evaluated assignments and exams."],
  },
  {
    period: "Jul 2024",
    role: "Introduction to Software Engineering",
    org: "RevoU",
    category: "certification",
    bullets: ["Certificate issued by RevoU."],
  },
];
