'use client';

import DashboardLayout from '@/components/layout/dashboard-layout';
import { DELIVERY_NAV } from '@/lib/constants';

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={DELIVERY_NAV} role="delivery" title="Delivery Dashboard" subtitle="Manage your food deliveries">
      {children}
    </DashboardLayout>
  );
}
