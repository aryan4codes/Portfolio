import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/types/blog';
import { formatDate, getContentPreview } from '@/lib/blogUtils';
import { Clock } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/read?p=${post.id}`);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-serif mb-2">{post.title}</CardTitle>
        <CardDescription className="flex items-center gap-4 text-sm">
          <span>{post.authorName}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime} min read
          </span>
          <span>{formatDate(post.createdAt)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {getContentPreview(post.content)}
        </p>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;


