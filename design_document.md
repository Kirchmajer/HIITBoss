# HIIT Boss Design Document

## Overview
HIIT Boss is an interval timer application designed specifically for High-Intensity Interval Training (HIIT) and Tabata training routines. The app prioritizes functionality over aesthetics initially, focusing on providing a reliable, user-friendly timer experience with both preset and customizable routines.

## Core Features

### Preset Routine
- Comes pre-loaded with a default HIIT routine
- Example: 3 rounds of 3 sets, each set consisting of 2 minutes active period followed by 30 seconds rest period
- Serves as a starting point and demonstration of the app's capabilities

### Custom Routine Builder
- Users can create their own routines from scratch
- Flexible structure allowing customization of:
  - Number of rounds per routine
  - Number of sets per round
  - Duration of active periods
  - Duration of rest periods between sets
  - Duration of rest periods between rounds (0-5 minutes, default 1 minute)

### Routine Structure
- **Routine**: Top-level container consisting of multiple rounds
- **Round**: Contains multiple sets plus an optional rest period after completion
  - Sets: Multiple exercise intervals within the round
  - Round Rest Duration: Configurable rest period between rounds (0-5 minutes, default 1 minute)
- **Set**: Fundamental unit consisting of:
  - Active period (work phase)
  - Rest period (recovery phase between sets)

### Visual Tracking
- Real-time display showing current progress through the routine
- Round counter: "Round X of Y"
- Set counter: "Set X of Y"
- Active/Rest indicator showing current phase
- Countdown timer displaying remaining time for current active or rest period
- Visual progress bars or indicators for round and set completion

### Pre-Routine Countdown
- Configurable countdown timer (default 5 seconds) before the first active period begins
- Allows users to get into position and mentally prepare for the workout
- Visual countdown display with large, clear numbers
- Audible countdown beeps (one beep per second for the last 3 seconds)
- Optional vibration cues during countdown
- Can be disabled or adjusted in settings

### User Interface Screens
The app consists of four main screens:

#### Home Screen
- Displays a list of all saved routines (including the preset routine)
- Shows routine names and basic details (e.g., total rounds, sets, duration)
- For each routine, provides action buttons or menu options:
  - "Run" button to start the selected routine
  - "Edit" button to modify the selected routine
- Includes a prominent "Create New Routine" button to access the routine builder for creating routines from scratch
- Includes a "Settings" button or menu option to access the settings screen
- Selecting "Run" navigates directly to the routine screen
- Selecting "Edit" loads the routine into the builder screen for modification

#### Routine Builder Screen
- Interface for creating and editing custom routines
- Input fields for routine name, number of rounds, sets per round
- Controls to set active and rest durations for each set
- Controls to set rest duration between rounds (0-5 minutes, default 1 minute)
- When creating a new routine:
  - "Save" button to persist the routine and return to home screen
- When editing an existing routine:
  - "Update Routine" button to save changes to the existing routine
  - "Save as New" button to create a duplicate routine with modifications, preserving the original

#### Routine Screen
- Active timer interface showing current routine execution
- Displays visual tracking elements (round counter, set counter, countdown timer)
- Shows current phase (active/rest) with clear visual indicators
- Includes "Pause/Resume Routine" button to control timer flow
- Includes "Cancel Routine" button to stop and return to home screen
- Provides access to audio and vibration cue settings if needed

#### Settings Screen
- Accessible from home screen via a settings button or menu
- Volume controls for audio cues:
  - Master volume slider (0-100%, default 100%)
- Mute options:
  - Master mute toggle to silence all audio cues (default unmute)
- Vibration settings:
  - Enable/disable vibration cues (default enabled)
- Pre-routine countdown settings:
  - Enable/disable countdown (default enabled)
  - Countdown duration slider (3-10 seconds, default 5 seconds)
  - Option to enable vibration during countdown (default enabled)
- Save settings automatically and persist between sessions

### Audio and Vibration Cues
- Pre-routine countdown: Audible beeps (one per second for last 3 seconds) and optional vibration
- 3-second warning beep and vibration before transition between active and rest periods
- Distinct start beep and vibration when active period begins
- Distinct start beep and vibration when rest period begins
- Round rest period: Gentle audio cue and optional vibration when entering round rest
- 3-second warning beep and vibration before round rest period ends
- Unique round completion sound and vibration when transitioning to next round
- Special final round completion sound and vibration when entire routine ends

### Data Persistence
- User-created routines are saved locally on the device
- Preserves custom routines between app sessions
- Allows users to load and modify previously created routines

## User Experience Flow

1. **Launch App**: User opens HIIT Boss and lands on the home screen
2. **Select Action**: User can either:
   - Select a routine and choose "Run" to start it immediately
   - Select a routine and choose "Edit" to modify it in the builder
   - Choose "Create New Routine" to build a custom routine from scratch
3. **Routine Execution** (if "Run" selected):
   - Navigate to routine screen with active timer
   - If enabled, display pre-routine countdown with visual and audio cues
   - Begin routine after countdown completes or immediately if disabled
   - Monitor progress, round/set counters, and countdown timer
   - Receive audio and vibration cues at appropriate times
   - Use pause/resume or cancel buttons as needed
4. **Routine Editing** (if "Edit" selected):
   - Navigate to routine builder screen with existing routine loaded
   - Modify parameters and choose to "Update Routine" or "Save as New"
   - Return to home screen after saving
5. **Routine Creation** (if "Create New Routine" selected):
   - Navigate to routine builder screen with blank form
   - Define routine parameters and save
   - Return to home screen with new routine added
6. **Complete Routine**: When timer finishes all rounds and sets, return to home screen

## Technical Considerations

### Data Model
```
Routine {
  id: string
  name: string
  rounds: Round[]
}

Round {
  sets: Set[]
  restDuration: number (seconds) // Rest period between rounds, default 60
}

Set {
  activeDuration: number (seconds)
  restDuration: number (seconds)
}
```

### Timer Engine
- Accurate countdown timer with second level precision
- Handles transitions between active/rest periods and rounds
- Triggers audio cues at appropriate times
- Updates visual indicators in real-time
- Background execution: Continues running when screen is off or app loses focus
- Wake lock management: Prevents device sleep during active timer sessions
- Background task handling: Uses platform-specific background processing capabilities

### Audio System
- Pre-loaded audio files for different cue types
- Configurable volume settings
- Fallback handling for audio playback issues

### Persistence Layer
- **AsyncStorage** (React Native): Primary storage mechanism for routines and settings
- JSON serialization of routine data structures
- Automatic saving of user modifications with error handling
- Storage structure:
  - `@routines`: Array of all user-created routines (excluding preset)
  - `@settings`: User preferences (volume, mute, vibration settings)
  - `@app_state`: Current app state (last selected routine, etc.)
- Data migration support for future updates
- Fallback handling for storage failures
- Backup/restore functionality for user data

## Platform Considerations
- Cross-platform compatibility (iOS, Android, Web)
- Offline functionality
- Battery optimization for mobile devices
- Accessibility features for audio cues
- Background execution: Timer continues running when screen is off or app loses focus
- Wake lock management: Prevents device sleep during active workouts
- Platform-specific background processing capabilities (iOS Background Tasks, Android Foreground Services)

## Tech Stack

### Frontend Framework
- **React Native**: For native iOS and Android apps with code sharing

### Key Libraries/Packages
- **AsyncStorage** (React Native): For local data persistence
- **react-native-sound** or **expo-av**: For audio playback and volume control
- **react-native-vibration**: For vibration cues
- **react-native-background-timer** or **expo-background-fetch**: For background timer execution
- **expo-keep-awake** or **react-native-wake-lock**: For wake lock management
- **React Navigation**: For screen navigation between home, builder, routine, and settings

### Development Tools
- **Expo**: For easier React Native development and testing
- **VS Code**: As the primary IDE
- **Git**: For version control

## Best Practices

The project will adhere to the following best practices to ensure maintainable, scalable, and high-quality code:

### Separation of Concerns
- **Business Logic**: Isolate timer logic, routine management, and data operations in dedicated service classes
- **UI Logic**: Keep presentation logic separate from business logic using custom hooks and context providers
- **Data Management**: Centralize data operations in repository patterns with clear interfaces
- **Navigation**: Use dedicated navigation service for screen transitions and state management

### Modularisation
- **Feature Modules**: Organize code by features (routines, timer, settings) with clear boundaries
- **Utility Modules**: Create shared utility functions for common operations (time formatting, validation)
- **Constants**: Define app-wide constants in separate modules for easy maintenance
- **Types**: Use TypeScript interfaces and types in dedicated files for better type safety

### Reusable Components
- **Atomic Design**: Build components following atomic design principles (atoms, molecules, organisms)
- **Custom Hooks**: Create reusable hooks for common functionality (useTimer, useAudio, useStorage)
- **Component Library**: Develop a consistent set of UI components with standardized props and styling

### Additional Best Practices
- **TypeScript**: Strict typing throughout the codebase for better developer experience and fewer runtime errors
- **Error Handling**: Comprehensive error boundaries and graceful failure handling
- **Testing**: Unit tests for business logic, integration tests for components, and E2E tests for critical flows
- **Code Style**: Consistent formatting
- **Documentation**: Inline code documentation and comprehensive README files
