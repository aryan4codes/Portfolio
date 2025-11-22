import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogEditor from '@/components/BlogEditor';
import { Button } from '@/components/ui/button';
import { createPost } from '@/lib/blogService';
import { getCurrentUser } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const AUTHOR_NAME = 'Aryan Rajpurkar';

const BlogWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('Not authenticated');
      }

      return createPost({
        title: title.trim(),
        content: content.trim(),
        authorId: user.uid,
        authorName: AUTHOR_NAME,
      });
    },
    onSuccess: (postId) => {
      toast({
        title: 'Success',
        description: 'Blog post published successfully!',
      });
      navigate(`/blogs/read?p=${postId}`);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to publish post',
        variant: 'destructive',
      });
    },
  });

  const handlePublish = () => {
    if (!title.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a title',
        variant: 'destructive',
      });
      return;
    }

    // Strip HTML tags to check if there's actual content
    const textContent = content.replace(/<[^>]*>/g, ' ').trim();
    if (!textContent) {
      toast({
        title: 'Validation Error',
        description: 'Please enter content',
        variant: 'destructive',
      });
      return;
    }

    mutation.mutate();
  };

  return (
    <AuthGuard>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold">Write New Post</h1>
              <Button
                onClick={handlePublish}
                disabled={mutation.isPending || !title.trim() || !content.replace(/<[^>]*>/g, ' ').trim()}
                className="flex items-center gap-2"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  'Publish'
                )}
              </Button>
            </div>

            <BlogEditor
              title={title}
              content={content}
              onTitleChange={setTitle}
              onContentChange={setContent}
            />
          </div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default BlogWrite;

