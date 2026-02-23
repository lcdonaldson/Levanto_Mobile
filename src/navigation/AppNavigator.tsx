import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParamList } from './types';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProgramDetailScreen } from '../screens/ProgramDetailScreen';
import { ComplianceScreen } from '../screens/ComplianceScreen';
import { mockPrograms } from '../data/mockData';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLargeTitle: false,
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          headerShown: false, // Hide header on dashboard
        }}
      />
      <Stack.Screen 
        name="ProgramDetail" 
        component={ProgramDetailScreen}
        options={({ route }) => {
          const program = mockPrograms.find(p => p.id === route.params.programId);
          const headerColor = program?.color || '#9C27B0';
          
          return {
            title: 'Program Details',
            headerBackTitle: 'Back',
            headerStyle: {
              backgroundColor: headerColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#fff',
            },
          };
        }}
      />
      <Stack.Screen 
        name="Compliance" 
        component={ComplianceScreen}
        options={{
          title: 'Compliance & Accessibility',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}
