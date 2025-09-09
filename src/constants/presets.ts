import { Routine } from '../types';

// Preset routines available by default
export const PRESET_ROUTINES: Routine[] = [
  {
    id: 'preset-hiit-basic',
    name: 'Classic HIIT',
    rounds: [
      {
        sets: [
          { activeDuration: 120, restDuration: 30 }, // 2 min active, 30 sec rest
          { activeDuration: 120, restDuration: 30 },
          { activeDuration: 120, restDuration: 30 },
        ],
        restDuration: 60, // 1 min rest between rounds
      },
      {
        sets: [
          { activeDuration: 120, restDuration: 30 },
          { activeDuration: 120, restDuration: 30 },
          { activeDuration: 120, restDuration: 30 },
        ],
        restDuration: 60,
      },
      {
        sets: [
          { activeDuration: 120, restDuration: 30 },
          { activeDuration: 120, restDuration: 30 },
          { activeDuration: 120, restDuration: 30 },
        ],
        restDuration: 60,
      },
    ],
  },
  {
    id: 'preset-tabata',
    name: 'Tabata',
    rounds: [
      {
        sets: [
          { activeDuration: 20, restDuration: 10 }, // 20 sec active, 10 sec rest
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
        ],
        restDuration: 60, // 1 min rest between rounds
      },
      {
        sets: [
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
          { activeDuration: 20, restDuration: 10 },
        ],
        restDuration: 60,
      },
    ],
  },
  {
    id: 'preset-quick-hiit',
    name: 'Quick HIIT',
    rounds: [
      {
        sets: [
          { activeDuration: 30, restDuration: 15 }, // 30 sec active, 15 sec rest
          { activeDuration: 30, restDuration: 15 },
          { activeDuration: 30, restDuration: 15 },
          { activeDuration: 30, restDuration: 15 },
          { activeDuration: 30, restDuration: 15 },
        ],
        restDuration: 30, // 30 sec rest between rounds
      },
      {
        sets: [
          { activeDuration: 30, restDuration: 15 },
          { activeDuration: 30, restDuration: 15 },
          { activeDuration: 30, restDuration: 15 },
          { activeDuration: 30, restDuration: 15 },
          { activeDuration: 30, restDuration: 15 },
        ],
        restDuration: 30,
      },
    ],
  },
];

// Function to initialize app with preset routines if none exist
export async function initializePresetsIfNeeded() {
  const { DataService } = await import('../services');

  try {
    const existingRoutines = await DataService.getAllRoutines();

    if (existingRoutines.length === 0) {
      // No routines exist, add presets
      for (const preset of PRESET_ROUTINES) {
        await DataService.saveRoutine(preset);
      }
      console.log('Preset routines initialized');
    }
  } catch (error) {
    console.error('Error initializing presets:', error);
  }
}
