"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  className?: string;
  iconClassName?: string;
  borderColor?: string;
}

export function SkillCard({
  title,
  icon,
  skills,
  className,
  iconClassName,
  borderColor = "border-primary/20",
}: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative group overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300",
        isHovered ? `${borderColor} shadow-lg` : "border-border shadow-sm",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      
      <div className="flex items-start space-x-4">
        <div 
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg bg-accent/30 text-accent-foreground transition-all duration-300",
            isHovered ? "bg-accent/50" : "bg-accent/30",
            iconClassName
          )}
        >
          {icon}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <ul className="space-y-1">
            {skills.map((skill, index) => (
              <motion.li 
                key={index}
                className="text-muted-foreground text-sm"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                • {skill}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
} 