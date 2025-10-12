"use client";

import { useEffect, useRef } from "react";

export const useMobileLayoutFix = () => {
  const viewportHeight = useRef(0);

  useEffect(() => {
    const vp = window.visualViewport;
    if (!vp) return;

    const handleGlobalFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        // Prevent the browser's default scroll behavior
        target.focus({ preventScroll: true });

        // After a short delay to allow the keyboard to appear, scroll the input into view.
        setTimeout(() => {
          const scrollContainer = document.getElementById("main-scroll-container");
          const activeElement = event.target as HTMLElement;

          if (scrollContainer && activeElement) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const inputRect = activeElement.getBoundingClientRect();

            // Calculate the desired scroll position to center the input
            const centerPoint = containerRect.height / 2;
            const inputCenterPoint = inputRect.top - containerRect.top + inputRect.height / 2;
            let desiredScrollTop = scrollContainer.scrollTop + inputCenterPoint - centerPoint;

            // Clamp the scroll position to be within valid bounds
            const maxScrollTop = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            desiredScrollTop = Math.max(0, Math.min(desiredScrollTop, maxScrollTop));

            scrollContainer.scrollTo({
              top: desiredScrollTop,
              behavior: "smooth",
            });
          }
        }, 300);
      }
    };

    const handleViewportResize = () => {
      const newHeight = vp.height;
      // Set the CSS variable for the dynamic viewport height
      document.documentElement.style.setProperty("--svh", `${newHeight}px`);

      // A heuristic to detect when the keyboard is closed
      const activeElement = document.activeElement as HTMLElement;
      if (newHeight > viewportHeight.current + 150) {
        if (
          activeElement &&
          (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
        ) {
          activeElement.blur(); // Blur the input when keyboard closes
        }
      }
      viewportHeight.current = newHeight;
    };

    viewportHeight.current = vp.height;
    vp.addEventListener("resize", handleViewportResize);
    document.addEventListener("focus", handleGlobalFocus, { capture: true });
    handleViewportResize(); // Set initial value

    return () => {
      vp.removeEventListener("resize", handleViewportResize);
      document.removeEventListener("focus", handleGlobalFocus, { capture: true });
    };
  }, []);
};
