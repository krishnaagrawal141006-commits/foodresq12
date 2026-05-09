'use client';

import { motion } from 'framer-motion';
import { Award, Star, Trophy, Zap, Target, Gift } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import AnimatedCounter from '@/components/ui/animated-counter';

const achievements = [
  { icon: Trophy, title: 'First Delivery', desc: 'Completed your first food rescue delivery', earned: true, color: '#f59e0b' },
  { icon: Zap, title: 'Speed Demon', desc: 'Delivered 5 orders under 15 minutes', earned: true, color: '#06b6d4' },
  { icon: Star, title: '50 Deliveries', desc: 'Completed 50 successful deliveries', earned: true, color: '#a855f7' },
  { icon: Target, title: '100 Deliveries', desc: 'Reached the century milestone', earned: false, color: '#3b82f6' },
  { icon: Award, title: 'Top Rider', desc: 'Ranked in top 10 riders this month', earned: false, color: '#ec4899' },
  { icon: Gift, title: 'Streak Master', desc: '7 consecutive days of deliveries', earned: true, color: '#10b981' },
];

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Rewards & Achievements</h2>

      {/* Points Summary */}
      <GlassCard hover={false} className="!p-8 text-center glow-border">
        <Award size={48} className="text-amber-400 mx-auto mb-4" />
        <div className="text-5xl font-bold font-heading text-amber-400 mb-2">
          <AnimatedCounter end={8450} />
        </div>
        <p className="text-slate-400">Total Reward Points</p>
        <div className="flex justify-center gap-6 mt-6">
          <div><p className="text-2xl font-bold text-white">342</p><p className="text-xs text-slate-500">Deliveries</p></div>
          <div className="w-px bg-white/10" />
          <div><p className="text-2xl font-bold text-white">1,240</p><p className="text-xs text-slate-500">km Covered</p></div>
          <div className="w-px bg-white/10" />
          <div><p className="text-2xl font-bold text-white">4.9</p><p className="text-xs text-slate-500">Rating</p></div>
        </div>
      </GlassCard>

      {/* Achievements */}
      <h3 className="text-lg font-bold text-white">Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <GlassCard key={a.title} delay={i * 0.08} className={`!p-5 ${!a.earned ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl" style={{ background: `${a.color}15`, border: `1px solid ${a.color}30` }}>
                <a.icon size={22} style={{ color: a.color }} />
              </div>
              {a.earned && <span className="text-xs text-emerald-400 ml-auto">✓ Earned</span>}
              {!a.earned && <span className="text-xs text-slate-600 ml-auto">Locked</span>}
            </div>
            <h4 className="text-sm font-bold text-white mb-1">{a.title}</h4>
            <p className="text-xs text-slate-500">{a.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
