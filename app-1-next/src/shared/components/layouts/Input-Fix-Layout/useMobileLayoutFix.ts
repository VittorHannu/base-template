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
        // Prevent native scroll on focus
        target.focus({ preventScroll: true });

        // Scroll input to center vertically inside container after keyboard appears
        setTimeout(() => {
          const scrollContainer = document.getElementById("main-scroll-container");
          if (!scrollContainer) return;

          const containerRect = scrollContainer.getBoundingClientRect();
          const inputRect = target.getBoundingClientRect();

          const centerPoint = containerRect.height / 2;
          const inputCenterPoint = inputRect.top - containerRect.top + inputRect.height / 2;
          let desiredScrollTop = scrollContainer.scrollTop + inputCenterPoint - centerPoint;

          const maxScrollTop = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          desiredScrollTop = Math.max(0, Math.min(desiredScrollTop, maxScrollTop));

          scrollContainer.scrollTo({
            top: desiredScrollTop,
            behavior: "smooth",
          });
        }, 300);
      }
    };

    const handleViewportResize = () => {
      const newHeight = vp.height;
      const offsetTop = vp.offsetTop;

      // Update CSS variables for viewport height and top offset
      document.documentElement.style.setProperty("--svh", `${newHeight}px`);
      document.documentElement.style.setProperty("--svt", `${offsetTop}px`);

      // Keep red container aligned with viewport top
      const redContainer = document.getElementById("red-container");
      if (redContainer) {
        redContainer.style.top = `${offsetTop}px`;
      }

      viewportHeight.current = newHeight;
    };

    viewportHeight.current = vp.height;

    vp.addEventListener("resize", handleViewportResize);
    document.addEventListener("focus", handleGlobalFocus, { capture: true });
    handleViewportResize();

    return () => {
      vp.removeEventListener("resize", handleViewportResize);
      document.removeEventListener("focus", handleGlobalFocus, { capture: true });
    };
  }, []);
};
