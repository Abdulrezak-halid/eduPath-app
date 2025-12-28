/**
 * Questions Service
 * 
 * Service layer for question-related operations
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
  Question,
  CreateQuestionInput,
  UpdateQuestionInput,
} from '../models/firestore.models';
import { IQuestionFormData } from '../models/component-inputs';
import { validateCreateQuestion } from '../models/validators';

const questionsCollection = collection(db, 'questions');

export const questionsService = {
  /**
   * Create a new question
   */
  create: async (formData: IQuestionFormData): Promise<string> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to create a question');
    }

    const input: CreateQuestionInput = {
      ...formData,
      authorId: currentUser.uid,
      authorName: currentUser.displayName || 'Anonymous',
      authorPhotoURL: currentUser.photoURL || undefined,
    };

    // Validate input
    const validationErrors = validateCreateQuestion(input);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    const questionData: Omit<Question, 'id'> = {
      ...input,
      views: 0,
      upvotes: 0,
      downvotes: 0,
      answerCount: 0,
      hasAcceptedAnswer: false,
      acceptedAnswerId: undefined,
      status: 'active',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastActivityAt: Timestamp.now(),
    };

    const docRef = await addDoc(questionsCollection, questionData);
    return docRef.id;
  },

  /**
   * Get a question by ID
   */
  getById: async (questionId: string): Promise<Question | null> => {
    const docRef = doc(db, 'questions', questionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Question;
  },

  /**
   * Update a question
   */
  update: async (
    questionId: string,
    input: UpdateQuestionInput
  ): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to update a question');
    }

    const question = await questionsService.getById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId !== currentUser.uid) {
      throw new Error('Only the author can update this question');
    }

    const docRef = doc(db, 'questions', questionId);
    await updateDoc(docRef, {
      ...input,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Delete a question
   */
  delete: async (questionId: string): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to delete a question');
    }

    const question = await questionsService.getById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId !== currentUser.uid) {
      throw new Error('Only the author can delete this question');
    }

    const docRef = doc(db, 'questions', questionId);
    await deleteDoc(docRef);
  },

  /**
   * Increment view count
   */
  incrementViewCount: async (questionId: string): Promise<void> => {
    const docRef = doc(db, 'questions', questionId);
    await updateDoc(docRef, {
      views: increment(1),
    });
  },

  /**
   * Update vote counts
   */
  updateVoteCount: async (
    questionId: string,
    type: 'upvote' | 'downvote',
    action: 'add' | 'remove'
  ): Promise<void> => {
    const docRef = doc(db, 'questions', questionId);
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
  markAnswerAsAccepted: async (
    questionId: string,
    answerId: string
  ): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated');
    }

    const question = await questionsService.getById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    if (question.authorId !== currentUser.uid) {
      throw new Error('Only the question author can accept an answer');
    }

    const docRef = doc(db, 'questions', questionId);
    await updateDoc(docRef, {
      hasAcceptedAnswer: true,
      acceptedAnswerId: answerId,
      updatedAt: serverTimestamp(),
    });
  },
};
