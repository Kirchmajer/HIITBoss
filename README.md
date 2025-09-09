# HIIT Boss

A powerful and user-friendly interval timer application designed specifically for High-Intensity Interval Training (HIIT) and Tabata training routines. Built with React Native and Expo for cross-platform compatibility.

## 🎯 Overview

HIIT Boss prioritizes functionality over aesthetics, providing a reliable timer experience with both preset and customizable routines. The app is designed to help users maintain focus during intense workouts with clear visual tracking, audio cues, and vibration feedback.

## 📊 Current Implementation Status

### ✅ **Completed Features**
- **Project Setup**: Full React Native + Expo configuration with TypeScript
- **Navigation System**: Complete 4-screen navigation with type-safe routing
- **Component Architecture**: Abstracted design system with reusable components
- **Design System**: Theme constants, typography, and layout components
- **Data Persistence**: Complete AsyncStorage implementation for routines and settings
- **Preset Routines**: 3 default workouts (Classic HIIT, Tabata, Quick HIIT)
- **Storage Service**: Type-safe CRUD operations with error handling
- **Time Utilities**: Duration formatting and calculation functions
- **Screen Structure**: All main screens implemented with placeholder content

### 🔄 **Next Development Phase**
- **Home Screen**: Interactive routine list with Run/Edit functionality
- **Timer Engine**: Core workout timing logic with progress tracking
- **Audio System**: Sound cues and volume controls
- **Settings Implementation**: Interactive preferences interface

## ✨ Features

### 🏃‍♂️ Core Functionality
- **Preset Routine**: Pre-loaded HIIT routine (3 rounds of 3 sets, each with 2 minutes active + 30 seconds rest)
- **Custom Routine Builder**: Create personalized routines with flexible structure
- **Real-time Progress Tracking**: Visual indicators for current round, set, and phase
- **Pre-routine Countdown**: Configurable countdown (3-10 seconds) before workout begins

### 🎵 Audio & Vibration Cues
- **Pre-routine Countdown**: Audible beeps with optional vibration
- **Phase Transitions**: Distinct sounds for active/rest period changes
- **Round Completion**: Special audio cues when transitioning between rounds
- **3-second Warnings**: Alerts before phase transitions
- **Configurable Volume**: Master volume control (0-100%)
- **Mute Options**: Master mute toggle for all audio cues

### 📱 User Interface
- **Home Screen**: Routine list with action buttons (Run/Edit)
- **Routine Builder Screen**: Intuitive interface for creating custom routines
- **Routine Screen**: Active timer with real-time progress display
- **Settings Screen**: Audio, vibration, and countdown preferences

### 💾 Data Persistence
- Local storage of custom routines
- Persistent settings between app sessions
- Automatic saving of user modifications

## 🏗️ Architecture

### Project Structure
```
src/
├── components/        # Reusable UI components & design system
│   ├── ScreenWrapper.tsx    # Common layout wrapper
│   ├── Typography.tsx       # Text components (Title, Subtitle, etc.)
│   └── index.ts            # Component barrel exports
├── screens/          # Main application screens
│   ├── HomeScreen.tsx      # Main routine list
│   ├── RoutineBuilderScreen.tsx  # Create/edit routines
│   ├── RoutineScreen.tsx   # Active workout timer
│   ├── SettingsScreen.tsx  # App preferences
│   └── index.ts           # Screen barrel exports
├── navigation/       # Navigation configuration
│   ├── AppNavigator.tsx   # Main navigation setup
│   └── navigationTheme.ts # Navigation styling
├── services/         # Business logic (timer, audio, storage)
├── types/           # TypeScript type definitions
│   └── index.ts     # Type definitions
├── utils/           # Utility functions
└── constants/       # App-wide constants
    ├── theme.ts    # Design system tokens
    └── index.ts    # Constants barrel exports
```

### Design System
The app uses a comprehensive design system for consistent styling:

#### Typography Components
- **Title**: Hierarchical headings (levels 1-3)
- **Subtitle**: Secondary headings
- **Description**: Body text for descriptions
- **Body**: Standard body text
- **Caption**: Small tertiary text

#### Layout Components
- **ScreenWrapper**: Common container with centering and padding options

#### Theme Constants
```typescript
// Colors, fonts, spacing, and border radius constants
export const COLORS = { primary: '#007AFF', /* ... */ }
export const FONTS = { sizes: { /* ... */ }, weights: { /* ... */ } }
export const SPACING = { xs: 4, sm: 8, md: 16, /* ... */ }
```

### Data Model
```typescript
interface Routine {
  id: string;
  name: string;
  rounds: Round[];
}

interface Round {
  sets: Set[];
  restDuration: number; // seconds, default 60
}

interface Set {
  activeDuration: number; // seconds
  restDuration: number; // seconds
}

interface AppSettings {
  volume: number; // 0-100
  isMuted: boolean;
  vibrationEnabled: boolean;
  preRoutineCountdownEnabled: boolean;
  preRoutineCountdownDuration: number; // seconds, 3-10
  preRoutineCountdownVibrationEnabled: boolean;
}
```

## 🛠️ Tech Stack

### Frontend Framework
- **React Native 0.79.6**: Cross-platform mobile development
- **Expo ~53.0.22**: Development platform and build tools

### Navigation
- **React Navigation**: Screen navigation and routing
- **Native Stack Navigator**: Performance-optimized navigation

### State Management & Storage
- **AsyncStorage**: Local data persistence
- **React Hooks**: State management in components

### Audio & Multimedia
- **Expo AV**: Audio playback and volume control
- **Expo Haptics**: Vibration feedback

### Development Tools
- **TypeScript**: Type-safe JavaScript
- **Expo CLI**: Development and build commands
- **VS Code**: Primary IDE

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (macOS) or Android Emulator/Device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kirchmajer/HIITBoss.git
   cd HIITBoss
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on device/emulator**
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 📱 Usage

### Creating a Custom Routine
1. Navigate to Home Screen
2. Tap "Create New Routine"
3. Configure:
   - Routine name
   - Number of rounds
   - Sets per round
   - Active duration per set
   - Rest duration per set
   - Rest duration between rounds
4. Save the routine

### Running a Routine
1. Select a routine from the Home Screen
2. Tap "Run"
3. Wait for pre-routine countdown (if enabled)
4. Follow the audio and visual cues
5. Use Pause/Resume or Cancel as needed

### Settings Configuration
- **Audio**: Adjust master volume, toggle mute
- **Vibration**: Enable/disable vibration cues
- **Countdown**: Configure pre-routine countdown duration

## 🔧 Development

### Available Scripts
```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator/device
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
```

### Code Style
- Strict TypeScript typing throughout
- Component-based architecture
- Separation of concerns (UI, business logic, data)
- Comprehensive error handling

### Best Practices
- **Modularization**: Feature-based code organization
- **Reusable Components**: Atomic design principles
- **Custom Hooks**: Encapsulated component logic
- **Error Boundaries**: Graceful failure handling
- **Testing**: Unit and integration test coverage

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code style
- Add tests for new features
- Update documentation as needed
- Ensure cross-platform compatibility

---

**Happy training! 💪**
