
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="py-6 w-full">
      <div className="container flex justify-between items-center">
        <div className="font-mono font-medium text-lg">
          <span className="gradient-text animate-gradient-shift">aryan</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="w-5 h-5" />
            </Button>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="w-5 h-5" />
            </Button>
          </a>
          <a href="mailto:hello@example.com" aria-label="Email">
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
