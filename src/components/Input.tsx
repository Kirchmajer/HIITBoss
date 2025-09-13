import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../constants/theme';
import { Body } from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Body style={styles.label}>{label}</Body>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          inputStyle,
        ]}
        placeholderTextColor={error ? COLORS.danger : COLORS.text.tertiary}
        {...textInputProps}
      />
      {error && <Body style={styles.errorText}>{error}</Body>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
  },
  label: {
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.text.secondary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    backgroundColor: COLORS.background.primary,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
});

export default Input;
