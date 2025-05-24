"use client";

import React from "react";
import { FloatingDock } from "./custom-floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconCode,
  IconHome,
  IconMail,
  IconUser,
  IconBrain,
} from "@tabler/icons-react";

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
        <IconHome className="h-full w-full text-primary" />
      ),
      href: "#",
      onClick: () => scrollToSection('top'),
    },
    {
      title: "About",
      icon: (
        <IconUser className="h-full w-full text-primary" />
      ),
      href: "#about",
      onClick: () => scrollToSection('about'),
    },
    {
      title: "Projects",
      icon: (
        <IconCode className="h-full w-full text-primary" />
      ),
      href: "#projects",
      onClick: () => scrollToSection('projects'),
    },
    {
      title: "Experience",
      icon: (
        <IconBriefcase className="h-full w-full text-primary" />
      ),
      href: "#experience",
      onClick: () => scrollToSection('experience'),
    },
    {
      title: "Skills",
      icon: (
        <IconBrain className="h-full w-full text-primary" />
      ),
      href: "#about",
      onClick: () => scrollToSection('about'),
    },
    {
      title: "Contact",
      icon: (
        <IconMail className="h-full w-full text-primary" />
      ),
      href: "#contact",
      onClick: () => scrollToSection('contact'),
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-primary" />
      ),
      href: "https://github.com/aryan4codes",
      target: "_blank",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-primary" />
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