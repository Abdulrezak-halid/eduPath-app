/**
 * Answers Service
 * 
 * Service layer for answer-related operations
 */

import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  increment,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import {
  Answer,
  CreateAnswerInput,
  UpdateAnswerInput,
} from '../models/firestore.models';
import { IAnswerFormData } from '../models/component-inputs';
import { validateCreateAnswer } from '../models/validators';

export const answersService = {
  /**
   * Create a new answer
   */
  create: async (
    questionId: string,
    formData: IAnswerFormData
  ): Promise<string> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to create an answer');
    }

    const input: CreateAnswerInput = {
      ...formData,
      questionId,
      authorId: currentUser.uid,
      authorName: currentUser.displayName || 'Anonymous',
      authorPhotoURL: currentUser.photoURL || undefined,
    };

    // Validate input
    const validationErrors = validateCreateAnswer(input);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    const answerData: Omit<Answer, 'id'> = {
      ...input,
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      isAccepted: false,
      isDeleted: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const answersCollection = collection(
      db,
      'questions',
      questionId,
      'answers'
    );
    const docRef = await addDoc(answersCollection, answerData);

    // Update question answer count
    const questionRef = doc(db, 'questions', questionId);
    await updateDoc(questionRef, {
      answerCount: increment(1),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  },

  /**
   * Get an answer by ID
   */
  getById: async (
    questionId: string,
    answerId: string
  ): Promise<Answer | null> => {
    const docRef = doc(db, 'questions', questionId, 'answers', answerId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Answer;
  },

  /**
   * Get all answers for a question
   */
  getByQuestionId: async (questionId: string): Promise<Answer[]> => {
    const answersCollection = collection(
      db,
      'questions',
      questionId,
      'answers'
    );
    const q = query(
      answersCollection,
      where('status', '==', 'published'),
      orderBy('isAccepted', 'desc'),
      orderBy('upvotes', 'desc'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Answer[];
  },

  /**
   * Update an answer
   */
  update: async (
    questionId: string,
    answerId: string,
    input: UpdateAnswerInput
  ): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to update an answer');
    }

    const answer = await answersService.getById(questionId, answerId);
    if (!answer) {
      throw new Error('Answer not found');
    }

    if (answer.authorId !== currentUser.uid) {
      throw new Error('Only the author can update this answer');
    }

    const docRef = doc(db, 'questions', questionId, 'answers', answerId);
    await updateDoc(docRef, {
      ...input,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Delete an answer
   */
  delete: async (questionId: string, answerId: string): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to delete an answer');
    }

    const answer = await answersService.getById(questionId, answerId);
    if (!answer) {
      throw new Error('Answer not found');
    }

    if (answer.authorId !== currentUser.uid) {
      throw new Error('Only the author can delete this answer');
    }

    const docRef = doc(db, 'questions', questionId, 'answers', answerId);
    await deleteDoc(docRef);

    // Update question answer count
    const questionRef = doc(db, 'questions', questionId);
    await updateDoc(questionRef, {
      answerCount: increment(-1),
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Update vote counts
   */
  updateVoteCount: async (
    questionId: string,
    answerId: string,
    type: 'upvote' | 'downvote',
    action: 'add' | 'remove'
  ): Promise<void> => {
    const docRef = doc(db, 'questions', questionId, 'answers', answerId);
    const incrementValue = action === 'add' ? 1 : -1;

    if (type === 'upvote') {
      await updateDoc(docRef, {
        upvotes: increment(incrementValue),
      });
    } else {
      await updateDoc(docRef, {
        downvotes: increment(incrementValue),
      });
    }
  },

  /**
   * Mark answer as accepted
   */
  markAsAccepted: async (
    questionId: string,
    answerId: string
  ): Promise<void> => {
    const docRef = doc(db, 'questions', questionId, 'answers', answerId);
    await updateDoc(docRef, {
      isAccepted: true,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Unmark answer as accepted
   */
  unmarkAsAccepted: async (
    questionId: string,
    answerId: string
  ): Promise<void> => {
    const docRef = doc(db, 'questions', questionId, 'answers', answerId);
    await updateDoc(docRef, {
      isAccepted: false,
      updatedAt: serverTimestamp(),
    });
  },
};
