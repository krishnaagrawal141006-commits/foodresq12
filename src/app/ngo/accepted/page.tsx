'use client';

import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import { demoDonations } from '@/lib/demo-data';
import { Utensils, Clock, Navigation } from 'lucide-react';

export default function NgoAcceptedPage() {
  const accepted = demoDonations.filter((d) => d.matchedNgoId === 'ngo-1' || d.matchedNgoId === 'ngo-2');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Accepted Donations</h2>
      <div className="space-y-3">
        {accepted.map((d, i) => (
          <GlassCard key={d.id} delay={i * 0.08} className="!p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Utensils size={20} className="text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-white">{d.foodName}</h4>
                  <StatusBadge status={d.status} pulse={d.status !== 'delivered'} />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{d.quantity} {d.unit} from {d.donorOrg}</span>
                  {d.riderName && <span className="flex items-center gap-1 text-neon-cyan"><Navigation size={11} />{d.riderName}</span>}
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                {d.status !== 'delivered' && <p className="flex items-center gap-1"><Clock size={11} />{Math.max(0, Math.round((d.expiryTime.getTime() - Date.now()) / 60000))}m</p>}
                {d.status === 'delivered' && <p className="text-emerald-400">✓ Received</p>}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
