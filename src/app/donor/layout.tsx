'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { DONOR_NAV } from '@/lib/constants';

export default function DonorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={DONOR_NAV} role="donor" title="Donor Dashboard" subtitle="Manage your food donations">
      {children}
    </DashboardLayout>
  );
}
