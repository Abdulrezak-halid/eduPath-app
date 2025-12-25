# Firestore Data Relationships

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FIRESTORE DATABASE                             │
└─────────────────────────────────────────────────────────────────────────┘

┌───────────────────┐
│      USERS        │ (Root Collection)
├───────────────────┤
│ • uid (PK)        │
│ • email           │───────┐
│ • displayName     │       │
│ • major           │       │
│ • reputationScore │       │
│ • badges[]        │       │
└─────────┬─────────┘       │
          │                 │
          │ 1:N             │ Author
          │                 │
    ┌─────┴─────────────────┴────────────────┐
    │                                        │
    │                                        │
    ▼                                        ▼
┌───────────────────┐                  ┌────────────────────┐
│ NOTIFICATIONS     │ (Subcollection)  │   QUESTIONS        │ (Root)
├───────────────────┤                  ├────────────────────┤
│ • userId (FK)     │                  │ • authorId (FK)    │
│ • type            │                  │ • title            │
│ • message         │                  │ • content          │
│ • relatedId       │                  │ • tags[]           │
│ • isRead          │                  │ • major            │
└───────────────────┘                  │ • answerCount      │
                                       │ • upvotes          │
┌───────────────────┐                  │ • acceptedAnswerId │
│  REPUTATION       │ (Subcollection)  └──────────┬─────────┘
├───────────────────┤                             │
│ • userId (FK)     │                             │ 1:N
│ • action          │                             │
│ • points          │                             ▼
│ • relatedId       │                  ┌────────────────────┐
└───────────────────┘                  │    ANSWERS         │ (Subcollection)
                                       ├────────────────────┤
┌───────────────────┐                  │ • questionId (FK)  │
│   BOOKMARKS       │ (Subcollection)  │ • authorId (FK)    │
├───────────────────┤                  │ • content          │
│ • userId (FK)     │                  │ • isAccepted       │
│ • contentType     │                  │ • upvotes          │
│ • contentId       │                  │ • downvotes        │
│ • contentTitle    │                  └────────────────────┘
└───────────────────┘


    USER (continued)
       │
       │ Author
       │
       ▼
┌────────────────────┐
│     ADVICE         │ (Root Collection)
├────────────────────┤
│ • authorId (FK)    │
│ • title            │
│ • content          │
│ • major            │
│ • category         │
│ • isVerified       │
│ • upvotes          │
│ • helpfulCount     │
└────────────────────┘


┌────────────────────┐
│     MODULES        │ (Root Collection)
├────────────────────┤
│ • slug             │
│ • title            │
│ • description      │
│ • content[]        │
│ • category         │
│ • isPublished      │
│ • views            │
└────────────────────┘


┌────────────────────┐
│      VOTES         │ (Root Collection)
├────────────────────┤
│ • userId (FK)      │
│ • contentType      │──────┐
│ • contentId (FK)   │      │ Points to:
│ • voteType         │      │ - Question
└────────────────────┘      │ - Answer
                            │ - Advice
                            └──────────


┌────────────────────┐
│    COMMENTS        │ (Root Collection)
├────────────────────┤
│ • parentType       │──────┐
│ • parentId (FK)    │      │ Points to:
│ • authorId (FK)    │      │ - Answer
│ • content          │      │ - Advice
│ • upvotes          │      │
└────────────────────┘      └──────────
```

## Relationship Types

### One-to-Many (1:N)

**User → Questions**
- One user can ask many questions
- Questions store `authorId` foreign key
- User maintains `questionsAsked` counter

**User → Answers**
- One user can post many answers
- Answers store `authorId` foreign key  
- User maintains `answersGiven` counter

**User → Advice**
- One user can share many advice posts
- Advice stores `authorId` foreign key
- User maintains `adviceShared` counter

**Question → Answers**
- One question has many answers
- Answers stored as subcollection under question
- Question maintains `answerCount` counter

**User → Notifications** (Subcollection)
- One user receives many notifications
- Stored as subcollection for scalability
- Efficient user-specific queries

**User → Reputation Events** (Subcollection)
- One user has many reputation events
- Stored as subcollection for history
- User maintains aggregate `reputationScore`

**User → Bookmarks** (Subcollection)
- One user can bookmark many items
- Stored as subcollection for privacy
- References questions, advice, or modules

### Many-to-Many (M:N)

**Users ↔ Content (via Votes)**
- Many users can vote on many content items
- Votes collection acts as junction table
- Document ID: `{userId}_{contentType}_{contentId}`
- Prevents duplicate votes
- Denormalized counters: `upvotes`, `downvotes`

**Content ↔ Tags**
- Content items have many tags
- Tags can apply to many content items
- Stored as array field `tags[]`
- Queryable via `array-contains`

### Polymorphic Relationships

**Comments → Content**
- Comments can belong to Answers OR Advice
- Uses `parentType` + `parentId` pattern
- Flexible relationship without multiple collections

**Votes → Content**
- Votes can apply to Questions, Answers, OR Advice
- Uses `contentType` + `contentId` pattern
- Single collection for all vote types

**Notifications → Content**
- Notifications can reference any content type
- Uses `relatedType` + `relatedId` pattern
- Flexible notification system

## Data Flow Examples

### Example 1: User Asks a Question

```
1. User document (users/{userId})
   └─> Read user data (displayName, photoURL)

2. Create Question document (questions/{questionId})
   ├─> Store authorId, authorName, authorPhotoURL
   └─> Initialize counters (views: 0, upvotes: 0, answerCount: 0)

3. Update User document
   └─> Increment questionsAsked counter

4. Create Reputation Event (users/{userId}/reputation/{eventId})
   ├─> action: 'question_asked'
   ├─> points: +5
   └─> relatedId: questionId

5. Update User reputationScore
   └─> Increment by 5 points
```

### Example 2: User Answers a Question

```
1. User document (users/{userId})
   └─> Read user data

2. Question document (questions/{questionId})
   └─> Read question to validate it exists

3. Create Answer (questions/{questionId}/answers/{answerId})
   ├─> Store authorId, authorName
   └─> Initialize: upvotes: 0, isAccepted: false

4. Update Question
   └─> Increment answerCount

5. Update User (answerer)
   └─> Increment answersGiven

6. Create Reputation Event
   ├─> action: 'answer_posted'
   └─> points: +10

7. Create Notification (users/{questionAuthorId}/notifications/{notifId})
   ├─> type: 'answer'
   ├─> message: "{userName} answered your question"
   └─> relatedId: questionId
```

### Example 3: Answer Accepted as Best

```
1. Update Answer (questions/{questionId}/answers/{answerId})
   └─> Set isAccepted: true

2. Update Question (questions/{questionId})
   ├─> Set hasAcceptedAnswer: true
   └─> Set acceptedAnswerId: answerId

3. Update User (answer author)
   └─> Increment acceptedAnswers

4. Create Reputation Event (users/{answerAuthorId}/reputation/{eventId})
   ├─> action: 'answer_accepted'
   └─> points: +15

5. Create Notification
   ├─> type: 'accepted_answer'
   └─> message: "Your answer was accepted!"
```

### Example 4: User Upvotes Content

```
1. Check Vote exists (votes/{userId}_{contentType}_{contentId})
   └─> If exists: User already voted (prevent duplicate)

2. Create/Update Vote document
   ├─> userId, contentType, contentId
   └─> voteType: 'upvote'

3. Update Content document (Question/Answer/Advice)
   └─> Increment upvotes counter

4. Update Content Author
   └─> Increment upvotesReceived

5. Create Reputation Event (content author)
   ├─> action: 'question_upvoted' | 'answer_upvoted' | 'advice_upvoted'
   └─> points: +5 or +10
```

## Denormalization Strategy

### What We Denormalize

**Author Information** (Copied to content documents)
```typescript
// Instead of just authorId
{
  authorId: "user123",
  authorName: "John Doe",           // Denormalized
  authorPhotoURL: "https://..."     // Denormalized
}
```

**Why?**
- Avoid extra reads when displaying content
- Most list views need author name/photo
- Author updates are rare

**Counters** (Aggregated in parent documents)
```typescript
// Question document
{
  answerCount: 5,        // Denormalized from answers subcollection
  upvotes: 12,           // Denormalized from votes collection
  views: 150             // Denormalized from analytics
}

// User document
{
  questionsAsked: 5,     // Denormalized counter
  answersGiven: 12,      // Denormalized counter
  reputationScore: 150   // Denormalized aggregate
}
```

**Why?**
- Instant access without subcollection queries
- Critical for sorting and filtering
- Updated via transactions

### What We DON'T Denormalize

**Answer Content** - Stays in subcollection
**Reputation Events** - Stays in subcollection  
**Notifications** - Stays in subcollection
**Vote Details** - Stays in votes collection

**Why?**
- Large/unbounded data
- Not needed for list views
- Queried on-demand only

## Query Patterns

### Common Queries

**Get all questions for a major**
```typescript
query(
  collection(db, 'questions'),
  where('major', '==', 'computer-science'),
  orderBy('createdAt', 'desc'),
  limit(20)
)
```

**Get user's questions**
```typescript
query(
  collection(db, 'questions'),
  where('authorId', '==', userId),
  orderBy('createdAt', 'desc')
)
```

**Get answers for a question**
```typescript
query(
  collection(db, 'questions', questionId, 'answers'),
  orderBy('isAccepted', 'desc'),  // Accepted first
  orderBy('upvotes', 'desc')      // Then by votes
)
```

**Get user's notifications (unread first)**
```typescript
query(
  collection(db, 'users', userId, 'notifications'),
  where('isRead', '==', false),
  orderBy('createdAt', 'desc')
)
```

**Get top advice for a major**
```typescript
query(
  collection(db, 'advice'),
  where('major', '==', 'engineering'),
  where('status', '==', 'active'),
  orderBy('upvotes', 'desc'),
  limit(10)
)
```

## Performance Considerations

### Indexes Required

All compound queries above require indexes:
- `questions`: (major, createdAt)
- `questions`: (authorId, createdAt)
- `answers`: (isAccepted, upvotes)
- `notifications`: (isRead, createdAt)
- `advice`: (major, status, upvotes)

### Read Optimization

**Pagination** - Use limit + startAfter
**Caching** - Cache frequently accessed data
**Listeners** - Use real-time listeners sparingly
**Batch Reads** - Read multiple documents together

### Write Optimization

**Batched Writes** - Combine related updates
**Transactions** - For counter increments
**Cloud Functions** - For complex operations
**Async Updates** - Non-critical updates in background
