import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">About Page</h1>
      <p className="mt-4">This is App 1.</p>
      <Link href="/" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Back
      </Link>
    </div>
  );
};

export default AboutPage;