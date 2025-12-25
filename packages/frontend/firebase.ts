// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = import.meta.env.VITE_ENABLE_ANALYTICS === "true" ? getAnalytics(app) : null;

// Connect to emulators in development
if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true") {
  const authEmulatorUrl = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL || "http://localhost:9099";
  const firestoreHost = import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST || "localhost";
  const firestorePort = parseInt(import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT || "8080");
  const storageHost = import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_HOST || "localhost";
  const storagePort = parseInt(import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_PORT || "9199");

  connectAuthEmulator(auth, authEmulatorUrl);
  connectFirestoreEmulator(db, firestoreHost, firestorePort);
  connectStorageEmulator(storage, storageHost, storagePort);

  console.log("🔧 Firebase emulators connected");
}

// Export for easy imports
export default app;
