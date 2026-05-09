'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Utensils, Filter, List, Map, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import GlowButton from '@/components/ui/glow-button';
import StatusBadge from '@/components/ui/status-badge';
import { demoDonations } from '@/lib/demo-data';

export default function NgoAvailableDonations() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg' | 'critical'>('all');

  const donations = demoDonations.filter((d) => {
    if (d.status === 'delivered' || d.status === 'cancelled') return false;
    if (filter === 'veg') return d.vegType === 'veg';
    if (filter === 'non-veg') return d.vegType === 'non-veg';
    if (filter === 'critical') return d.urgencyLevel === 'critical' || d.urgencyLevel === 'high';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold font-heading text-white">Available Donations</h2>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl overflow-hidden border border-white/[0.08]">
            <button onClick={() => setView('list')} className={`px-3 py-2 text-xs font-medium transition-colors ${view === 'list' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-white/[0.02] text-slate-500'}`}>
              <List size={16} />
            </button>
            <button onClick={() => setView('map')} className={`px-3 py-2 text-xs font-medium transition-colors ${view === 'map' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-white/[0.02] text-slate-500'}`}>
              <Map size={16} />
            </button>
          </div>
          <div className="flex rounded-xl overflow-hidden border border-white/[0.08]">
            {(['all', 'veg', 'non-veg', 'critical'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-white/[0.02] text-slate-500'}`}>
                {f === 'critical' ? '🔴 Urgent' : f === 'all' ? 'All' : f === 'veg' ? '🟢 Veg' : '🔴 NV'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === 'map' ? (
        <GlassCard hover={false} animate={false} className="!p-0 h-[500px] overflow-hidden relative">
          <div className="absolute inset-0 bg-glow-cyan opacity-20" />
          <div className="absolute inset-0 bg-grid" />
          <div className="flex items-center justify-center h-full relative z-10">
            <div className="text-center">
              <MapPin size={40} className="text-neon-cyan mx-auto mb-3 animate-float" />
              <p className="text-sm text-slate-400">Map View</p>
              <p className="text-xs text-slate-600 mt-1">{donations.length} donations available</p>
            </div>
          </div>
          {donations.map((d, i) => (
            <motion.div key={d.id} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className={`absolute w-4 h-4 rounded-full border-2 ${d.urgencyLevel === 'critical' ? 'bg-red-500 border-red-400/30' : 'bg-neon-green border-neon-green/30'}`}
              style={{ top: `${20 + i * 12}%`, left: `${15 + i * 15}%` }} />
          ))}
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {donations.map((d, i) => (
            <GlassCard key={d.id} delay={i * 0.08} glowColor="cyan" className="!p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Utensils size={24} className="text-neon-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-base font-semibold text-white">{d.foodName}</h4>
                    <StatusBadge status={d.urgencyLevel} pulse={d.urgencyLevel === 'critical'} />
                    <StatusBadge status={d.vegType} />
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{d.description || `From ${d.donorOrg}`}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Utensils size={12} />{d.quantity} {d.unit}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{Math.max(0, Math.round((d.expiryTime.getTime() - Date.now()) / 60000))}m left</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{d.pickupAddress.split(',')[0]}</span>
                  </div>
                  {d.urgencyLevel === 'critical' && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-red-400">
                      <AlertTriangle size={12} /> Expires very soon — act now!
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <GlowButton variant="cyan" size="sm">Accept</GlowButton>
                  <GlowButton variant="ghost" size="sm">Details</GlowButton>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
