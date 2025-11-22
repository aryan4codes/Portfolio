import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

/**
 * Strip HTML tags from content
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Calculate estimated reading time in minutes
 * Average reading speed: 200 words per minute
 * Works with both plain text and HTML content
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  // Strip HTML tags if present
  const text = stripHtml(content);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime); // Minimum 1 minute
}

/**
 * Format Firestore timestamp to readable date string
 */
export function formatDate(timestamp: Timestamp): string {
  return format(timestamp.toDate(), 'MMMM d, yyyy');
}

/**
 * Generate a unique post ID
 */
export function generatePostId(): string {
  return `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get content preview (first N characters)
 * Strips HTML tags for clean preview
 */
export function getContentPreview(content: string, maxLength: number = 150): string {
  // Strip HTML tags for preview
  const text = stripHtml(content);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

