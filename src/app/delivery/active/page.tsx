'use client';

import { motion } from 'framer-motion';
import { Navigation, MapPin, Phone, Clock, Shield, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import GlowButton from '@/components/ui/glow-button';
import StatusBadge from '@/components/ui/status-badge';
import { demoDeliveries } from '@/lib/demo-data';

export default function ActiveDeliveryPage() {
  const delivery = demoDeliveries[0];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Active Delivery</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <GlassCard hover={false} animate={false} className="!p-0 h-[500px] overflow-hidden relative">
          <div className="absolute inset-0 bg-glow-cyan opacity-20" />
          <div className="absolute inset-0 bg-grid" />
          <div className="flex items-center justify-center h-full relative z-10">
            <div className="text-center">
              <Navigation size={40} className="text-neon-cyan mx-auto mb-3 animate-float" />
              <p className="text-sm text-slate-400">Live Navigation</p>
              <p className="text-xs text-slate-600 mt-1">{delivery.distance} km • ETA {delivery.estimatedTime} min</p>
            </div>
          </div>
          {/* Animated route */}
          <motion.div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-neon-cyan shadow-glow-cyan-sm"
            animate={{ x: [0, 150, 200], y: [0, 50, 100] }} transition={{ duration: 4, repeat: Infinity }} />
          <div className="absolute top-[30%] left-[20%] w-4 h-4 rounded-full bg-neon-purple border-2 border-neon-purple/30" />
          <div className="absolute bottom-[25%] right-[20%] w-4 h-4 rounded-full bg-neon-green border-2 border-neon-green/30" />
        </GlassCard>

        {/* Delivery Details */}
        <div className="space-y-4">
          <GlassCard hover={false} animate={false} className="!p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Delivery #{delivery.id}</h3>
              <StatusBadge status={delivery.status} pulse />
            </div>
            {/* Route */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="mt-1"><div className="w-3 h-3 rounded-full bg-neon-purple" /></div>
                <div>
                  <p className="text-xs text-slate-500">PICKUP</p>
                  <p className="text-sm text-white">{delivery.pickupAddress}</p>
                  {delivery.pickupVerified && <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1"><CheckCircle size={12} /> Verified</span>}
                </div>
              </div>
              <div className="ml-1.5 w-px h-6 bg-white/10" />
              <div className="flex items-start gap-3">
                <div className="mt-1"><div className="w-3 h-3 rounded-full bg-neon-green" /></div>
                <div>
                  <p className="text-xs text-slate-500">DROP-OFF</p>
                  <p className="text-sm text-white">{delivery.deliveryAddress}</p>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-center">
                <Clock size={16} className="text-neon-cyan mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{delivery.estimatedTime}</p>
                <p className="text-xs text-slate-500">min ETA</p>
              </div>
              <div className="text-center">
                <MapPin size={16} className="text-neon-purple mx-auto mb-1" />
                <p className="text-lg font-bold text-white">{delivery.distance}</p>
                <p className="text-xs text-slate-500">km</p>
              </div>
              <div className="text-center">
                <Shield size={16} className="text-neon-green mx-auto mb-1" />
                <p className="text-lg font-bold text-neon-cyan font-mono">{delivery.otp}</p>
                <p className="text-xs text-slate-500">OTP</p>
              </div>
            </div>
          </GlassCard>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <GlowButton variant="cyan" className="flex items-center justify-center gap-2 w-full">
              <Phone size={16} /> Call Donor
            </GlowButton>
            <GlowButton variant="green" className="flex items-center justify-center gap-2 w-full">
              <CheckCircle size={16} /> Confirm Delivery
            </GlowButton>
          </div>
        </div>
      </div>
    </div>
  );
}
