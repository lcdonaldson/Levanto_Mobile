import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Modal, Linking, Platform, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Type, Card, Button, spacing } from '../design-system';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import type { DashboardScreenProps } from '../navigation/types';
import { mockPrograms } from '../data/mockData';
import { ProgramIcon } from '../components/ProgramIcon';
import { ActivityLogModal } from '../components/ActivityLogModal';
import { JoinProgramModal } from '../components/JoinProgramModal';
import { ListChecks, Flame, PieChart, UserCircle, LogOut, BarChart3, Shield, RotateCcw } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 140;

export function EmployeeDashboard({ navigation }: DashboardScreenProps) {
  const user = useAuthStore((s) => s.user);
  const displayName = user?.includes('@') ? 'User' : user;
  const logout = useAuthStore((s) => s.logout);
  
  // Progress store
  const enrolledProgramIds = useProgressStore((s) => s.enrolledProgramIds);
  const programProgress = useProgressStore((s) => s.programProgress);
  const currentStreak = useProgressStore((s) => s.currentStreak);
  const calculateCompletionRate = useProgressStore((s) => s.calculateCompletionRate);
  const isLoggedToday = useProgressStore((s) => s.isLoggedToday);
  
  // Modal state
  const [showMenu, setShowMenu] = useState(false);
  const [activityLogProgram, setActivityLogProgram] = useState<typeof mockPrograms[0] | null>(null);
  const [joinProgramTarget, setJoinProgramTarget] = useState<typeof mockPrograms[0] | null>(null);

  const enrolledPrograms = mockPrograms.filter((p) =>
    enrolledProgramIds.includes(p.id)
  );
  const availablePrograms = mockPrograms.filter(
    (p) => !enrolledProgramIds.includes(p.id)
  );
  
  const completionRate = calculateCompletionRate();

  const handleProgramPress = (programId: string) => {
    navigation.navigate('ProgramDetail', { programId });
  };

  const handleViewCompanyReport = () => {
    setShowMenu(false);
    const url = Platform.OS === 'web' 
      ? window.location.origin 
      : 'http://localhost:8081';
    Linking.openURL(url);
  };

  const handleCompliance = () => {
    setShowMenu(false);
    navigation.navigate('Compliance');
  };

  const handleReset = async () => {
    const reset = useProgressStore.getState().reset;
    await reset();
    setShowMenu(false);
  };

  const handleLogout = () => {
    setShowMenu(false);
    logout();
  };

  return (
    <View style={styles.screen}>
      {/* Colorful Hero Section - Pizza Slice Style */}
      <View style={styles.heroSection}>
        <Svg height={HERO_HEIGHT} width={SCREEN_WIDTH} style={styles.heroSvg}>
          {/* All sections converge to center point at bottom */}
          {/* Center point coordinates */}
          {/* Teal wedge - far left */}
          <Path
            d={`M 0 0 L ${SCREEN_WIDTH * 0.15} 0 L ${SCREEN_WIDTH * 0.5} ${HERO_HEIGHT} L 0 ${HERO_HEIGHT} Z`}
            fill="#39c3c2"
          />
          {/* Purple wedge - left-center */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.15} 0 L ${SCREEN_WIDTH * 0.5} 0 L ${SCREEN_WIDTH * 0.5} ${HERO_HEIGHT} Z`}
            fill="#9C27B0"
          />
          {/* Orange wedge - right-center */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.5} 0 L ${SCREEN_WIDTH * 0.85} 0 L ${SCREEN_WIDTH * 0.5} ${HERO_HEIGHT} Z`}
            fill="#FF9800"
          />
          {/* Blue wedge - far right */}
          <Path
            d={`M ${SCREEN_WIDTH * 0.85} 0 L ${SCREEN_WIDTH} 0 L ${SCREEN_WIDTH} ${HERO_HEIGHT} L ${SCREEN_WIDTH * 0.5} ${HERO_HEIGHT} Z`}
            fill="#2196F3"
          />
        </Svg>
        
        <View style={styles.heroContent}>
          <View style={styles.header}>
            <View>
              <Type scale="h2" style={styles.heroTitle}>Hi {displayName}!</Type>
              <Type scale="body" style={styles.heroSubtitle}>
                Here's your wellness journey
              </Type>
            </View>
            <TouchableOpacity onPress={() => setShowMenu(true)} style={styles.profileButton}>
              <UserCircle size={36} color="#fff" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.content}>


      {/* Personal Stats */}
      <View style={styles.statsContainer}>
        <Card style={[styles.statCard, styles.statCardTeal]}>
          <ListChecks size={20} color="#fff" strokeWidth={2} style={styles.statIcon} />
          <Type scale="h2" style={styles.statValue}>
            {enrolledPrograms.length}
          </Type>
          <Type scale="caption" style={styles.statLabel} numberOfLines={2}>
            Active{'\n'}Programs
          </Type>
        </Card>
        <Card style={[styles.statCard, styles.statCardOrange]}>
          <Flame size={20} color="#fff" strokeWidth={2} style={styles.statIcon} />
          <Type scale="h2" style={styles.statValue}>
            {currentStreak}
          </Type>
          <Type scale="caption" style={styles.statLabel} numberOfLines={2}>
            Day{' '}Streak
          </Type>
        </Card>
        <Card style={[styles.statCard, styles.statCardBlue]}>
          <PieChart size={20} color="#fff" strokeWidth={2} style={styles.statIcon} />
          <Type scale="h2" style={styles.statValue}>
            {completionRate}%
          </Type>
          <Type scale="caption" style={styles.statLabel} numberOfLines={2}>
            Completion{' '}Rate
          </Type>
        </Card>
      </View>

      {/* My Programs */}
      <Type scale="h3" style={styles.sectionTitle}>
        My Programs
      </Type>

      {enrolledPrograms.map((program) => {
        const progress = programProgress[program.id];
        if (!progress) return null;
        
        const progressPercent = Math.round(
          (progress.completedDays / progress.totalDays) * 100
        );
        const loggedToday = isLoggedToday(program.id);

        return (
          <Card key={program.id} style={styles.programCard}>
              <TouchableOpacity
                onPress={() => handleProgramPress(program.id)}
                activeOpacity={0.7}
              >
                <View style={styles.programHeader}>
                  <View
                    style={[
                      styles.programIcon,
                      { backgroundColor: program.color + '20' },
                    ]}
                  >
                    <ProgramIcon iconName={program.icon} size={28} color={program.color} />
                  </View>
                  <View style={styles.programInfo}>
                    <Type scale="h4">{program.name}</Type>
                    <Type scale="caption" muted>
                      {progress.lastActivity}
                    </Type>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${progressPercent}%`,
                        backgroundColor: program.color,
                      },
                    ]}
                  />
                </View>
                <Type scale="caption" muted style={styles.progressText}>
                  {progress.completedDays}/{progress.totalDays} days completed
                </Type>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <Button
                  onPress={() => !loggedToday && setActivityLogProgram(program)}
                  skin="primary"
                  style={[
                    styles.actionButton, 
                    styles.compactButton, 
                    { backgroundColor: program.color },
                    loggedToday && { opacity: 0.6 }
                  ]}
                  disabled={loggedToday}
                >
                  <Type scale="body" style={{ color: '#fff', fontWeight: '600', textAlign: 'center', width: '100%', lineHeight: 20 }}>
                    {loggedToday ? '✓ Complete' : 'Log Activity'}
                  </Type>
                </Button>
                <Button
                  onPress={() => handleProgramPress(program.id)}
                  skin="secondary"
                  style={[styles.actionButton, styles.compactButton, { borderColor: program.color }]}
                >
                  <Type scale="body" style={{ color: '#555', fontWeight: '600', textAlign: 'center', width: '100%' }}>
                    View Details
                  </Type>
                </Button>
              </View>
            </Card>
        );
      })}

      {/* Available Programs */}
      <Type scale="h3" style={styles.sectionTitle}>
        Available Programs
      </Type>
      <Type scale="body" muted style={styles.sectionSubtitle}>
        Join a new program to continue your wellness journey
      </Type>

      {availablePrograms.map((program) => (
        <Card key={program.id} style={styles.availableProgramCard}>
          <TouchableOpacity
            onPress={() => handleProgramPress(program.id)}
            activeOpacity={0.7}
          >
            <View style={styles.programHeader}>
              <View
                style={[
                  styles.programIcon,
                  { backgroundColor: program.color + '20' },
                ]}
              >
                <ProgramIcon iconName={program.icon} size={28} color={program.color} />
              </View>
              <View style={styles.programInfo}>
                <Type scale="h4">{program.name}</Type>
                <Type scale="caption" muted>
                  {program.participants.toLocaleString()} participants
                </Type>
              </View>
              <Button
                onPress={(e) => {
                  e?.stopPropagation?.();
                  setJoinProgramTarget(program);
                }}
                skin="primary"
                style={[styles.joinButton, { backgroundColor: program.color }]}
              >
                Join
              </Button>
            </View>
          </TouchableOpacity>
        </Card>
      ))}
      </ScrollView>

      {/* Profile Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleViewCompanyReport}>
              <BarChart3 size={20} color="#2196F3" strokeWidth={2} />
              <Type scale="body" style={styles.menuText}>View Company Report</Type>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={handleCompliance}>
              <Shield size={20} color="#9C27B0" strokeWidth={2} />
              <Type scale="body" style={styles.menuText}>Compliance & Accessibility</Type>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={handleReset}>
              <RotateCcw size={20} color="#FF9800" strokeWidth={2} />
              <Type scale="body" style={styles.menuText}>Reset Demo Data</Type>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <LogOut size={20} color="#F44336" strokeWidth={2} />
              <Type scale="body" style={styles.menuText}>Logout</Type>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Activity Log Modal */}
      {activityLogProgram && (
        <ActivityLogModal
          visible={true}
          program={activityLogProgram}
          onClose={() => setActivityLogProgram(null)}
        />
      )}

      {/* Join Program Modal */}
      {joinProgramTarget && (
        <JoinProgramModal
          visible={true}
          program={joinProgramTarget}
          onClose={() => setJoinProgramTarget(null)}
        />
      )}
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
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    position: 'relative',
    zIndex: 1,
  },
  heroTitle: {
    color: '#fff',
    fontWeight: '700',
  },
  heroSubtitle: {
    color: '#fff',
    opacity: 0.95,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  profileButton: {
    padding: spacing.xs,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: spacing.xl,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: spacing.sm,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  menuText: {
    flex: 1,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    paddingVertical: spacing.lg,
  },
  statCardTeal: {
    backgroundColor: '#39c3c2',
  },
  statCardOrange: {
    backgroundColor: '#FF9800',
  },
  statCardBlue: {
    backgroundColor: '#2196F3',
  },
  statIcon: {
    marginBottom: spacing.xs,
  },
  statValue: {
    marginBottom: spacing.sm,
    color: '#fff',
    fontWeight: '700',
  },
  statLabel: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 11,
    color: '#fff',
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    marginBottom: spacing.md,
  },
  programCard: {
    marginBottom: spacing.lg,
  },
  availableProgramCard: {
    marginBottom: spacing.md,
  },
  programHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  programIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  programInfo: {
    flex: 1,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  compactButton: {
    paddingVertical: spacing.xs,
    minHeight: 0,
  },
  joinButton: {
    paddingHorizontal: spacing.lg,
  },
  logoutButton: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});
