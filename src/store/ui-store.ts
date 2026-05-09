// ==========================================
// UI Store (Zustand)
// ==========================================

import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  notificationsOpen: boolean;
  modalOpen: string | null;
  theme: 'dark';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleNotifications: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  notificationsOpen: false,
  modalOpen: null,
  theme: 'dark',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleNotifications: () => set((s) => ({ notificationsOpen: !s.notificationsOpen })),
  openModal: (id) => set({ modalOpen: id }),
  closeModal: () => set({ modalOpen: null }),
}));
