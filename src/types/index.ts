export interface Routine {
  id: string;
  name: string;
  rounds: Round[];
}

export interface Round {
  sets: Set[];
  restDuration: number; // seconds, default 60
}

export interface Set {
  activeDuration: number; // seconds
  restDuration: number; // seconds
}

export interface AppSettings {
  volume: number; // 0-100
  isMuted: boolean;
  vibrationEnabled: boolean;
  preRoutineCountdownEnabled: boolean;
  preRoutineCountdownDuration: number; // seconds, 3-10
  preRoutineCountdownVibrationEnabled: boolean;
}

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentRound: number;
  currentSet: number;
  currentPhase: 'active' | 'rest' | 'round-rest' | 'countdown';
  timeRemaining: number;
  totalTime: number;
}

export type NavigationProps = {
  Home: undefined;
  RoutineBuilder: { routineId?: string };
  Routine: { routine: Routine };
  Settings: undefined;
};
