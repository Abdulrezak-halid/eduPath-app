/**
 * Development Seed Data
 * Use this to populate your Firestore database with sample data for testing
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Question, Advice, MajorField } from '../models';

export const seedQuestions = async () => {
  const questions: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'lastActivityAt'>[] = [
    {
      title: 'How to prepare for final exams effectively?',
      content: 'I have 5 final exams coming up in two weeks. What are the best strategies to study effectively and manage my time? I feel overwhelmed and don\'t know where to start.',
      major: 'computer-science' as MajorField,
      category: 'academic',
      tags: ['study-tips', 'time-management', 'exams'],
      authorId: 'seed-user-1',
      authorName: 'Sarah Johnson',
      authorPhotoURL: '',
      views: 45,
      upvotes: 12,
      downvotes: 0,
      answerCount: 2,
      hasAcceptedAnswer: false,
      status: 'active',
    },
    {
      title: 'Best programming languages to learn in 2026?',
      content: 'I\'m a first-year CS student and want to build a strong foundation. Which programming languages should I focus on learning first? Python? JavaScript? Java?',
      major: 'computer-science' as MajorField,
      category: 'career',
      tags: ['programming', 'career-advice', 'learning'],
      authorId: 'seed-user-4',
      authorName: 'Alex Rodriguez',
      authorPhotoURL: '',
      views: 89,
      upvotes: 23,
      downvotes: 1,
      answerCount: 1,
      hasAcceptedAnswer: false,
      status: 'active',
    },
    {
      title: 'How to balance work and university studies?',
      content: 'I need to work part-time to support myself while studying. How can I balance both without burning out? Any tips for time management?',
      major: 'business' as MajorField,
      category: 'general',
      tags: ['work-life-balance', 'time-management', 'mental-health'],
      authorId: 'seed-user-6',
      authorName: 'David Martinez',
      authorPhotoURL: '',
      views: 67,
      upvotes: 15,
      downvotes: 0,
      answerCount: 0,
      hasAcceptedAnswer: false,
      status: 'active',
    },
    {
      title: 'Best note-taking methods for lectures?',
      content: 'I struggle to keep up with lectures. What are the most effective note-taking methods? Should I use digital tools or stick to pen and paper?',
      major: 'engineering' as MajorField,
      category: 'academic',
      tags: ['note-taking', 'study-skills', 'productivity'],
      authorId: 'seed-user-7',
      authorName: 'Jessica Taylor',
      authorPhotoURL: '',
      views: 34,
      upvotes: 8,
      downvotes: 0,
      answerCount: 1,
      hasAcceptedAnswer: false,
      status: 'active',
    },
    {
      title: 'How to network effectively as a student?',
      content: 'I want to build professional connections but I\'m not sure how to start. What are the best ways to network while still in university?',
      major: 'business' as MajorField,
      category: 'career',
      tags: ['networking', 'career', 'professional-development'],
      authorId: 'seed-user-9',
      authorName: 'Rachel Green',
      authorPhotoURL: '',
      views: 56,
      upvotes: 19,
      downvotes: 0,
      answerCount: 0,
      hasAcceptedAnswer: false,
      status: 'active',
    },
  ];

  console.log('🌱 Seeding questions...');
  for (const question of questions) {
    await addDoc(collection(db, 'questions'), {
      ...question,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastActivityAt: serverTimestamp(),
    });
  }
  console.log('✅ Questions seeded successfully!');
};

export const seedAdvice = async () => {
  const advice: Omit<Advice, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'The Power of Early Morning Study Sessions',
      content: 'After 3 years of university, I\'ve discovered that studying early in the morning (5-7 AM) is incredibly effective. Here\'s why:\n\n1. **Zero Distractions**: Everyone is asleep, no notifications, complete silence\n2. **Fresh Mind**: Your brain is well-rested and can absorb information better\n3. **Productivity Boost**: Accomplishing work early gives you confidence for the rest of the day\n4. **Consistency**: Early mornings are predictable, unlike evenings which can be chaotic\n\nTips to start:\n- Go to bed early (10 PM latest)\n- Place your alarm across the room\n- Prepare your study materials the night before\n- Start with just 30 minutes and gradually increase\n\nThis changed my GPA from 2.8 to 3.7!',
      major: 'computer-science' as MajorField,
      category: 'study-tips',
      tags: ['study-routine', 'productivity', 'time-management'],
      authorId: 'seed-user-10',
      authorName: 'Kevin Park',
      authorPhotoURL: '',
      views: 234,
      upvotes: 45,
      helpfulCount: 38,
      bookmarks: 12,
      isVerified: false,
      status: 'active',
    },
    {
      title: 'How I Landed My Dream Internship',
      content: 'Want to share my journey to landing a software engineering internship at a top tech company:\n\n**Preparation (3 months before applications):**\n- Solved 200+ LeetCode problems (focus on medium difficulty)\n- Built 3 personal projects and hosted them on GitHub\n- Contributed to open-source projects\n- Created a professional portfolio website\n\n**Application Strategy:**\n- Applied to 50+ companies (don\'t limit yourself!)\n- Customized each resume for the specific role\n- Used LinkedIn to connect with recruiters\n- Asked for referrals from alumni\n\n**Interview Prep:**\n- Mock interviews with friends (crucial!)\n- Studied system design basics\n- Prepared behavioral questions using STAR method\n- Reviewed my projects thoroughly\n\n**Key Lesson:** Start early and be persistent. Rejection is part of the process!',
      major: 'computer-science' as MajorField,
      category: 'career',
      tags: ['internship', 'job-search', 'interview-prep', 'career'],
      authorId: 'seed-user-11',
      authorName: 'Sophia Lee',
      authorPhotoURL: '',
      views: 456,
      upvotes: 89,
      helpfulCount: 72,
      bookmarks: 34,
      isVerified: false,
      status: 'active',
    },
    {
      title: 'Managing Stress and Anxiety During Exam Season',
      content: 'Mental health is crucial during exams. Here\'s what helped me:\n\n**Daily Practices:**\n- 20 minutes of meditation using Headspace app\n- 30 minutes of exercise (even just walking)\n- 8 hours of sleep (non-negotiable!)\n- Healthy meals (avoid junk food binges)\n\n**Study Techniques:**\n- Break study into 90-minute blocks with breaks\n- Use the Pomodoro technique\n- Study with friends for accountability\n- Don\'t cram - start preparing 2 weeks early\n\n**When Feeling Overwhelmed:**\n- Take a 15-minute break to breathe\n- Talk to someone (friend, counselor, family)\n- Remember: grades don\'t define your worth\n- Focus on progress, not perfection\n\n**Campus Resources:**\n- Counseling services (free!)\n- Study skills workshops\n- Peer support groups\n\nYou\'ve got this!',
      major: 'medicine' as MajorField,
      category: 'mental-health',
      tags: ['mental-health', 'stress-management', 'exam-tips', 'wellness'],
      authorId: 'seed-user-12',
      authorName: 'Maya Patel',
      authorPhotoURL: '',
      views: 389,
      upvotes: 67,
      helpfulCount: 54,
      bookmarks: 28,
      isVerified: false,
      status: 'active',
    },
    {
      title: 'Building a Professional Network as an Introvert',
      content: 'As an introvert, networking felt terrifying. Here\'s how I overcame it:\n\n**Start Small:**\n- Connect with classmates first\n- Join one club related to your interests\n- Attend office hours to talk with professors\n- Participate in small group discussions\n\n**Online Networking:**\n- Optimize your LinkedIn profile\n- Share articles and comment thoughtfully\n- Join online communities in your field\n- Engage in Twitter/X discussions\n\n**Quality Over Quantity:**\n- Focus on meaningful 1-on-1 connections\n- Follow up after meeting someone\n- Offer help before asking for favors\n- Remember personal details about people\n\n**Networking Events:**\n- Set a goal (talk to 3 people, not 30)\n- Prepare conversation starters\n- Arrive early when it\'s less crowded\n- Find other introverts to connect with\n\n**Remember:** Networking is about building relationships, not collecting business cards!',
      major: 'business' as MajorField,
      category: 'career',
      tags: ['networking', 'introvert', 'career-development', 'communication'],
      authorId: 'seed-user-13',
      authorName: 'James Wilson',
      authorPhotoURL: '',
      views: 178,
      upvotes: 34,
      helpfulCount: 29,
      bookmarks: 15,
      isVerified: false,
      status: 'active',
    },
    {
      title: 'The Study Method That Doubled My Retention',
      content: 'I discovered the Feynman Technique and it transformed my learning:\n\n**How It Works:**\n1. Choose a concept you want to learn\n2. Teach it to a child (or pretend to)\n3. Identify gaps in your explanation\n4. Review and simplify\n\n**Why It\'s Effective:**\n- Forces you to truly understand, not just memorize\n- Reveals what you don\'t know\n- Simplifies complex topics\n- Makes information stick\n\n**My Implementation:**\n- Explain concepts to my roommate\n- Record myself teaching to an imaginary class\n- Write explanations in simple language\n- Create analogies and examples\n\n**Results:**\n- Exam scores improved by 15%\n- Better long-term retention\n- Deeper understanding of material\n- Less time needed for review\n\n**Pro Tip:** If you can\'t explain it simply, you don\'t understand it well enough!',
      major: 'engineering' as MajorField,
      category: 'study-tips',
      tags: ['study-methods', 'learning', 'memory', 'exam-prep'],
      authorId: 'seed-user-14',
      authorName: 'Olivia Brown',
      authorPhotoURL: '',
      views: 267,
      upvotes: 51,
      helpfulCount: 42,
      bookmarks: 19,
      isVerified: false,
      status: 'active',
    },
  ];

  console.log('🌱 Seeding advice...');
  for (const item of advice) {
    await addDoc(collection(db, 'advice'), {
      ...item,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  console.log('✅ Advice seeded successfully!');
};

export const seedAll = async () => {
  try {
    await seedQuestions();
    await seedAdvice();
    console.log('🎉 All seed data added successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};
