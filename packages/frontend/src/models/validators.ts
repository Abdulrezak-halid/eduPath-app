/**
 * Model Validators
 * 
 * Validation functions for Firestore data models.
 * Use these before writing data to Firestore to ensure data integrity.
 */

import type {
  CreateUserInput,
  UpdateUserInput,
  CreateQuestionInput,
  UpdateQuestionInput,
  CreateAnswerInput,
  CreateAdviceInput,
  MajorField,
} from './firestore.models';

// ============================================================================
// Constants
// ============================================================================

export const VALID_MAJORS: MajorField[] = [
  'computer-science',
  'engineering',
  'medicine',
  'business',
  'law',
  'arts',
  'science',
  'education',
  'social-sciences',
  'other',
];

export const MIN_TITLE_LENGTH = 10;
export const MAX_TITLE_LENGTH = 200;
export const MIN_CONTENT_LENGTH = 20;
export const MAX_CONTENT_LENGTH = 10000;
export const MAX_TAGS = 5;
export const MIN_TAGS = 1;

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

/**
 * Validate display name
 */
export const isValidDisplayName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50;
};

/**
 * Validate title (for questions, advice)
 */
export const isValidTitle = (title: string): boolean => {
  return title.length >= MIN_TITLE_LENGTH && title.length <= MAX_TITLE_LENGTH;
};

/**
 * Validate content (for questions, answers, advice)
 */
export const isValidContent = (content: string): boolean => {
  return content.length >= MIN_CONTENT_LENGTH && content.length <= MAX_CONTENT_LENGTH;
};

/**
 * Validate tags array
 */
export const isValidTags = (tags: string[]): boolean => {
  if (tags.length < MIN_TAGS || tags.length > MAX_TAGS) {
    return false;
  }
  
  // Check each tag is valid
  return tags.every(tag => {
    return tag.length >= 2 && tag.length <= 30 && /^[a-z0-9-]+$/.test(tag);
  });
};

/**
 * Validate major field
 */
export const isValidMajor = (major: string): major is MajorField => {
  return VALID_MAJORS.includes(major as MajorField);
};

// ============================================================================
// Model Validators
// ============================================================================

/**
 * Validate CreateUserInput
 */
export const validateCreateUser = (input: CreateUserInput): string[] => {
  const errors: string[] = [];

  if (!input.uid || input.uid.trim().length === 0) {
    errors.push('UID is required');
  }

  if (!isValidEmail(input.email)) {
    errors.push('Invalid email format');
  }

  if (!isValidDisplayName(input.displayName)) {
    errors.push('Display name must be 2-50 characters');
  }

  if (input.major && !isValidMajor(input.major)) {
    errors.push('Invalid major field');
  }

  return errors;
};

/**
 * Validate UpdateUserInput
 */
export const validateUpdateUser = (input: UpdateUserInput): string[] => {
  const errors: string[] = [];

  if (input.displayName && !isValidDisplayName(input.displayName)) {
    errors.push('Display name must be 2-50 characters');
  }

  if (input.major && !isValidMajor(input.major)) {
    errors.push('Invalid major field');
  }

  if (input.currentYear && (input.currentYear < 1 || input.currentYear > 7)) {
    errors.push('Current year must be between 1 and 7');
  }

  if (input.graduationYear) {
    const currentYear = new Date().getFullYear();
    if (input.graduationYear < currentYear - 10 || input.graduationYear > currentYear + 10) {
      errors.push('Graduation year seems invalid');
    }
  }

  return errors;
};

/**
 * Validate CreateQuestionInput
 */
export const validateCreateQuestion = (input: CreateQuestionInput): string[] => {
  const errors: string[] = [];

  if (!isValidTitle(input.title)) {
    errors.push(`Title must be ${MIN_TITLE_LENGTH}-${MAX_TITLE_LENGTH} characters`);
  }

  if (!isValidContent(input.content)) {
    errors.push(`Content must be ${MIN_CONTENT_LENGTH}-${MAX_CONTENT_LENGTH} characters`);
  }

  if (!isValidTags(input.tags)) {
    errors.push(`Must have ${MIN_TAGS}-${MAX_TAGS} valid tags`);
  }

  if (!input.authorId || input.authorId.trim().length === 0) {
    errors.push('Author ID is required');
  }

  if (!input.authorName || input.authorName.trim().length === 0) {
    errors.push('Author name is required');
  }

  if (input.major && !isValidMajor(input.major)) {
    errors.push('Invalid major field');
  }

  return errors;
};

/**
 * Validate UpdateQuestionInput
 */
export const validateUpdateQuestion = (input: UpdateQuestionInput): string[] => {
  const errors: string[] = [];

  if (input.title && !isValidTitle(input.title)) {
    errors.push(`Title must be ${MIN_TITLE_LENGTH}-${MAX_TITLE_LENGTH} characters`);
  }

  if (input.content && !isValidContent(input.content)) {
    errors.push(`Content must be ${MIN_CONTENT_LENGTH}-${MAX_CONTENT_LENGTH} characters`);
  }

  if (input.tags && !isValidTags(input.tags)) {
    errors.push(`Must have ${MIN_TAGS}-${MAX_TAGS} valid tags`);
  }

  return errors;
};

/**
 * Validate CreateAnswerInput
 */
export const validateCreateAnswer = (input: CreateAnswerInput): string[] => {
  const errors: string[] = [];

  if (!input.questionId || input.questionId.trim().length === 0) {
    errors.push('Question ID is required');
  }

  if (!isValidContent(input.content)) {
    errors.push(`Content must be ${MIN_CONTENT_LENGTH}-${MAX_CONTENT_LENGTH} characters`);
  }

  if (!input.authorId || input.authorId.trim().length === 0) {
    errors.push('Author ID is required');
  }

  if (!input.authorName || input.authorName.trim().length === 0) {
    errors.push('Author name is required');
  }

  return errors;
};

/**
 * Validate CreateAdviceInput
 */
export const validateCreateAdvice = (input: CreateAdviceInput): string[] => {
  const errors: string[] = [];

  if (!isValidTitle(input.title)) {
    errors.push(`Title must be ${MIN_TITLE_LENGTH}-${MAX_TITLE_LENGTH} characters`);
  }

  if (!isValidContent(input.content)) {
    errors.push(`Content must be ${MIN_CONTENT_LENGTH}-${MAX_CONTENT_LENGTH} characters`);
  }

  if (!isValidMajor(input.major)) {
    errors.push('Invalid major field');
  }

  if (!isValidTags(input.tags)) {
    errors.push(`Must have ${MIN_TAGS}-${MAX_TAGS} valid tags`);
  }

  if (!input.authorId || input.authorId.trim().length === 0) {
    errors.push('Author ID is required');
  }

  if (!input.authorName || input.authorName.trim().length === 0) {
    errors.push('Author name is required');
  }

  if (input.authorGraduationYear) {
    const currentYear = new Date().getFullYear();
    if (input.authorGraduationYear < currentYear - 50 || input.authorGraduationYear > currentYear + 10) {
      errors.push('Graduation year seems invalid');
    }
  }

  return errors;
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Sanitize string input (remove extra whitespace, trim)
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

/**
 * Sanitize tag (lowercase, remove spaces, replace with hyphens)
 */
export const sanitizeTag = (tag: string): string => {
  return tag.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

/**
 * Sanitize tags array
 */
export const sanitizeTags = (tags: string[]): string[] => {
  return Array.from(new Set(tags.map(sanitizeTag).filter(tag => tag.length >= 2)));
};

/**
 * Check if validation passed (no errors)
 */
export const isValid = (errors: string[]): boolean => {
  return errors.length === 0;
};

/**
 * Format validation errors for display
 */
export const formatErrors = (errors: string[]): string => {
  return errors.join('; ');
};
