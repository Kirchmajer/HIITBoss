import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routine, AppSettings } from '../types';

// Storage keys
export const STORAGE_KEYS = {
  ROUTINES: '@routines',
  SETTINGS: '@settings',
  APP_STATE: '@app_state',
} as const;

// Generic storage functions
export class StorageService {
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      return false;
    }
  }

  static async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      return false;
    }
  }

  static async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
}

// Routines storage service
export class RoutinesStorage {
  static async getAllRoutines(): Promise<Routine[]> {
    const routines = await StorageService.getItem<Routine[]>(STORAGE_KEYS.ROUTINES);
    return routines || [];
  }

  static async saveRoutine(routine: Routine): Promise<boolean> {
    const routines = await this.getAllRoutines();
    const existingIndex = routines.findIndex(r => r.id === routine.id);

    if (existingIndex >= 0) {
      routines[existingIndex] = routine;
    } else {
      routines.push(routine);
    }

    return StorageService.setItem(STORAGE_KEYS.ROUTINES, routines);
  }

  static async deleteRoutine(routineId: string): Promise<boolean> {
    const routines = await this.getAllRoutines();
    const filteredRoutines = routines.filter(r => r.id !== routineId);
    return StorageService.setItem(STORAGE_KEYS.ROUTINES, filteredRoutines);
  }

  static async getRoutine(routineId: string): Promise<Routine | null> {
    const routines = await this.getAllRoutines();
    return routines.find(r => r.id === routineId) || null;
  }

  static async saveAllRoutines(routines: Routine[]): Promise<boolean> {
    return StorageService.setItem(STORAGE_KEYS.ROUTINES, routines);
  }
}

// Settings storage service
export class SettingsStorage {
  static async getSettings(): Promise<AppSettings> {
    const settings = await StorageService.getItem<AppSettings>(STORAGE_KEYS.SETTINGS);
    return settings || this.getDefaultSettings();
  }

  static async saveSettings(settings: AppSettings): Promise<boolean> {
    return StorageService.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  static async resetSettings(): Promise<boolean> {
    return this.saveSettings(this.getDefaultSettings());
  }

  private static getDefaultSettings(): AppSettings {
    return {
      volume: 100,
      isMuted: false,
      vibrationEnabled: true,
      preRoutineCountdownEnabled: true,
      preRoutineCountdownDuration: 5,
      preRoutineCountdownVibrationEnabled: true,
    };
  }
}

// Main data service that combines all storage operations
export class DataService {
  // Routines
  static async getAllRoutines(): Promise<Routine[]> {
    return RoutinesStorage.getAllRoutines();
  }

  static async saveRoutine(routine: Routine): Promise<boolean> {
    return RoutinesStorage.saveRoutine(routine);
  }

  static async deleteRoutine(routineId: string): Promise<boolean> {
    return RoutinesStorage.deleteRoutine(routineId);
  }

  static async getRoutine(routineId: string): Promise<Routine | null> {
    return RoutinesStorage.getRoutine(routineId);
  }

  // Settings
  static async getSettings(): Promise<AppSettings> {
    return SettingsStorage.getSettings();
  }

  static async saveSettings(settings: AppSettings): Promise<boolean> {
    return SettingsStorage.saveSettings(settings);
  }

  static async resetSettings(): Promise<boolean> {
    return SettingsStorage.resetSettings();
  }

  // Utility functions
  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static async exportData(): Promise<string | null> {
    try {
      const [routines, settings] = await Promise.all([
        this.getAllRoutines(),
        this.getSettings(),
      ]);

      const exportData = {
        routines,
        settings,
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }

  static async importData(jsonData: string): Promise<boolean> {
    try {
      const importData = JSON.parse(jsonData);

      if (importData.routines && Array.isArray(importData.routines)) {
        await RoutinesStorage.saveAllRoutines(importData.routines);
      }

      if (importData.settings) {
        await SettingsStorage.saveSettings(importData.settings);
      }

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}
