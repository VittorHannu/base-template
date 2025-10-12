import { useEffect, useRef } from "react";

export const useMobileInputFixes = () => {
  const viewportHeight = useRef(0);

  useEffect(() => {
    const vp = window.visualViewport;
    if (!vp) return;

    const handleGlobalFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        target.focus({ preventScroll: true });

        setTimeout(() => {
          const scrollContainer = document.getElementById("main-scroll-container");
          const activeElement = event.target as HTMLElement;

          if (scrollContainer && activeElement) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const inputRect = activeElement.getBoundingClientRect();

            const centerPoint = containerRect.height / 2;
            const inputCenterPoint = inputRect.top - containerRect.top + inputRect.height / 2;
            let desiredScrollTop = scrollContainer.scrollTop + inputCenterPoint - centerPoint;

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
      document.documentElement.style.setProperty("--svh", `${newHeight}px`);

      const activeElement = document.activeElement as HTMLElement;
      if (newHeight > viewportHeight.current + 150) {
        if (
          activeElement &&
          (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
        ) {
          activeElement.blur();
        }
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
