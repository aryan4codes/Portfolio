"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  valueClassName?: string;
  title: string;
  titleClassName?: string;
  symbol?: string;
  /** When set, animates and formats as a fixed-point decimal (e.g. CGPA). */
  decimals?: number;
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  className = "",
  valueClassName = "",
  title,
  titleClassName = "",
  symbol = "",
  decimals,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const raw = progress * value;
      const currentValue =
        decimals !== undefined ? Number(raw.toFixed(decimals)) : Math.floor(raw);

      setDisplayValue(currentValue);

      if (now < endTime) {
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(value);
      }
    };

    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    });

    updateValue();
  }, [value, duration, decimals, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={`flex flex-col items-center ${className}`}
    >
      <span
        className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 ${valueClassName}`}
      >
        {decimals !== undefined ? displayValue.toFixed(decimals) : displayValue}
        {symbol}
      </span>
      <span className={`text-center mt-2 text-muted-foreground ${titleClassName}`}>
        {title}
      </span>
    </motion.div>
  );
} 