'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import { demoDeliveries } from '@/lib/demo-data';

export default function DonorTrackingPage() {
  const activeDeliveries = demoDeliveries.filter((d) => d.status !== 'delivered');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Live Tracking</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <GlassCard hover={false} animate={false} className="!p-0 h-96 overflow-hidden relative">
          <div className="absolute inset-0 bg-glow-purple opacity-20" />
          <div className="absolute inset-0 bg-grid" />
          <div className="flex items-center justify-center h-full relative z-10">
            <div className="text-center">
              <MapPin size={40} className="text-neon-purple mx-auto mb-3 animate-float" />
              <p className="text-sm text-slate-400">Live Delivery Map</p>
              <p className="text-xs text-slate-600 mt-1">{activeDeliveries.length} active deliveries</p>
            </div>
          </div>
          {/* Simulated route dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity }}
              className="absolute w-2 h-2 rounded-full bg-neon-cyan"
              style={{ top: `${25 + Math.random() * 50}%`, left: `${15 + Math.random() * 70}%` }} />
          ))}
        </GlassCard>

        {/* Active Deliveries List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Active Deliveries</h3>
          {activeDeliveries.map((d, i) => (
            <GlassCard key={d.id} delay={i * 0.1} className="!p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Navigation size={16} className="text-neon-cyan" />
                  <span className="text-sm font-semibold text-white">{d.riderName}</span>
                </div>
                <StatusBadge status={d.status} pulse />
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-purple" />
                  <span>{d.pickupAddress}</span>
                </div>
                <div className="ml-1 w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green" />
                  <span>{d.deliveryAddress}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.06]">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock size={12} /> ETA: {d.estimatedTime} min
                </span>
                <span className="text-xs text-slate-500">{d.distance} km</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-neon-cyan">
                  <Phone size={12} /> Contact
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
