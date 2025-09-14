# HIIT Boss Testing Checklist

## Overview
This document provides a comprehensive testing checklist for the HIIT Boss application. Use this to verify all functionality is working correctly across different screens and features.

## 📱 Navigation & App Structure

### App Launch & Navigation
- [ ] App launches without errors
- [ ] Initial screen is Home screen
- [ ] Navigation between screens works smoothly
- [ ] Header shows correct titles for each screen
- [ ] Settings button (⚙️) appears in header on all screens except Settings
- [ ] Back navigation works correctly
- [ ] App doesn't crash when navigating between screens

### Screen Structure
- [ ] All 4 main screens accessible: Home, Routine Builder, Routine, Settings
- [ ] Screen titles display correctly
- [ ] Screen layouts are responsive
- [ ] No layout issues on different screen sizes

## 🏠 Home Screen

### Initial State
- [ ] Screen displays "HIIT Boss" title
- [ ] "Create New Routine" button is visible and functional
- [ ] Preset routines are loaded and displayed
- [ ] Settings button in header navigates to Settings screen

### Routine List
- [ ] Routines display with name, round count, set count, and duration
- [ ] Each routine shows "Edit" and "Run" buttons
- [ ] Empty state shows when no routines exist
- [ ] Routine list scrolls properly with many routines

### Routine Actions
- [ ] Tapping routine card navigates to Routine screen with correct routine
- [ ] Edit button navigates to Routine Builder with routine loaded
- [ ] "Create New Routine" navigates to empty Routine Builder
- [ ] Edit button doesn't trigger card tap when pressed
- [ ] Card shows visual feedback (opacity change) when tapped

## 🏗️ Routine Builder Screen

### New Routine Creation
- [ ] Screen shows "Create New Routine" title
- [ ] Routine name input field works
- [ ] "Add Round" button creates new round
- [ ] Rounds display with "Round X" titles
- [ ] Each round has rest duration input (default 60s)

### Set Management
- [ ] "Add Set" button adds sets to rounds
- [ ] Set inputs for active duration and rest duration work
- [ ] "Remove Set" button removes individual sets
- [ ] Multiple sets can be added to each round
- [ ] New sets autofill with previous set's values
- [ ] First set in round uses default values (30s active, 15s rest)

### Round Management
- [ ] "Remove Round" button removes entire rounds
- [ ] Multiple rounds can be created
- [ ] Round rest duration inputs work correctly
- [ ] New rounds start with one set using previous round's last set values
- [ ] New rounds autofill rest duration from previous round
- [ ] First round uses default values (30s active, 15s rest, 60s round rest)

### Save Functionality
- [ ] "Save Routine" button validates required fields
- [ ] Error alerts for missing routine name
- [ ] Error alerts for rounds without sets
- [ ] Successful save shows confirmation alert
- [ ] Save navigates back to Home screen
- [ ] Saved routine appears in Home screen list

### Edit Existing Routine
- [ ] Screen shows "Edit Routine" title when editing
- [ ] Existing routine data loads correctly
- [ ] All modifications save properly
- [ ] "Save Changes" button updates existing routine
- [ ] "Save as New" button creates duplicate with modifications
- [ ] New routine has "(Copy)" suffix in name
- [ ] Original routine remains unchanged when saving as new
- [ ] Both buttons validate routine data before saving

## ⏱️ Routine Screen (Timer)

### Pre-Start State
- [ ] Routine name displays correctly
- [ ] Progress shows "Round 1 of X" and "Set 1 of Y"
- [ ] Timer shows total time for first set
- [ ] Phase indicator shows "ACTIVE" in green
- [ ] "Start Workout" button is visible

### Timer Functionality
- [ ] Start button begins countdown
- [ ] Timer counts down accurately (second by second)
- [ ] Phase transitions work: ACTIVE → REST → ACTIVE
- [ ] Round transitions work correctly
- [ ] Progress indicators update correctly

### Controls
- [ ] Pause button pauses timer
- [ ] Resume button resumes from pause
- [ ] Cancel button stops timer and returns to Home
- [ ] Controls are disabled during transitions

### Visual Feedback
- [ ] Phase colors change correctly (green for ACTIVE, red for REST)
- [ ] Progress text updates for each round/set
- [ ] Timer display is large and clear
- [ ] No visual glitches during transitions

### Completion
- [ ] Workout completion shows success message
- [ ] "Done" button returns to Home screen
- [ ] Completion state handles all routine types

## ⚙️ Settings Screen

### Audio Settings
- [ ] Volume slider ranges from 0-100
- [ ] Volume value displays current setting
- [ ] Mute toggle switches on/off
- [ ] Settings save automatically on change

### Vibration Settings
- [ ] Vibration toggle enables/disables vibration
- [ ] Setting persists between app sessions

### Countdown Settings
- [ ] Pre-routine countdown toggle works
- [ ] Countdown duration slider (3-10 seconds) functions
- [ ] Countdown vibration toggle works
- [ ] All countdown settings save correctly

### Reset Functionality
- [ ] "Reset to Defaults" button shows confirmation dialog
- [ ] Cancel option works in confirmation
- [ ] Reset applies default values to all settings
- [ ] Success message shows after reset

## 💾 Data Persistence

### Routine Storage
- [ ] Created routines persist between app launches
- [ ] Edited routines save changes correctly
- [ ] Deleted routines are removed from storage
- [ ] Preset routines remain available

### Settings Storage
- [ ] All settings save automatically
- [ ] Settings persist between app sessions
- [ ] Reset to defaults works correctly
- [ ] Settings load correctly on app launch

## 🔧 Component Testing

### Button Component
- [ ] All button variants render correctly (primary, secondary, success, warning, danger)
- [ ] Disabled state works properly
- [ ] Press feedback (opacity change) works
- [ ] Custom styles apply correctly

### Input Component
- [ ] Text input works for all keyboard types
- [ ] Labels display correctly
- [ ] Error states show error messages
- [ ] Placeholder text appears
- [ ] Validation works as expected

### Switch Component
- [ ] Toggle functionality works
- [ ] Visual state changes correctly
- [ ] Labels display properly
- [ ] Disabled state prevents interaction

### Slider Component
- [ ] Touch interaction moves slider
- [ ] Min/max values respected
- [ ] Step values work correctly
- [ ] Current value displays
- [ ] Labels show properly

### Typography Components
- [ ] All title levels (1-3) render correctly
- [ ] Subtitle, Description, Body, Caption styles work
- [ ] Text colors apply properly
- [ ] Font weights display correctly

## 🎨 Design System

### Theme Consistency
- [ ] All colors from theme are used correctly
- [ ] Font sizes match design system
- [ ] Spacing values are consistent
- [ ] Border radius values applied properly

### Layout Components
- [ ] ScreenWrapper centers content correctly
- [ ] Card component has proper padding and shadows
- [ ] EmptyState displays correctly
- [ ] All components handle different content sizes

## 📊 Utility Functions

### Time Utilities
- [ ] formatDuration formats seconds correctly
- [ ] formatTimeMMSS displays MM:SS format properly
- [ ] Edge cases handled (0 seconds, large values)

### Data Services
- [ ] All CRUD operations work for routines
- [ ] Settings save/load functions properly
- [ ] Error handling works for storage failures
- [ ] ID generation creates unique identifiers

## 🔄 State Management

### useTimer Hook
- [ ] Timer state updates correctly
- [ ] Phase transitions trigger properly
- [ ] Completion callback fires at end
- [ ] Pause/resume functionality works
- [ ] Cancel resets timer state

### Screen State
- [ ] Loading states display correctly
- [ ] Error states show appropriate messages
- [ ] Form validation works on all inputs
- [ ] State updates don't cause unnecessary re-renders

## 🚨 Error Handling

### User Input Validation
- [ ] Required fields show validation errors
- [ ] Invalid data types handled gracefully
- [ ] Network/storage errors show user-friendly messages
- [ ] Form submission prevents invalid data

### App Stability
- [ ] No crashes on invalid routine data
- [ ] Graceful handling of missing settings
- [ ] Error boundaries prevent app crashes
- [ ] Recovery from error states works

## 📱 Platform Compatibility

### iOS Testing
- [ ] All features work on iOS simulator
- [ ] Navigation works correctly
- [ ] Touch interactions respond properly
- [ ] No iOS-specific layout issues

### Android Testing
- [ ] All features work on Android emulator
- [ ] Navigation works correctly
- [ ] Touch interactions respond properly
- [ ] No Android-specific layout issues

### Web Testing
- [ ] App runs in web browser
- [ ] Core functionality works
- [ ] Layout adapts to web viewport
- [ ] No web-specific issues

## 🔊 Audio & Vibration (Future Features)

### Audio System
- [ ] Sound files load correctly
- [ ] Volume controls work
- [ ] Audio cues play at correct times
- [ ] Mute functionality works

### Vibration
- [ ] Vibration triggers work
- [ ] Vibration settings respected
- [ ] No vibration when disabled

## 📈 Performance

### App Performance
- [ ] No memory leaks during long workouts
- [ ] Smooth animations and transitions
- [ ] Fast screen navigation
- [ ] Efficient list rendering

### Battery Usage
- [ ] Timer doesn't drain battery excessively
- [ ] Background functionality works efficiently
- [ ] Wake lock prevents unnecessary battery drain

## 🧪 Edge Cases & Boundary Testing

### Routine Complexity
- [ ] Single round, single set routines work
- [ ] Complex routines (many rounds/sets) work
- [ ] Very short durations (1 second) work
- [ ] Very long durations work

### Settings Edge Cases
- [ ] Volume at 0% and 100% works
- [ ] Countdown at 3s and 10s works
- [ ] All combinations of settings work

### Error Scenarios
- [ ] App restart during workout
- [ ] Storage full scenarios
- [ ] Network issues (if applicable)
- [ ] Invalid data in storage

## 📋 Testing Workflow

### Manual Testing Process
1. [ ] Start with fresh app install
2. [ ] Test each screen individually
3. [ ] Test all user flows end-to-end
4. [ ] Test on multiple devices/screen sizes
5. [ ] Test with different routine configurations
6. [ ] Verify data persistence across app restarts

### Regression Testing
- [ ] Re-test all features after any code changes
- [ ] Verify existing functionality still works
- [ ] Check for new bugs introduced
- [ ] Performance hasn't degraded

## ✅ Completion Criteria

- [ ] All checklist items marked as completed
- [ ] No critical bugs remaining
- [ ] All user flows work smoothly
- [ ] App is stable and performant
- [ ] Ready for production deployment

---

**Testing Notes:**
- Test on both iOS and Android platforms
- Test on different screen sizes
- Test with various routine configurations
- Verify data persistence across app restarts
- Test error scenarios and edge cases
- Document any bugs found during testing
