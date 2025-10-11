import React, { useState, useEffect, lazy, Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Lazy load non-critical components
const Projects = lazy(() => import('@/components/Projects'));
const About = lazy(() => import('@/components/About'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
const FloatingNav = lazy(() => import('@/components/Navigation/FloatingNav'));

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Apply dark mode as default on initial load
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    
    // You could add additional loading logic here if needed
    const timer = setTimeout(() => {
      // This is a fallback in case onComplete doesn't fire
      setLoading(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main>
          <Hero />
          <Suspense fallback={<div className="flex justify-center items-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <Projects />
          </Suspense>
          <Suspense fallback={<div className="flex justify-center items-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <About />
          </Suspense>
          <Suspense fallback={<div className="flex justify-center items-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <FloatingNav />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
