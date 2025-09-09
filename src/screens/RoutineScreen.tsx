import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps } from '../types';
import { ScreenWrapper, Title, Body, Description } from '../components';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants';
import { useTimer } from '../hooks/useTimer';
import { formatTimeMMSS } from '../utils/timeUtils';

type Props = NativeStackScreenProps<NavigationProps, 'Routine'>;

export default function RoutineScreen({ navigation, route }: Props) {
  const { routine } = route.params;
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    isRunning,
    isPaused,
    currentRound,
    currentSet,
    currentPhase,
    timeRemaining,
    totalTime,
    start,
    pause,
    resume,
    cancel,
  } = useTimer(routine, () => {
    setIsCompleted(true);
  });

  const handleCancel = () => {
    Alert.alert(
      'Cancel Workout',
      'Are you sure you want to cancel this workout?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => {
          cancel();
          navigation.navigate('Home');
        }},
      ]
    );
  };

  const handleDone = () => {
    navigation.navigate('Home');
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'active': return COLORS.success;
      case 'rest': return COLORS.danger;
      case 'round-rest': return COLORS.primary;
      default: return COLORS.text.primary;
    }
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'active': return 'ACTIVE';
      case 'rest': return 'REST';
      case 'round-rest': return 'ROUND REST';
      default: return '';
    }
  };

  if (isCompleted) {
    return (
      <ScreenWrapper>
        <Title level={2}>Workout Complete!</Title>
        <Body style={styles.completedText}>Great job! You've finished {routine.name}</Body>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Body style={styles.doneButtonText}>Done</Body>
        </TouchableOpacity>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <Title level={2}>{routine.name}</Title>
      <View style={styles.progressContainer}>
        <Body>Round {currentRound} of {routine.rounds.length}</Body>
        <Body>Set {currentSet} of {routine.rounds[currentRound - 1]?.sets.length || 0}</Body>
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTimeMMSS(timeRemaining)}</Text>
        <Body style={{ ...styles.phaseText, color: getPhaseColor() }}>
          {getPhaseText()}
        </Body>
      </View>
      <View style={styles.controlsContainer}>
        {!isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={start}>
            <Body style={styles.buttonText}>Start Workout</Body>
          </TouchableOpacity>
        ) : (
          <>
            {isPaused ? (
              <TouchableOpacity style={styles.resumeButton} onPress={resume}>
                <Body style={styles.buttonText}>Resume</Body>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.pauseButton} onPress={pause}>
                <Body style={styles.buttonText}>Pause</Body>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Body style={styles.cancelButtonText}>Cancel</Body>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  timerText: {
    fontSize: FONTS.sizes.massive,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
    color: COLORS.primary,
  },
  phaseText: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  controlsContainer: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
  },
  pauseButton: {
    backgroundColor: COLORS.warning,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  resumeButton: {
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  cancelButton: {
    backgroundColor: COLORS.danger,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.sm,
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
  cancelButtonText: {
    color: COLORS.text.inverse,
    fontSize: FONTS.sizes.md,
  },
  completedText: {
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
  },
  doneButtonText: {
    color: COLORS.text.inverse,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.semibold,
  },
});
