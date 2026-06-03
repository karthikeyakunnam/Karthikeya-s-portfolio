import { create } from "zustand";

interface PortfolioState {
  // Scroll progress (0 → 1 across entire scroll height)
  scrollProgress: number;

  // Current active scene index (0=Hero, 1=Agents, 2=Projects, 3=Skills, 4=Timeline, 5=Contact)
  activeScene: number;

  // Transition progress between scenes (0→1)
  sceneTransition: number;

  // Normalized mouse position (-1 to 1)
  mouse: { x: number; y: number };

  // Preloader completion state
  isLoaded: boolean;

  // Currently hovered/active project node index
  activeProject: number | null;

  // Currently hovered agent index
  hoveredAgent: number | null;

  // Currently hovered skill index
  hoveredSkill: number | null;

  // Reduced motion user preference
  prefersReducedMotion: boolean;

  // Viewport dimensions
  viewport: { width: number; height: number };

  // Actions
  setScrollProgress: (p: number) => void;
  setActiveScene: (s: number) => void;
  setSceneTransition: (t: number) => void;
  setMouse: (x: number, y: number) => void;
  setLoaded: () => void;
  setActiveProject: (id: number | null) => void;
  setHoveredAgent: (id: number | null) => void;
  setHoveredSkill: (id: number | null) => void;
  setPrefersReducedMotion: (v: boolean) => void;
  setViewport: (w: number, h: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  activeScene: 0,
  sceneTransition: 0,
  mouse: { x: 0, y: 0 },
  isLoaded: false,
  activeProject: null,
  hoveredAgent: null,
  hoveredSkill: null,
  prefersReducedMotion: false,
  viewport: { width: 0, height: 0 },

  setScrollProgress: (p) => {
    // 6 scenes: Hero(0), Agents(1), Projects(2), Skills(3), Timeline(4), Contact(5)
    const sceneIndex = Math.min(5, Math.floor(p * 6));
    const sceneProgress = (p * 6) % 1;

    set({
      scrollProgress: p,
      activeScene: sceneIndex,
      sceneTransition: sceneProgress,
    });
  },

  setActiveScene: (s) => set({ activeScene: s }),
  setSceneTransition: (t) => set({ sceneTransition: t }),
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setLoaded: () => set({ isLoaded: true }),
  setActiveProject: (id) => set({ activeProject: id }),
  setHoveredAgent: (id) => set({ hoveredAgent: id }),
  setHoveredSkill: (id) => set({ hoveredSkill: id }),
  setPrefersReducedMotion: (v) => set({ prefersReducedMotion: v }),
  setViewport: (w, h) => set({ viewport: { width: w, height: h } }),
}));
