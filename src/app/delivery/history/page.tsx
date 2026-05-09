'use client';

import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import { demoDeliveries } from '@/lib/demo-data';
import { CheckCircle, Navigation } from 'lucide-react';

export default function DeliveryHistoryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Delivery History</h2>
      <div className="space-y-3">
        {demoDeliveries.map((d, i) => (
          <GlassCard key={d.id} delay={i * 0.08} className="!p-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.status === 'delivered' ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-neon-cyan/10 border border-neon-cyan/20'}`}>
                {d.status === 'delivered' ? <CheckCircle size={18} className="text-emerald-400" /> : <Navigation size={18} className="text-neon-cyan" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{d.pickupAddress} → {d.deliveryAddress.split(',')[0]}</p>
                <p className="text-xs text-slate-500">{d.distance} km • {d.estimatedTime} min</p>
              </div>
              <StatusBadge status={d.status} />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
