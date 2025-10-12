import React from "react";

import { useMobileInputFixes } from "../hooks/useMobileInputFixes";

interface MainLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ header, children }) => {
  useMobileInputFixes();

  return (
    <div className="relative bg-gray-100 flex flex-col" style={{ height: "var(--svh, 100vh)" }}>
      <div>{header}</div>
      <main id="main-scroll-container" className="p-8 flex-grow" style={{ overflowY: "scroll" }}>
        <div style={{ minHeight: "calc(100% + 1px)" }}>{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
