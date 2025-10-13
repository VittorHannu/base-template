"use client";

import React, { useEffect, useRef, useState } from "react";

import { useMobileLayoutFix } from "@/shared/components/layouts/Input-Fix-Layout/useMobileLayoutFix";

interface MainLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ header, children }) => {
  useMobileLayoutFix();

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    function updateHeaderHeight() {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    }

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <div
      id="red-container"
      style={{
        position: "fixed",
        top: "var(--svt, 0px)", // top dinâmico
        left: 0,
        height: "var(--svh, 100vh)", // altura dinâmica
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        overscrollBehavior: "none", // ⚠️ previne scroll do sistema
        touchAction: "none", // ⚠️ previne gestos de toque
        border: "2px solid red",
        boxSizing: "border-box",
        backgroundColor: "white",
      }}
    >
      {/* Header (não scrollável) */}
      <div
        ref={headerRef}
        style={{
          flexShrink: 0,
          position: "sticky",
          top: 0,
          zIndex: 10,
          border: "2px solid green",
          touchAction: "none", // ⚠️ impede scroll no header
          overscrollBehavior: "none", // ⚠️ evita pull-to-refresh ou scroll no header
        }}
      >
        {header}
      </div>

      {/* Área scrollável */}
      <main
        id="main-scroll-container"
        style={{
          height: `calc(var(--svh, 100vh) - ${headerHeight}px)`,
          overflowY: "auto",
          overscrollBehavior: "contain", // ⚠️ limita scroll só ao main
          border: "2px solid yellow",
          minHeight: 0,
          WebkitOverflowScrolling: "touch", // para suavidade no iOS
        }}
      >
        {children}
      </main>
    </div>
  );
};
