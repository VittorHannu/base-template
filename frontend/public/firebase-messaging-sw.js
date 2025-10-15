// Import the Firebase SDKs from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getMessaging,
  onBackgroundMessage,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-sw.js";

// Parse the configuration from the URL query parameters
const urlParams = new URLSearchParams(location.search);
const firebaseConfig = {
  apiKey: urlParams.get('apiKey'),
  authDomain: urlParams.get('authDomain'),
  projectId: urlParams.get('projectId'),
  storageBucket: urlParams.get('storageBucket'),
  messagingSenderId: urlParams.get('messagingSenderId'),
  appId: urlParams.get('appId'),
  measurementId: urlParams.get('measurementId'),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/pwa-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
