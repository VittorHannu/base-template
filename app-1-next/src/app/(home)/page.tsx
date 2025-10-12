"use client";

import React, { useState } from "react";

import { panelRegistry } from "./panels.config";

import NotificationManager from "@/features/notifications/NotificationManager";
import { PanelLayout } from "@/features/panel-system/PanelLayout";
import { usePanelActions } from "@/features/panel-system/PanelStackContext";
import { Button } from "@/shared/ui/button";

// The content for the base page.
function HomePageContent() {
  const { push } = usePanelActions();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const openNotifications = () => setIsNotificationsOpen(true);
  const closeNotifications = () => setIsNotificationsOpen(false);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Check out this view!", url: url }).catch(console.error);
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <p className="mt-4">Welcome to the new Panel-based App!</p>
        <Button onClick={() => push("about")} className="mt-6">
          About This App
        </Button>
        <Button onClick={() => push("test")} className="mt-6 ml-4" variant="secondary">
          Test Page
        </Button>
        <Button onClick={openNotifications} className="mt-6 ml-4">
          Notifications
        </Button>
        <Button onClick={handleShare} className="mt-6 ml-4" variant="outline">
          Share
        </Button>
      </div>

      {/* Notifications Modal */}
      {isNotificationsOpen && (
        <div className="absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-card p-8 rounded-lg">
            <NotificationManager />
            <button
              onClick={closeNotifications}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// This component wraps the page content with the PanelLayout.
function AppContent() {
  return (
    <PanelLayout panelRegistry={panelRegistry}>
      <HomePageContent />
    </PanelLayout>
  );
}

// The main export for the page.
export default function Home() {
  return <AppContent />;
}
