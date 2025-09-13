import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { Title, Body } from './Typography';

interface EmptyStateProps {
  title: string;
  description: string;
  style?: ViewStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Title level={2}>{title}</Title>
      <Body style={styles.description}>{description}</Body>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});

export default EmptyState;
