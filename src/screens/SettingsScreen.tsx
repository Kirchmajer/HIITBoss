import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps, AppSettings } from '../types';
import { Title, Subtitle, Body, Switch, Slider, Button } from '../components';
import { COLORS, SPACING, FONTS } from '../constants';
import { DataService } from '../services';

type Props = NativeStackScreenProps<NavigationProps, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const [settings, setSettings] = useState<AppSettings>({
    volume: 100,
    isMuted: false,
    vibrationEnabled: true,
    preRoutineCountdownEnabled: true,
    preRoutineCountdownDuration: 5,
    preRoutineCountdownVibrationEnabled: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await DataService.getSettings();
      setSettings(savedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      Alert.alert('Error', 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      setSettings(newSettings);
      await DataService.saveSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Title level={2}>Settings</Title>
        <Body style={styles.loadingText}>Loading settings...</Body>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Title level={2}>Settings</Title>
      <Subtitle>Customize your HIIT Boss experience</Subtitle>

      {/* Audio Settings */}
      <View style={styles.settingsSection}>
        <Body style={styles.sectionTitle}>Audio Settings</Body>

        <Slider
          label="Master Volume"
          value={settings.volume}
          onValueChange={(value) => updateSetting('volume', value)}
          minimumValue={0}
          maximumValue={100}
          step={5}
        />

        <Switch
          label="Mute Audio"
          value={settings.isMuted}
          onValueChange={(value) => updateSetting('isMuted', value)}
        />
      </View>

      {/* Vibration Settings */}
      <View style={styles.settingsSection}>
        <Body style={styles.sectionTitle}>Vibration Settings</Body>

        <Switch
          label="Enable Vibration"
          value={settings.vibrationEnabled}
          onValueChange={(value) => updateSetting('vibrationEnabled', value)}
        />
      </View>

      {/* Countdown Settings */}
      <View style={styles.settingsSection}>
        <Body style={styles.sectionTitle}>Countdown Settings</Body>

        <Switch
          label="Pre-routine Countdown"
          value={settings.preRoutineCountdownEnabled}
          onValueChange={(value) => updateSetting('preRoutineCountdownEnabled', value)}
        />

        <Slider
          label="Countdown Duration"
          value={settings.preRoutineCountdownDuration}
          onValueChange={(value) => updateSetting('preRoutineCountdownDuration', value)}
          minimumValue={3}
          maximumValue={10}
          step={1}
        />

        <Switch
          label="Countdown Vibration"
          value={settings.preRoutineCountdownVibrationEnabled}
          onValueChange={(value) => updateSetting('preRoutineCountdownVibrationEnabled', value)}
        />
      </View>

      {/* Reset to Defaults */}
      <View style={styles.settingsSection}>
        <Button
          title="Reset to Defaults"
          onPress={() => {
            Alert.alert(
              'Reset Settings',
              'Are you sure you want to reset all settings to their default values?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Reset',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await DataService.resetSettings();
                      await loadSettings();
                      Alert.alert('Success', 'Settings reset to defaults');
                    } catch (error) {
                      Alert.alert('Error', 'Failed to reset settings');
                    }
                  },
                },
              ]
            );
          }}
          variant="danger"
          style={styles.resetButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: SPACING.md,
    paddingTop: SPACING.xxxl,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: SPACING.xl,
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
  resetButton: {
    marginTop: SPACING.md,
  },
});
