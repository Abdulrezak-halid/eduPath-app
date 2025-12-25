# Firebase Setup Guide

## Overview
This guide explains how to configure Firebase for the EduPath application, including Firestore, Authentication, and Storage.

## Configuration

### Environment Variables
All Firebase credentials are stored in environment variables for security. Never commit the `.env` file to version control.

**Required Variables** (in `.env`):
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Production Deployment

For production environments (Vercel, Netlify, etc.), add these environment variables in your hosting platform's dashboard:

1. **Vercel**: Project Settings → Environment Variables
2. **Netlify**: Site Settings → Build & Deploy → Environment
3. **Firebase Hosting**: Use `firebase.json` configuration

## Firebase Services

### 1. Authentication (`auth`)
```typescript
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Example usage
const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
```

### 2. Firestore Database (`db`)
```typescript
import { db } from '@/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Example usage
const addQuestion = async (questionData) => {
  const docRef = await addDoc(collection(db, 'questions'), questionData);
  return docRef.id;
};
```

### 3. Storage (`storage`)
```typescript
import { storage } from '@/firebase';
import { ref, uploadBytes } from 'firebase/storage';

// Example usage
const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `uploads/${file.name}`);
  await uploadBytes(storageRef, file);
};
```

## Local Development with Emulators

Firebase Emulators allow you to develop locally without affecting production data.

### Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize emulators:
```bash
firebase init emulators
```

3. Select emulators to use:
   - ✅ Authentication
   - ✅ Firestore
   - ✅ Storage

4. Enable emulators in `.env`:
```env
VITE_USE_FIREBASE_EMULATORS=true
VITE_FIREBASE_AUTH_EMULATOR_URL=http://localhost:9099
VITE_FIREBASE_FIRESTORE_EMULATOR_HOST=localhost
VITE_FIREBASE_FIRESTORE_EMULATOR_PORT=8080
VITE_FIREBASE_STORAGE_EMULATOR_HOST=localhost
VITE_FIREBASE_STORAGE_EMULATOR_PORT=9199
```

5. Start emulators:
```bash
firebase emulators:start
```

6. Access Emulator UI: `http://localhost:4000`

### Emulator Benefits
- No cloud costs during development
- Fast reset of data
- Offline development
- Safe testing without production data

## Security Rules

### Firestore Rules
Located in `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Questions collection
    match /questions/{questionId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Advice collection
    match /advice/{adviceId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
  }
}
```

### Storage Rules
Located in `storage.rules`:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }
  }
}
```

## Usage Examples

### Import in Components
```typescript
// Import what you need
import { auth, db, storage } from '@/firebase';

// Or import the app
import app from '@/firebase';
```

### Authentication Example
```typescript
import { auth } from '@/firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';

// Sign up
const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Sign in
const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Sign out
const logout = async () => {
  await signOut(auth);
};
```

### Firestore Example
```typescript
import { db } from '@/firebase';
import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy 
} from 'firebase/firestore';

// Add document
const addQuestion = async (questionData) => {
  const docRef = await addDoc(collection(db, 'questions'), {
    ...questionData,
    createdAt: new Date(),
  });
  return docRef.id;
};

// Query documents
const getQuestions = async () => {
  const q = query(
    collection(db, 'questions'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

## Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check that all environment variables are set
   - Verify `.env` file exists and is loaded by Vite

2. **"Auth emulator not connected"**
   - Ensure emulators are running: `firebase emulators:start`
   - Check `VITE_USE_FIREBASE_EMULATORS=true` in `.env`

3. **"Permission denied" errors**
   - Check Firestore/Storage security rules
   - Verify user is authenticated when required

4. **Environment variables not loading**
   - Restart dev server after changing `.env`
   - Ensure variables start with `VITE_`

## Best Practices

1. **Never commit credentials**: Keep `.env` in `.gitignore`
2. **Use emulators** for local development
3. **Implement proper security rules** before production
4. **Enable App Check** for production security
5. **Monitor usage** in Firebase Console
6. **Set up backup rules** for Firestore data
7. **Use TypeScript types** for Firebase data models

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Firebase Emulators](https://firebase.google.com/docs/emulator-suite)
