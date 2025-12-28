/**
 * Firebase Service Layer
 *
 * This file provides service methods for all Firebase operations.
 * Uses TypeScript models for type safety and validation.
 */

import { auth, db, storage } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import type {
  User,
} from '../models';

// ============================================================================
// Authentication Service
// ============================================================================

/**
 * Register a new user with email and password
 */
export const registerUser = async (
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Update profile with display name
  await updateProfile(userCredential.user, { displayName });

  // Create user document in Firestore
  const userData: Omit<User, 'id'> = {
    uid: userCredential.user.uid,
    email: userCredential.user.email!,
    emailVerified: userCredential.user.emailVerified,
    displayName,
    role: 'student',
    isActive: true,
    isBanned: false,
    reputationScore: 0,
    badges: [],
    questionsAsked: 0,
    answersGiven: 0,
    adviceShared: 0,
    upvotesReceived: 0,
    acceptedAnswers: 0,
    followers: 0,
    following: 0,
    emailNotifications: true,
    publicProfile: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  await setDoc(doc(db, 'users', userCredential.user.uid), userData);

  return userCredential.user;
};

/**
 * Sign in existing user
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Update last login time
  await updateDoc(doc(db, 'users', userCredential.user.uid), {
    lastLoginAt: Timestamp.now(),
  });

  return userCredential.user;
};

/**
 * Sign out current user
 */
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// ============================================================================
// Firestore Service Examples
// ============================================================================

/**
 * Questions Collection
 */
export const questionsService = {
  // Add a new question
  async create(questionData: {
    title: string;
    content: string;
    tags: string[];
    authorId: string;
    authorName: string;
  }) {
    const docRef = await addDoc(collection(db, 'questions'), {
      ...questionData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      views: 0,
      answerCount: 0,
    });
    return docRef.id;
  },

  // Get all questions
  async getAll() {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Get questions by tag
  async getByTag(tag: string) {
    const q = query(
      collection(db, 'questions'),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Get single question
  async getById(questionId: string) {
    const docRef = doc(db, 'questions', questionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }
    return null;
  },

  // Update question
  async update(
    questionId: string,
    data: Partial<{ title: string; content: string; tags: string[] }>
  ) {
    const docRef = doc(db, 'questions', questionId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  // Delete question
  async delete(questionId: string) {
    const docRef = doc(db, 'questions', questionId);
    await deleteDoc(docRef);
  },
};

/**
 * Answers Collection (subcollection of questions)
 */
export const answersService = {
  // Add an answer to a question
  async create(
    questionId: string,
    answerData: {
      content: string;
      authorId: string;
      authorName: string;
    }
  ) {
    const answersRef = collection(db, 'questions', questionId, 'answers');
    const docRef = await addDoc(answersRef, {
      ...answerData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      votes: 0,
      isAccepted: false,
    });

    // Increment answer count on question
    const questionRef = doc(db, 'questions', questionId);
    await updateDoc(questionRef, {
      answerCount: (await getDoc(questionRef)).data()?.answerCount + 1 || 1,
    });

    return docRef.id;
  },

  // Get answers for a question
  async getByQuestionId(questionId: string) {
    const answersRef = collection(db, 'questions', questionId, 'answers');
    const q = query(answersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Mark answer as accepted
  async markAsAccepted(questionId: string, answerId: string) {
    const answerRef = doc(db, 'questions', questionId, 'answers', answerId);
    await updateDoc(answerRef, {
      isAccepted: true,
    });
  },
};

/**
 * Advice Collection
 */
export const adviceService = {
  // Add new advice
  async create(adviceData: {
    title: string;
    content: string;
    major: string;
    category: string;
    authorId: string;
    authorName: string;
  }) {
    const docRef = await addDoc(collection(db, 'advice'), {
      ...adviceData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      upvotes: 0,
      views: 0,
    });
    return docRef.id;
  },

  // Get all advice
  async getAll() {
    const q = query(
      collection(db, 'advice'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Get advice by major
  async getByMajor(major: string) {
    const q = query(
      collection(db, 'advice'),
      where('major', '==', major),
      orderBy('upvotes', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Upvote advice
  async upvote(adviceId: string) {
    const docRef = doc(db, 'advice', adviceId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        upvotes: docSnap.data().upvotes + 1,
      });
    }
  },
};

// ============================================================================
// Storage Service Examples
// ============================================================================

/**
 * Upload user profile picture
 */
export const uploadProfilePicture = async (
  userId: string,
  file: File
): Promise<string> => {
  const storageRef = ref(storage, `profile-pictures/${userId}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

/**
 * Upload question attachment
 */
export const uploadQuestionAttachment = async (
  questionId: string,
  file: File
): Promise<string> => {
  const storageRef = ref(
    storage,
    `question-attachments/${questionId}/${file.name}`
  );
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

/**
 * Delete file from storage
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  const fileRef = ref(storage, filePath);
  await deleteObject(fileRef);
};

// ============================================================================
// Export all services
// ============================================================================

export default {
  auth: {
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
  },
  questions: questionsService,
  answers: answersService,
  advice: adviceService,
  storage: {
    uploadProfilePicture,
    uploadQuestionAttachment,
    deleteFile,
  },
};
