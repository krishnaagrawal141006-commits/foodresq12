'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Zap, LogOut, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useUIStore } from '@/store/ui-store';

interface SidebarProps {
  navItems: { label: string; href: string; icon: string }[];
  role: string;
}

export default function Sidebar({ navItems, role }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const roleColors: Record<string, string> = {
    donor: 'from-neon-purple to-neon-blue',
    ngo: 'from-neon-pink to-neon-purple',
    delivery: 'from-neon-cyan to-neon-blue',
    admin: 'from-neon-purple to-neon-cyan',
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 76 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'fixed left-0 top-0 h-screen z-40',
        'bg-surface/90 backdrop-blur-2xl border-r border-white/[0.08]',
        'flex flex-col'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/[0.06]">
        <div className={cn('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0', roleColors[role])}>
          <Zap size={18} className="text-white" />
        </div>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold font-heading whitespace-nowrap"
          >
            <span className="gradient-text">FoodResQ</span>
            <span className="text-white ml-1">AI</span>
          </motion.span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = (Icons as any)[item.icon] || Icons.Circle;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                isActive
                  ? 'bg-neon-purple/15 text-neon-purple border border-neon-purple/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-8 rounded-r-full bg-neon-purple"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <IconComponent size={20} className="flex-shrink-0" />
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all">
          <Bell size={20} />
          {sidebarOpen && <span className="text-sm font-medium">Notifications</span>}
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/[0.05] transition-all"
        >
          <LogOut size={20} />
          {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </Link>
      </div>

      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-surface border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
      >
        {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </motion.aside>
  );
}
