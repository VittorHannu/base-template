"use client";

import React from "react";

import { panelRegistry } from "./panels.config";

import { PanelLayout } from "@/features/panel-system/PanelLayout";
import { usePanelActions } from "@/features/panel-system/PanelStackContext";
import { Button } from "@/shared/ui/button";

// The content for the base settings page.
function SettingsPageContent() {
  const { push } = usePanelActions();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Settings Page</h1>
      <p className="mt-4">This is the base content for the settings page.</p>
      <Button onClick={() => push("profile")} className="mt-6">
        Open Profile Panel
      </Button>
    </div>
  );
}

// The main export for the page.
export default function SettingsPage() {
  return (
    <PanelLayout panelRegistry={panelRegistry}>
      <SettingsPageContent />
    </PanelLayout>
  );
}
