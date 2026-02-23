/**
 * Progress Service
 * 
 * Handles all API calls related to user progress, program enrollment,
 * and activity logging. This follows REST API patterns and would connect
 * to endpoints like:
 * 
 * - GET    /progress              - Fetch user's progress
 * - POST   /progress/enroll       - Enroll in a program
 * - DELETE /progress/unenroll     - Unenroll from a program  
 * - POST   /progress/activity     - Log an activity
 * - POST   /progress/reset        - Reset progress (demo only)
 * 
 * For demo purposes, this maintains state locally but simulates API calls.
 * To connect to a real backend, replace the local storage logic with actual
 * API calls using the functions from './api.ts'.
 */

import { apiGet, apiPost, apiDelete } from './api';
import type { ProgramProgress, ActivityLog } from '../store/progressStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const STORAGE_KEY = 'levanto-progress';

/**
 * In-memory storage for demo (simulates database)
 */
let progressCache: {
  enrolledProgramIds: string[];
  programProgress: Record<string, ProgramProgress>;
  currentStreak: number;
} | null = null;

/**
 * Load progress from storage (simulates DB query)
 */
async function loadFromStorage() {
  if (progressCache) return progressCache;
  
  try {
    const storage = Platform.OS === 'web' ? localStorage : AsyncStorage;
    const data = Platform.OS === 'web' 
      ? storage.getItem(STORAGE_KEY)
      : await storage.getItem(STORAGE_KEY);
    
    if (data) {
      progressCache = JSON.parse(data);
      return progressCache;
    }
  } catch (error) {
    console.error('[ProgressService] Failed to load from storage:', error);
  }
  
  // Return initial state if no data
  return getInitialProgress();
}

/**
 * Save progress to storage (simulates DB write)
 */
async function saveToStorage(data: typeof progressCache) {
  progressCache = data;
  
  try {
    const storage = Platform.OS === 'web' ? localStorage : AsyncStorage;
    const json = JSON.stringify(data);
    
    if (Platform.OS === 'web') {
      storage.setItem(STORAGE_KEY, json);
    } else {
      await storage.setItem(STORAGE_KEY, json);
    }
  } catch (error) {
    console.error('[ProgressService] Failed to save to storage:', error);
  }
}

/**
 * Get initial progress state
 */
function getInitialProgress() {
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
}

/**
 * API: Fetch user's progress
 * Endpoint: GET /progress
 */
export async function fetchProgress() {
  // Simulate API call
  await apiGet('/progress');
  
  // In production: return response data
  // For demo: return from local storage
  return await loadFromStorage();
}

/**
 * API: Enroll user in a program
 * Endpoint: POST /progress/enroll
 */
export async function enrollInProgram(programId: string) {
  const data = await loadFromStorage();
  
  // Simulate API call
  await apiPost('/progress/enroll', { programId });
  
  // Update local data (in production, backend would do this)
  if (!data.enrolledProgramIds.includes(programId)) {
    data.enrolledProgramIds.push(programId);
    data.programProgress[programId] = {
      programId,
      completedDays: 0,
      totalDays: 30,
      lastActivity: 'Just joined!',
      lastActivityDate: new Date().toISOString(),
      lastLoggedDate: new Date(0).toISOString(),
      activities: [],
    };
  }
  
  await saveToStorage(data);
  return data;
}

/**
 * API: Unenroll user from a program
 * Endpoint: DELETE /progress/unenroll/:programId
 */
export async function unenrollFromProgram(programId: string) {
  const data = await loadFromStorage();
  
  // Simulate API call
  await apiDelete(`/progress/unenroll/${programId}`);
  
  // Update local data
  data.enrolledProgramIds = data.enrolledProgramIds.filter(id => id !== programId);
  delete data.programProgress[programId];
  
  await saveToStorage(data);
  return data;
}

/**
 * API: Log an activity
 * Endpoint: POST /progress/activity
 */
export async function logActivity(
  programId: string,
  activityType: string,
  value: number,
  description: string
) {
  const data = await loadFromStorage();
  const progress = data.programProgress[programId];
  
  if (!progress) {
    throw new Error('Not enrolled in this program');
  }
  
  // Check if already logged today
  const today = new Date().toDateString();
  const lastLogged = new Date(progress.lastLoggedDate).toDateString();
  
  if (today === lastLogged) {
    throw new Error('Activity already logged today');
  }
  
  // Simulate API call
  await apiPost('/progress/activity', {
    programId,
    activityType,
    value,
    description,
  });
  
  // Create activity log
  const newActivity: ActivityLog = {
    id: Date.now().toString(),
    programId,
    date: new Date().toISOString(),
    activityType,
    value,
    description,
  };
  
  // Update progress
  progress.completedDays += 1;
  progress.lastActivity = description;
  progress.lastActivityDate = new Date().toISOString();
  progress.lastLoggedDate = new Date().toISOString();
  progress.activities.push(newActivity);
  
  data.currentStreak += 1;
  
  await saveToStorage(data);
  return data;
}

/**
 * API: Reset progress to initial state
 * Endpoint: POST /progress/reset (demo only)
 */
export async function resetProgress() {
  // Clear cache first
  progressCache = null;
  
  // Simulate API call
  await apiPost('/progress/reset', {});
  
  const initialData = getInitialProgress();
  await saveToStorage(initialData);
  return initialData;
}

/**
 * Check if activity was logged today for a program
 */
export async function isActivityLoggedToday(programId: string): Promise<boolean> {
  const data = await loadFromStorage();
  const progress = data.programProgress[programId];
  
  if (!progress) return false;
  
  const today = new Date().toDateString();
  const lastLogged = new Date(progress.lastLoggedDate).toDateString();
  
  return today === lastLogged;
}
