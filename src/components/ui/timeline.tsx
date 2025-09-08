"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TimelineItem {
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
  tags?: string[];
  color?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
  className?: string;
}

export function Timeline({ items, title, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div className={cn("relative", className)} ref={ref}>
      {title && (
        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-border">
          {title}
        </h3>
      )}

      <div className="relative pl-6 md:pl-8">
        <motion.div
          className="absolute left-3 top-0 bottom-0 w-0.5 bg-border"
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
        />

        {items.map((item, i) => (
          <div 
            key={i} 
            className="relative mb-8 md:mb-12"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col md:flex-row"
            >
              <div className="flex items-center mb-2 md:mb-0">
                <div 
                  className={cn(
                    "absolute w-4 h-4 rounded-full border-2 border-background left-3 -translate-x-1/2 flex items-center justify-center", 
                    item.color || "bg-primary"
                  )}
                >
                  {item.icon && (
                    <span className="text-xs text-white">{item.icon}</span>
                  )}
                </div>
                <div className="text-sm font-medium text-muted-foreground md:w-32 md:text-right md:mr-8">
                  {item.date}
                </div>
              </div>

              <div className="md:flex-1">
                <h4 className="text-lg font-bold">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.subtitle}
                  </p>
                )}
                {item.description && (
                  <p className="text-sm text-foreground/80 mb-2">
                    {item.description}
                  </p>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
} 