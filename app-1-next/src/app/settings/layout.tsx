"use client";

import React from "react";

import { panelRegistry } from "./panels.config";

import { PanelLayout } from "@/shared/panel-system/PanelLayout";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <PanelLayout panelRegistry={panelRegistry}>{children}</PanelLayout>;
}
