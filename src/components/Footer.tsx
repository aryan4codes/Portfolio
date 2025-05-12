
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 border-t">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="font-mono mb-2 sm:mb-0">
            <span className="gradient-text">© {new Date().getFullYear()} Aryan Rajpurkar</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Home</a>
              <a href="#projects" className="hover:text-foreground transition-colors">Experience</a>
              <a href="#about" className="hover:text-foreground transition-colors">About</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
