import React from "react";

interface HomePageProps {
  onOpenAbout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenAbout }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="mt-4">Welcome to the Food Tracker application.</p>
      <button
        onClick={onOpenAbout}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        About This App
      </button>
    </div>
  );
};

export default HomePage;
