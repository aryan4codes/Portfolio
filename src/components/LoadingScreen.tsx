
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
        "loader-container", 
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-center">
        <h1 className="font-mono text-xl sm:text-2xl md:text-3xl font-medium">
          <span className="typewriter gradient-text animate-gradient-shift font-perplexity">
            {welcomeText.substring(0, textIndex)}
          </span>
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
