'use client';

import { Building2, Search, Filter, Mail, Phone, MoreVertical, Star, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import GlowButton from '@/components/ui/glow-button';
import { demoUsers } from '@/lib/demo-data';

export default function AdminDonors() {
   const donors = demoUsers.filter(u => u.role === 'donor');

   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-2xl font-bold font-heading text-white">Donor Partners</h2>
               <p className="text-sm text-slate-500">Manage hospitality and corporate food donors</p>
            </div>

            <div className="flex gap-2">
               <GlowButton variant="primary" size="sm" className="flex items-center gap-2">
                  Add New Donor
               </GlowButton>
            </div>
         </div>

         {/* Donor Table/Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((donor, i) => (
               <GlassCard key={donor.id} delay={i * 0.1} className="relative group">
                  <div className="absolute top-4 right-4">
                     <button className="p-1 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                        <MoreVertical size={16} />
                     </button>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-14 h-14 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-xl">
                        🏨
                     </div>
                     <div>
                        <h4 className="text-white font-bold flex items-center gap-2">
                           {donor.organization}
                           {donor.verified && <CheckCircle size={14} className="text-neon-cyan" />}
                        </h4>
                        <p className="text-xs text-slate-500">{donor.name}</p>
                     </div>
                  </div>

                  <div className="space-y-3 mb-6">
                     <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Mail size={12} className="text-slate-600" />
                        {donor.email}
                     </div>
                     <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Phone size={12} className="text-slate-600" />
                        {donor.phone}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                     <div className="text-center">
                        <p className="text-[10px] text-slate-500 uppercase mb-1">Total Meals</p>
                        <p className="text-sm font-bold text-neon-purple">12,450</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] text-slate-500 uppercase mb-1">Reliability</p>
                        <div className="flex items-center justify-center gap-1">
                           <span className="text-sm font-bold text-white">4.9</span>
                           <Star size={10} className="text-amber-400 fill-amber-400" />
                        </div>
                     </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                     <GlowButton variant="outline" size="sm" className="flex-1">View Profile</GlowButton>
                     <GlowButton variant="ghost" size="sm" className="flex-1">Activity Log</GlowButton>
                  </div>
               </GlassCard>
            ))}
         </div>
      </div>
   );
}
