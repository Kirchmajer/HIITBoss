import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.text.tertiary;
    switch (variant) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.secondary;
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      case 'danger':
        return COLORS.danger;
      default:
        return COLORS.primary;
    }
  };

  const buttonStyle = [
    styles.button,
    { backgroundColor: getBackgroundColor() },
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // For accessibility
  },
  text: {
    color: COLORS.text.inverse,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semibold,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
