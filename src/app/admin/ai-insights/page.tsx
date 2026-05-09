'use client';

import { Brain, Sparkles, TrendingUp, AlertTriangle, Lightbulb, Zap, ArrowRight, ShieldAlert } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import GlowButton from '@/components/ui/glow-button';
import { motion } from 'framer-motion';

export default function AdminAiInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
             <Brain size={32} className="text-neon-purple" />
             AI Neural Hub
          </h2>
          <p className="text-sm text-slate-500">Autonomous operational optimization and predictive analytics</p>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] text-neon-purple font-bold tracking-widest bg-neon-purple/10 px-3 py-1 rounded-full border border-neon-purple/20">
           <Sparkles size={12} className="animate-pulse" />
           GEMINI-1.5-FLASH ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Insight Engine */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard glowColor="purple" className="!p-8 relative overflow-hidden">
             {/* Background neural network simulation */}
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                   <circle cx="50" cy="50" r="2" fill="#a855f7" />
                   <circle cx="150" cy="80" r="2" fill="#a855f7" />
                   <circle cx="250" cy="40" r="2" fill="#a855f7" />
                   <path d="M 50 50 L 150 80 L 250 40" stroke="#a855f7" strokeWidth="0.5" fill="none" />
                </svg>
             </div>

             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-neon-purple/20 flex items-center justify-center">
                      <Lightbulb size={24} className="text-neon-purple" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-white">System Recommendation #742</h3>
                      <p className="text-xs text-slate-500">Generated 42s ago based on live city trends</p>
                   </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
                   <p className="text-lg text-white leading-relaxed font-heading">
                     "Operational data indicates a <span className="text-neon-purple font-bold">23% surplus spike</span> in Aerocity hotels. 
                     We recommend re-routing <span className="text-neon-cyan font-bold">6 empty riders</span> to the 2km radius to minimize response latency."
                   </p>
                </div>

                <div className="flex gap-4">
                   <GlowButton variant="primary" className="flex items-center gap-2">
                      Deploy Autonomous Fix <Zap size={16} />
                   </GlowButton>
                   <GlowButton variant="ghost">Ignore Insight</GlowButton>
                </div>
             </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <GlassCard className="!p-6">
                <div className="flex items-center gap-3 mb-4">
                   <TrendingUp size={20} className="text-neon-green" />
                   <h4 className="text-sm font-bold text-white">Demand Prediction</h4>
                </div>
                <p className="text-xs text-slate-500 mb-4">Probability of 50+ plate donation in next hour:</p>
                <div className="flex items-end gap-4">
                   <span className="text-3xl font-bold text-white">82%</span>
                   <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-neon-green w-[82%]" />
                   </div>
                </div>
             </GlassCard>

             <GlassCard className="!p-6">
                <div className="flex items-center gap-3 mb-4">
                   <ShieldAlert size={20} className="text-neon-red" />
                   <h4 className="text-sm font-bold text-white">Fraud Detection</h4>
                </div>
                <p className="text-xs text-slate-500 mb-4">Anomalous donation patterns detected in Zone 4:</p>
                <div className="flex items-center gap-2 text-neon-red font-bold">
                   <AlertTriangle size={14} />
                   <span className="text-sm">Low Priority (2 cases)</span>
                </div>
             </GlassCard>
          </div>
        </div>

        {/* AI Logs & Activity */}
        <div className="space-y-4">
          <GlassCard className="!p-6 h-full">
             <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Neural Activity Log</h3>
             <div className="space-y-6">
                {[
                   { t: '12:44', msg: 'Analyzed biryani freshness via Vision API (94% confidence)', icon: Brain, color: '#a855f7' },
                   { t: '12:40', msg: 'Optimized route for Rider #12 (Saved 1.2km fuel)', icon: Zap, color: '#06b6d4' },
                   { t: '12:35', msg: 'Auto-matched Taj Palace to Feeding India (Critical Urgency)', icon: Sparkles, color: '#ec4899' },
                   { t: '12:30', msg: 'Detected peak demand in Hauz Khas Zone', icon: TrendingUp, color: '#10b981' },
                   { t: '12:22', msg: 'Performed city-wide logistics re-balancing', icon: ShieldAlert, color: '#ef4444' },
                ].map((log, i) => (
                   <div key={i} className="flex gap-4 relative">
                      {i < 4 && <div className="absolute top-6 left-2.5 bottom-0 w-px bg-white/5" />}
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ backgroundColor: `${log.color}20`, border: `1px solid ${log.color}40` }}>
                         <log.icon size={10} style={{ color: log.color }} />
                      </div>
                      <div>
                         <p className="text-[10px] text-slate-500 font-bold">{log.t}</p>
                         <p className="text-xs text-slate-300 leading-snug mt-0.5">{log.msg}</p>
                      </div>
                   </div>
                ))}
             </div>
             <button className="w-full mt-8 py-2 text-xs text-slate-500 hover:text-white border border-white/5 rounded-lg transition-all flex items-center justify-center gap-2">
                View Full Neural Logs <ArrowRight size={12} />
             </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
