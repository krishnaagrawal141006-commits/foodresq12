'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import GlassCard from '@/components/ui/glass-card';
import StatCard from '@/components/ui/stat-card';
import AnimatedCounter from '@/components/ui/animated-counter';
import { demoNgoStats, demoAnalytics } from '@/lib/demo-data';

export default function NgoAnalyticsPage() {
  const pieData = [
    { name: 'Veg', value: 65, color: '#10b981' },
    { name: 'Non-Veg', value: 25, color: '#ef4444' },
    { name: 'Mixed', value: 10, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Impact Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoNgoStats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false} className="!p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Meals Received Weekly</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={demoAnalytics.dailyDonations}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
        <GlassCard hover={false} className="!p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Food Type Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}>
                {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />{d.name} ({d.value}%)
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
