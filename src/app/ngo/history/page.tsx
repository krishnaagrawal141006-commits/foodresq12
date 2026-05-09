'use client';

import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import { demoDonations } from '@/lib/demo-data';
import { Utensils } from 'lucide-react';

export default function NgoHistoryPage() {
  const history = demoDonations.filter((d) => d.status === 'delivered');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Reception History</h2>
      <div className="space-y-3">
        {history.length > 0 ? history.map((d, i) => (
          <GlassCard key={d.id} delay={i * 0.08} className="!p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Utensils size={20} className="text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">{d.foodName}</h4>
                <p className="text-xs text-slate-500">{d.quantity} {d.unit} from {d.donorOrg}</p>
              </div>
              <div className="text-right">
                <StatusBadge status="delivered" />
                <p className="text-xs text-slate-600 mt-1">{d.updatedAt.toLocaleDateString()}</p>
              </div>
            </div>
          </GlassCard>
        )) : (
          <GlassCard hover={false} className="!p-8 text-center">
            <p className="text-slate-500">No deliveries received yet.</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
