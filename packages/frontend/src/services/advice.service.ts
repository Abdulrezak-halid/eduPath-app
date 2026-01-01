/**
 * Advice Service
 * 
 * Service layer for advice-related operations
 */

import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import {
  Advice,
  CreateAdviceInput,
  UpdateAdviceInput,
} from '../models/firestore.models';
import { IAdviceFormData } from '../models/component-inputs';
import { validateCreateAdvice } from '../models/validators';

const adviceCollection = collection(db, 'advice');

export const adviceService = {
  /**
   * Create new advice
   */
  create: async (formData: IAdviceFormData): Promise<string> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to create advice');
    }

    const input: CreateAdviceInput = {
      ...formData,
      authorId: currentUser.uid,
      authorName: currentUser.displayName || 'Anonymous',
      ...(currentUser.photoURL && { authorPhotoURL: currentUser.photoURL }),
    };

    // Validate input
    const validationErrors = validateCreateAdvice(input);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    const adviceData: Omit<Advice, 'id'> = {
      ...input,
      isVerified: false,
      views: 0,
      upvotes: 0,
      helpfulCount: 0,
      bookmarks: 0,
      status: 'active',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    // Remove undefined fields
    Object.keys(adviceData).forEach(key => {
      if (adviceData[key as keyof typeof adviceData] === undefined) {
        delete adviceData[key as keyof typeof adviceData];
      }
    });

    const docRef = await addDoc(adviceCollection, adviceData);
    return docRef.id;
  },

  /**
   * Get advice by ID
   */
  getById: async (adviceId: string): Promise<Advice | null> => {
    const docRef = doc(db, 'advice', adviceId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Advice;
  },

  /**
   * Update advice
   */
  update: async (
    adviceId: string,
    input: UpdateAdviceInput
  ): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to update advice');
    }

    const advice = await adviceService.getById(adviceId);
    if (!advice) {
      throw new Error('Advice not found');
    }

    if (advice.authorId !== currentUser.uid) {
      throw new Error('Only the author can update this advice');
    }

    const docRef = doc(db, 'advice', adviceId);
    await updateDoc(docRef, {
      ...input,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Delete advice
   */
  delete: async (adviceId: string): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to delete advice');
    }

    const advice = await adviceService.getById(adviceId);
    if (!advice) {
      throw new Error('Advice not found');
    }

    if (advice.authorId !== currentUser.uid) {
      throw new Error('Only the author can delete this advice');
    }

    const docRef = doc(db, 'advice', adviceId);
    await deleteDoc(docRef);
  },

  /**
   * Increment view count
   */
  incrementViewCount: async (adviceId: string): Promise<void> => {
    const docRef = doc(db, 'advice', adviceId);
    await updateDoc(docRef, {
      views: increment(1),
    });
  },

  /**
   * Update vote count (only upvotes for advice)
   */
  updateVoteCount: async (
    adviceId: string,
    action: 'add' | 'remove'
  ): Promise<void> => {
    const docRef = doc(db, 'advice', adviceId);
    const incrementValue = action === 'add' ? 1 : -1;

    await updateDoc(docRef, {
      upvotes: increment(incrementValue),
    });
  },

  /**
   * Mark as helpful
   */
  markAsHelpful: async (adviceId: string): Promise<void> => {
    const docRef = doc(db, 'advice', adviceId);
    await updateDoc(docRef, {
      helpfulCount: increment(1),
    });
  },
};
