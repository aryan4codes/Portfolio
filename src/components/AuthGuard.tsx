import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged, isAuthor } from '@/lib/auth';
import LoginModal from './LoginModal';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser && !isAuthor(currentUser)) {
        // User is authenticated but not the author
        setShowLogin(false);
      } else if (!currentUser) {
        // User is not authenticated
        setShowLogin(true);
      } else {
        // User is authenticated and is the author
        setShowLogin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginModal open={showLogin} onOpenChange={setShowLogin} />;
  }

  if (!isAuthor(user)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You don't have permission to access this page. Only the author can write blog posts.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;

