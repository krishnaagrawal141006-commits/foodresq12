'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { NGO_NAV } from '@/lib/constants';

export default function NgoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={NGO_NAV} role="ngo" title="NGO Dashboard" subtitle="Receive & distribute food donations">
      {children}
    </DashboardLayout>
  );
}
