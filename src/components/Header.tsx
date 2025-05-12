import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="py-6 w-full">
      <div className="container flex justify-between items-center">
        <div className="font-mono font-medium text-lg">
          <span className="gradient-text animate-gradient-shift text-2xl">aryan</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <a href="https://github.com/aryan4codes" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="w-5 h-5" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/aryan-rajpurkar-6b96b1b3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="w-5 h-5" />
            </Button>
          </a>
          <a href="mailto:av.rajpurkar@gmail.com" aria-label="Email">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mail className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
