/**
 * Votes Service
 * 
 * Service layer for voting operations
 */

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Vote } from '../models/firestore.models';

const votesCollection = collection(db, 'votes');

export type VoteType = 'upvote' | 'downvote';

export const votesService = {
  /**
   * Get user's vote on content
   */
  getUserVote: async (
    contentType: 'question' | 'answer' | 'advice',
    contentId: string
  ): Promise<Vote | null> => {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    const q = query(
      votesCollection,
      where('userId', '==', currentUser.uid),
      where('contentType', '==', contentType),
      where('contentId', '==', contentId)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Vote;
  },

  /**
   * Cast or update a vote
   */
  vote: async (
    contentType: 'question' | 'answer' | 'advice',
    contentId: string,
    voteType: VoteType
  ): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to vote');
    }

    // Check for existing vote
    const existingVote = await votesService.getUserVote(contentType, contentId);

    if (existingVote && existingVote.id) {
      // Update existing vote
      const voteRef = doc(db, 'votes', existingVote.id);
      await setDoc(voteRef, {
        ...existingVote,
        voteType,
        updatedAt: Timestamp.now(),
      });
    } else {
      // Create new vote
      const voteData: Omit<Vote, 'id'> = {
        userId: currentUser.uid,
        contentType,
        contentId,
        voteType,
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(votesCollection), voteData);
    }
  },

  /**
   * Remove a vote
   */
  removeVote: async (
    contentType: 'question' | 'answer' | 'advice',
    contentId: string
  ): Promise<void> => {
    const existingVote = await votesService.getUserVote(contentType, contentId);
    
    if (existingVote && existingVote.id) {
      const voteRef = doc(db, 'votes', existingVote.id);
      await deleteDoc(voteRef);
    }
  },
};
