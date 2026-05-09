// ==========================================
// FoodResQ AI — Constants
// ==========================================

export const APP_NAME = 'FoodResQ AI';
export const APP_TAGLINE = 'AI-Powered Food Rescue Network';
export const APP_DESCRIPTION = 'AI-powered food redistribution network connecting restaurants, NGOs, and delivery partners through realtime logistics and smart matching.';

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
];

export const DONOR_NAV = [
  { label: 'Dashboard', href: '/donor', icon: 'LayoutDashboard' },
  { label: 'Donate Food', href: '/donor/donate', icon: 'Plus' },
  { label: 'History', href: '/donor/history', icon: 'History' },
  { label: 'Tracking', href: '/donor/tracking', icon: 'MapPin' },
  { label: 'Analytics', href: '/donor/analytics', icon: 'BarChart3' },
];

export const NGO_NAV = [
  { label: 'Dashboard', href: '/ngo', icon: 'LayoutDashboard' },
  { label: 'Available', href: '/ngo/donations', icon: 'Search' },
  { label: 'Accepted', href: '/ngo/accepted', icon: 'CheckCircle' },
  { label: 'History', href: '/ngo/history', icon: 'History' },
  { label: 'Analytics', href: '/ngo/analytics', icon: 'BarChart3' },
];

export const DELIVERY_NAV = [
  { label: 'Dashboard', href: '/delivery', icon: 'LayoutDashboard' },
  { label: 'Active', href: '/delivery/active', icon: 'Navigation' },
  { label: 'History', href: '/delivery/history', icon: 'History' },
  { label: 'Rewards', href: '/delivery/rewards', icon: 'Award' },
];

export const ADMIN_NAV = [
  { label: 'Command Center', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Deliveries', href: '/admin/deliveries', icon: 'Truck' },
  { label: 'Donors', href: '/admin/donors', icon: 'Building2' },
  { label: 'NGOs', href: '/admin/ngos', icon: 'Heart' },
  { label: 'Riders', href: '/admin/riders', icon: 'Bike' },
  { label: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
  { label: 'AI Insights', href: '/admin/ai-insights', icon: 'Brain' },
  { label: 'Alerts', href: '/admin/alerts', icon: 'AlertTriangle' },
];

export const DELIVERY_STATUSES: { value: string; label: string; color: string }[] = [
  { value: 'assigned', label: 'Assigned', color: '#f59e0b' },
  { value: 'pickup-started', label: 'Pickup Started', color: '#3b82f6' },
  { value: 'picked-up', label: 'Picked Up', color: '#8b5cf6' },
  { value: 'en-route', label: 'En Route', color: '#06b6d4' },
  { value: 'delivered', label: 'Delivered', color: '#10b981' },
];

export const URGENCY_LEVELS = [
  { value: 'critical', label: 'Critical (< 30 min)', color: '#ef4444' },
  { value: 'high', label: 'High (< 1 hour)', color: '#f97316' },
  { value: 'medium', label: 'Medium (1-3 hours)', color: '#eab308' },
  { value: 'low', label: 'Low (3+ hours)', color: '#22c55e' },
];
