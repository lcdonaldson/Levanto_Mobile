import { create } from 'zustand';

interface UIState {
  selectedPeriod: string; // e.g. "2026-02"
  activeDepartmentFilter: string | null;
  setSelectedPeriod: (period: string) => void;
  setActiveDepartmentFilter: (dept: string | null) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  selectedPeriod: '2026-02',
  activeDepartmentFilter: null,
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
  setActiveDepartmentFilter: (dept) => set({ activeDepartmentFilter: dept }),
}));
