"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

export function SectionDivider({
  className,
  title,
  icon,
}: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("flex items-center py-8 gap-4", className)}
    >
      <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-border/70" />
      
      {(title || icon) && (
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              {icon}
            </div>
          )}
          {title && (
            <h3 className="text-xl font-bold text-muted-foreground">
              {title}
            </h3>
          )}
        </div>
      )}
      
      <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-border/70" />
    </motion.div>
  );
} 