import React from "react";
import { Outlet } from "react-router-dom";

import MainLayout from "./MainLayout";

interface GlobalLayoutProps {
  header: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ header }) => {
  return (
    <MainLayout header={header}>
      <Outlet />
    </MainLayout>
  );
};

export default GlobalLayout;
