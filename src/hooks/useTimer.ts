import { useState, useEffect, useCallback, useRef } from 'react';
import { Routine, TimerState } from '../types';

interface UseTimerReturn extends TimerState {
  start: () => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
  onComplete?: () => void;
}

export function useTimer(routine: Routine, onComplete?: () => void): UseTimerReturn {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    currentRound: 1,
    currentSet: 1,
    currentPhase: 'active',
    timeRemaining: 0,
    totalTime: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate total time on mount
  useEffect(() => {
    let total = 0;
    routine.rounds.forEach(round => {
      round.sets.forEach(set => {
        total += set.activeDuration + set.restDuration;
      });
      total += round.restDuration;
    });
    setTimerState(prev => ({ ...prev, totalTime: total }));
  }, [routine]);

  // Timer interval
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          if (prev.timeRemaining > 0) {
            return { ...prev, timeRemaining: prev.timeRemaining - 1 };
          } else {
            // Transition to next phase
            return transitionToNextPhase(prev);
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState.isRunning, timerState.isPaused]);

  const transitionToNextPhase = useCallback((state: TimerState): TimerState => {
    const { currentRound, currentSet, currentPhase } = state;
    const round = routine.rounds[currentRound - 1];
    const currentSetData = round.sets[currentSet - 1];

    let nextState = { ...state };

    if (currentPhase === 'active') {
      // Go to rest for current set
      nextState.currentPhase = 'rest';
      nextState.timeRemaining = currentSetData.restDuration;
    } else if (currentPhase === 'rest') {
      if (currentSet < round.sets.length) {
        // Next set in same round
        nextState.currentSet = currentSet + 1;
        nextState.currentPhase = 'active';
        nextState.timeRemaining = round.sets[currentSet].activeDuration;
      } else {
        // Last set in round, check if last round
        if (currentRound < routine.rounds.length) {
          // Go to round rest
          nextState.currentPhase = 'round-rest';
          nextState.timeRemaining = round.restDuration;
        } else {
          // Routine complete
          nextState.isRunning = false;
          nextState.currentPhase = 'active'; // Reset
          if (onComplete) onComplete();
          return nextState;
        }
      }
    } else if (currentPhase === 'round-rest') {
      // Start next round
      nextState.currentRound = currentRound + 1;
      nextState.currentSet = 1;
      nextState.currentPhase = 'active';
      nextState.timeRemaining = routine.rounds[currentRound].sets[0].activeDuration;
    }

    return nextState;
  }, [routine, onComplete]);

  const start = useCallback(() => {
    if (!timerState.isRunning) {
      setTimerState(prev => ({
        ...prev,
        isRunning: true,
        isPaused: false,
        timeRemaining: routine.rounds[0].sets[0].activeDuration,
      }));
    }
  }, [routine]);

  const pause = useCallback(() => {
    setTimerState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    setTimerState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const cancel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentRound: 1,
      currentSet: 1,
      currentPhase: 'active',
      timeRemaining: 0,
    }));
  }, []);

  return {
    ...timerState,
    start,
    pause,
    resume,
    cancel,
    onComplete,
  };
}
