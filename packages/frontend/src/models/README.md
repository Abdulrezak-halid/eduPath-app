# Firestore Data Models

This directory contains TypeScript interfaces and types for all Firestore collections in the EduPath application.

## Collections Overview

### 1. **Users** (`users`)
Stores user profile information, academic details, and reputation.

**Document ID**: Firebase Auth UID

**Key Fields**:
- Profile: `displayName`, `photoURL`, `bio`
- Academic: `major`, `university`, `graduationYear`, `currentYear`
- Role: `role` (student, alumni, advisor, admin, moderator)
- Reputation: `reputationScore`, `badges`
- Stats: `questionsAsked`, `answersGiven`, `adviceShared`

**Example**:
```typescript
import { User, CreateUserInput } from '@/models';

const newUser: CreateUserInput = {
  uid: authUser.uid,
  email: authUser.email,
  displayName: "John Doe",
  major: "computer-science",
  university: "MIT"
};
```

### 2. **Questions** (`questions`)
User-submitted questions about university, majors, and student life.

**Document ID**: Auto-generated

**Key Fields**:
- Content: `title`, `content`, `tags`
- Author: `authorId`, `authorName`
- Category: `major`, `category`
- Stats: `views`, `upvotes`, `answerCount`
- Best Answer: `hasAcceptedAnswer`, `acceptedAnswerId`

**Example**:
```typescript
import { Question, CreateQuestionInput } from '@/models';

const question: CreateQuestionInput = {
  title: "How difficult is Computer Science?",
  content: "I'm considering CS major but worried about...",
  tags: ["computer-science", "difficulty", "advice"],
  authorId: user.uid,
  authorName: user.displayName,
  category: "academic",
  major: "computer-science"
};
```

### 3. **Answers** (`questions/{questionId}/answers`)
Answers to questions (stored as subcollection).

**Document ID**: Auto-generated

**Key Fields**:
- Content: `content`, `attachments`
- Author: `authorId`, `authorName`
- Status: `isAccepted`, `isDeleted`
- Engagement: `upvotes`, `downvotes`, `commentCount`

**Example**:
```typescript
import { Answer, CreateAnswerInput } from '@/models';

const answer: CreateAnswerInput = {
  questionId: "question123",
  content: "CS is challenging but rewarding. Here's my experience...",
  authorId: user.uid,
  authorName: user.displayName
};
```

### 4. **Advice** (`advice`)
Experience-based advice from students and alumni.

**Document ID**: Auto-generated

**Key Fields**:
- Content: `title`, `content`, `tags`
- Category: `major`, `category` (time-management, study-tips, etc.)
- Author: `authorId`, `authorMajor`, `authorGraduationYear`
- Verification: `isVerified` (for verified alumni)
- Engagement: `views`, `upvotes`, `helpfulCount`

**Example**:
```typescript
import { Advice, CreateAdviceInput } from '@/models';

const advice: CreateAdviceInput = {
  title: "My Top 5 Study Tips for Engineering Students",
  content: "After 4 years in Mechanical Engineering...",
  major: "engineering",
  category: "study-tips",
  tags: ["engineering", "productivity", "time-management"],
  authorId: user.uid,
  authorName: user.displayName,
  authorMajor: "engineering",
  authorGraduationYear: 2024
};
```

### 5. **Modules** (`modules`)
Educational content modules (Academic Planning, Career Guidance, etc.).

**Document ID**: Auto-generated (or custom slug)

**Key Fields**:
- Info: `slug`, `title`, `description`, `icon`
- Content: `content[]` (array of articles, videos, quizzes)
- Category: `category`, `order`
- Status: `isPublished`, `isFeatured`

**Example**:
```typescript
import { Module, CreateModuleInput } from '@/models';

const module: CreateModuleInput = {
  slug: "academic-planning",
  title: "Academic Planning",
  description: "Plan your academic journey strategically",
  icon: "SchoolIcon",
  category: "learning",
  order: 1,
  content: [
    {
      id: "1",
      type: "article",
      title: "Course Selection Strategy",
      description: "Learn how to choose courses wisely",
      content: "...",
      order: 1
    }
  ]
};
```

### 6. **Notifications** (`users/{userId}/notifications`)
User notifications (subcollection under users).

**Document ID**: Auto-generated

**Key Fields**:
- Type: `type` (answer, upvote, badge, etc.)
- Content: `title`, `message`
- Related: `relatedId`, `relatedType`
- Actor: `actorId`, `actorName`
- Status: `isRead`, `isArchived`

**Example**:
```typescript
import { Notification, CreateNotificationInput } from '@/models';

const notification: CreateNotificationInput = {
  userId: targetUser.uid,
  type: "answer",
  title: "New Answer to Your Question",
  message: "John Doe answered your question about CS major",
  relatedId: "question123",
  relatedType: "question",
  actorId: answerer.uid,
  actorName: answerer.displayName,
  actionUrl: "/questions/question123"
};
```

### 7. **Reputation** (`users/{userId}/reputation`)
Reputation point history (subcollection under users).

**Document ID**: Auto-generated

**Key Fields**:
- Action: `action` (question_asked, answer_upvoted, etc.)
- Points: `points` (can be positive or negative)
- Related: `relatedId`, `relatedType`
- Description: `description`

**Point Values**:
```typescript
import { REPUTATION_POINTS } from '@/models';

// REPUTATION_POINTS.question_asked = 5
// REPUTATION_POINTS.answer_accepted = 15
// REPUTATION_POINTS.advice_posted = 10
```

**Example**:
```typescript
import { ReputationEvent, CreateReputationEventInput } from '@/models';

const repEvent: CreateReputationEventInput = {
  userId: user.uid,
  action: "answer_accepted",
  relatedId: "answer123",
  relatedType: "answer",
  description: "Your answer was accepted"
};
```

## Additional Collections

### 8. **Votes** (`votes`)
Tracks user votes to prevent duplicate voting.

**Document ID**: `{userId}_{contentType}_{contentId}`

### 9. **Comments** (`comments`)
Comments on answers and advice.

### 10. **Bookmarks** (`users/{userId}/bookmarks`)
User's saved content.

## Database Structure

```
firestore/
├── users/
│   ├── {userId}/
│   │   ├── notifications/ (subcollection)
│   │   ├── reputation/ (subcollection)
│   │   └── bookmarks/ (subcollection)
│
├── questions/
│   └── {questionId}/
│       └── answers/ (subcollection)
│
├── advice/
│   └── {adviceId}/
│
├── modules/
│   └── {moduleId}/
│
├── votes/
│   └── {userId}_{contentType}_{contentId}/
│
└── comments/
    └── {commentId}/
```

## Usage Guidelines

### Importing Models

```typescript
// Import specific models
import { User, Question, Answer } from '@/models';

// Import types
import type { CreateUserInput, UpdateQuestionInput } from '@/models';

// Import enums/constants
import { REPUTATION_POINTS, UserRole } from '@/models';
```

### Type Safety

All models include:
- ✅ TypeScript interfaces for type safety
- ✅ Input types for create/update operations
- ✅ Enum types for restricted values
- ✅ Optional fields clearly marked
- ✅ JSDoc comments for documentation

### Firestore Integration

Models use `Timestamp` from Firebase for dates:

```typescript
import { Timestamp } from 'firebase/firestore';

const question = {
  // ... other fields
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now()
};
```

### Converting Firestore Documents

```typescript
import { Question } from '@/models';
import { doc, getDoc } from 'firebase/firestore';

const questionDoc = await getDoc(doc(db, 'questions', questionId));
const question: Question = {
  id: questionDoc.id,
  ...questionDoc.data()
} as Question;
```

## Best Practices

1. **Always use TypeScript types** when working with Firestore data
2. **Use create/update input types** for form validation
3. **Validate data** before writing to Firestore
4. **Use enums** for restricted values (UserRole, ContentStatus, etc.)
5. **Document ID conventions**:
   - Auto-generated: Most collections
   - UID: Users collection
   - Composite: Votes collection
6. **Subcollections** for related data (answers, notifications, reputation)
7. **Timestamps** using Firebase's `Timestamp` type

## Future Enhancements

- [ ] Add validation schemas (Yup/Zod)
- [ ] Add search index types
- [ ] Add analytics event types
- [ ] Add report/moderation types
- [ ] Add messaging/chat types
