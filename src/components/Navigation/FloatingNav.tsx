"use client";

import React from "react";
import { FloatingDock } from "./custom-floating-dock";
import {
  Github,
  Linkedin,
  Briefcase,
  Code,
  Home,
  Mail,
  User,
  Brain,
} from "lucide-react";

export default function FloatingNav() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const links = [
    {
      title: "Home",
      icon: (
        <Home className="h-full w-full text-primary" />
      ),
      href: "#",
      onClick: () => scrollToSection('top'),
    },
    {
      title: "About",
      icon: (
        <User className="h-full w-full text-primary" />
      ),
      href: "#about",
      onClick: () => scrollToSection('about'),
    },
    {
      title: "Projects",
      icon: (
        <Code className="h-full w-full text-primary" />
      ),
      href: "#projects",
      onClick: () => scrollToSection('projects'),
    },
    {
      title: "Experience",
      icon: (
        <Briefcase className="h-full w-full text-primary" />
      ),
      href: "#experience",
      onClick: () => scrollToSection('experience'),
    },
    {
      title: "Skills",
      icon: (
        <Brain className="h-full w-full text-primary" />
      ),
      href: "#about",
      onClick: () => scrollToSection('about'),
    },
    {
      title: "Contact",
      icon: (
        <Mail className="h-full w-full text-primary" />
      ),
      href: "#contact",
      onClick: () => scrollToSection('contact'),
    },
    {
      title: "GitHub",
      icon: (
        <Github className="h-full w-full text-primary" />
      ),
      href: "https://github.com/aryan4codes",
      target: "_blank",
    },
    {
      title: "LinkedIn",
      icon: (
        <Linkedin className="h-full w-full text-primary" />
      ),
      href: "https://linkedin.com/in/aryan-rajpurkar",
      target: "_blank",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
} 