'use client';

import { cn } from '@/lib/utils';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'cyan' | 'green' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-neon-purple to-neon-purple-dark text-white hover:shadow-glow-md hover:-translate-y-0.5',
  outline: 'bg-transparent border border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-glow-sm',
  ghost: 'bg-transparent text-slate-300 hover:bg-white/5 hover:text-white',
  cyan: 'bg-gradient-to-r from-neon-cyan to-neon-cyan-dark text-white hover:shadow-glow-cyan-md hover:-translate-y-0.5',
  green: 'bg-gradient-to-r from-neon-green to-emerald-600 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:-translate-y-0.5',
  danger: 'bg-gradient-to-r from-neon-red to-red-600 text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:-translate-y-0.5',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: GlowButtonProps) {
  return (
    <button
      className={cn(
        'relative rounded-xl font-semibold transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-neon-purple/50',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
