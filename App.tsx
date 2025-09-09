import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { initializePresetsIfNeeded } from './src/constants';

export default function App() {
  useEffect(() => {
    // Initialize preset routines on first app load
    initializePresetsIfNeeded();
  }, []);

  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
