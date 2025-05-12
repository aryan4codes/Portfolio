import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  
  const welcomeText = "Hey! I'm aryan... glad to see you stalking me!";
  
  useEffect(() => {
    // First animate the text typing
    const typingInterval = setInterval(() => {
      setTextIndex(prev => {
        if (prev < welcomeText.length) return prev + 1;
        clearInterval(typingInterval);
        return prev;
      });
    }, 50);
    
    // After text is complete, wait and then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 600); // Give time for fade-out animation
    }, welcomeText.length * 50 + 1500); // Wait for typing + extra time
    
    return () => {
      clearInterval(typingInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500", 
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="w-full max-w-[90vw] px-4 sm:px-6 md:max-w-[80vw] lg:max-w-xl text-center">
        <div className="relative mx-auto overflow-hidden p-6 sm:p-8 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5 opacity-50"></div>
          <h1 className="relative font-mono text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
            <span className="typewriter gradient-text animate-gradient-shift font-perplexity">
              {welcomeText.substring(0, textIndex)}
            </span>
            <span className="animate-pulse ml-0.5">|</span>
          </h1>
          <div className="mt-4 relative flex justify-center">
            <div className="h-1 w-16 sm:w-24 md:w-32 rounded-full bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
