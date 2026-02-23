import React from 'react';
import { Activity, Brain, Apple, DollarSign } from 'lucide-react-native';

interface ProgramIconProps {
  iconName: string;
  size?: number;
  color?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Activity,
  Brain,
  Apple,
  DollarSign,
};

export function ProgramIcon({ iconName, size = 32, color = '#000' }: ProgramIconProps) {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} color={color} strokeWidth={2} />;
}
