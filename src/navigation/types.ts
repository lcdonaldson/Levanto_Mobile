import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Dashboard: undefined;
  ProgramDetail: { programId: string };
  Compliance: undefined;
};

// Convenience types for each screen
export type DashboardScreenProps = NativeStackScreenProps<AppStackParamList, 'Dashboard'>;
export type ProgramDetailScreenProps = NativeStackScreenProps<AppStackParamList, 'ProgramDetail'>;
export type ComplianceScreenProps = NativeStackScreenProps<AppStackParamList, 'Compliance'>;
