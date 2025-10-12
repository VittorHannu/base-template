"use client";

import React from "react";

import { useMobileLayoutFix } from "@/shared/hooks/useMobileLayoutFix";

interface MainLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ header, children }) => {
  useMobileLayoutFix();

  return (
    <div
      className="relative flex w-screen flex-col bg-background"
      style={{ height: "var(--svh, 100vh)" }}
    >
      {header}
      <main
        id="main-scroll-container"
        className="flex-grow"
        style={{ overflowY: "scroll", overscrollBehavior: "contain" }}
      >
        <div style={{ minHeight: "calc(100% + 1px)" }}>{children}</div>
      </main>
    </div>
  );
};
