'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MapPin, Search, Clock, Utensils } from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import GlowButton from '@/components/ui/glow-button';
import { demoNgoStats, demoDonations } from '@/lib/demo-data';

export default function NgoDashboard() {
  const nearbyDonations = demoDonations.filter((d) => d.status === 'pending' || d.status === 'matched').slice(0, 3);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Welcome, Sunita 💚</h2>
          <p className="text-sm text-slate-500 mt-1">Feeding India Foundation • Sarojini Nagar</p>
        </div>
        <Link href="/ngo/donations">
          <GlowButton variant="cyan" className="flex items-center gap-2">
            <Search size={18} /> Find Food
          </GlowButton>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoNgoStats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nearby Donations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-white">Nearby Donations</h3>
            <Link href="/ngo/donations" className="text-xs text-neon-cyan hover:underline flex items-center gap-1">View All <ArrowRight size={12} /></Link>
          </div>
          {nearbyDonations.map((d, i) => (
            <GlassCard key={d.id} delay={i * 0.1} glowColor="cyan" className="!p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Utensils size={20} className="text-neon-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-sm font-semibold text-white">{d.foodName}</h4>
                    <StatusBadge status={d.urgencyLevel} pulse={d.urgencyLevel === 'critical' || d.urgencyLevel === 'high'} />
                    <StatusBadge status={d.vegType} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{d.quantity} {d.unit}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{Math.max(0, Math.round((d.expiryTime.getTime() - Date.now()) / 60000))}m</span>
                    <span className="flex items-center gap-1"><MapPin size={11} />{d.donorOrg}</span>
                  </div>
                </div>
                <GlowButton variant="cyan" size="sm">Accept</GlowButton>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Map Preview */}
        <GlassCard hover={false} animate className="!p-0 h-80 overflow-hidden relative">
          <div className="absolute inset-0 bg-glow-cyan opacity-20" />
          <div className="absolute inset-0 bg-grid" />
          <div className="flex items-center justify-center h-full relative z-10">
            <div className="text-center">
              <MapPin size={36} className="text-neon-cyan mx-auto mb-3 animate-float" />
              <p className="text-sm text-slate-400">Nearby Donations Map</p>
              <p className="text-xs text-slate-600 mt-1">7 available within 5 km</p>
            </div>
          </div>
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
              className="absolute w-3 h-3 rounded-full bg-neon-green border-2 border-neon-green/30"
              style={{ top: `${20 + Math.random() * 60}%`, left: `${15 + Math.random() * 70}%` }} />
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
