// ==========================================
// Auth Store (Zustand)
// ==========================================

import { create } from 'zustand';
import type { User, UserRole } from '@/lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  role: null,
  setUser: (user) => set({
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    isLoading: false,
  }),
  setRole: (role) => set({ role }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({
    user: null,
    isAuthenticated: false,
    role: null,
    isLoading: false,
  }),
}));
