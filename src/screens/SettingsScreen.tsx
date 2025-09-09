import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps } from '../types';
import { Title, Subtitle, Body } from '../components';
import { COLORS, SPACING, FONTS } from '../constants';

type Props = NativeStackScreenProps<NavigationProps, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Title level={2}>Settings</Title>
      <Subtitle>App Preferences - Coming Soon</Subtitle>

      <View style={styles.settingsSection}>
        <Body style={styles.sectionTitle}>Audio Settings</Body>
        <Body style={styles.settingItem}>• Master Volume: 0-100%</Body>
        <Body style={styles.settingItem}>• Master Mute Toggle</Body>
      </View>

      <View style={styles.settingsSection}>
        <Body style={styles.sectionTitle}>Vibration Settings</Body>
        <Body style={styles.settingItem}>• Enable/Disable Vibration</Body>
      </View>

      <View style={styles.settingsSection}>
        <Body style={styles.sectionTitle}>Countdown Settings</Body>
        <Body style={styles.settingItem}>• Enable/Disable Pre-routine Countdown</Body>
        <Body style={styles.settingItem}>• Countdown Duration: 3-10 seconds</Body>
        <Body style={styles.settingItem}>• Countdown Vibration</Body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    paddingTop: SPACING.xxxl,
  },
  settingsSection: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.semibold,
    marginBottom: SPACING.lg,
    color: COLORS.primary,
  },
  settingItem: {
    fontSize: FONTS.sizes.md,
    marginBottom: SPACING.sm,
    paddingLeft: SPACING.md,
  },
});
