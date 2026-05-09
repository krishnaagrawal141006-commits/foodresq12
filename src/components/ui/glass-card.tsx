'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'blue' | 'green' | 'pink' | 'orange';
  hover?: boolean;
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
}

const glowColorMap = {
  purple: 'hover:border-neon-purple/30 hover:shadow-glow-sm',
  cyan: 'hover:border-neon-cyan/30 hover:shadow-glow-cyan-sm',
  blue: 'hover:border-neon-blue/30 hover:shadow-glow-blue-sm',
  green: 'hover:border-neon-green/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]',
  pink: 'hover:border-neon-pink/30 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]',
  orange: 'hover:border-neon-orange/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]',
};

export default function GlassCard({
  children,
  className,
  glowColor = 'purple',
  hover = true,
  animate = true,
  delay = 0,
  onClick,
}: GlassCardProps) {
  const Component = animate ? motion.div : 'div';
  const animateProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay },
      }
    : {};

  return (
    <Component
      {...animateProps}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl border border-white/[0.08] bg-surface p-6',
        'backdrop-blur-xl transition-all duration-300',
        hover && [
          'hover:-translate-y-1 cursor-pointer',
          glowColorMap[glowColor],
        ],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  );
}
