import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps } from '../types';
import { ScreenWrapper, Title, Body, Description } from '../components';
import { COLORS, FONTS } from '../constants';

type Props = NativeStackScreenProps<NavigationProps, 'Routine'>;

export default function RoutineScreen({ navigation, route }: Props) {
  const { routine } = route.params;

  return (
    <ScreenWrapper>
      <Title level={2}>Workout Timer</Title>
      <Text style={styles.routineName}>{routine.name}</Text>
      <Description>
        This will be the active timer interface with progress tracking
      </Description>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>00:00</Text>
        <Body style={styles.phaseText}>Timer Coming Soon</Body>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  routineName: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.semibold,
    marginBottom: 30,
    color: COLORS.primary,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: FONTS.sizes.massive,
    fontWeight: FONTS.weights.bold,
    marginBottom: 10,
  },
  phaseText: {
    color: COLORS.text.tertiary,
  },
});
