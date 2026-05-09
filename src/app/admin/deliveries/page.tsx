'use client';

import { Truck, Map as MapIcon, Filter, Search, Clock, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import GlowButton from '@/components/ui/glow-button';
import { demoDeliveries } from '@/lib/demo-data';

export default function AdminDeliveries() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Shipment Tracking</h2>
          <p className="text-sm text-slate-500">Monitor all active and completed deliveries</p>
        </div>
        
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
             <input 
               type="text" 
               placeholder="Search tracking ID..." 
               className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-neon-purple/50 w-64"
             />
           </div>
           <GlowButton variant="outline" size="sm" className="flex items-center gap-2">
             <Filter size={16} /> Filter
           </GlowButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Deliveries List */}
        <div className="lg:col-span-2 space-y-3">
          {demoDeliveries.map((delivery, i) => (
            <GlassCard key={delivery.id} delay={i * 0.05} className="!p-5 hover:border-neon-cyan/30">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                    <Truck size={24} className="text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">#{delivery.id}</h4>
                    <p className="text-xs text-slate-500">Rider: {delivery.riderName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={delivery.status} pulse={delivery.status !== 'delivered'} />
                  <p className="text-[10px] text-slate-600 mt-1">Updated 2m ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                   <div className="flex justify-between text-[10px] text-slate-500 mb-1 uppercase tracking-tighter">
                     <span>Pickup</span>
                     <span>Delivery</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-neon-purple" />
                      <div className="flex-1 h-0.5 bg-white/5 relative">
                         <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-neon-purple to-neon-cyan ${delivery.status === 'delivered' ? 'w-full' : 'w-2/3'}`} />
                         {delivery.status !== 'delivered' && (
                           <Truck size={12} className="absolute top-1/2 -translate-y-1/2 left-2/3 text-neon-cyan -ml-2" />
                         )}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${delivery.status === 'delivered' ? 'bg-neon-green shadow-glow-sm' : 'bg-white/20'}`} />
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                <div>
                   <p className="text-[10px] text-slate-500 uppercase">Distance</p>
                   <p className="text-sm font-bold text-white">{delivery.distance} km</p>
                </div>
                <div>
                   <p className="text-[10px] text-slate-500 uppercase">Time Elapsed</p>
                   <p className="text-sm font-bold text-white">14 mins</p>
                </div>
                <div>
                   <p className="text-[10px] text-slate-500 uppercase">Temp. Probe</p>
                   <p className="text-sm font-bold text-neon-green">Optimum</p>
                </div>
                <div className="flex justify-end items-center">
                   <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                     <ChevronRight size={20} />
                   </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Global Live Ops Map */}
        <div className="space-y-4">
           <GlassCard hover={false} className="!p-0 h-[600px] overflow-hidden sticky top-24">
              <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapIcon size={16} className="text-neon-purple" />
                  Live Ops Map
                </h3>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                   <span className="text-[10px] text-slate-400">LIVE SYNC</span>
                </div>
              </div>
              <div className="relative h-full bg-grid">
                 <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/50 pointer-events-none" />
                 
                 {/* Map Pins Simulation */}
                 <div className="absolute top-1/4 left-1/3">
                    <div className="relative">
                       <div className="w-4 h-4 rounded-full bg-neon-purple/20 border border-neon-purple flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                       </div>
                       <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-[8px] text-white whitespace-nowrap">
                          Taj Palace
                       </div>
                    </div>
                 </div>

                 <div className="absolute top-1/2 left-1/2">
                    <div className="relative">
                       <div className="w-4 h-4 rounded-full bg-neon-cyan/20 border border-neon-cyan animate-pulse flex items-center justify-center">
                          <Truck size={8} className="text-neon-cyan" />
                       </div>
                    </div>
                 </div>

                 <div className="absolute bottom-1/3 right-1/4">
                    <div className="relative">
                       <div className="w-4 h-4 rounded-full bg-neon-green/20 border border-neon-green flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-glow-sm" />
                       </div>
                       <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded bg-black/80 border border-white/10 text-[8px] text-white whitespace-nowrap">
                          Feeding India
                       </div>
                    </div>
                 </div>

                 {/* Route Line Simulation */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <path d="M 250 150 Q 350 250 450 350" stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                 </svg>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
