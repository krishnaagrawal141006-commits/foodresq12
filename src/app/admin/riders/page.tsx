'use client';

import { Bike, Search, Filter, Phone, MapPin, MoreVertical, Star, Activity, Shield } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import GlowButton from '@/components/ui/glow-button';
import StatusBadge from '@/components/ui/status-badge';
import { demoUsers, demoRiderLocations } from '@/lib/demo-data';

export default function AdminRiders() {
  const riders = demoUsers.filter(u => u.role === 'delivery');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Fleet Management</h2>
          <p className="text-sm text-slate-500">Monitor volunteer riders and delivery performance</p>
        </div>
        
        <div className="flex gap-2">
           <GlowButton variant="cyan" size="sm" className="flex items-center gap-2">
             Deploy Emergency Fleet
           </GlowButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riders.map((rider, i) => {
          const location = demoRiderLocations.find(l => l.riderId === rider.id);
          const isOnline = i < 2; // Mocking online status

          return (
            <GlassCard key={rider.id} delay={i * 0.1} glowColor="cyan" className="relative group">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-neon-green animate-pulse shadow-glow-sm' : 'bg-slate-600'}`} />
                 <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{isOnline ? 'Online' : 'Offline'}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                 <div className="w-14 h-14 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-xl">
                    🚴
                 </div>
                 <div>
                    <h4 className="text-white font-bold">{rider.name}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                       <Star size={10} className="text-amber-400 fill-amber-400" />
                       <span className="text-[10px] text-slate-400">4.9 (342 rescues)</span>
                    </div>
                 </div>
              </div>

              {isOnline && location && (
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                   <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] text-slate-500 uppercase">Current Velocity</p>
                      <Activity size={12} className="text-neon-cyan" />
                   </div>
                   <p className="text-sm font-bold text-white">{location.speed} km/h</p>
                   <p className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
                      <MapPin size={10} /> Near Sarojini Nagar
                   </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1">Response Time</p>
                    <p className="text-sm font-bold text-white">4.5m</p>
                 </div>
                 <div>
                    <p className="text-[10px] text-slate-500 uppercase mb-1">Success Rate</p>
                    <p className="text-sm font-bold text-neon-green">100%</p>
                 </div>
              </div>

              <div className="flex gap-2">
                 <GlowButton variant="outline" size="sm" className="flex-1">Track Live</GlowButton>
                 <GlowButton variant="ghost" size="sm" className="p-2">
                    <Phone size={14} />
                 </GlowButton>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
