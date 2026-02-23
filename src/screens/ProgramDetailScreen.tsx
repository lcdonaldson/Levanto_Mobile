import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Type, Card, Button, spacing } from '../design-system';
import type { ProgramDetailScreenProps } from '../navigation/types';
import { mockPrograms } from '../data/mockData';
import { ProgramIcon } from '../components/ProgramIcon';

// Mock enrolled programs
const enrolledProgramIds = ['1', '2'];

export function ProgramDetailScreen({ route, navigation }: ProgramDetailScreenProps) {
  const { programId } = route.params;
  const program = mockPrograms.find((p) => p.id === programId);
  const isEnrolled = enrolledProgramIds.includes(programId);

  if (!program) {
    return (
      <View style={styles.screen}>
        <Type scale="h3">Program not found</Type>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Program Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.programIcon,
            { backgroundColor: program.color + '20' },
          ]}
        >
          <ProgramIcon iconName={program.icon} size={40} color={program.color} />
        </View>
        <Type scale="h2" style={styles.programName}>
          {program.name}
        </Type>
        <Type scale="body" muted style={styles.programCategory}>
          {program.category.replace('-', ' ').toUpperCase()}
        </Type>
      </View>

      {/* Program Description */}
      <Card style={styles.card}>
        <Type scale="h4" style={styles.sectionTitle}>
          About This Program
        </Type>
        <Type scale="body" muted>
          {program.description}
        </Type>
      </Card>

      {/* Participation Stats */}
      <Card style={styles.card}>
        <Type scale="h4" style={styles.sectionTitle}>
          Participation Statistics
        </Type>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Type scale="h2" style={{ color: program.color }}>
              {program.participants.toLocaleString()}
            </Type>
            <Type scale="caption" muted>
              Active Participants
            </Type>
          </View>
          <View style={styles.statItem}>
            <Type scale="h2" style={{ color: program.color }}>
              {program.completionRate}%
            </Type>
            <Type scale="caption" muted>
              Completion Rate
            </Type>
          </View>
        </View>
      </Card>

      {/* Department Breakdown */}
      <Card style={styles.card}>
        <Type scale="h4" style={styles.sectionTitle}>
          Department Breakdown
        </Type>
        <View style={styles.departmentItem}>
          <Type scale="body">Operations</Type>
          <Type scale="body" style={{ color: program.color }}>
            34%
          </Type>
        </View>
        <View style={styles.departmentItem}>
          <Type scale="body">Engineering</Type>
          <Type scale="body" style={{ color: program.color }}>
            28%
          </Type>
        </View>
        <View style={styles.departmentItem}>
          <Type scale="body">Sales</Type>
          <Type scale="body" style={{ color: program.color }}>
            22%
          </Type>
        </View>
        <View style={styles.departmentItem}>
          <Type scale="body">Support</Type>
          <Type scale="body" style={{ color: program.color }}>
            16%
          </Type>
        </View>
      </Card>

      {/* Outcomes */}
      <Card style={styles.card}>
        <Type scale="h4" style={styles.sectionTitle}>
          Program Outcomes
        </Type>
        <View style={styles.outcomeItem}>
          <Type scale="body">✓ Improved employee satisfaction scores</Type>
        </View>
        <View style={styles.outcomeItem}>
          <Type scale="body">✓ Reduced absenteeism by 15%</Type>
        </View>
        <View style={styles.outcomeItem}>
          <Type scale="body">✓ Increased productivity metrics</Type>
        </View>
        <View style={styles.outcomeItem}>
          <Type scale="body">✓ Enhanced team morale</Type>
        </View>
      </Card>

      {/* Action Buttons */}
      {isEnrolled ? (
        <View style={styles.actionButtons}>
          <Button
            onPress={() => {}}
            skin="primary"
            style={[styles.actionButton, styles.compactButton, { backgroundColor: program.color }]}
          >
            <Type scale="body" style={{ color: '#fff', fontWeight: '600', textAlign: 'center', width: '100%' }}>
              Log Activity
            </Type>
          </Button>
          <Button onPress={() => {}} skin="secondary" style={[styles.actionButton, styles.compactButton]}>
            <Type scale="body" style={{ color: '#555', fontWeight: '600', textAlign: 'center', width: '100%' }}>
              View My Progress
            </Type>
          </Button>
        </View>
      ) : (
        <Button
          onPress={() => {}}
          skin="primary"
          style={[styles.joinButton, styles.compactButton, { backgroundColor: program.color }]}
        >
          <Type scale="body" style={{ color: '#fff', fontWeight: '600', textAlign: 'center', width: '100%' }}>
            Join This Program
          </Type>
        </Button>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  programIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  programName: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  programCategory: {
    textAlign: 'center',
  },
  card: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  departmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  outcomeItem: {
    paddingVertical: spacing.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  actionButton: {
    flex: 1,
  },
  compactButton: {
    paddingVertical: spacing.xs,
    minHeight: 0,
  },
  joinButton: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});
