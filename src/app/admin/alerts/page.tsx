'use client';

import { AlertTriangle, AlertCircle, Clock, MapPin, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import GlowButton from '@/components/ui/glow-button';
import { demoDonations } from '@/lib/demo-data';

export default function AdminAlerts() {
  const criticalDonations = demoDonations.filter(d => d.urgencyLevel === 'critical' || d.urgencyLevel === 'high');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
             <ShieldAlert size={28} className="text-red-500" />
             Incident & Urgency Center
          </h2>
          <p className="text-sm text-slate-500">Monitor and resolve critical system alerts in real-time</p>
        </div>
        
        <div className="flex gap-2">
           <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-500 uppercase tracking-widest animate-pulse">
              3 Critical unresolved
           </div>
        </div>
      </div>

      <div className="space-y-4">
        {criticalDonations.map((item, i) => (
          <GlassCard key={item.id} delay={i * 0.1} glowColor={item.urgencyLevel === 'critical' ? 'orange' : 'purple'} className={`!p-6 ${item.urgencyLevel === 'critical' ? 'border-red-500/20' : ''}`}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.urgencyLevel === 'critical' ? 'bg-red-500/20 border border-red-500/30' : 'bg-orange-500/20 border border-orange-500/30'}`}>
                    <AlertTriangle size={32} className={item.urgencyLevel === 'critical' ? 'text-red-500' : 'text-orange-500'} />
                 </div>
              </div>

              <div className="flex-1 space-y-4">
                 <div className="flex items-start justify-between">
                    <div>
                       <h3 className="text-lg font-bold text-white flex items-center gap-2">
                         {item.urgencyLevel === 'critical' ? 'Critical Urgency Alert' : 'High Priority Donation'}
                         <span className="text-xs font-normal text-slate-500">#{item.id}</span>
                       </h3>
                       <p className="text-sm text-slate-300 mt-1">{item.foodName} from {item.donorOrg} is expiring very soon.</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-slate-500 uppercase font-bold">Time Remaining</p>
                       <p className={`text-xl font-bold font-mono ${item.urgencyLevel === 'critical' ? 'text-red-500' : 'text-orange-500'}`}>
                          14:22
                       </p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                       <MapPin size={14} className="text-slate-600" />
                       {item.pickupAddress}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                       <Clock size={14} className="text-slate-600" />
                       Listed {Math.round((Date.now() - item.createdAt.getTime()) / 60000)}m ago
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                       <AlertCircle size={14} className="text-slate-600" />
                       Status: {item.status}
                    </div>
                 </div>

                 <div className="pt-4 border-t border-white/5 flex flex-wrap gap-3">
                    <GlowButton variant="danger" size="sm" className="flex items-center gap-2">
                       Manual Force Match <ArrowRight size={14} />
                    </GlowButton>
                    <GlowButton variant="outline" size="sm">Notify Nearby Riders</GlowButton>
                    <GlowButton variant="ghost" size="sm" className="text-slate-500">Dismiss Alert</GlowButton>
                 </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="!p-8 bg-emerald-500/[0.02] border-emerald-500/10">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
               <CheckCircle2 size={24} className="text-emerald-500" />
            </div>
            <div>
               <h3 className="text-lg font-bold text-white">System Health: Optimal</h3>
               <p className="text-sm text-slate-500">No infrastructural anomalies detected. 100% of nodes reporting online.</p>
            </div>
         </div>
      </GlassCard>
    </div>
  );
}
