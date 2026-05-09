'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Utensils, Building2, Truck, Leaf, Brain, MapPin, Navigation, Bell, BarChart3, Route, ChevronRight, Star, Quote } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import GlassCard from '@/components/ui/glass-card';
import GlowButton from '@/components/ui/glow-button';
import AnimatedCounter from '@/components/ui/animated-counter';
import { demoTestimonials } from '@/lib/demo-data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const features = [
  { icon: Brain, title: 'AI Food Detection', desc: 'Gemini Vision AI identifies food type, quantity, and urgency from a single photo.', color: '#a855f7' },
  { icon: MapPin, title: 'Smart NGO Matching', desc: 'Automatically match donations to nearest NGOs based on distance, capacity & need.', color: '#ec4899' },
  { icon: Navigation, title: 'Realtime Rider Tracking', desc: 'Live GPS tracking of delivery partners with animated route visualization.', color: '#06b6d4' },
  { icon: Route, title: 'Route Optimization', desc: 'AI-optimized delivery routes reducing time, fuel, and CO₂ emissions.', color: '#3b82f6' },
  { icon: Bell, title: 'Push Notifications', desc: 'Instant alerts for new donations, rider updates, and urgency warnings.', color: '#f97316' },
  { icon: BarChart3, title: 'Impact Analytics', desc: 'Track meals saved, food waste reduced, and carbon footprint impact in realtime.', color: '#10b981' },
];

const steps = [
  { step: 1, title: 'Restaurant Uploads Food', desc: 'Donors list surplus food with images — AI detects type & quantity instantly.', icon: Utensils },
  { step: 2, title: 'AI Analyzes Urgency', desc: 'Gemini Vision classifies food, estimates shelf life, and sets urgency level.', icon: Brain },
  { step: 3, title: 'Nearby NGO Matched', desc: 'Smart matching connects the donation to the closest available NGO.', icon: Building2 },
  { step: 4, title: 'Rider Delivers in Realtime', desc: 'Delivery partner picks up and delivers with live tracking & OTP verification.', icon: Truck },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32">
        {/* Background Effects */}
        <div className="orb orb-purple w-[600px] h-[600px] -top-40 -left-40" />
        <div className="orb orb-cyan w-[500px] h-[500px] top-20 right-0" />
        <div className="orb orb-blue w-[400px] h-[400px] bottom-0 left-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-sm text-neon-purple-light mb-8">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-neon-purple opacity-75" /><span className="relative h-2 w-2 rounded-full bg-neon-purple" /></span>
                AI-Powered Food Rescue Network
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6">
              Turn Leftover Food Into{' '}
              <span className="gradient-text">Real-Time Impact</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered food redistribution network connecting restaurants, NGOs, and delivery partners through realtime logistics and smart matching.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/login">
                <GlowButton size="lg" className="flex items-center gap-2">
                  Launch Dashboard <ArrowRight size={18} />
                </GlowButton>
              </Link>
              <GlowButton variant="outline" size="lg" className="flex items-center gap-2">
                <Play size={18} /> Watch Demo
              </GlowButton>
            </motion.div>
          </div>

          {/* Hero Dashboard Mockup */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border border-white/[0.08] bg-surface/60 backdrop-blur-xl p-6 lg:p-8 shadow-2xl">
              {/* Mock Dashboard */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Meals Saved', value: 127845, color: '#a855f7', icon: Utensils },
                  { label: 'NGOs Connected', value: 156, color: '#ec4899', icon: Building2 },
                  { label: 'Active Deliveries', value: 23, color: '#06b6d4', icon: Truck },
                  { label: 'CO₂ Reduced', value: 42.8, color: '#10b981', icon: Leaf },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.1 }}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon size={16} style={{ color: stat.color }} />
                      <span className="text-xs text-slate-500">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-bold font-heading text-white">
                      <AnimatedCounter end={stat.value} suffix={stat.label === 'CO₂ Reduced' ? ' tons' : ''} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Mock Map + Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.02] h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-glow-purple opacity-30" />
                  <div className="text-center z-10">
                    <MapPin size={32} className="text-neon-purple mx-auto mb-2 animate-float" />
                    <p className="text-sm text-slate-500">Live Delivery Map</p>
                    <p className="text-xs text-slate-600 mt-1">23 active routes • 156 NGOs</p>
                  </div>
                  {/* Floating dots simulating map */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i} animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2 + i * 0.5, repeat: Infinity }}
                      className="absolute w-2 h-2 rounded-full bg-neon-cyan"
                      style={{ top: `${20 + Math.random() * 60}%`, left: `${10 + Math.random() * 80}%` }} />
                  ))}
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Feed</p>
                  {[
                    { text: 'Biryani pickup • Taj Hotel', time: '2m ago', color: '#a855f7' },
                    { text: 'NGO accepted • Robin Hood', time: '5m ago', color: '#10b981' },
                    { text: 'Delivered • Annadan Trust', time: '8m ago', color: '#06b6d4' },
                    { text: 'AI scan • 40 plates detected', time: '12m ago', color: '#f97316' },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.15 }}
                      className="flex items-center gap-3 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-slate-300 flex-1">{item.text}</span>
                      <span className="text-slate-600">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="py-24 relative">
        <div className="orb orb-cyan w-[400px] h-[400px] top-0 right-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0} className="text-sm text-neon-cyan font-semibold uppercase tracking-wider">Features</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-4">
              Powered by <span className="gradient-text">AI & Realtime</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-slate-400 max-w-2xl mx-auto">
              Every feature is designed to maximize food rescue efficiency with cutting-edge AI and logistics technology.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.1} glowColor={(['purple', 'pink', 'cyan', 'blue', 'orange', 'green'] as const)[i]}>
                <div className="p-3 rounded-xl w-fit mb-4" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon size={24} style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold font-heading text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORKFLOW ============ */}
      <section id="workflow" className="py-24 relative">
        <div className="orb orb-purple w-[500px] h-[500px] -left-40 top-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0} className="text-sm text-neon-purple font-semibold uppercase tracking-wider">How It Works</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-4">
              From <span className="gradient-text">Surplus to Served</span> in Minutes
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-neon-purple/30 via-neon-cyan/30 to-neon-blue/30" />
            {steps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative text-center">
                <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 border border-white/[0.1] flex items-center justify-center mb-6">
                  <s.icon size={28} className="text-neon-purple" />
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-neon-purple text-white text-xs font-bold flex items-center justify-center">{s.step}</div>
                </div>
                <h3 className="text-lg font-bold font-heading text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10">
                    <ChevronRight size={20} className="text-neon-purple/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ IMPACT ============ */}
      <section id="impact" className="py-24 relative">
        <div className="orb orb-blue w-[500px] h-[500px] right-0 top-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0} className="text-sm text-neon-green font-semibold uppercase tracking-wider">Impact</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-bold font-heading mt-3 mb-4">
              Real Numbers. <span className="gradient-text">Real Impact.</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Meals Saved', value: 127845, suffix: '+', color: '#a855f7' },
              { label: 'Food Waste Reduced', value: 64.2, suffix: ' tons', color: '#06b6d4' },
              { label: 'NGO Partners', value: 156, suffix: '+', color: '#ec4899' },
              { label: 'CO₂ Prevented', value: 42.8, suffix: ' tons', color: '#10b981' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.08] bg-surface p-8 text-center group hover:border-white/[0.15] transition-all">
                <div className="text-4xl lg:text-5xl font-bold font-heading mb-2" style={{ color: s.color }}>
                  <AnimatedCounter end={s.value} suffix={s.suffix} decimals={s.value % 1 !== 0 ? 1 : 0} />
                </div>
                <p className="text-sm text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0} className="text-sm text-neon-purple font-semibold uppercase tracking-wider">Testimonials</motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl lg:text-5xl font-bold font-heading mt-3">
              Trusted by <span className="gradient-text">Change Makers</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoTestimonials.map((t, i) => (
              <GlassCard key={t.id} delay={i * 0.15}>
                <Quote size={24} className="text-neon-purple/30 mb-4" />
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{t.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}, {t.organization}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={12} className="text-amber-400 fill-amber-400" />)}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="contact" className="py-24 relative">
        <div className="orb orb-purple w-[600px] h-[600px] left-1/2 -translate-x-1/2 top-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl border border-white/[0.08] bg-surface/60 backdrop-blur-2xl p-12 lg:p-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
              Build The Future Of{' '}<span className="gradient-text">Food Rescue</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Join the network of restaurants, NGOs, and delivery partners creating real-time humanitarian impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <GlowButton size="lg" className="flex items-center gap-2">
                  Join Network <ArrowRight size={18} />
                </GlowButton>
              </Link>
              <GlowButton variant="outline" size="lg">Become a Partner</GlowButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
