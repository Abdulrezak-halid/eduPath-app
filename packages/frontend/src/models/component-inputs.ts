/**
 * Component Input Types
 * 
 * Simplified input types for components (without auth fields)
 */

import { MajorField } from './firestore.models';

// Question form data (without author fields)
export interface IQuestionFormData {
  title: string;
  content: string;
  tags: string[];
  major?: MajorField;
  category: 'academic' | 'career' | 'social' | 'financial' | 'general';
}

// Answer form data (without author fields)
export interface IAnswerFormData {
  content: string;
}

// Advice form data (without author fields)
export interface IAdviceFormData {
  title: string;
  content: string;
  tags: string[];
  major: MajorField;
  category: 'time-management' | 'study-tips' | 'career' | 'social' | 'mental-health' | 'general';
}
