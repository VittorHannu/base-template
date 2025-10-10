import React from 'react';

interface HomePageProps {
  onOpenAbout: () => void;
  onOpenTest: () => void;
  onOpenNotifications: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenAbout, onOpenTest, onOpenNotifications }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="mt-4">Welcome to App 1.</p>
      <button
        onClick={onOpenAbout}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        About This App
      </button>
      <button
        onClick={onOpenTest}
        className="mt-6 ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Test Page
      </button>
      <button
        onClick={onOpenNotifications}
        className="mt-6 ml-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Notifications
      </button>
    </div>
  );
};

export default HomePage;
