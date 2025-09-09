import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SPACING } from '../constants';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  centerContent?: boolean;
  padding?: keyof typeof SPACING;
}

export default function ScreenWrapper({
  children,
  style,
  centerContent = true,
  padding = 'md',
}: ScreenWrapperProps) {
  return (
    <View
      style={[
        styles.container,
        centerContent && styles.centered,
        { padding: SPACING[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
