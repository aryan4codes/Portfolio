import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { BlogPost, BlogPostInput } from '@/types/blog';
import { calculateReadTime } from './blogUtils';

const POSTS_COLLECTION = 'posts';
const MAX_CONTENT_SIZE = 1000000; // 1MB in bytes (Firestore limit is ~1MB)

/**
 * Clean content by removing base64 images and temporary placeholders
 * This prevents Firestore document size limit errors
 */
function cleanContent(content: string): string {
  let cleaned = content;
  
  // Remove any base64 data URLs (data:image/...)
  cleaned = cleaned.replace(/<img[^>]*src=["']data:image\/[^"']*["'][^>]*>/gi, '');
  
  // Remove any images with temp IDs that weren't replaced
  cleaned = cleaned.replace(/<img[^>]*data-temp-id=["'][^"']*["'][^>]*>/gi, '');
  
  // Remove empty image tags
  cleaned = cleaned.replace(/<img[^>]*>/gi, (match) => {
    // Only keep images with valid http/https URLs
    if (match.includes('src="http') || match.includes("src='http")) {
      return match;
    }
    return '';
  });
  
  return cleaned;
}

/**
 * Validate content size before saving to Firestore
 */
function validateContentSize(content: string): void {
  const contentSize = new Blob([content]).size;
  
  if (contentSize > MAX_CONTENT_SIZE) {
    const sizeInMB = (contentSize / 1024 / 1024).toFixed(2);
    throw new Error(
      `Content is too large (${sizeInMB}MB). Firestore has a 1MB limit per document. ` +
      `Please reduce the content size or remove large images.`
    );
  }
}

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
  // Clean content to remove base64 images and temp placeholders
  const cleanedContent = cleanContent(postInput.content);
  
  // Validate content size
  validateContentSize(cleanedContent);
  
  const readTime = calculateReadTime(cleanedContent);
  
  const postData = {
    ...postInput,
    content: cleanedContent,
    createdAt: Timestamp.now(),
    readTime
  };
  
  const docRef = await addDoc(collection(db, POSTS_COLLECTION), postData);
  return docRef.id;
}

/**
 * Update a blog post (only if user is the author)
 */
export async function updatePost(
  id: string,
  authorId: string,
  updates: { title?: string; content?: string }
): Promise<void> {
  const post = await getPostById(id);
  
  if (!post) {
    throw new Error('Post not found');
  }
  
  if (post.authorId !== authorId) {
    throw new Error('Unauthorized: You can only update your own posts');
  }
  
  const updateData: any = {};
  
  if (updates.title !== undefined) {
    updateData.title = updates.title.trim();
  }
  
  if (updates.content !== undefined) {
    // Clean content to remove base64 images and temp placeholders
    const cleanedContent = cleanContent(updates.content.trim());
    
    // Validate content size
    validateContentSize(cleanedContent);
    
    updateData.content = cleanedContent;
    // Recalculate read time if content changed
    updateData.readTime = calculateReadTime(cleanedContent);
  }
  
  await updateDoc(doc(db, POSTS_COLLECTION, id), updateData);
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


