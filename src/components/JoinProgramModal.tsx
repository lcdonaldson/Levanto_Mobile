import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Type, Button, spacing } from '../design-system';
import { useProgressStore } from '../store/progressStore';
import type { Program } from '../data/mockData';
import { ProgramIcon } from './ProgramIcon';
import { X, Check, Users } from 'lucide-react-native';

interface JoinProgramModalProps {
  visible: boolean;
  program: Program;
  onClose: () => void;
  onSuccess?: () => void;
}

export function JoinProgramModal({ visible, program, onClose, onSuccess }: JoinProgramModalProps) {
  const joinProgram = useProgressStore((s) => s.joinProgram);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleJoin = () => {
    // Join the program
    joinProgram(program.id);

    // Show success feedback
    setShowSuccess(true);

    // Close after a delay
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      onSuccess?.();
    }, 2000);
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContent, { borderTopColor: program.color }]}>
          {showSuccess ? (
            // Success State
            <View style={styles.successContainer}>
              <View style={[styles.successIcon, { backgroundColor: program.color }]}>
                <Check size={48} color="#fff" strokeWidth={3} />
              </View>
              <Type scale="h3" style={styles.successText}>
                Welcome to the Program!
              </Type>
              <Type scale="body" muted style={styles.successSubtext}>
                You're now enrolled in {program.name}
              </Type>
            </View>
          ) : (
            // Confirmation State
            <>
              {/* Header */}
              <View style={styles.header}>
                <Type scale="h3">Join Program</Type>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <X size={24} color="#666" strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Program Info */}
              <View style={styles.programInfo}>
                <View style={[styles.programIconContainer, { backgroundColor: program.color + '20' }]}>
                  <ProgramIcon iconName={program.icon} size={40} color={program.color} />
                </View>
                <Type scale="h3" style={styles.programName}>
                  {program.name}
                </Type>
                <Type scale="body" muted style={styles.programCategory}>
                  {program.category.replace('-', ' ').toUpperCase()}
                </Type>
              </View>

              {/* Program Details */}
              <View style={styles.details}>
                <View style={styles.detailRow}>
                  <Users size={20} color={program.color} strokeWidth={2} />
                  <Type scale="body" style={styles.detailText}>
                    {program.participants.toLocaleString()} participants
                  </Type>
                </View>
                <View style={styles.detailRow}>
                  <View style={[styles.completionDot, { backgroundColor: program.color }]} />
                  <Type scale="body" style={styles.detailText}>
                    {program.completionRate}% average completion rate
                  </Type>
                </View>
              </View>

              {/* Benefits Preview */}
              <View style={styles.benefits}>
                <Type scale="body" style={styles.benefitsTitle}>
                  What you'll get:
                </Type>
                <Type scale="body" muted style={styles.benefitItem}>
                  • Personalized progress tracking
                </Type>
                <Type scale="body" muted style={styles.benefitItem}>
                  • Activity logging and reminders
                </Type>
                <Type scale="body" muted style={styles.benefitItem}>
                  • Join {program.participants.toLocaleString()}+ participants
                </Type>
              </View>

              {/* Action Buttons */}
              <View style={styles.actions}>
                <Button
                  onPress={handleJoin}
                  skin="primary"
                  style={[styles.joinButton, { backgroundColor: program.color }]}
                >
                  <Type scale="body" style={{ color: '#fff', fontWeight: '600' }}>
                    Join Program
                  </Type>
                </Button>
                <Button
                  onPress={handleClose}
                  skin="secondary"
                  style={styles.cancelButton}
                >
                  <Type scale="body" style={{ color: '#666', fontWeight: '600' }}>
                    Maybe Later
                  </Type>
                </Button>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 400,
    borderTopWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  closeButton: {
    padding: spacing.xs,
  },
  programInfo: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  programIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  programName: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  programCategory: {
    fontSize: 12,
    textAlign: 'center',
  },
  details: {
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  completionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  detailText: {
    flex: 1,
  },
  benefits: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  benefitsTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  benefitItem: {
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
  },
  joinButton: {
    marginBottom: spacing.xs,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  successText: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  successSubtext: {
    textAlign: 'center',
  },
});
