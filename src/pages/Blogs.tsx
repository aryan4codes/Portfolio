import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/lib/blogService';
import { BlogPost } from '@/types/blog';
import BlogPostCard from '@/components/BlogPostCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, isAuthor } from '@/lib/auth';

const Blogs = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setIsAuthorized(user ? isAuthor(user) : false);
  }, []);

  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Error loading posts</h2>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Blog</h1>
                <p className="text-muted-foreground">
                  Thoughts, ideas, and stories
                </p>
              </div>
              {isAuthorized && (
                <Button
                  onClick={() => navigate('/blogs/write')}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
              )}
            </div>

            {!posts || posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No blog posts yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blogs;


