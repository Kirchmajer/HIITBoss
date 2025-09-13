import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Body } from './Typography';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  style,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {label && <Body style={styles.label}>{label}</Body>}
      <View style={[styles.switchContainer, disabled && styles.disabled]}>
        <View
          style={[
            styles.switchTrack,
            value && styles.switchTrackActive,
            disabled && styles.switchTrackDisabled,
          ]}
        >
          <View
            style={[
              styles.switchThumb,
              value && styles.switchThumbActive,
              disabled && styles.switchThumbDisabled,
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  label: {
    flex: 1,
    marginRight: SPACING.md,
  },
  switchContainer: {
    // Container for the switch
  },
  switchTrack: {
    width: 50,
    height: 28,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.text.secondary,
    padding: 2,
    justifyContent: 'center',
  },
  switchTrackActive: {
    backgroundColor: COLORS.primary,
  },
  switchTrackDisabled: {
    opacity: 0.5,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.background.primary,
    shadowColor: COLORS.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbDisabled: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Switch;
