import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof SPACING | number;
  marginBottom?: keyof typeof SPACING | number;
  backgroundColor?: string;
  borderRadius?: keyof typeof BORDER_RADIUS | number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'md',
  marginBottom = 'md',
  backgroundColor = COLORS.background.secondary,
  borderRadius = 'md',
}) => {
  const paddingValue = typeof padding === 'string' ? SPACING[padding] : padding;
  const marginBottomValue = typeof marginBottom === 'string' ? SPACING[marginBottom] : marginBottom;
  const borderRadiusValue = typeof borderRadius === 'string' ? BORDER_RADIUS[borderRadius] : borderRadius;

  return (
    <View style={[
      styles.card,
      {
        padding: paddingValue,
        marginBottom: marginBottomValue,
        backgroundColor,
        borderRadius: borderRadiusValue,
      },
      style,
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // Base styles are applied dynamically
  },
});

export default Card;
