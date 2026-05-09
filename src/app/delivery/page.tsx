'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navigation, ArrowRight, MapPin, Clock, CheckCircle } from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import GlowButton from '@/components/ui/glow-button';
import { demoDeliveryStats, demoDeliveries } from '@/lib/demo-data';

export default function DeliveryDashboard() {
  const activeDelivery = demoDeliveries.find((d) => d.status !== 'delivered');
  const recentDeliveries = demoDeliveries.slice(0, 3);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold font-heading text-white">Welcome, Vikram 🚴</h2>
        <p className="text-sm text-slate-500 mt-1">Volunteer Rider • New Delhi</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoDeliveryStats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      {/* Active Delivery Card */}
      {activeDelivery && (
        <GlassCard hover={false} glowColor="cyan" className="!p-6 glow-border-cyan">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Navigation size={18} className="text-neon-cyan" />
              <h3 className="text-lg font-bold text-white">Active Delivery</h3>
            </div>
            <StatusBadge status={activeDelivery.status} pulse />
          </div>
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-6">
            {['Assigned', 'Pickup', 'Picked Up', 'En Route', 'Delivered'].map((step, i) => {
              const stepStatuses = ['assigned', 'pickup-started', 'picked-up', 'en-route', 'delivered'];
              const currentIdx = stepStatuses.indexOf(activeDelivery.status);
              const isActive = i <= currentIdx;
              return (
                <div key={step} className="flex-1 flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' : 'bg-white/[0.03] text-slate-600 border border-white/[0.06]'}`}>
                    {isActive && i < currentIdx ? <CheckCircle size={14} /> : i + 1}
                  </div>
                  {i < 4 && <div className={`flex-1 h-0.5 ${i < currentIdx ? 'bg-neon-cyan/40' : 'bg-white/[0.06]'}`} />}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-neon-purple" />
                <span className="text-slate-400">Pickup:</span>
                <span className="text-white">{activeDelivery.pickupAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
                <span className="text-slate-400">Drop:</span>
                <span className="text-white">{activeDelivery.deliveryAddress}</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div><span className="text-slate-500">ETA</span><p className="text-white font-bold">{activeDelivery.estimatedTime} min</p></div>
              <div><span className="text-slate-500">Distance</span><p className="text-white font-bold">{activeDelivery.distance} km</p></div>
              <div><span className="text-slate-500">OTP</span><p className="text-neon-cyan font-bold font-mono">{activeDelivery.otp}</p></div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/delivery/active"><GlowButton variant="cyan" className="flex items-center gap-2"><Navigation size={16} /> Navigate</GlowButton></Link>
            <GlowButton variant="green">Confirm Pickup</GlowButton>
          </div>
        </GlassCard>
      )}

      {/* Recent Deliveries */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Recent Deliveries</h3>
        {recentDeliveries.map((d, i) => (
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
