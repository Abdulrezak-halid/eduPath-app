# Firebase Quick Reference

## Import Firebase Services

```typescript
// Import individual services
import { auth, db, storage } from '@/firebase';

// Or import from service file (recommended for complex operations)
import firebaseService from '@/services/firebase.service';
```

## Usage in Components

### 1. Authentication

```typescript
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Listen to auth state changes
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User logged in:', user.uid);
    } else {
      console.log('User logged out');
    }
  });

  return () => unsubscribe();
}, []);
```

### 2. Firestore Database

```typescript
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Fetch data
const fetchQuestions = async () => {
  const querySnapshot = await getDocs(collection(db, 'questions'));
  const questions = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return questions;
};
```

### 3. Storage

```typescript
import { storage } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Upload file
const handleFileUpload = async (file: File) => {
  const storageRef = ref(storage, `uploads/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
```

## Collections Structure

```
firestore/
├── users/
│   └── {userId}/
│       ├── uid: string
│       ├── email: string
│       ├── displayName: string
│       └── createdAt: timestamp
│
├── questions/
│   └── {questionId}/
│       ├── title: string
│       ├── content: string
│       ├── authorId: string
│       ├── authorName: string
│       ├── tags: string[]
│       ├── createdAt: timestamp
│       ├── views: number
│       ├── answerCount: number
│       └── answers/ (subcollection)
│           └── {answerId}/
│               ├── content: string
│               ├── authorId: string
│               ├── authorName: string
│               ├── votes: number
│               ├── isAccepted: boolean
│               └── createdAt: timestamp
│
└── advice/
    └── {adviceId}/
        ├── title: string
        ├── content: string
        ├── major: string
        ├── category: string
        ├── authorId: string
        ├── authorName: string
        ├── upvotes: number
        ├── views: number
        └── createdAt: timestamp
```

## Environment Variables Checklist

✅ All Firebase credentials in `.env`
✅ `.env` added to `.gitignore`
✅ `.env.example` updated with placeholders
✅ Production variables set in hosting platform
✅ Emulator settings configured for local development
