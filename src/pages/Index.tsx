import React, { useEffect, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Lazy load non-critical components
const Projects = lazy(() => import('@/components/Projects'));
const About = lazy(() => import('@/components/About'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
const FloatingNav = lazy(() => import('@/components/Navigation/FloatingNav'));

const Index = () => {
  useEffect(() => {
    // Apply dark mode as default on initial load
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
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
  );
};

export default Index;
