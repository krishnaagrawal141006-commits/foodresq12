'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './sidebar';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  navItems: { label: string; href: string; icon: string }[];
  role: string;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({
  children,
  navItems,
  role,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar navItems={navItems} role={role} />

      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarOpen ? 260 : 76 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen"
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-6">
          <div className="flex-1">
            <h1 className="text-lg font-bold font-heading text-white">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-xs font-bold text-white">
              {role[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
