# Firestore Collections Summary

## 📊 Collections Overview

| Collection | Type | Description | Key Fields |
|------------|------|-------------|------------|
| **users** | Root | User profiles and account data | uid, email, displayName, major, reputationScore |
| **questions** | Root | User questions about university/majors | title, content, tags, authorId, category |
| **answers** | Sub | Answers to questions | content, authorId, isAccepted, upvotes |
| **advice** | Root | Experience-based advice | title, content, major, category, isVerified |
| **modules** | Root | Educational content modules | slug, title, content[], category |
| **notifications** | Sub | User notifications | type, message, relatedId, isRead |
| **reputation** | Sub | Reputation point history | action, points, relatedId |
| **votes** | Root | Vote tracking (upvotes/downvotes) | userId, contentType, contentId, voteType |
| **comments** | Root | Comments on content | parentType, parentId, content, authorId |
| **bookmarks** | Sub | User saved content | contentType, contentId, contentTitle |

## 🗂️ Collection Structure

```
firestore/
│
├── users/ (Root Collection)
│   └── {userId}/ (Document)
│       ├── Field: uid, email, displayName, role, major, university
│       ├── Field: reputationScore, badges[], questionsAsked, answersGiven
│       ├── Field: createdAt, updatedAt, lastLoginAt
│       │
│       ├── notifications/ (Subcollection)
│       │   └── {notificationId}/
│       │       ├── Field: type, title, message, relatedId
│       │       └── Field: isRead, createdAt
│       │
│       ├── reputation/ (Subcollection)
│       │   └── {eventId}/
│       │       ├── Field: action, points, relatedId
│       │       └── Field: description, createdAt
│       │
│       └── bookmarks/ (Subcollection)
│           └── {bookmarkId}/
│               └── Field: contentType, contentId, contentTitle
│
├── questions/ (Root Collection)
│   └── {questionId}/ (Document)
│       ├── Field: title, content, tags[], category, major
│       ├── Field: authorId, authorName, status
│       ├── Field: views, upvotes, answerCount, hasAcceptedAnswer
│       ├── Field: createdAt, updatedAt, lastActivityAt
│       │
│       └── answers/ (Subcollection)
│           └── {answerId}/
│               ├── Field: content, authorId, authorName
│               ├── Field: isAccepted, upvotes, downvotes
│               └── Field: createdAt, updatedAt
│
├── advice/ (Root Collection)
│   └── {adviceId}/ (Document)
│       ├── Field: title, content, tags[], category, major
│       ├── Field: authorId, authorName, authorMajor, authorGraduationYear
│       ├── Field: isVerified, status
│       ├── Field: views, upvotes, helpfulCount
│       └── Field: createdAt, updatedAt
│
├── modules/ (Root Collection)
│   └── {moduleId}/ (Document)
│       ├── Field: slug, title, description, icon
│       ├── Field: content[] (array of ModuleContent)
│       ├── Field: category, order, isPublished, isFeatured
│       └── Field: views, completions, createdAt, updatedAt
│
├── votes/ (Root Collection)
│   └── {userId}_{contentType}_{contentId}/ (Document)
│       ├── Field: userId, contentType, contentId
│       └── Field: voteType, createdAt
│
└── comments/ (Root Collection)
    └── {commentId}/ (Document)
        ├── Field: parentType, parentId, content
        ├── Field: authorId, authorName, isDeleted
        └── Field: upvotes, createdAt, updatedAt
```

## 🔗 Relationships

### User ↔ Content
- **One-to-Many**: One user can create many questions, answers, and advice
- **Tracked by**: `authorId` field in content documents
- **Stats**: User document maintains counters (questionsAsked, answersGiven, adviceShared)

### Question ↔ Answers
- **One-to-Many**: One question has many answers (subcollection)
- **Parent-Child**: Answers stored as subcollection under question
- **Best Answer**: Question tracks acceptedAnswerId

### User ↔ Notifications
- **One-to-Many**: One user receives many notifications (subcollection)
- **Parent-Child**: Notifications stored as subcollection under user

### User ↔ Reputation
- **One-to-Many**: One user has many reputation events (subcollection)
- **Aggregation**: User.reputationScore is sum of all points

### Content ↔ Votes
- **Many-to-Many**: Users can vote on many content items
- **Junction**: Separate votes collection with composite ID
- **Uniqueness**: Document ID prevents duplicate votes

### Content ↔ Comments
- **One-to-Many**: Content items can have many comments
- **Reference**: Comments reference parent via parentType + parentId

## 📝 Document ID Conventions

| Collection | ID Format | Example |
|------------|-----------|---------|
| users | Firebase Auth UID | `abc123xyz` |
| questions | Auto-generated | `dkJf83jKds` |
| answers | Auto-generated | `pL9m2nKjfD` |
| advice | Auto-generated | `qR4t5yUiOp` |
| modules | Auto-generated or slug | `academic-planning` |
| notifications | Auto-generated | `nK8j9mNvCx` |
| reputation | Auto-generated | `rP2q3wErTy` |
| votes | Composite | `user123_question_quest456` |
| comments | Auto-generated | `cL6k7jMnBv` |
| bookmarks | Auto-generated | `bN1m2xCvZa` |

## 🎯 Indexes Needed

### Required Composite Indexes

1. **Questions**
   ```
   Collection: questions
   Fields: status ASC, createdAt DESC
   Fields: major ASC, createdAt DESC
   Fields: category ASC, createdAt DESC
   Fields: tags ARRAY, createdAt DESC
   ```

2. **Answers**
   ```
   Collection: questions/{questionId}/answers
   Fields: isAccepted DESC, upvotes DESC
   Fields: createdAt DESC
   ```

3. **Advice**
   ```
   Collection: advice
   Fields: major ASC, upvotes DESC
   Fields: category ASC, createdAt DESC
   Fields: status ASC, createdAt DESC
   ```

4. **Notifications**
   ```
   Collection: users/{userId}/notifications
   Fields: isRead ASC, createdAt DESC
   ```

5. **Reputation**
   ```
   Collection: users/{userId}/reputation
   Fields: createdAt DESC
   ```

## 🔒 Security Rules

### Basic Rules Structure

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow create: if isOwner(userId);
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
      
      // Subcollections
      match /notifications/{notifId} {
        allow read: if isOwner(userId);
        allow write: if false; // Only created by Cloud Functions
      }
      
      match /reputation/{repId} {
        allow read: if isOwner(userId);
        allow write: if false; // Only created by Cloud Functions
      }
      
      match /bookmarks/{bookmarkId} {
        allow read, write: if isOwner(userId);
      }
    }
    
    // Questions collection
    match /questions/{questionId} {
      allow read: if resource.data.status == 'active';
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.authorId) || isAdmin();
      allow delete: if isOwner(resource.data.authorId) || isAdmin();
      
      // Answers subcollection
      match /answers/{answerId} {
        allow read: if true;
        allow create: if isAuthenticated();
        allow update: if isOwner(resource.data.authorId) || isAdmin();
        allow delete: if isOwner(resource.data.authorId) || isAdmin();
      }
    }
    
    // Advice collection
    match /advice/{adviceId} {
      allow read: if resource.data.status == 'active';
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.authorId) || isAdmin();
      allow delete: if isOwner(resource.data.authorId) || isAdmin();
    }
    
    // Modules collection (admin only write)
    match /modules/{moduleId} {
      allow read: if resource.data.isPublished == true;
      allow write: if isAdmin();
    }
    
    // Votes collection
    match /votes/{voteId} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    
    // Comments collection
    match /comments/{commentId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.authorId);
      allow delete: if isOwner(resource.data.authorId) || isAdmin();
    }
  }
}
```

## 📊 Data Size Estimates

| Collection | Estimated Docs | Avg Size | Total Size (1000 users) |
|------------|----------------|----------|-------------------------|
| users | 1,000 | 2 KB | 2 MB |
| questions | 5,000 | 3 KB | 15 MB |
| answers | 15,000 | 1 KB | 15 MB |
| advice | 2,000 | 3 KB | 6 MB |
| modules | 50 | 10 KB | 0.5 MB |
| notifications | 50,000 | 0.5 KB | 25 MB |
| reputation | 100,000 | 0.3 KB | 30 MB |
| votes | 100,000 | 0.2 KB | 20 MB |
| comments | 30,000 | 0.5 KB | 15 MB |
| bookmarks | 10,000 | 0.2 KB | 2 MB |
| **TOTAL** | | | **~131 MB** |

## 💰 Cost Estimation (Monthly)

Based on Firestore pricing (as of 2025):
- Document reads: $0.06 per 100K
- Document writes: $0.18 per 100K
- Document deletes: $0.02 per 100K
- Storage: $0.18 per GB

**Estimated monthly costs for 1,000 active users:**
- Reads: ~10M reads/month = $6.00
- Writes: ~1M writes/month = $1.80
- Storage: ~0.15 GB = $0.03
- **Total: ~$8/month**

## 🚀 Optimization Tips

1. **Use subcollections** for user-specific data (notifications, reputation)
2. **Denormalize** frequently accessed data (author name, photo URL)
3. **Implement pagination** for large collections
4. **Use caching** for static content (modules)
5. **Batch writes** when possible
6. **Delete old notifications** periodically
7. **Archive old questions** after inactivity
8. **Use Cloud Functions** for complex operations
9. **Implement rate limiting** to prevent spam
10. **Monitor usage** with Firebase Console
