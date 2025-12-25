/**
 * Firestore Data Models
 * 
 * This file contains all TypeScript interfaces and types for Firestore collections.
 * Each interface represents a document structure in the database.
 */

import { Timestamp } from 'firebase/firestore';

// ============================================================================
// Base Types
// ============================================================================

/**
 * Base interface for all Firestore documents
 */
export interface BaseDocument {
  id?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * User role types
 */
export type UserRole = 'student' | 'alumni' | 'advisor' | 'admin' | 'moderator';

/**
 * Question/Advice status
 */
export type ContentStatus = 'active' | 'closed' | 'deleted' | 'flagged';

/**
 * Notification types
 */
export type NotificationType = 
  | 'answer' 
  | 'comment' 
  | 'upvote' 
  | 'accepted_answer'
  | 'mention'
  | 'badge'
  | 'milestone'
  | 'moderation';

/**
 * Badge types for user achievements
 */
export type BadgeType = 
  | 'first_question'
  | 'first_answer'
  | 'helpful_advice'
  | 'top_contributor'
  | 'expert'
  | 'mentor'
  | 'verified_student';

/**
 * University majors/fields
 */
export type MajorField = 
  | 'computer-science'
  | 'engineering'
  | 'medicine'
  | 'business'
  | 'law'
  | 'arts'
  | 'science'
  | 'education'
  | 'social-sciences'
  | 'other';

// ============================================================================
// User Collection
// ============================================================================

/**
 * User document structure
 * Collection: users
 * Document ID: Firebase Auth UID
 */
export interface User extends BaseDocument {
  // Authentication info
  uid: string;
  email: string;
  emailVerified: boolean;
  
  // Profile info
  displayName: string;
  photoURL?: string;
  bio?: string;
  
  // Academic info
  major?: MajorField;
  university?: string;
  graduationYear?: number;
  currentYear?: number; // 1, 2, 3, 4 for undergrad
  
  // Role and status
  role: UserRole;
  isActive: boolean;
  isBanned: boolean;
  
  // Reputation and stats
  reputationScore: number;
  badges: BadgeType[];
  
  // Activity counters
  questionsAsked: number;
  answersGiven: number;
  adviceShared: number;
  upvotesReceived: number;
  acceptedAnswers: number;
  
  // Social
  followers: number;
  following: number;
  
  // Settings
  emailNotifications: boolean;
  publicProfile: boolean;
  
  // Timestamps
  lastLoginAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * User create input (for new user registration)
 */
export interface CreateUserInput {
  uid: string;
  email: string;
  displayName: string;
  major?: MajorField;
  university?: string;
}

/**
 * User update input
 */
export interface UpdateUserInput {
  displayName?: string;
  photoURL?: string;
  bio?: string;
  major?: MajorField;
  university?: string;
  graduationYear?: number;
  currentYear?: number;
  emailNotifications?: boolean;
  publicProfile?: boolean;
}

// ============================================================================
// Question Collection
// ============================================================================

/**
 * Question document structure
 * Collection: questions
 */
export interface Question extends BaseDocument {
  // Content
  title: string;
  content: string;
  tags: string[];
  
  // Author info
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  
  // Categorization
  major?: MajorField;
  category: 'academic' | 'career' | 'social' | 'financial' | 'general';
  
  // Status and moderation
  status: ContentStatus;
  
  // Engagement metrics
  views: number;
  upvotes: number;
  downvotes: number;
  answerCount: number;
  
  // Best answer
  hasAcceptedAnswer: boolean;
  acceptedAnswerId?: string;
  
  // Media
  attachments?: string[]; // URLs to files in Storage
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActivityAt: Timestamp;
}

/**
 * Question create input
 */
export interface CreateQuestionInput {
  title: string;
  content: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  major?: MajorField;
  category: Question['category'];
  attachments?: string[];
}

/**
 * Question update input
 */
export interface UpdateQuestionInput {
  title?: string;
  content?: string;
  tags?: string[];
  status?: ContentStatus;
  attachments?: string[];
}

// ============================================================================
// Answer Collection
// ============================================================================

/**
 * Answer document structure
 * Collection: questions/{questionId}/answers (subcollection)
 */
export interface Answer extends BaseDocument {
  // Parent reference
  questionId: string;
  
  // Content
  content: string;
  
  // Author info
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  
  // Status
  isAccepted: boolean;
  isDeleted: boolean;
  
  // Engagement
  upvotes: number;
  downvotes: number;
  commentCount: number;
  
  // Media
  attachments?: string[];
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Answer create input
 */
export interface CreateAnswerInput {
  questionId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  attachments?: string[];
}

/**
 * Answer update input
 */
export interface UpdateAnswerInput {
  content?: string;
  attachments?: string[];
}

// ============================================================================
// Advice Collection
// ============================================================================

/**
 * Advice document structure
 * Collection: advice
 */
export interface Advice extends BaseDocument {
  // Content
  title: string;
  content: string;
  
  // Categorization
  major: MajorField;
  category: 'time-management' | 'study-tips' | 'career' | 'social' | 'mental-health' | 'general';
  tags: string[];
  
  // Author info
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  authorMajor?: MajorField;
  authorGraduationYear?: number;
  
  // Verification (for alumni/experts)
  isVerified: boolean;
  
  // Status
  status: ContentStatus;
  
  // Engagement
  views: number;
  upvotes: number;
  helpfulCount: number; // "This was helpful" clicks
  bookmarks: number;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Advice create input
 */
export interface CreateAdviceInput {
  title: string;
  content: string;
  major: MajorField;
  category: Advice['category'];
  tags: string[];
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  authorMajor?: MajorField;
  authorGraduationYear?: number;
}

/**
 * Advice update input
 */
export interface UpdateAdviceInput {
  title?: string;
  content?: string;
  major?: MajorField;
  category?: Advice['category'];
  tags?: string[];
  status?: ContentStatus;
}

// ============================================================================
// Module Collection
// ============================================================================

/**
 * Module document structure
 * Collection: modules
 */
export interface Module extends BaseDocument {
  // Basic info
  slug: string; // e.g., 'academic-planning'
  title: string;
  description: string;
  icon: string; // Icon name or path
  
  // Content
  content: ModuleContent[];
  
  // Categorization
  category: 'learning' | 'guidance' | 'skills' | 'lifestyle';
  order: number; // Display order
  
  // Status
  isPublished: boolean;
  isFeatured: boolean;
  
  // Engagement
  views: number;
  completions: number;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}

/**
 * Module content section
 */
export interface ModuleContent {
  id: string;
  type: 'article' | 'video' | 'quiz' | 'tool';
  title: string;
  description: string;
  content?: string; // For articles
  videoUrl?: string; // For videos
  icon?: string;
  order: number;
}

/**
 * Module create input
 */
export interface CreateModuleInput {
  slug: string;
  title: string;
  description: string;
  icon: string;
  content: ModuleContent[];
  category: Module['category'];
  order: number;
}

/**
 * Module update input
 */
export interface UpdateModuleInput {
  title?: string;
  description?: string;
  icon?: string;
  content?: ModuleContent[];
  category?: Module['category'];
  order?: number;
  isPublished?: boolean;
  isFeatured?: boolean;
}

// ============================================================================
// Notification Collection
// ============================================================================

/**
 * Notification document structure
 * Collection: users/{userId}/notifications (subcollection)
 */
export interface Notification extends BaseDocument {
  // Recipient
  userId: string;
  
  // Notification details
  type: NotificationType;
  title: string;
  message: string;
  
  // Related content
  relatedId?: string; // Question ID, Answer ID, etc.
  relatedType?: 'question' | 'answer' | 'advice' | 'user';
  
  // Actor (who triggered the notification)
  actorId?: string;
  actorName?: string;
  actorPhotoURL?: string;
  
  // Status
  isRead: boolean;
  isArchived: boolean;
  
  // Link
  actionUrl?: string; // Where to navigate when clicked
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  readAt?: Timestamp;
}

/**
 * Notification create input
 */
export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedId?: string;
  relatedType?: Notification['relatedType'];
  actorId?: string;
  actorName?: string;
  actorPhotoURL?: string;
  actionUrl?: string;
}

// ============================================================================
// Reputation Collection
// ============================================================================

/**
 * Reputation event document structure
 * Collection: users/{userId}/reputation (subcollection)
 */
export interface ReputationEvent extends BaseDocument {
  // User
  userId: string;
  
  // Event details
  action: ReputationAction;
  points: number; // Can be positive or negative
  
  // Related content
  relatedId?: string;
  relatedType?: 'question' | 'answer' | 'advice';
  
  // Description
  description: string;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Reputation actions and their point values
 */
export type ReputationAction =
  | 'question_asked'          // +5
  | 'answer_posted'           // +10
  | 'answer_accepted'         // +15
  | 'answer_upvoted'          // +10
  | 'question_upvoted'        // +5
  | 'advice_posted'           // +10
  | 'advice_upvoted'          // +5
  | 'advice_marked_helpful'   // +2
  | 'badge_earned'            // Varies
  | 'profile_completed'       // +20
  | 'content_downvoted'       // -2
  | 'spam_flagged'            // -50
  | 'content_deleted';        // -10

/**
 * Reputation points configuration
 */
export const REPUTATION_POINTS: Record<ReputationAction, number> = {
  question_asked: 5,
  answer_posted: 10,
  answer_accepted: 15,
  answer_upvoted: 10,
  question_upvoted: 5,
  advice_posted: 10,
  advice_upvoted: 5,
  advice_marked_helpful: 2,
  badge_earned: 50,
  profile_completed: 20,
  content_downvoted: -2,
  spam_flagged: -50,
  content_deleted: -10,
};

/**
 * Reputation create input
 */
export interface CreateReputationEventInput {
  userId: string;
  action: ReputationAction;
  relatedId?: string;
  relatedType?: ReputationEvent['relatedType'];
  description: string;
}

// ============================================================================
// Vote Collection (for tracking user votes)
// ============================================================================

/**
 * Vote document structure
 * Collection: votes
 * Document ID: {userId}_{contentType}_{contentId}
 */
export interface Vote {
  id?: string;
  userId: string;
  contentType: 'question' | 'answer' | 'advice';
  contentId: string;
  voteType: 'upvote' | 'downvote';
  createdAt: Timestamp;
}

// ============================================================================
// Comment Collection (for answers and advice)
// ============================================================================

/**
 * Comment document structure
 * Collection: comments
 */
export interface Comment extends BaseDocument {
  // Parent reference
  parentType: 'answer' | 'advice';
  parentId: string;
  
  // Content
  content: string;
  
  // Author
  authorId: string;
  authorName: string;
  authorPhotoURL?: string;
  
  // Status
  isDeleted: boolean;
  
  // Engagement
  upvotes: number;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ============================================================================
// Bookmark Collection (for saving content)
// ============================================================================

/**
 * Bookmark document structure
 * Collection: users/{userId}/bookmarks (subcollection)
 */
export interface Bookmark {
  id?: string;
  userId: string;
  contentType: 'question' | 'advice' | 'module';
  contentId: string;
  contentTitle: string;
  createdAt: Timestamp;
}
