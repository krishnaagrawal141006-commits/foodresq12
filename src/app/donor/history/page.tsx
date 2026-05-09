'use client';

import { motion } from 'framer-motion';
import { Utensils, Clock, Filter } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import { demoDonations } from '@/lib/demo-data';

export default function DonorHistoryPage() {
  const donations = demoDonations.filter((d) => d.donorId === 'donor-1' || d.donorId === 'donor-2');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-heading text-white">Donation History</h2>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-400 hover:text-white transition-colors">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="space-y-3">
        {donations.map((d, i) => (
          <GlassCard key={d.id} delay={i * 0.08} className="!p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center flex-shrink-0">
                <Utensils size={20} className="text-neon-purple" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-sm font-semibold text-white">{d.foodName}</h4>
                  <StatusBadge status={d.status} pulse={d.status === 'in-transit' || d.status === 'matched'} />
                  <StatusBadge status={d.vegType} />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{d.quantity} {d.unit}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />
                    {d.status === 'delivered' ? 'Delivered' : `${Math.max(0, Math.round((d.expiryTime.getTime() - Date.now()) / 60000))}m left`}
                  </span>
                  <span>{d.pickupAddress}</span>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                {d.matchedNgoName && <p className="text-xs text-slate-400">→ {d.matchedNgoName}</p>}
                <p className="text-xs text-slate-600 mt-1">{d.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
