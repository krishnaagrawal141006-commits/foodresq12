'use client';

import { cn } from '@/lib/utils';
import AnimatedCounter from './animated-counter';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { DashboardStats } from '@/lib/types';

interface StatCardProps {
  stat: DashboardStats;
  index?: number;
}

export default function StatCard({ stat, index = 0 }: StatCardProps) {
  const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[stat.icon] || Icons.Activity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'relative rounded-2xl border border-white/[0.08] bg-surface p-6',
        'backdrop-blur-xl transition-all duration-300',
        'hover:-translate-y-1 hover:border-white/[0.15]',
        'group overflow-hidden'
      )}
    >
      {/* Background glow */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
        style={{ background: stat.color }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="p-3 rounded-xl"
            style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
          >
            <IconComponent size={22} style={{ color: stat.color }} />
          </div>
          {stat.trend && (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
              <Icons.TrendingUp size={14} />
              +{stat.trend}%
            </span>
          )}
        </div>

        <div className="text-3xl font-bold font-heading text-white mb-1">
          <AnimatedCounter
            end={stat.value}
            suffix={stat.suffix ? ` ${stat.suffix}` : ''}
            decimals={stat.value % 1 !== 0 ? 1 : 0}
          />
        </div>
        <p className="text-sm text-slate-400">{stat.label}</p>
      </div>
    </motion.div>
  );
}
