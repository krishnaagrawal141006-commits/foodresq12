'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, ArrowRight, Clock, MapPin, Utensils } from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import GlowButton from '@/components/ui/glow-button';
import { demoDonorStats, demoDonations } from '@/lib/demo-data';

export default function DonorDashboard() {
  const recentDonations = demoDonations.filter((d) => d.donorId === 'donor-1').slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Welcome back, Rajesh 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Taj Palace Hotel • Connaught Place, New Delhi</p>
        </div>
        <Link href="/donor/donate">
          <GlowButton className="flex items-center gap-2"><Plus size={18} /> Donate Food</GlowButton>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoDonorStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Recent Donations + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-white">Recent Donations</h3>
            <Link href="/donor/history" className="text-xs text-neon-purple hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {recentDonations.map((d, i) => (
            <GlassCard key={d.id} delay={i * 0.1} className="!p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center flex-shrink-0">
                  <Utensils size={20} className="text-neon-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white truncate">{d.foodName}</h4>
                    <StatusBadge status={d.status} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Utensils size={11} />{d.quantity} {d.unit}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{Math.max(0, Math.round((d.expiryTime.getTime() - Date.now()) / 60000))}m left</span>
                    <StatusBadge status={d.vegType} />
                  </div>
                </div>
                {d.matchedNgoName && (
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-400">{d.matchedNgoName}</p>
                    {d.riderName && <p className="text-xs text-neon-cyan">🚴 {d.riderName}</p>}
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-white">Quick Actions</h3>
          {[
            { label: 'Upload New Food', icon: Plus, href: '/donor/donate', color: '#a855f7' },
            { label: 'Track Deliveries', icon: MapPin, href: '/donor/tracking', color: '#06b6d4' },
            { label: 'View Analytics', icon: Utensils, href: '/donor/analytics', color: '#10b981' },
          ].map((action, i) => (
            <Link key={action.label} href={action.href}>
              <GlassCard delay={i * 0.1} className="!p-4 flex items-center gap-4">
                <div className="p-2.5 rounded-xl" style={{ background: `${action.color}15`, border: `1px solid ${action.color}30` }}>
                  <action.icon size={18} style={{ color: action.color }} />
                </div>
                <span className="text-sm font-medium text-white">{action.label}</span>
                <ArrowRight size={16} className="text-slate-500 ml-auto" />
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
