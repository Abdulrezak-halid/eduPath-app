/**
 * Model Usage Examples
 * 
 * This file demonstrates how to use the Firestore data models
 * throughout the application.
 */

import { Timestamp } from 'firebase/firestore';
import type {
  User,
  CreateUserInput,
  Question,
  CreateQuestionInput,
  Answer,
  CreateAnswerInput,
  Advice,
  CreateAdviceInput,
  Notification,
  CreateNotificationInput,
  ReputationEvent,
  CreateReputationEventInput,
  Module,
} from './firestore.models';

// ============================================================================
// User Examples
// ============================================================================

/**
 * Example: Creating a new user document
 */
export const exampleCreateUser: CreateUserInput = {
  uid: 'user123abc',
  email: 'john.doe@example.com',
  displayName: 'John Doe',
  major: 'computer-science',
  university: 'MIT',
};

/**
 * Example: Complete user document
 */
export const exampleUser: User = {
  id: 'user123abc',
  uid: 'user123abc',
  email: 'john.doe@example.com',
  emailVerified: true,
  displayName: 'John Doe',
  photoURL: 'https://example.com/photos/john.jpg',
  bio: 'CS student at MIT, passionate about AI and machine learning',
  major: 'computer-science',
  university: 'MIT',
  graduationYear: 2025,
  currentYear: 3,
  role: 'student',
  isActive: true,
  isBanned: false,
  reputationScore: 150,
  badges: ['first_question', 'first_answer', 'helpful_advice'],
  questionsAsked: 5,
  answersGiven: 12,
  adviceShared: 3,
  upvotesReceived: 45,
  acceptedAnswers: 4,
  followers: 10,
  following: 15,
  emailNotifications: true,
  publicProfile: true,
  lastLoginAt: Timestamp.now(),
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

// ============================================================================
// Question Examples
// ============================================================================

/**
 * Example: Creating a new question
 */
export const exampleCreateQuestion: CreateQuestionInput = {
  title: 'How difficult is Computer Science at MIT?',
  content: 'I am considering applying to MIT for CS. Can current students share their experience about the difficulty level, workload, and how to prepare?',
  tags: ['computer-science', 'mit', 'difficulty', 'advice'],
  authorId: 'user123abc',
  authorName: 'John Doe',
  authorPhotoURL: 'https://example.com/photos/john.jpg',
  major: 'computer-science',
  category: 'academic',
};

/**
 * Example: Complete question document
 */
export const exampleQuestion: Question = {
  id: 'question123',
  title: 'How difficult is Computer Science at MIT?',
  content: 'I am considering applying to MIT for CS. Can current students share their experience about the difficulty level, workload, and how to prepare?',
  tags: ['computer-science', 'mit', 'difficulty', 'advice'],
  authorId: 'user123abc',
  authorName: 'John Doe',
  authorPhotoURL: 'https://example.com/photos/john.jpg',
  major: 'computer-science',
  category: 'academic',
  status: 'active',
  views: 150,
  upvotes: 12,
  downvotes: 1,
  answerCount: 5,
  hasAcceptedAnswer: true,
  acceptedAnswerId: 'answer456',
  attachments: [],
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
  lastActivityAt: Timestamp.now(),
};

// ============================================================================
// Answer Examples
// ============================================================================

/**
 * Example: Creating a new answer
 */
export const exampleCreateAnswer: CreateAnswerInput = {
  questionId: 'question123',
  content: 'As a 4th year CS student at MIT, I can tell you that it is challenging but very rewarding. Here are some tips: 1) Stay consistent with your studies, 2) Form study groups, 3) Don\'t hesitate to ask for help...',
  authorId: 'user456def',
  authorName: 'Jane Smith',
  authorPhotoURL: 'https://example.com/photos/jane.jpg',
};

/**
 * Example: Complete answer document
 */
export const exampleAnswer: Answer = {
  id: 'answer456',
  questionId: 'question123',
  content: 'As a 4th year CS student at MIT, I can tell you that it is challenging but very rewarding. Here are some tips: 1) Stay consistent with your studies, 2) Form study groups, 3) Don\'t hesitate to ask for help...',
  authorId: 'user456def',
  authorName: 'Jane Smith',
  authorPhotoURL: 'https://example.com/photos/jane.jpg',
  isAccepted: true,
  isDeleted: false,
  upvotes: 25,
  downvotes: 2,
  commentCount: 3,
  attachments: [],
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

// ============================================================================
// Advice Examples
// ============================================================================

/**
 * Example: Creating advice
 */
export const exampleCreateAdvice: CreateAdviceInput = {
  title: 'Top 5 Time Management Tips for Engineering Students',
  content: 'After 4 years in Mechanical Engineering, here are my top time management strategies that helped me succeed...',
  major: 'engineering',
  category: 'time-management',
  tags: ['engineering', 'productivity', 'time-management', 'study-tips'],
  authorId: 'user789ghi',
  authorName: 'Mike Johnson',
  authorPhotoURL: 'https://example.com/photos/mike.jpg',
  authorMajor: 'engineering',
  authorGraduationYear: 2024,
};

/**
 * Example: Complete advice document
 */
export const exampleAdvice: Advice = {
  id: 'advice789',
  title: 'Top 5 Time Management Tips for Engineering Students',
  content: 'After 4 years in Mechanical Engineering, here are my top time management strategies that helped me succeed...',
  major: 'engineering',
  category: 'time-management',
  tags: ['engineering', 'productivity', 'time-management', 'study-tips'],
  authorId: 'user789ghi',
  authorName: 'Mike Johnson',
  authorPhotoURL: 'https://example.com/photos/mike.jpg',
  authorMajor: 'engineering',
  authorGraduationYear: 2024,
  isVerified: true,
  status: 'active',
  views: 500,
  upvotes: 78,
  helpfulCount: 125,
  bookmarks: 45,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

// ============================================================================
// Notification Examples
// ============================================================================

/**
 * Example: Creating a notification
 */
export const exampleCreateNotification: CreateNotificationInput = {
  userId: 'user123abc',
  type: 'answer',
  title: 'New Answer to Your Question',
  message: 'Jane Smith answered your question about CS difficulty at MIT',
  relatedId: 'question123',
  relatedType: 'question',
  actorId: 'user456def',
  actorName: 'Jane Smith',
  actorPhotoURL: 'https://example.com/photos/jane.jpg',
  actionUrl: '/questions/question123',
};

/**
 * Example: Complete notification document
 */
export const exampleNotification: Notification = {
  id: 'notif123',
  userId: 'user123abc',
  type: 'answer',
  title: 'New Answer to Your Question',
  message: 'Jane Smith answered your question about CS difficulty at MIT',
  relatedId: 'question123',
  relatedType: 'question',
  actorId: 'user456def',
  actorName: 'Jane Smith',
  actorPhotoURL: 'https://example.com/photos/jane.jpg',
  isRead: false,
  isArchived: false,
  actionUrl: '/questions/question123',
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

// ============================================================================
// Reputation Examples
// ============================================================================

/**
 * Example: Creating a reputation event
 */
export const exampleCreateReputation: CreateReputationEventInput = {
  userId: 'user456def',
  action: 'answer_accepted',
  relatedId: 'answer456',
  relatedType: 'answer',
  description: 'Your answer was accepted',
};

/**
 * Example: Complete reputation event document
 */
export const exampleReputationEvent: ReputationEvent = {
  id: 'rep123',
  userId: 'user456def',
  action: 'answer_accepted',
  points: 15,
  relatedId: 'answer456',
  relatedType: 'answer',
  description: 'Your answer was accepted',
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

// ============================================================================
// Module Examples
// ============================================================================

/**
 * Example: Complete module document
 */
export const exampleModule: Module = {
  id: 'module-academic-planning',
  slug: 'academic-planning',
  title: 'Academic Planning',
  description: 'Plan your academic journey strategically with course selection, study schedules, and exam preparation guides',
  icon: 'SchoolIcon',
  content: [
    {
      id: 'content-1',
      type: 'article',
      title: 'Strategic Course Selection',
      description: 'Learn how to choose courses that align with your goals',
      content: 'When selecting courses, consider your career goals, prerequisites, and workload balance...',
      icon: 'BookOpenIcon',
      order: 1,
    },
    {
      id: 'content-2',
      type: 'article',
      title: 'Creating Study Schedules',
      description: 'Build effective study schedules that work for you',
      content: 'A good study schedule should account for peak productivity hours, breaks, and consistent review sessions...',
      icon: 'CalendarIcon',
      order: 2,
    },
    {
      id: 'content-3',
      type: 'article',
      title: 'Exam Preparation Strategies',
      description: 'Master exam preparation with proven techniques',
      content: 'Start preparing early, practice with past papers, and use active recall methods...',
      icon: 'AcademicCapIcon',
      order: 3,
    },
  ],
  category: 'learning',
  order: 1,
  isPublished: true,
  isFeatured: true,
  views: 1250,
  completions: 340,
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
  publishedAt: Timestamp.now(),
};
