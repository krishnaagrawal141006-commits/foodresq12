'use client';

import { motion } from 'framer-motion';
import { Truck, Activity, Users, AlertCircle, TrendingUp, Map as MapIcon, Brain } from 'lucide-react';
import StatCard from '@/components/ui/stat-card';
import GlassCard from '@/components/ui/glass-card';
import StatusBadge from '@/components/ui/status-badge';
import AnimatedCounter from '@/components/ui/animated-counter';
import { demoAdminStats, demoAnalytics, demoDeliveries, demoDonations } from '@/lib/demo-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminDashboard() {
  const activeDeliveries = demoDeliveries.filter(d => d.status !== 'delivered');
  const recentAlerts = demoDonations.filter(d => d.urgencyLevel === 'critical' && d.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoAdminStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Delivery Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <Activity size={20} className="text-neon-cyan" />
              Live Operational Feed
            </h3>
            <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-md border border-white/10">
              {activeDeliveries.length} active shipments
            </span>
          </div>
          
          <div className="space-y-3">
            {activeDeliveries.map((delivery, i) => (
              <GlassCard key={delivery.id} delay={i * 0.1} glowColor="cyan" className="!p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                    <Truck size={18} className="text-neon-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">#{delivery.id}</span>
                      <StatusBadge status={delivery.status} pulse />
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {delivery.riderName} is moving from {delivery.donorId} to NGO
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">{delivery.estimatedTime}m</p>
                    <p className="text-[10px] text-slate-600">ETA</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* AI Operational Insights */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
            <Brain size={20} className="text-neon-purple" />
            AI Operations Hub
          </h3>
          <GlassCard glowColor="purple" className="!p-6 border-neon-purple/20">
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-neon-purple/10 border border-neon-purple/20">
                <p className="text-xs text-neon-purple-light font-semibold mb-1">PREDICTIVE INSIGHT</p>
                <p className="text-sm text-white leading-relaxed">
                  Peak donation volume expected in <span className="text-neon-cyan font-bold">2.5 hours</span> near Connaught Place. 
                  Pre-alerting 5 standby riders.
                </p>
              </div>
              
              <div className="space-y-3">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Efficiency Metrics</p>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-slate-400">Match Accuracy</span>
                  <span className="text-sm text-neon-green font-bold">98.4%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-neon-green h-full w-[98.4%]" />
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-xs text-slate-400">Avg. Response Time</span>
                  <span className="text-sm text-neon-cyan font-bold">4.2m</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-neon-cyan h-full w-[85%]" />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Urgent Alerts */}
          <div className="space-y-3">
             <h4 className="text-xs font-bold text-red-400 uppercase flex items-center gap-1">
               <AlertCircle size={14} /> Critical Attention
             </h4>
             {recentAlerts.length > 0 ? recentAlerts.map((alert, i) => (
               <div key={alert.id} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                   <AlertCircle size={16} className="text-red-500" />
                 </div>
                 <div className="flex-1">
                   <p className="text-xs font-bold text-white">{alert.foodName}</p>
                   <p className="text-[10px] text-slate-500">Expires in 15 mins • No NGO matched</p>
                 </div>
               </div>
             )) : (
               <p className="text-xs text-slate-600 italic">No critical alerts at this moment.</p>
             )}
          </div>
        </div>
      </div>

      {/* Network Growth Chart */}
      <GlassCard className="!p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold font-heading text-white">Rescue Network Growth</h3>
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-purple" />
                <span className="text-xs text-slate-500">Donations</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-cyan" />
                <span className="text-xs text-slate-500">Deliveries</span>
             </div>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demoAnalytics.weeklyTrends}>
              <XAxis dataKey="week" stroke="#475569" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f0a28', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="donations" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="deliveries" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
