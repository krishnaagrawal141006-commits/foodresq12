'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { ADMIN_NAV } from '@/lib/constants';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={ADMIN_NAV} role="admin" title="Admin Command Center" subtitle="Real-time operational monitoring">
      {children}
    </DashboardLayout>
  );
}
