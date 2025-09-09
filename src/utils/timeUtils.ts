// Utility functions for time formatting and calculations

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  }
  return `${remainingSeconds}s`;
}

export function formatTimeMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function calculateTotalRoutineTime(routine: any): number {
  let totalTime = 0;

  for (const round of routine.rounds) {
    // Calculate time for all sets in the round
    for (const set of round.sets) {
      totalTime += set.activeDuration + set.restDuration;
    }

    // Add round rest time (except for the last round)
    if (round !== routine.rounds[routine.rounds.length - 1]) {
      totalTime += round.restDuration;
    }
  }

  return totalTime;
}

export function calculateRoundTime(round: any): number {
  let totalTime = 0;

  for (const set of round.sets) {
    totalTime += set.activeDuration + set.restDuration;
  }

  return totalTime;
}

export function getTimeUntilNextPhase(currentRound: number, currentSet: number, currentPhase: string, routine: any): number {
  // This is a simplified calculation - in a real implementation,
  // you'd need to track the current position in the routine
  return 0;
}
