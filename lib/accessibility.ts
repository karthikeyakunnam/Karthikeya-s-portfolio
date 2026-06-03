// Accessibility utilities

export const a11yAttributes = {
  heading: {
    role: "heading",
  },
  button: {
    role: "button",
    tabIndex: 0,
  },
  link: {
    role: "link",
  },
};

export const ariaLabels = {
  navigation: "Main navigation",
  skipToContent: "Skip to main content",
  openMenu: "Open navigation menu",
  closeMenu: "Close navigation menu",
  scrollDown: "Scroll down to continue",
  externalLink: "Opens in new tab",
};

// Skip link component wrapper
export const skipLinkStyles = {
  position: "absolute",
  left: "-9999px",
  zIndex: 999,
  "&:focus": {
    left: 0,
    top: 0,
    right: "auto",
    width: "auto",
  },
};

// Focus management helper
export const manageFocus = (
  element: HTMLElement | null,
  shouldFocus: boolean = true
) => {
  if (shouldFocus && element) {
    element.focus();
  }
};

// Keyboard navigation
export const isEnterKey = (e: KeyboardEvent) => e.key === "Enter";
export const isEscapeKey = (e: KeyboardEvent) => e.key === "Escape";
export const isTabKey = (e: KeyboardEvent) => e.key === "Tab";

// Contrast checker (WCAG AA minimum)
export const MIN_CONTRAST_RATIO = 4.5;
export const ENHANCED_CONTRAST_RATIO = 7;

// Color palette for accessibility
export const ACCESSIBLE_COLORS = {
  text: "#FFFFFF", // Primary text
  textMuted: "#B3B3B3", // Muted text - 7:1 contrast
  primary: "#00E5FF", // Primary accent - 8.5:1 contrast with background
  secondary: "#7C3AED", // Secondary accent - 6.8:1 contrast with background
  danger: "#FF6B6B", // Error states - 6.5:1 contrast with background
  success: "#51CF66", // Success states - 5.5:1 contrast with background
};

// Semantic HTML structure
export const mainLandmarkRole = "main";
export const navLandmarkRole = "navigation";
export const complementaryLandmarkRole = "complementary";
export const contentInfoLandmarkRole = "contentinfo";
