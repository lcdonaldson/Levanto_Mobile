export interface Program {
  id: string;
  name: string;
  category: 'fitness' | 'mental-health' | 'nutrition' | 'financial';
  description: string;
  participants: number;
  completionRate: number;
  icon: string;
  color: string;
}

export interface EngagementMetrics {
  totalParticipants: number;
  activePrograms: number;
  averageEngagement: number;
  monthlyGrowth: number;
}

export const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'Fitness Challenge',
    category: 'fitness',
    description: 'Track your daily steps and compete with colleagues in monthly fitness challenges. Set personal goals and earn rewards for consistent activity.',
    participants: 1247,
    completionRate: 78,
    icon: 'Activity',
    color: '#39c3c2',
  },
  {
    id: '2',
    name: 'Mental Wellness',
    category: 'mental-health',
    description: 'Access mindfulness resources, guided meditation sessions, and mental health support. Build resilience and manage stress effectively.',
    participants: 892,
    completionRate: 85,
    icon: 'Brain',
    color: '#9C27B0',
  },
  {
    id: '3',
    name: 'Nutrition Coaching',
    category: 'nutrition',
    description: 'Personalized meal planning, nutritionist consultations, and healthy eating workshops. Make sustainable changes to your diet.',
    participants: 654,
    completionRate: 72,
    icon: 'Apple',
    color: '#FF9800',
  },
  {
    id: '4',
    name: 'Financial Wellness',
    category: 'financial',
    description: 'Financial planning tools, budgeting workshops, and retirement planning assistance. Take control of your financial future.',
    participants: 523,
    completionRate: 68,
    icon: 'DollarSign',
    color: '#2196F3',
  },
];

export const mockMetrics: EngagementMetrics = {
  totalParticipants: 3316,
  activePrograms: 4,
  averageEngagement: 76,
  monthlyGrowth: 12,
};

export interface ROIMetrics {
  medicalSpendingReduction: number;
  absenteeismReduction: number;
  savingsPerPatient: number;
  healthOutcomeImprovement: number;
  totalAnnualSavings: number;
  employeeCount: number;
}

export const mockROIMetrics: ROIMetrics = {
  medicalSpendingReduction: 42,
  absenteeismReduction: 4.4,
  savingsPerPatient: 2835,
  healthOutcomeImprovement: 50,
  totalAnnualSavings: 124000,
  employeeCount: 450,
};
