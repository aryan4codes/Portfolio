import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { BlogPost, BlogPostInput } from '@/types/blog';
import { calculateReadTime } from './blogUtils';

const POSTS_COLLECTION = 'posts';

/**
 * Get all blog posts ordered by creation date (newest first)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const postsRef = collection(db, POSTS_COLLECTION);
  const q = query(postsRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as BlogPost));
}

/**
 * Get a single blog post by ID
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  const postRef = doc(db, POSTS_COLLECTION, id);
  const postSnap = await getDoc(postRef);
  
  if (!postSnap.exists()) {
    return null;
  }
  
  return {
    id: postSnap.id,
    ...postSnap.data()
  } as BlogPost;
}

/**
 * Create a new blog post
 */
export async function createPost(postInput: BlogPostInput): Promise<string> {
  const readTime = calculateReadTime(postInput.content);
  
  const postData = {
    ...postInput,
    createdAt: Timestamp.now(),
    readTime
  };
  
  const docRef = await addDoc(collection(db, POSTS_COLLECTION), postData);
  return docRef.id;
}

/**
 * Delete a blog post (only if user is the author)
 */
export async function deletePost(id: string, authorId: string): Promise<void> {
  const post = await getPostById(id);
  
  if (!post) {
    throw new Error('Post not found');
  }
  
  if (post.authorId !== authorId) {
    throw new Error('Unauthorized: You can only delete your own posts');
  }
  
  await deleteDoc(doc(db, POSTS_COLLECTION, id));
}


