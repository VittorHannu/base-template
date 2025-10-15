// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

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

let messagingInstance = null;
// Only initialize Firebase Messaging if the context is secure
if (
  typeof window !== "undefined" &&
  (window.isSecureContext ||
    window.location.protocol === "https:" ||
    window.location.hostname === "localhost")
) {
  messagingInstance = getMessaging(app);
}
export const messaging = messagingInstance;
