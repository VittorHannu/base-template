'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/auth/AuthProvider';
import { Login } from '@/auth/Login';
import NotificationManager from '@/features/notifications/NotificationManager';

export default function Home() {
  const { session } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const openNotifications = () => setIsNotificationsOpen(true);
  const closeNotifications = () => setIsNotificationsOpen(false);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Login />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="mt-4">Welcome to App 1.</p>
      <Link href="/about" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        About This App
      </Link>
      <Link href="/test" className="mt-6 ml-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Test Page
      </Link>
      <button
        onClick={openNotifications}
        className="mt-6 ml-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Notifications
      </button>

      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <NotificationManager />
            <button onClick={closeNotifications} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
