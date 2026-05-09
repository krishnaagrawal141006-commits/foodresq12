'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import GlassCard from '@/components/ui/glass-card';
import StatCard from '@/components/ui/stat-card';
import { demoAdminStats, demoAnalytics } from '@/lib/demo-data';
import { Download, Calendar, Filter } from 'lucide-react';
import GlowButton from '@/components/ui/glow-button';

const cityPerformance = [
  { name: 'New Delhi', value: 45000, color: '#a855f7' },
  { name: 'Mumbai', value: 38000, color: '#06b6d4' },
  { name: 'Bangalore', value: 32000, color: '#3b82f6' },
  { name: 'Hyderabad', value: 28000, color: '#ec4899' },
  { name: 'Chennai', value: 24000, color: '#10b981' },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Global Analytics</h2>
          <p className="text-sm text-slate-500">Deep-dive into network impact and operational efficiency</p>
        </div>
        
        <div className="flex gap-2">
           <GlowButton variant="outline" size="sm" className="flex items-center gap-2">
             <Calendar size={16} /> Last 30 Days
           </GlowButton>
           <GlowButton variant="ghost" size="sm" className="flex items-center gap-2 border border-white/5">
             <Download size={16} /> Export Report
           </GlowButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoAdminStats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 !p-6">
           <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Network Throughput (7 Days)</h3>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={demoAnalytics.dailyDonations}>
                    <defs>
                       <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f0a28', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#a855f7" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </GlassCard>

        <GlassCard className="!p-6">
           <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">City Performance</h3>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={cityPerformance} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip 
                       cursor={{fill: 'transparent'}}
                       contentStyle={{ backgroundColor: '#0f0a28', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                       {cityPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <GlassCard className="!p-6">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Top Donation Categories</h3>
            <div className="h-64 w-full flex items-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={[
                           { name: 'Cooked Meals', value: 45 },
                           { name: 'Bakery', value: 20 },
                           { name: 'Fruits/Veg', value: 15 },
                           { name: 'Packaged', value: 20 },
                        ]}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        <Cell fill="#a855f7" />
                        <Cell fill="#06b6d4" />
                        <Cell fill="#ec4899" />
                        <Cell fill="#10b981" />
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
               <div className="w-1/2 space-y-2">
                  {[
                     { n: 'Cooked Meals', v: '45%', c: '#a855f7' },
                     { n: 'Bakery', v: '20%', c: '#06b6d4' },
                     { n: 'Fruits/Veg', v: '15%', c: '#ec4899' },
                     { n: 'Packaged', v: '20%', c: '#10b981' },
                  ].map(i => (
                     <div key={i.n} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full" style={{backgroundColor: i.c}} />
                           <span className="text-[10px] text-slate-400">{i.n}</span>
                        </div>
                        <span className="text-xs font-bold text-white">{i.v}</span>
                     </div>
                  ))}
               </div>
            </div>
         </GlassCard>

         <GlassCard className="!p-6">
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Donor Reliability Index</h3>
            <div className="space-y-4">
               {demoAnalytics.topDonors.slice(0, 4).map((donor, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs">🏨</div>
                        <div>
                           <p className="text-xs font-bold text-white">{donor.name}</p>
                           <p className="text-[10px] text-slate-500">{donor.meals} meals rescued</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-neon-green">99.2%</p>
                        <p className="text-[10px] text-slate-600 uppercase">Score</p>
                     </div>
                  </div>
               ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
}
