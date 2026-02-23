import React from 'react';
import { Platform } from 'react-native';
import type { DashboardScreenProps } from '../navigation/types';
import { EmployeeDashboard } from './EmployeeDashboard';
import { EmployerDashboard } from './EmployerDashboard';

export function DashboardScreen(props: DashboardScreenProps) {
  // Route based on platform: web shows employer view, mobile shows employee view
  if (Platform.OS === 'web') {
    return <EmployerDashboard />;
  }

  return <EmployeeDashboard {...props} />;
}
