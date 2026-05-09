'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Phone, Chrome, ArrowRight, Shield } from 'lucide-react';
import GlowButton from '@/components/ui/glow-button';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [role, setRole] = useState<'donor' | 'ngo' | 'delivery' | 'admin'>('donor');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${role}`);
  };

  const handleGoogleLogin = () => {
    router.push(`/${role}`);
  };

  const handleDemoLogin = (r: typeof role) => {
    router.push(`/${r}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="orb orb-purple w-[500px] h-[500px] -top-40 -left-40" />
      <div className="orb orb-cyan w-[400px] h-[400px] bottom-0 right-0" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md mx-4">
        <div className="rounded-2xl border border-white/[0.08] bg-surface/80 backdrop-blur-2xl p-8">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
              <Zap size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold font-heading">
              <span className="gradient-text">FoodResQ</span> <span className="text-white">AI</span>
            </span>
          </Link>

          <h2 className="text-2xl font-bold font-heading text-center text-white mb-2">Welcome Back</h2>
          <p className="text-sm text-slate-500 text-center mb-6">Sign in to your rescue network</p>

          {/* Role Selector */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {(['donor', 'ngo', 'delivery', 'admin'] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                  role === r ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30' : 'bg-white/[0.03] text-slate-500 border border-white/[0.06] hover:text-white'
                }`}>
                {r === 'ngo' ? 'NGO' : r}
              </button>
            ))}
          </div>

          {/* Phone/OTP Form */}
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors" />
                </div>
              </div>
              <GlowButton type="submit" className="w-full flex items-center justify-center gap-2">
                Send OTP <ArrowRight size={16} />
              </GlowButton>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Enter OTP</label>
                <div className="relative">
                  <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP" maxLength={6}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-neon-purple/50 transition-colors tracking-widest text-center text-lg" />
                </div>
                <button type="button" onClick={() => setStep('phone')} className="text-xs text-neon-purple mt-2 hover:underline">
                  Change number
                </button>
              </div>
              <GlowButton type="submit" className="w-full flex items-center justify-center gap-2">
                Verify & Login <ArrowRight size={16} />
              </GlowButton>
            </form>
          )}

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-slate-600">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <button onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all">
            <Chrome size={18} /> Continue with Google
          </button>

          {/* Demo Login Shortcuts */}
          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <p className="text-xs text-slate-600 text-center mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { r: 'donor' as const, label: '🏨 Donor', color: 'purple' },
                { r: 'ngo' as const, label: '💚 NGO', color: 'green' },
                { r: 'delivery' as const, label: '🚴 Rider', color: 'cyan' },
                { r: 'admin' as const, label: '⚡ Admin', color: 'blue' },
              ].map((d) => (
                <button key={d.r} onClick={() => handleDemoLogin(d.r)}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-white hover:border-neon-purple/30 transition-all">
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-600 text-center mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-neon-purple hover:underline">Join Network</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
