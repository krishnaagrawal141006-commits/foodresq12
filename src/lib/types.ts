// ==========================================
// FoodResQ AI — TypeScript Types
// ==========================================

export type UserRole = 'donor' | 'ngo' | 'delivery' | 'admin';

export type VegType = 'veg' | 'non-veg' | 'mixed';

export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';

export type DonationStatus = 'pending' | 'matched' | 'accepted' | 'pickup-started' | 'picked-up' | 'in-transit' | 'delivered' | 'expired' | 'cancelled';

export type DeliveryStatus = 'assigned' | 'pickup-started' | 'picked-up' | 'en-route' | 'delivered';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
  address?: string;
  coordinates?: Coordinates;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  donorOrg: string;
  foodName: string;
  description?: string;
  quantity: number;
  unit: string;
  vegType: VegType;
  expiryTime: Date;
  urgencyLevel: UrgencyLevel;
  imageUrl?: string;
  tags: string[];
  pickupAddress: string;
  coordinates: Coordinates;
  status: DonationStatus;
  matchedNgoId?: string;
  matchedNgoName?: string;
  riderId?: string;
  riderName?: string;
  aiAnalysis?: AIAnalysis;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIAnalysis {
  foodType: string;
  estimatedQuantity: string;
  vegClassification: VegType;
  urgencyEstimate: UrgencyLevel;
  freshness: string;
  tags: string[];
  confidence: number;
  summary: string;
}

export interface Delivery {
  id: string;
  donationId: string;
  riderId: string;
  riderName: string;
  donorId: string;
  ngoId: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupCoords: Coordinates;
  deliveryCoords: Coordinates;
  status: DeliveryStatus;
  estimatedTime: number; // minutes
  distance: number; // km
  otp: string;
  pickupVerified: boolean;
  deliveryVerified: boolean;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'donation' | 'delivery' | 'system' | 'alert' | 'achievement';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface RiderLocation {
  riderId: string;
  coordinates: Coordinates;
  heading: number;
  speed: number;
  lastUpdated: Date;
}

export interface AnalyticsData {
  totalMealsSaved: number;
  totalDonations: number;
  activeDeliveries: number;
  ngosConnected: number;
  co2Reduced: number;
  foodWasteReduced: number;
  avgDeliveryTime: number;
  topDonors: { name: string; meals: number }[];
  topNgos: { name: string; received: number }[];
  dailyDonations: { date: string; count: number }[];
  weeklyTrends: { week: string; donations: number; deliveries: number }[];
}

export interface DashboardStats {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  trend?: number;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}
