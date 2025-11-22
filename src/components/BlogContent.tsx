import React from 'react';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/blogUtils';
import { Clock, User } from 'lucide-react';

interface BlogContentProps {
  post: BlogPost;
}

const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  return (
    <article className="blog-container py-8">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.authorName}</span>
          </div>
          <span>{formatDate(post.createdAt)}</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </header>
      
      <div 
        className="blog-content prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default BlogContent;

