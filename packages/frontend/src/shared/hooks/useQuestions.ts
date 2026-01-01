/**
 * useQuestions Hook
 * 
 * Custom hook for fetching and managing questions from Firestore
 */

import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import type { Question, MajorField } from '../../models';

export interface IQuestionFilters {
  major?: MajorField;
  category?: string;
  tags?: string[];
  searchQuery?: string;
}

export interface IUseQuestionsReturn {
  questions: Question[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useQuestions = (
  filters: IQuestionFilters = {},
  limitCount: number = 20
): IUseQuestionsReturn => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const constraints: QueryConstraint[] = [];

      // Add major filter
      if (filters.major) {
        constraints.push(where('major', '==', filters.major));
      }

      // Add category filter
      if (filters.category) {
        constraints.push(where('category', '==', filters.category));
      }

      // Add tag filter (can only filter by one tag at a time in Firestore)
      if (filters.tags && filters.tags.length > 0) {
        constraints.push(where('tags', 'array-contains', filters.tags[0]));
      }

      // Simple ordering - no composite index needed
      constraints.push(orderBy('createdAt', 'desc'));
      constraints.push(limit(limitCount));

      const q = query(collection(db, 'questions'), ...constraints);
      const querySnapshot = await getDocs(q);

      let fetchedQuestions: Question[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Question));
      
      // Filter out inactive questions on client side
      fetchedQuestions = fetchedQuestions.filter(q => q.status === 'active');

      // Client-side search filtering if search query exists
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const searchLower = filters.searchQuery.toLowerCase();
        fetchedQuestions = fetchedQuestions.filter(
          (q) =>
            q.title.toLowerCase().includes(searchLower) ||
            q.content.toLowerCase().includes(searchLower) ||
            q.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }

      setQuestions(fetchedQuestions);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [filters.major, filters.category, filters.tags?.join(','), filters.searchQuery, limitCount]);

  return {
    questions,
    loading,
    error,
    refetch: fetchQuestions,
  };
};
