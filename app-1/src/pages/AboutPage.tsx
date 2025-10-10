import React from 'react';

interface AboutPageProps {
  onGoBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onGoBack }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">About Page</h1>
      <p className="mt-4">This is App 1.</p>
      <button
        onClick={onGoBack}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default AboutPage;
