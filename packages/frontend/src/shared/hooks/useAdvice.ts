/**
 * useAdvice Hook
 * 
 * Custom hook for fetching advice with filters
 */

import { useState, useEffect, useCallback } from 'react';
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
import { Advice, MajorField } from '../../models/firestore.models';

export type AdviceCategory = 'time-management' | 'study-tips' | 'career' | 'social' | 'mental-health' | 'general';

export interface IAdviceFilters {
  major?: MajorField;
  category?: AdviceCategory;
  tags?: string[];
  searchQuery?: string;
}

interface IUseAdviceResult {
  advice: Advice[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useAdvice = (filters: IAdviceFilters = {}): IUseAdviceResult => {
  const [advice, setAdvice] = useState<Advice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAdvice = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const adviceCollection = collection(db, 'advice');
      const constraints: QueryConstraint[] = [];

      // Apply filters
      if (filters.major) {
        constraints.push(where('major', '==', filters.major));
      }

      if (filters.category) {
        constraints.push(where('category', '==', filters.category));
      }

      if (filters.tags && filters.tags.length > 0) {
        constraints.push(where('tags', 'array-contains-any', filters.tags));
      }

      // Simple ordering - no composite index needed
      constraints.push(orderBy('createdAt', 'desc'));
      constraints.push(limit(50));

      const q = query(adviceCollection, ...constraints);
      const querySnapshot = await getDocs(q);

      let adviceData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Advice[];
      
      // Filter inactive advice on client side
      adviceData = adviceData.filter(a => a.status === 'active');
      
      // Sort by upvotes on client side
      adviceData.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

      // Client-side search filtering
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const searchLower = filters.searchQuery.toLowerCase();
        adviceData = adviceData.filter(
          (item) =>
            item.title.toLowerCase().includes(searchLower) ||
            item.content.toLowerCase().includes(searchLower)
        );
      }

      setAdvice(adviceData);
    } catch (err) {
      console.error('Error fetching advice:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch advice'));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAdvice();
  }, [fetchAdvice]);

  return {
    advice,
    loading,
    error,
    refetch: fetchAdvice,
  };
};
