import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/Hero";
import ProjectsOrbit from "@/components/ProjectsOrbit";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <ProjectsOrbit />
        <Services />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
