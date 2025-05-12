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
    }, 100);
    
    // After text is complete, wait and then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 600); // Give time for fade-out animation
    }, welcomeText.length * 100 + 1000); // Wait for typing + extra time
    
    return () => {
      clearInterval(typingInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500", 
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-center px-4">
        <div className="inline-block">
          <h1 className="font-mono text-2xl md:text-3xl text-white">
            <span className="inline-block">
              {welcomeText.substring(0, textIndex)}
            </span>
            <span className="inline-block w-1 h-6 md:h-7 bg-white ml-1 animate-blink"></span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
