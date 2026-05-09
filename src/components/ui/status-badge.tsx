'use client';

import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
  pulse?: boolean;
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  'pending': { label: 'Pending', classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  'matched': { label: 'Matched', classes: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
  'accepted': { label: 'Accepted', classes: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  'assigned': { label: 'Assigned', classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
  'pickup-started': { label: 'Pickup Started', classes: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
  'picked-up': { label: 'Picked Up', classes: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' },
  'in-transit': { label: 'In Transit', classes: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  'en-route': { label: 'En Route', classes: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
  'delivered': { label: 'Delivered', classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  'completed': { label: 'Completed', classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  'expired': { label: 'Expired', classes: 'bg-red-500/15 text-red-400 border-red-500/30' },
  'cancelled': { label: 'Cancelled', classes: 'bg-slate-500/15 text-slate-400 border-slate-500/30' },
  'active': { label: 'Active', classes: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  'critical': { label: 'Critical', classes: 'bg-red-500/15 text-red-400 border-red-500/30' },
  'high': { label: 'High', classes: 'bg-orange-500/15 text-orange-400 border-orange-500/30' },
  'medium': { label: 'Medium', classes: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
  'low': { label: 'Low', classes: 'bg-green-500/15 text-green-400 border-green-500/30' },
  'veg': { label: '🟢 Veg', classes: 'bg-green-500/15 text-green-400 border-green-500/30' },
  'non-veg': { label: '🔴 Non-Veg', classes: 'bg-red-500/15 text-red-400 border-red-500/30' },
  'mixed': { label: '🟡 Mixed', classes: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
};

export default function StatusBadge({ status, className, pulse }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, classes: 'bg-slate-500/15 text-slate-400 border-slate-500/30' };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
        config.classes,
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {config.label}
    </span>
  );
}
