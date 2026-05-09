'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Brain, Loader2, CheckCircle, Clock, MapPin, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import GlowButton from '@/components/ui/glow-button';
import StatusBadge from '@/components/ui/status-badge';
import { analyzeFoodImage } from '@/lib/ai/gemini';
import type { AIAnalysis } from '@/lib/types';

export default function DonatePage() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    foodName: '', quantity: '', unit: 'plates', vegType: 'veg',
    expiryMinutes: '60', pickupAddress: '', description: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(',')[1];
      setImage(ev.target?.result as string);
      setAnalyzing(true);
      try {
        const result = await analyzeFoodImage(base64);
        setAnalysis(result);
        setForm((f) => ({
          ...f,
          foodName: result.foodType,
          quantity: result.estimatedQuantity.split(' ')[0],
          vegType: result.vegClassification,
        }));
      } catch { /* fallback */ }
      setAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-400" />
          </motion.div>
          <h2 className="text-2xl font-bold font-heading text-white mb-2">Donation Listed! 🎉</h2>
          <p className="text-slate-400 mb-6">Nearby NGOs are being notified. A rider will be assigned shortly.</p>
          <GlowButton onClick={() => { setSubmitted(false); setImage(null); setAnalysis(null); }}>
            Donate More Food
          </GlowButton>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold font-heading text-white">Donate Leftover Food</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload + AI Analysis */}
        <div className="space-y-4">
          <GlassCard hover={false} animate={false} className="!p-0 overflow-hidden">
            {!image ? (
              <label className="flex flex-col items-center justify-center h-64 cursor-pointer group">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div className="p-4 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 mb-4 group-hover:bg-neon-purple/20 transition-colors">
                  <Camera size={32} className="text-neon-purple" />
                </div>
                <p className="text-sm font-medium text-white">Upload Food Image</p>
                <p className="text-xs text-slate-500 mt-1">AI will auto-detect food details</p>
              </label>
            ) : (
              <div className="relative">
                <img src={image} alt="Food" className="w-full h-64 object-cover" />
                <button onClick={() => { setImage(null); setAnalysis(null); }}
                  className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/60 text-xs text-white hover:bg-black/80 transition-colors">
                  Change
                </button>
              </div>
            )}
          </GlassCard>

          {/* AI Analysis Result */}
          <AnimatePresence>
            {analyzing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <GlassCard hover={false} animate={false} className="!p-4">
                  <div className="flex items-center gap-3">
                    <Loader2 size={20} className="text-neon-purple animate-spin" />
                    <div>
                      <p className="text-sm font-medium text-white">AI Analyzing Food...</p>
                      <p className="text-xs text-slate-500">Detecting type, quantity & urgency</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }}
                      className="h-full w-1/3 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan" />
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {analysis && !analyzing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <GlassCard hover={false} animate={false} className="!p-4 glow-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-neon-purple" />
                    <p className="text-sm font-semibold text-neon-purple">AI Analysis Complete</p>
                    <span className="ml-auto text-xs text-slate-500">{analysis.confidence}% confidence</span>
                  </div>
                  <p className="text-sm text-white mb-3">{analysis.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={analysis.vegClassification} />
                    <StatusBadge status={analysis.urgencyEstimate} />
                    {analysis.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-full bg-white/[0.05] text-xs text-slate-400 border border-white/[0.08]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Food Name</label>
            <input type="text" value={form.foodName} onChange={(e) => setForm({ ...form, foodName: e.target.value })}
              placeholder="e.g. Vegetable Biryani" required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Quantity</label>
              <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="25" required
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Unit</label>
              <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-neon-purple/50 transition-colors">
                <option value="plates">Plates</option>
                <option value="kg">Kg</option>
                <option value="servings">Servings</option>
                <option value="portions">Portions</option>
                <option value="pieces">Pieces</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Veg / Non-Veg</label>
              <select value={form.vegType} onChange={(e) => setForm({ ...form, vegType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-neon-purple/50 transition-colors">
                <option value="veg">🟢 Vegetarian</option>
                <option value="non-veg">🔴 Non-Vegetarian</option>
                <option value="mixed">🟡 Mixed</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block flex items-center gap-1">
                <Clock size={12} /> Expires In
              </label>
              <select value={form.expiryMinutes} onChange={(e) => setForm({ ...form, expiryMinutes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-neon-purple/50 transition-colors">
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="180">3 hours</option>
                <option value="360">6 hours</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block flex items-center gap-1">
              <MapPin size={12} /> Pickup Address
            </label>
            <input type="text" value={form.pickupAddress} onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
              placeholder="Full pickup address" required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors" />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Description (optional)</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Additional details..." rows={2}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors resize-none" />
          </div>
          <GlowButton type="submit" className="w-full flex items-center justify-center gap-2">
            <Upload size={18} /> List Donation
          </GlowButton>
        </form>
      </div>
    </div>
  );
}
