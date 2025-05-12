import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 flex flex-col justify-center min-h-[calc(100vh-150px)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="flex flex-col md:col-span-7">
            <div className="mb-4">
              <TextGenerateEffect 
                words="Hi, I'm Aryan Rajpurkar" 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground" 
                duration={0.7}
                filter={true}
              />
            </div>
            <h4 className="text-md md:text-xl lg:text-2xl mb-6 text-muted-foreground">
              Building intelligent systems with AI, ML & Data Science.
            </h4>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              I'm a passionate developer specializing in AI-powered applications, data analytics, and full-stack development.
              From federated learning to real-time analytics, I build solutions that make a difference.
            </p>
            <div className="mb-8 md:mb-0">
              <Button 
                onClick={scrollToProjects} 
                className="text-base group flex items-center gap-2"
              >
                View my work
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </Button>
            </div>
          </div>

          <div className="md:col-span-5 h-[300px] md:h-[500px] w-full">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
