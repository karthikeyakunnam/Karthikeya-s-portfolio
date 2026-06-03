"use client";

import dynamic from "next/dynamic";
import Header from "./components/Header";
import HeroOverlay from "./components/overlay/HeroOverlay";
import AgentsOverlay from "./components/overlay/AgentsOverlay";
import ProjectsOverlay from "./components/overlay/ProjectsOverlay";
import EducationOverlay from "./components/overlay/EducationOverlay";
import ContactOverlay from "./components/overlay/ContactOverlay";
import Footer from "./components/Footer";
import ScrollEngine from "./components/ScrollEngine";

// Dynamic import for Three.js canvas (no SSR)
const SceneCanvas = dynamic(
  () => import("./components/three/SceneCanvas"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Persistent Three.js Canvas (fixed, z-0) */}
      <SceneCanvas />

      {/* GSAP Scroll Engine */}
      <ScrollEngine />

      {/* Fixed Header (z-50) */}
      <Header />

      {/* Scroll Container - HTML content scrolls over canvas */}
      <div id="scroll-container">
        <HeroOverlay />
        <AgentsOverlay />
        <ProjectsOverlay />
        <EducationOverlay />
        <ContactOverlay />
        <Footer />
      </div>
    </>
  );
}
