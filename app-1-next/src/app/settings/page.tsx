"use client";

import React from "react";

import { Button } from "@/shared/components/ui/button";
import { PanelLink } from "@/shared/panel-system/PanelLink";

// The main export for the page.
export default function SettingsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Settings Page</h1>
      <p className="mt-4">This is the base content for the settings page.</p>
      <PanelLink to="profile">
        <Button className="mt-6">Open Profile Panel</Button>
      </PanelLink>
    </div>
  );
}
