"use client";

import React from "react";

import { panelRegistry } from "./panels.config";

import { useMobileLayoutFix } from "@/shared/hooks/useMobileLayoutFix";
import { PanelLayout } from "@/shared/panel-system/PanelLayout";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  useMobileLayoutFix();

  return (
    <div
      className="relative flex w-screen flex-col bg-background"
      style={{ height: "var(--svh, 100vh)" }}
    >
      <header
        style={{
          flexShrink: 0,
          padding: "1rem",
          backgroundColor: "#222",
          borderBottom: "1px solid #444",
        }}
      >
        <h1 className="text-xl font-bold text-white">Settings</h1>
      </header>
      <main
        id="main-scroll-container"
        className="flex-grow"
        style={{ overflowY: "auto", overscrollBehavior: "contain" }}
      >
        <PanelLayout panelRegistry={panelRegistry}>{children}</PanelLayout>
      </main>
    </div>
  );
}
