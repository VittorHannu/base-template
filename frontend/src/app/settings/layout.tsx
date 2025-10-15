"use client";

import React from "react";

import { PanelLayout } from "@/shared/components/layouts/panel-system/PanelLayout";

import { panelRegistry } from "./panels.config";


export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <PanelLayout panelRegistry={panelRegistry}>{children}</PanelLayout>;
}
