'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import GlassCard from '@/components/ui/glass-card';
import StatCard from '@/components/ui/stat-card';
import AnimatedCounter from '@/components/ui/animated-counter';
import { demoDonorStats, demoAnalytics } from '@/lib/demo-data';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload) {
    return (
      <div className="rounded-lg bg-surface border border-white/[0.1] px-3 py-2 text-xs">
        <p className="text-white font-medium">{label}</p>
        <p className="text-neon-purple">{payload[0]?.value} donations</p>
      </div>
    );
  }
  return null;
};

export default function DonorAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Impact Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {demoDonorStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Chart */}
        <GlassCard hover={false} animate className="!p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Weekly Donations</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={demoAnalytics.dailyDonations}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#a855f7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Trend Chart */}
        <GlassCard hover={false} animate className="!p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={demoAnalytics.weeklyTrends}>
              <defs>
                <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Area type="monotone" dataKey="donations" stroke="#a855f7" fill="url(#gradPurple)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Impact Summary */}
      <GlassCard hover={false} animate className="!p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Your Impact Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Meals Donated', value: 2450, color: '#a855f7' },
            { label: 'Food Waste Saved', value: 1840, suffix: ' kg', color: '#06b6d4' },
            { label: 'People Fed', value: 7350, color: '#ec4899' },
            { label: 'CO₂ Prevented', value: 4.2, suffix: ' tons', color: '#10b981' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl font-bold font-heading mb-1" style={{ color: item.color }}>
                <AnimatedCounter end={item.value} suffix={item.suffix} decimals={item.value % 1 !== 0 ? 1 : 0} />
              </div>
              <p className="text-xs text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
