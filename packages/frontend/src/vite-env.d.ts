/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;

  // App Configuration
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENV: string;

  // Firebase Configuration
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;

  // Firebase Emulators
  readonly VITE_USE_FIREBASE_EMULATORS: string;
  readonly VITE_FIREBASE_AUTH_EMULATOR_URL: string;
  readonly VITE_FIREBASE_FIRESTORE_EMULATOR_HOST: string;
  readonly VITE_FIREBASE_FIRESTORE_EMULATOR_PORT: string;
  readonly VITE_FIREBASE_STORAGE_EMULATOR_HOST: string;
  readonly VITE_FIREBASE_STORAGE_EMULATOR_PORT: string;

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ERROR_TRACKING: string;

  // Social
  readonly VITE_FACEBOOK_APP_ID: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
