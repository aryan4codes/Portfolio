import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogEditor from '@/components/BlogEditor';
import { Button } from '@/components/ui/button';
import { createPost, updatePost, getPostById } from '@/lib/blogService';
import { getCurrentUser } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { BlogPost } from '@/types/blog';

const AUTHOR_NAME = 'Aryan Rajpurkar';

const BlogWrite = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const editPostId = searchParams.get('edit');
  const isEditMode = !!editPostId;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Load post data if in edit mode
  const { data: existingPost, isLoading: isLoadingPost } = useQuery<BlogPost | null>({
    queryKey: ['blogPost', editPostId],
    queryFn: () => (editPostId ? getPostById(editPostId) : Promise.resolve(null)),
    enabled: isEditMode && !!editPostId,
  });

  useEffect(() => {
    if (existingPost) {
      const user = getCurrentUser();
      // Verify user is the author
      if (user && existingPost.authorId === user.uid) {
        setTitle(existingPost.title);
        setContent(existingPost.content);
      } else {
        toast({
          title: 'Unauthorized',
          description: 'You can only edit your own posts',
          variant: 'destructive',
        });
        navigate('/blogs');
      }
    }
  }, [existingPost, navigate]);

  const createMutation = useMutation({
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

  const updateMutation = useMutation({
    mutationFn: async () => {
      const user = getCurrentUser();
      if (!user || !editPostId) {
        throw new Error('Not authenticated or missing post ID');
      }

      await updatePost(editPostId, user.uid, {
        title: title.trim(),
        content: content.trim(),
      });
      return editPostId;
    },
    onSuccess: (postId) => {
      // Invalidate queries to refresh the post and list
      queryClient.invalidateQueries({ queryKey: ['blogPost', postId] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: 'Success',
        description: 'Blog post updated successfully!',
      });
      navigate(`/blogs/read?p=${postId}`);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update post',
        variant: 'destructive',
      });
    },
  });

  const mutation = isEditMode ? updateMutation : createMutation;

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

    // Check for base64 images that haven't been uploaded yet
    const hasBase64Images = content.includes('data:image/');
    const hasTempImages = content.includes('data-temp-id');
    
    if (hasBase64Images || hasTempImages) {
      toast({
        title: 'Images Still Uploading',
        description: 'Please wait for all images to finish uploading before publishing.',
        variant: 'destructive',
      });
      return;
    }

    // Check content size
    const contentSize = new Blob([content]).size;
    if (contentSize > 1000000) { // 1MB
      toast({
        title: 'Content Too Large',
        description: `Content is ${(contentSize / 1024 / 1024).toFixed(2)}MB. Firestore has a 1MB limit. Please reduce content size.`,
        variant: 'destructive',
      });
      return;
    }

    mutation.mutate();
  };

  if (isEditMode && isLoadingPost) {
    return (
      <AuthGuard>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold">
                {isEditMode ? 'Edit Post' : 'Write New Post'}
              </h1>
              <Button
                onClick={handlePublish}
                disabled={mutation.isPending || !title.trim() || !content.replace(/<[^>]*>/g, ' ').trim()}
                className="flex items-center gap-2"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isEditMode ? 'Updating...' : 'Publishing...'}
                  </>
                ) : (
                  isEditMode ? 'Update' : 'Publish'
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

