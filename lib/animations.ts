// GSAP Animation utilities for the portfolio

// Stagger reveal animation config
export const staggerReveal = {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
};

// Fade in from below
export const fadeInUp = {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0 },
  duration: 0.8,
  ease: "power3.out",
};

// Scale in
export const scaleIn = {
  from: { opacity: 0, scale: 0.9 },
  to: { opacity: 1, scale: 1 },
  duration: 0.6,
  ease: "power2.out",
};

// Text reveal (character by character)
export const textReveal = {
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0 },
  duration: 0.5,
  stagger: 0.03,
  ease: "power3.out",
};

// Section header animation config
export const sectionHeader = {
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0 },
  duration: 0.6,
  ease: "power2.out",
};
