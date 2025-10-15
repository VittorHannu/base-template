"use client";

import React from "react";

import { usePanelActions } from "./PanelStackContext";

interface PanelLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const PanelLink: React.FC<PanelLinkProps> = ({ to, children, className }) => {
  const panelActions = usePanelActions();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    panelActions?.push(to);
  };

  return (
    <span onClick={handleClick} className={className} style={{ cursor: "pointer" }}>
      {children}
    </span>
  );
};
