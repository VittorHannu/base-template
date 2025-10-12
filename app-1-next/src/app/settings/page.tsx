"use client";

import React from "react";

import { BasicHeader } from "@/shared/components/header/BasicHeader";
import { MainLayout } from "@/shared/components/layouts/MainLayout";
import { Button } from "@/shared/components/ui/button";
import { PanelLink } from "@/shared/panel-system/PanelLink";

export default function SettingsPage() {
  return (
    <MainLayout header={<BasicHeader title="Settings" />}>
      <div className="p-4">
        <PanelLink to="profile">
          <Button className="mt-6">Open Profile Panel (with Test Inputs)</Button>
        </PanelLink>

        <div className="mt-12">
          <h2 className="text-lg font-semibold">Keyboard Test on Base Page</h2>
          <p className="text-gray-400 h-16">
            This area scrolls. Tap the inputs below to test the keyboard behavior.
          </p>

          <input
            type="text"
            placeholder="Input at the top"
            className="w-full p-3 mt-4 bg-gray-800 text-white rounded border border-gray-600"
          />

          <div style={{ height: "80vh" }} />

          <input
            type="text"
            placeholder="Input in the middle"
            className="w-full p-3 mt-4 bg-gray-800 text-white rounded border border-gray-600"
          />

          <div style={{ height: "80vh" }} />

          <input
            type="text"
            placeholder="Input at the bottom"
            className="w-full p-3 mt-4 bg-gray-800 text-white rounded border border-gray-600"
          />

          <div style={{ height: "30px" }} />
        </div>
      </div>
    </MainLayout>
  );
}
