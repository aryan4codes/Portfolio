import { Timestamp } from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  readTime: number; // in minutes
}

export interface BlogPostInput {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
}

