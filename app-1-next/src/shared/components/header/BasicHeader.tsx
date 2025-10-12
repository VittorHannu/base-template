import React from "react";

interface BasicHeaderProps {
  title: string;
}

export const BasicHeader: React.FC<BasicHeaderProps> = ({ title }) => {
  return (
    <header
      style={{
        flexShrink: 0,
        padding: "1rem",
        backgroundColor: "#222",
        borderBottom: "1px solid #444",
      }}
    >
      <h1 className="text-xl font-bold text-white">{title}</h1>
    </header>
  );
};
