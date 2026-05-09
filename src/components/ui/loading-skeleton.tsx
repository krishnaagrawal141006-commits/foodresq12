'use client';

import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'stat' | 'chart';
  count?: number;
}

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div className={cn('shimmer rounded-lg bg-white/[0.05]', className)} />
  );
}

export default function LoadingSkeleton({ className, variant = 'text', count = 1 }: LoadingSkeletonProps) {
  if (variant === 'stat') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.08] bg-surface p-6 space-y-4">
            <div className="flex justify-between">
              <SkeletonLine className="w-12 h-12" />
              <SkeletonLine className="w-16 h-5" />
            </div>
            <SkeletonLine className="w-24 h-8" />
            <SkeletonLine className="w-32 h-4" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.08] bg-surface p-6 space-y-3">
            <div className="flex items-center gap-3">
              <SkeletonLine className="w-10 h-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <SkeletonLine className="w-3/4 h-4" />
                <SkeletonLine className="w-1/2 h-3" />
              </div>
            </div>
            <SkeletonLine className="w-full h-20" />
            <div className="flex gap-2">
              <SkeletonLine className="w-20 h-6 rounded-full" />
              <SkeletonLine className="w-16 h-6 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-6 space-y-4">
        <SkeletonLine className="w-48 h-6" />
        <SkeletonLine className="w-full h-64" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLine key={i} className="w-full h-4" />
      ))}
    </div>
  );
}
