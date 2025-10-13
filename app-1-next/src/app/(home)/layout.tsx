"use client";

import React from "react";

import { panelRegistry } from "./panels.config";

import { PanelLayout } from "@/shared/components/layouts/panel-system/PanelLayout";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <PanelLayout panelRegistry={panelRegistry}>{children}</PanelLayout>;
}
