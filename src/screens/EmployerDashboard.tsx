import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Type, Card, spacing } from '../design-system';
import { useAuthStore } from '../store/authStore';
import { mockPrograms, mockROIMetrics } from '../data/mockData';
import { ProgramIcon } from '../components/ProgramIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 140;

export function EmployerDashboard() {
  const companyName = useAuthStore((s) => s.companyName);
  const logout = useAuthStore((s) => s.logout);

  return (
    <View style={styles.screen}>
      {/* Colorful Hero Section */}
      <View style={styles.heroSection}>
        <Svg height={HERO_HEIGHT} width={SCREEN_WIDTH} style={styles.heroSvg}>
          {/* Teal wedge */}
          <Path
            d={`M 0 0 L ${SCREEN_WIDTH * 0.15} 0 L ${SCREEN_WIDTH * 0.5} ${HERO_HEIGHT} L 0 ${HERO_HEIGHT} Z`}
            fill="#39c3c2"
          />
          {/* Purple wedge */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.15} 0 L ${SCREEN_WIDTH * 0.5} 0 L ${SCREEN_WIDTH * 0.5} ${HERO_HEIGHT} Z`}
            fill="#9C27B0"
          />
          {/* Orange wedge */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.5} 0 L ${SCREEN_WIDTH * 0.85} 0 L ${SCREEN_WIDTH * 0.5} ${HERO_HEIGHT} Z`}
            fill="#FF9800"
          />
          {/* Blue wedge */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.85} 0 L ${SCREEN_WIDTH} 0 L ${SCREEN_WIDTH} ${HERO_HEIGHT} L ${SCREEN_WIDTH * 0.5} ${HERO_HEIGHT} Z`}
            fill="#2196F3"
          />
        </Svg>
        
        <View style={styles.heroContent}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Type scale="h3" style={styles.heroTitle}>Employer{"\n"}Dashboard</Type>
              <Type scale="caption" style={styles.heroSubtitle}>
                {companyName}
              </Type>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Type scale="caption" style={styles.logoutText}>
                Logout
              </Type>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.content}>

      {/* ROI Projections Header */}
      <Card style={styles.heroCard}>
        <Type scale="h3" style={styles.annualImpactTitle}>
          Projected Annual Impact
        </Type>
        <Type scale="body" style={styles.annualImpactSubtitle}>
          Based on {mockROIMetrics.employeeCount} employees enrolled in wellness programs
        </Type>
        <View style={styles.totalSavings}>
          <Type scale="display" style={styles.savingsAmount}>
            ${(mockROIMetrics.totalAnnualSavings / 1000).toFixed(0)}K
          </Type>
          <Type scale="caption" style={styles.savingsLabel}>
            Total Annual Savings
          </Type>
        </View>
      </Card>

      {/* Key ROI Metrics */}
      <Type scale="h3" style={styles.sectionTitle}>
        Key Performance Indicators
      </Type>

      <View style={styles.metricsGrid}>
        <Card style={styles.roiCard}>
          <Type scale="h1" style={styles.metricValue}>
            {mockROIMetrics.medicalSpendingReduction}%
          </Type>
          <Type scale="body" style={styles.metricLabel}>
            Reduction in Medical Spending
          </Type>
          <Type scale="caption" muted style={styles.metricDetail}>
            Lower your organization's annual medical costs
          </Type>
        </Card>

        <Card style={styles.roiCard}>
          <Type scale="h1" style={styles.metricValue}>
            {mockROIMetrics.absenteeismReduction}
          </Type>
          <Type scale="body" style={styles.metricLabel}>
            Days Saved Per Year
          </Type>
          <Type scale="caption" muted style={styles.metricDetail}>
            Average reduction in absenteeism per employee
          </Type>
        </Card>

        <Card style={styles.roiCard}>
          <Type scale="h1" style={styles.metricValue}>
            ${mockROIMetrics.savingsPerPatient.toLocaleString()}
          </Type>
          <Type scale="body" style={styles.metricLabel}>
            Per Patient Savings
          </Type>
          <Type scale="caption" muted style={styles.metricDetail}>
            Annual savings per enrolled employee
          </Type>
        </Card>

        <Card style={styles.roiCard}>
          <Type scale="h1" style={styles.metricValue}>
            {mockROIMetrics.healthOutcomeImprovement}%
          </Type>
          <Type scale="body" style={styles.metricLabel}>
            Health Improvement
          </Type>
          <Type scale="caption" muted style={styles.metricDetail}>
            Reduction in chronic condition severity
          </Type>
        </Card>
      </View>

      {/* Program Adoption */}
      <Type scale="h3" style={styles.sectionTitle}>
        Program Adoption & Engagement
      </Type>

      {mockPrograms.map((program) => (
        <Card key={program.id} style={styles.programCard}>
          <View style={styles.programRow}>
            <View style={styles.programHeader}>
              <View
                style={[
                  styles.programIcon,
                  { backgroundColor: program.color + '20' },
                ]}
              >
                <ProgramIcon iconName={program.icon} size={24} color={program.color} />
              </View>
              <View style={styles.programInfo}>
                <Type scale="h4" numberOfLines={1}>{program.name}</Type>
                <Type scale="caption" muted numberOfLines={1}>
                  {program.category.replace('-', ' ').toUpperCase()}
                </Type>
              </View>
            </View>
            <View style={styles.programStats}>
              <View style={styles.statColumn}>
                <Type scale="h3" style={{ color: program.color }}>
                  {program.participants}
                </Type>
                <Type scale="caption" muted>
                  Enrolled
                </Type>
              </View>
              <View style={styles.statColumn}>
                <Type scale="h3" style={{ color: program.color }}>
                  {program.completionRate}%
                </Type>
                <Type scale="caption" muted>
                  Completion
                </Type>
              </View>
            </View>
          </View>
        </Card>
      ))}

      {/* Bottom Disclaimer */}
      <Card style={styles.disclaimerCard}>
        <Type scale="caption" muted style={styles.disclaimer}>
          * Projections based on industry benchmarks and historical data from similar
          organizations. Actual results may vary based on program participation and
          engagement levels.
        </Type>
      </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  heroSection: {
    height: HERO_HEIGHT,
    position: 'relative',
  },
  heroSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heroContent: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: spacing.md,
    position: 'relative',
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  heroTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 34,
    marginBottom: spacing.xs / 2,
  },
  heroSubtitle: {
    color: '#fff',
    opacity: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoutButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  heroCard: {
    marginBottom: spacing.xl,
    padding: spacing.xl,
    backgroundColor: '#9C27B0',
  },
  annualImpactTitle: {
    marginBottom: spacing.xs,
    color: '#fff',
    fontWeight: '700',
  },
  annualImpactSubtitle: {
    marginBottom: spacing.lg,
    color: '#fff',
    opacity: 0.95,
  },
  totalSavings: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  savingsAmount: {
    color: '#fff',
    marginBottom: spacing.xs,
    fontWeight: '700',
  },
  savingsLabel: {
    color: '#fff',
    opacity: 0.9,
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  roiCard: {
    flex: 1,
    minWidth: 250,
    padding: spacing.lg,
  },
  metricValue: {
    color: '#1976D2',
    marginBottom: spacing.sm,
  },
  metricLabel: {
    marginBottom: spacing.xs,
  },
  metricDetail: {
    marginTop: spacing.xs,
  },
  programCard: {
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  programRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  programIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  programInfo: {
    flex: 1,
    minWidth: 0,
    marginRight: spacing.md,
  },
  programStats: {
    flexDirection: 'row',
    gap: spacing.xl,
    flexShrink: 0,
  },
  statColumn: {
    alignItems: 'center',
    minWidth: 100,
    flexShrink: 0,
  },
  disclaimerCard: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: '#FFF3E0',
  },
  disclaimer: {
    fontStyle: 'italic',
  },
});
