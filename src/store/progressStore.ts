import { create } from 'zustand';
import * as progressService from '../services/progressService';

export interface ActivityLog {
  id: string;
  programId: string;
  date: string;
  activityType: string;
  value: number;
  description: string;
}

export interface ProgramProgress {
  programId: string;
  completedDays: number;
  totalDays: number;
  lastActivity: string;
  lastActivityDate: string;
  lastLoggedDate: string; // Date string to track if activity was logged today
  activities: ActivityLog[];
}

interface ProgressState {
  enrolledProgramIds: string[];
  programProgress: Record<string, ProgramProgress>;
  currentStreak: number;
  isLoading: boolean;
  
  // Actions
  loadProgress: () => Promise<void>;
  joinProgram: (programId: string) => Promise<void>;
  unenrollProgram: (programId: string) => Promise<void>;
  logActivity: (programId: string, activityType: string, value: number, description: string) => Promise<void>;
  isEnrolled: (programId: string) => boolean;
  getProgress: (programId: string) => ProgramProgress | undefined;
  calculateCompletionRate: () => number;
  isLoggedToday: (programId: string) => boolean;
  reset: () => Promise<void>;
}

// Initialize with data immediately
const getInitialState = () => {
  // This will be replaced by loadProgress on mount
  return {
    enrolledProgramIds: ['1', '2'],
    currentStreak: 23,
    programProgress: {
      '1': {
        programId: '1',
        completedDays: 15,
        totalDays: 30,
        lastActivity: 'Logged 8,000 steps',
        lastActivityDate: new Date().toISOString(),
        lastLoggedDate: new Date(Date.now() - 86400000).toISOString(),
        activities: [],
      },
      '2': {
        programId: '2',
        completedDays: 8,
        totalDays: 30,
        lastActivity: 'Completed meditation session',
        lastActivityDate: new Date().toISOString(),
        lastLoggedDate: new Date(Date.now() - 86400000).toISOString(),
        activities: [],
      },
    },
  };
};

export const useProgressStore = create<ProgressState>()((set, get) => ({
  // Initial state
  ...getInitialState(),
  isLoading: false,

  loadProgress: async () => {
    console.log('[ProgressStore] Loading progress...');
    set({ isLoading: true });
    try {
      const data = await progressService.fetchProgress();
      console.log('[ProgressStore] Loaded data:', data);
      set({
        enrolledProgramIds: data.enrolledProgramIds,
        programProgress: data.programProgress,
        currentStreak: data.currentStreak,
        isLoading: false,
      });
      console.log('[ProgressStore] State updated');
    } catch (error) {
      console.error('[ProgressStore] Failed to load progress:', error);
      set({ isLoading: false });
    }
  },

  joinProgram: async (programId: string) => {
    set({ isLoading: true });
    try {
      const data = await progressService.enrollInProgram(programId);
      set({
        enrolledProgramIds: data.enrolledProgramIds,
        programProgress: data.programProgress,
        isLoading: false,
      });
    } catch (error) {
      console.error('[ProgressStore] Failed to join program:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  unenrollProgram: async (programId: string) => {
    set({ isLoading: true });
    try {
      const data = await progressService.unenrollFromProgram(programId);
      set({
        enrolledProgramIds: data.enrolledProgramIds,
        programProgress: data.programProgress,
        isLoading: false,
      });
    } catch (error) {
      console.error('[ProgressStore] Failed to unenroll from program:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  logActivity: async (programId: string, activityType: string, value: number, description: string) => {
    set({ isLoading: true });
    try {
      const data = await progressService.logActivity(programId, activityType, value, description);
      set({
        enrolledProgramIds: data.enrolledProgramIds,
        programProgress: data.programProgress,
        currentStreak: data.currentStreak,
        isLoading: false,
      });
    } catch (error) {
      console.error('[ProgressStore] Failed to log activity:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  isEnrolled: (programId: string) => {
    return get().enrolledProgramIds.includes(programId);
  },

  getProgress: (programId: string) => {
    return get().programProgress[programId];
  },

  calculateCompletionRate: () => {
    const { programProgress, enrolledProgramIds } = get();
    
    if (enrolledProgramIds.length === 0) {
      return 0;
    }

    let totalCompleted = 0;
    let totalDays = 0;

    enrolledProgramIds.forEach(programId => {
      const progress = programProgress[programId];
      if (progress) {
        totalCompleted += progress.completedDays;
        totalDays += progress.totalDays;
      }
    });

    return totalDays > 0 ? Math.round((totalCompleted / totalDays) * 100) : 0;
  },

  isLoggedToday: (programId: string) => {
    const progress = get().programProgress[programId];
    if (!progress) return false;
    
    const today = new Date().toDateString();
    const lastLogged = new Date(progress.lastLoggedDate).toDateString();
    
    return today === lastLogged;
  },

  reset: async () => {
    set({ isLoading: true });
    try {
      const data = await progressService.resetProgress();
      set({
        enrolledProgramIds: data.enrolledProgramIds,
        programProgress: data.programProgress,
        currentStreak: data.currentStreak,
        isLoading: false,
      });
    } catch (error) {
      console.error('[ProgressStore] Failed to reset progress:', error);
      set({ isLoading: false });
    }
  },
}));
