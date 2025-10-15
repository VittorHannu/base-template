// Import the Firebase SDKs from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getMessaging,
  onBackgroundMessage,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-sw.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSN0Cvu8XhVFkVv94o2TV0DjX-aW57MpU",
  authDomain: "food-tracker-ad8e5.firebaseapp.com",
  projectId: "food-tracker-ad8e5",
  storageBucket: "food-tracker-ad8e5.appspot.com",
  messagingSenderId: "657389030077",
  appId: "1:657389030077:web:373095748bf4628aef45d4",
  measurementId: "G-5NCHSQTKVP",
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
