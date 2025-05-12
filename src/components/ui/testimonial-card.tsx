"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  image,
  className,
}: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative rounded-xl border p-6 bg-card shadow-sm transition-all duration-300 overflow-hidden",
        isHovered ? "shadow-lg border-primary/20" : "border-border",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 right-4 text-muted-foreground/20">
        <Quote size={40} />
      </div>

      <blockquote className="text-foreground/90 text-lg relative z-10 mb-6">
        "{quote}"
      </blockquote>

      <div className="flex items-center gap-3 mt-4">
        {image && (
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-background">
            <img
              src={image}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <div className="font-semibold">{author}</div>
          {role && <div className="text-sm text-muted-foreground">{role}</div>}
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 transform origin-left transition-transform duration-300",
          isHovered ? "scale-x-100" : "scale-x-0"
        )}
      />
    </motion.div>
  );
} 