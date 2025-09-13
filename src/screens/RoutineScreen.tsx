import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps } from '../types';
import { ScreenWrapper, Title, Body, Description, Button } from '../components';
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
        <Button
          title="Done"
          onPress={handleDone}
          variant="primary"
          style={styles.doneButton}
        />
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
          <Button
            title="Start Workout"
            onPress={start}
            variant="success"
            style={styles.startButton}
          />
        ) : (
          <>
            {isPaused ? (
              <Button
                title="Resume"
                onPress={resume}
                variant="success"
                style={styles.resumeButton}
              />
            ) : (
              <Button
                title="Pause"
                onPress={pause}
                variant="warning"
                style={styles.pauseButton}
              />
            )}
            <Button
              title="Cancel"
              onPress={handleCancel}
              variant="danger"
              style={styles.cancelButton}
            />
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
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  pauseButton: {
    marginBottom: SPACING.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  resumeButton: {
    marginBottom: SPACING.md,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  cancelButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  completedText: {
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  doneButton: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
});
