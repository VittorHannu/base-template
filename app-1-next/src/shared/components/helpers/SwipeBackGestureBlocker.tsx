"use client";

import { useEffect } from "react";

export function SwipeBackGestureBlocker() {
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Apply the fix on iOS (PWA or browser) if panels are open
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const edgeThreshold = 50; // A slightly larger threshold

        if (e.touches[0].pageX < edgeThreshold) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return null;
}
