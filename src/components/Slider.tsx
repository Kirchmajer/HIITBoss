import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Body } from './Typography';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  style,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);

  const updateValue = (position: number) => {
    if (disabled) return;

    const progress = position / sliderWidth;
    const newValue = minimumValue + progress * (maximumValue - minimumValue);
    const clampedValue = Math.max(minimumValue, Math.min(maximumValue, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    onValueChange(steppedValue);
  };

  const handlePress = (event: any) => {
    if (disabled) return;

    const { locationX } = event.nativeEvent;
    updateValue(locationX);
  };

  const getThumbPosition = () => {
    if (sliderWidth === 0) return 0;
    const progress = (value - minimumValue) / (maximumValue - minimumValue);
    return progress * sliderWidth - 12; // Center the thumb
  };

  const getActiveTrackWidth = () => {
    if (sliderWidth === 0) return 0;
    const progress = (value - minimumValue) / (maximumValue - minimumValue);
    return progress * sliderWidth;
  };

  const handleLayout = (event: any) => {
    setSliderWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && <Body style={styles.label}>{label}</Body>}
          {showValue && <Body style={styles.value}>{value}</Body>}
        </View>
      )}

      <View style={[styles.sliderContainer, disabled && styles.disabled]}>
        <TouchableOpacity
          style={styles.track}
          onLayout={handleLayout}
          onPress={handlePress}
          activeOpacity={1}
        >
          <View style={[styles.activeTrack, { width: getActiveTrackWidth() }]} />
          <View style={[styles.thumb, { left: getThumbPosition() }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    flex: 1,
  },
  value: {
    fontWeight: '600',
  },
  sliderContainer: {
    // Container for slider
  },
  track: {
    height: 4,
    backgroundColor: COLORS.text.secondary,
    borderRadius: BORDER_RADIUS.sm,
    position: 'relative',
  },
  activeTrack: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: -10,
    shadowColor: COLORS.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Slider;
