import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Type, Button, spacing } from '../design-system';
import { useProgressStore } from '../store/progressStore';
import type { Program } from '../data/mockData';
import { X, Check } from 'lucide-react-native';

interface ActivityLogModalProps {
  visible: boolean;
  program: Program;
  onClose: () => void;
}

// Activity types based on program category
const ACTIVITY_TYPES = {
  'fitness': [
    { type: 'steps', label: 'Steps Walked', unit: 'steps', placeholder: '8000' },
    { type: 'minutes', label: 'Exercise Minutes', unit: 'minutes', placeholder: '30' },
    { type: 'calories', label: 'Calories Burned', unit: 'calories', placeholder: '300' },
  ],
  'mental-health': [
    { type: 'meditation', label: 'Meditation', unit: 'minutes', placeholder: '15' },
    { type: 'journaling', label: 'Journaling', unit: 'minutes', placeholder: '10' },
    { type: 'breathing', label: 'Breathing Exercises', unit: 'sessions', placeholder: '3' },
  ],
  'nutrition': [
    { type: 'meals', label: 'Healthy Meals', unit: 'meals', placeholder: '3' },
    { type: 'water', label: 'Water Intake', unit: 'glasses', placeholder: '8' },
    { type: 'vegetables', label: 'Vegetable Servings', unit: 'servings', placeholder: '5' },
  ],
  'financial': [
    { type: 'savings', label: 'Amount Saved', unit: 'dollars', placeholder: '50' },
    { type: 'budgeting', label: 'Budget Review', unit: 'minutes', placeholder: '20' },
    { type: 'goals', label: 'Financial Goals Set', unit: 'goals', placeholder: '1' },
  ],
};

export function ActivityLogModal({ visible, program, onClose }: ActivityLogModalProps) {
  const logActivity = useProgressStore((s) => s.logActivity);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const activityOptions = ACTIVITY_TYPES[program.category as keyof typeof ACTIVITY_TYPES] || [];
  const selectedOption = activityOptions.find(opt => opt.type === selectedType);

  const handleSubmit = async () => {
    console.log('[ActivityLogModal] Submit clicked', { selectedType, value });
    
    if (!selectedType || !value || !selectedOption) {
      console.log('[ActivityLogModal] Missing required fields');
      return;
    }

    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue <= 0) {
      console.log('[ActivityLogModal] Invalid value:', value);
      return;
    }

    // Create description
    const description = `Logged ${numValue} ${selectedOption.unit}`;
    console.log('[ActivityLogModal] Logging activity:', { programId: program.id, description });

    try {
      // Log the activity
      await logActivity(program.id, selectedType, numValue, description);
      console.log('[ActivityLogModal] Activity logged successfully');

      // Show success feedback
      setShowSuccess(true);

      // Reset and close after a delay
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedType(null);
        setValue('');
        onClose();
      }, 1500);
    } catch (error) {
      console.error('[ActivityLogModal] Failed to log activity:', error);
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    setValue('');
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
          {/* Header */}
          <View style={styles.header}>
            <Type scale="h3">Log Activity</Type>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#666" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <Type scale="body" muted style={styles.subtitle}>
            {program.name}
          </Type>

          {showSuccess ? (
            // Success State
            <View style={styles.successContainer}>
              <View style={[styles.successIcon, { backgroundColor: program.color }]}>
                <Check size={48} color="#fff" strokeWidth={3} />
              </View>
              <Type scale="h3" style={styles.successText}>
                Activity Logged!
              </Type>
              <Type scale="body" muted style={styles.successSubtext}>
                Keep up the great work! 🎉
              </Type>
            </View>
          ) : (
            // Form State
            <ScrollView 
              style={styles.form} 
              contentContainerStyle={styles.formContent}
              showsVerticalScrollIndicator={false}
            >
              <Type scale="body" style={styles.label}>
                What did you do?
              </Type>

              {/* Activity Type Selection */}
              <View style={styles.activityTypes}>
                {activityOptions.map((option) => (
                  <TouchableOpacity
                    key={option.type}
                    style={[
                      styles.activityTypeButton,
                      selectedType === option.type && {
                        backgroundColor: program.color + '20',
                        borderColor: program.color,
                      },
                    ]}
                    onPress={() => setSelectedType(option.type)}
                  >
                    <Type
                      scale="body"
                      style={[
                        styles.activityTypeText,
                        selectedType === option.type && { color: program.color, fontWeight: '600' },
                      ]}
                    >
                      {option.label}
                    </Type>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Value Input */}
              {selectedType && selectedOption && (
                <View style={styles.inputContainer}>
                  <Type scale="body" style={styles.label}>
                    How many {selectedOption.unit}?
                  </Type>
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                    placeholder={selectedOption.placeholder}
                    keyboardType="numeric"
                    autoFocus
                  />
                </View>
              )}

              {/* Submit Button */}
              <Button
                onPress={handleSubmit}
                skin="primary"
                style={[
                  styles.submitButton,
                  { backgroundColor: program.color },
                  (!selectedType || !value) && styles.submitButtonDisabled,
                ]}
                disabled={!selectedType || !value}
              >
                <Type scale="body" style={{ color: '#fff', fontWeight: '600' }}>
                  Log Activity
                </Type>
              </Button>
            </ScrollView>
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
    minHeight: 600,
    maxHeight: '80%',
    borderTopWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  closeButton: {
    padding: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.lg,
  },
  form: {
    flex: 1,
  },
  formContent: {
    paddingBottom: spacing.xl,
  },
  label: {
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  activityTypes: {
    marginBottom: spacing.lg,
  },
  activityTypeButton: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: spacing.sm,
    backgroundColor: '#fff',
  },
  activityTypeText: {
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: spacing.md,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: spacing.md,
  },
  submitButtonDisabled: {
    opacity: 0.5,
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
  },
  successSubtext: {
    textAlign: 'center',
  },
});
