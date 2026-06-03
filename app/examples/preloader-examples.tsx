/**
 * Preloader Customization Examples
 * Shows common customization patterns for the premium preloader
 */

"use client";

import { usePreloader } from "@/app/providers/PreloaderProvider";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// ============================================
// Example 1: Programmatically Complete Preloader
// ============================================

export function SkipPreloaderExample() {
  const { complete } = usePreloader();

  return (
    <button
      onClick={complete}
      className="px-4 py-2 bg-primary text-background rounded-lg"
    >
      Skip Loading
    </button>
  );
}

// ============================================
// Example 2: Conditional Preloader
// ============================================

export function ConditionalPreloaderExample() {
  const { complete, isLoading } = usePreloader();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setDataLoaded(true);
      complete(); // Complete preloader when data is ready
    }, 2000);

    return () => clearTimeout(timer);
  }, [complete]);

  return <div>{dataLoaded ? "Data Ready!" : "Loading..."}</div>;
}

// ============================================
// Example 3: With Analytics Tracking
// ============================================

export function AnalyticsPreloaderExample() {
  const { isLoading } = usePreloader();

  useEffect(() => {
    if (!isLoading) {
      // Track preloader completion in analytics
      const win = window as any;
      if (win.gtag) {
        win.gtag("event", "preloader_complete", {
          timestamp: new Date().toISOString(),
          duration: 3.6, // 3s animation + 0.6s fade
        });
      }

      // Or custom analytics
      console.log("User saw preloader");
    }
  }, [isLoading]);

  return null;
}

// ============================================
// Example 4: Skip Preloader on Specific Routes
// ============================================

export function RouteBasedPreloaderExample() {
  const { complete } = usePreloader();
  const pathname = usePathname();

  // Skip preloader on admin or dashboard pages
  useEffect(() => {
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
      complete();
    }
  }, [pathname, complete]);

  return null;
}

// ============================================
// Example 5: Animated with Performance Metrics
// ============================================

interface PerformanceMetrics {
  serverTiming?: number;
  domReady?: number;
  pageLoad?: number;
}

export function PerformanceMetricsPreloaderExample() {
  const { complete } = usePreloader();

  useEffect(() => {
    const onLoad = () => {
      // Get performance metrics
      const metrics: PerformanceMetrics = {};

      if (window.performance) {
        const perfData = window.performance.timing;
        metrics.serverTiming = perfData.responseEnd - perfData.navigationStart;
        metrics.domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        metrics.pageLoad = perfData.loadEventEnd - perfData.navigationStart;
      }

      // Log or send metrics
      console.log("Performance Metrics:", metrics);

      // Complete preloader
      complete();
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [complete]);

  return null;
}

// ============================================
// Example 6: Custom Boot Messages (Advanced)
// ============================================

/*
To customize boot messages, edit lib/preloader.ts:

export const BOOT_SEQUENCE = [
  { percentage: 0, message: "Initializing Core" },
  { percentage: 20, message: "Loading Agent Runtime" },
  { percentage: 40, message: "Connecting LangGraph Nodes" },
  { percentage: 60, message: "Starting RAG Pipeline" },
  { percentage: 80, message: "Enabling Multi-Agent System" },
  { percentage: 100, message: "Mission Ready" },
];

Change to:

export const BOOT_SEQUENCE = [
  { percentage: 0, message: "🚀 Launching Systems" },
  { percentage: 25, message: "🤖 Initializing AI" },
  { percentage: 50, message: "⚙️ Loading Runtime" },
  { percentage: 75, message: "🔌 Connecting Services" },
  { percentage: 100, message: "✨ Ready" },
];
*/

// ============================================
// Example 7: Disable Preloader Completely
// ============================================

/*
To disable the preloader entirely:

1. In app/layout.tsx, change from:
   <PreloaderProvider>
     {children}
   </PreloaderProvider>

2. To:
   {children}

3. Remove the import:
   import PreloaderProvider from "@/app/providers/PreloaderProvider";

Then delete or archive:
- app/components/Preloader.tsx
- app/components/BikeSVG.tsx
- app/providers/PreloaderProvider.tsx
- lib/preloader.ts
*/

// ============================================
// Example 8: Custom Preloader Duration
// ============================================

/*
To change preloader duration, edit lib/preloader.ts:

// Default (3 seconds)
export const PRELOADER_DURATION = 3000;

// Change to 2 seconds
export const PRELOADER_DURATION = 2000;

// Change to 5 seconds
export const PRELOADER_DURATION = 5000;

Also adjust fade out duration:
export const PRELOADER_FADE_OUT_DURATION = 400; // 400ms fade
*/

// ============================================
// Example 9: With Error Boundary
// ============================================

export function ErrorBoundaryPreloaderExample() {
  const { complete } = usePreloader();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // On error, complete preloader and show error
      complete();
      console.error("Page error:", event.error);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, [complete]);

  return null;
}

// ============================================
// Example 10: Usage in Custom Page Component
// ============================================

export function CustomPageWithPreloader() {
  const { isLoading, complete } = usePreloader();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsReady(true);
      // Optional: explicitly complete preloader
      // complete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [complete]);

  if (!isReady) {
    return <div>Preparing page...</div>;
  }

  return (
    <div>
      <h1>Page Content</h1>
      <p>{isLoading ? "Still loading..." : "Ready!"}</p>
    </div>
  );
}
