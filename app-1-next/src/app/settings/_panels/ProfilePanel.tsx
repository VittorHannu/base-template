"use client";

import React from "react";

import { Button } from "@/shared/components/ui/button";
import { usePanelActions } from "@/shared/panel-system/PanelStackContext";

const ProfilePanel: React.FC = () => {
  const { pop } = usePanelActions();

  return (
    <div className="p-4 bg-background h-full">
      <h1 className="text-2xl font-bold">Profile Panel</h1>
      <p className="mt-4">This is a panel within the Settings page.</p>
      <Button onClick={pop} className="mt-6">
        Go Back to Settings
      </Button>
    </div>
  );
};

export default ProfilePanel;
