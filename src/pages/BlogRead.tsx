import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogContent from '@/components/BlogContent';
import { Button } from '@/components/ui/button';
import { getPostById, deletePost } from '@/lib/blogService';
import { BlogPost } from '@/types/blog';
import { getCurrentUser, isAuthor } from '@/lib/auth';
import { toast } from '@/hooks/use-toast';
import { Copy, Trash2, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const BlogRead = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postId = searchParams.get('p');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setIsAuthorized(user ? isAuthor(user) : false);
  }, []);

  const { data: post, isLoading, error } = useQuery<BlogPost | null>({
    queryKey: ['blogPost', postId],
    queryFn: () => (postId ? getPostById(postId) : Promise.resolve(null)),
    enabled: !!postId,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!post || !postId) return;
      const user = getCurrentUser();
      if (!user) throw new Error('Not authenticated');
      await deletePost(postId, user.uid);
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      navigate('/blogs');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete post',
        variant: 'destructive',
      });
    },
  });

  const handleCopyLink = async () => {
    if (!postId) return;
    
    const url = `${window.location.origin}/blogs/read?p=${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied',
        description: 'Shareable link copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate();
    setShowDeleteDialog(false);
  };

  if (!postId) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Post not found</h2>
            <p className="text-muted-foreground mb-4">
              No post ID provided in the URL.
            </p>
            <Button onClick={() => navigate('/blogs')}>Go to Blog</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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

  if (error || !post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Post not found</h2>
            <p className="text-muted-foreground mb-4">
              The blog post you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/blogs')}>Go to Blog</Button>
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
        <main className="flex-1">
          <div className="max-w-4xl mx-auto mb-8 px-4 pt-8">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </Button>
              {isAuthorized && post.authorId === getCurrentUser()?.uid && (
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex items-center gap-2"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
          <BlogContent post={post} />
        </main>
        <Footer />
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BlogRead;


