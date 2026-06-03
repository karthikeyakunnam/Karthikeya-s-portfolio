/**
 * Preloader Animation Constants and Utilities
 * Handles smooth progress animation and boot sequence messages
 */

export const BOOT_SEQUENCE = [
  { percentage: 0, message: "Initializing Core" },
  { percentage: 20, message: "Loading Agent Runtime" },
  { percentage: 40, message: "Connecting LangGraph Nodes" },
  { percentage: 60, message: "Starting RAG Pipeline" },
  { percentage: 80, message: "Enabling Multi-Agent System" },
  { percentage: 100, message: "Mission Ready" },
];

export const PRELOADER_DURATION = 3000; // 3 seconds
export const PRELOADER_FADE_OUT_DURATION = 600; // 600ms fade out

/**
 * Get boot message for a given percentage
 */
export function getBootMessage(percentage: number): string {
  for (let i = BOOT_SEQUENCE.length - 1; i >= 0; i--) {
    if (percentage >= BOOT_SEQUENCE[i].percentage) {
      return BOOT_SEQUENCE[i].message;
    }
  }
  return BOOT_SEQUENCE[0].message;
}

/**
 * Easing function for smooth percentage animation
 * Uses easeOut for natural deceleration
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Calculate percentage based on elapsed time
 */
export function calculatePercentage(elapsed: number, duration: number): number {
  const progress = Math.min(elapsed / duration, 1);
  return Math.round(easeOutCubic(progress) * 100);
}
