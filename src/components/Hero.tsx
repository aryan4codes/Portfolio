
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-32 flex flex-col justify-center min-h-[calc(100vh-150px)]">
      <div className="container">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl">
          <span className="gradient-text animate-gradient-shift">
            Crafting digital experiences that merge beauty with functionality.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
          I'm a passionate developer focused on creating minimalist designs with powerful functionality. 
          I blend creativity and technical expertise to build things people love to use.
        </p>
        <Button 
          onClick={scrollToProjects} 
          className="text-base group flex items-center gap-2"
        >
          View my work
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
