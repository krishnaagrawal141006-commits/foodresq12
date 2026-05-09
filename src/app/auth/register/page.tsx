'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, User, Phone, Building2, MapPin, ArrowRight } from 'lucide-react';
import GlowButton from '@/components/ui/glow-button';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'donor' | 'ngo' | 'delivery'>('donor');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${role}`);
  };

  const roleConfig = {
    donor: { label: 'Restaurant / Donor', desc: 'Hotels, canteens, wedding halls', icon: '🏨' },
    ngo: { label: 'NGO / Receiver', desc: 'Shelters, community fridges', icon: '💚' },
    delivery: { label: 'Delivery Partner', desc: 'Riders & volunteers', icon: '🚴' },
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-12">
      <div className="orb orb-purple w-[500px] h-[500px] -top-40 right-0" />
      <div className="orb orb-cyan w-[400px] h-[400px] bottom-0 -left-40" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg mx-4">
        <div className="rounded-2xl border border-white/[0.08] bg-surface/80 backdrop-blur-2xl p-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
              <Zap size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold font-heading">
              <span className="gradient-text">FoodResQ</span> <span className="text-white">AI</span>
            </span>
          </Link>

          <h2 className="text-2xl font-bold font-heading text-center text-white mb-1">Join the Network</h2>
          <p className="text-sm text-slate-500 text-center mb-6">Start rescuing food today</p>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {(Object.entries(roleConfig) as [typeof role, typeof roleConfig.donor][]).map(([key, config]) => (
              <button key={key} onClick={() => setRole(key)}
                className={`p-4 rounded-xl text-center transition-all border ${
                  role === key
                    ? 'bg-neon-purple/10 border-neon-purple/30 ring-1 ring-neon-purple/20'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                }`}>
                <div className="text-2xl mb-2">{config.icon}</div>
                <p className="text-xs font-medium text-white">{config.label.split(' / ')[0]}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="Your name" required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="tel" placeholder="+91 98765 43210" required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors" />
                </div>
              </div>
            </div>

            {role !== 'delivery' && (
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Organization Name</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder={role === 'donor' ? 'Restaurant / Hotel name' : 'NGO name'} required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Address</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-slate-500" />
                <textarea placeholder="Full address" rows={2} required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors resize-none" />
              </div>
            </div>

            <GlowButton type="submit" className="w-full flex items-center justify-center gap-2">
              Create Account <ArrowRight size={16} />
            </GlowButton>
          </form>

          <p className="text-xs text-slate-600 text-center mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-neon-purple hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
