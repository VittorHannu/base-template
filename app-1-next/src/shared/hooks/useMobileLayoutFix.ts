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
        // Impede o scroll automático padrão
        target.focus({ preventScroll: true });

        // Depois de um tempo, scrolla o input pro centro da área visível
        setTimeout(() => {
          const scrollContainer = document.getElementById("main-scroll-container");
          const activeElement = event.target as HTMLElement;

          if (scrollContainer && activeElement) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const inputRect = activeElement.getBoundingClientRect();

            const isAlreadyVisible =
              inputRect.top >= containerRect.top && inputRect.bottom <= containerRect.bottom;

            if (!isAlreadyVisible) {
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
          }
        }, 300);
      }
    };

    const handleViewportResize = () => {
      const newHeight = vp.height;
      const offsetTop = vp.offsetTop; // <- valor quando a viewport é empurrada pra baixo (ex: teclado)

      // Atualiza a CSS var para uso com height dinâmico
      document.documentElement.style.setProperty("--svh", `${newHeight}px`);
      document.documentElement.style.setProperty("--svt", `${offsetTop}px`); // <- novo: topo real

      // Força o container vermelho a acompanhar a viewport visível
      const redContainer = document.getElementById("red-container");
      if (redContainer) {
        redContainer.style.top = `${offsetTop}px`; // <- fixando o topo no offset da viewport
      }

      // Detecta se o teclado fechou e desfoca o input
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
    handleViewportResize(); // <- chama uma vez no início

    return () => {
      vp.removeEventListener("resize", handleViewportResize);
      document.removeEventListener("focus", handleGlobalFocus, { capture: true });
    };
  }, []);
};
