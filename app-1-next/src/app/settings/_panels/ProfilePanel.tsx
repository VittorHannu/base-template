"use client";

import React from "react";

import { Button } from "@/shared/components/ui/button";
import { usePanelActions } from "@/shared/panel-system/PanelStackContext";

const ProfilePanel: React.FC = () => {
  const panelActions = usePanelActions();

  return (
    <div className="p-4">
      <Button onClick={() => panelActions?.pop()} className="mb-8">
        Go Back to Settings
      </Button>
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
    </div>
  );
};

export default ProfilePanel;
