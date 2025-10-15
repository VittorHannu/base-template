"use client";

import React from "react";

import { PanelLink } from "@/shared/components/layouts/panel-system/PanelLink";
import { usePanelActions } from "@/shared/components/layouts/panel-system/PanelStackContext";
import { Button } from "@/shared/components/ui/button";

const AboutPanel: React.FC = () => {
  const panelActions = usePanelActions();

  return (
    <div className="p-4 bg-background h-full">
      <h1 className="text-2xl font-bold">About Page</h1>
      <p className="mt-4">This is App 1.</p>
      <Button onClick={panelActions?.pop} className="mt-6">
        Go Back
      </Button>
      <PanelLink to="test">
        <Button className="mt-6 ml-4" variant="secondary">
          Open Test Panel
        </Button>
      </PanelLink>
    </div>
  );
};

export default AboutPanel;
