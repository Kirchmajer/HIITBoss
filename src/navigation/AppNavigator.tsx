import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import { HomeScreen, RoutineBuilderScreen, RoutineScreen, SettingsScreen } from '../screens';

// Import types
import { NavigationProps } from '../types';

// Import theme
import { screenOptions } from './navigationTheme';

const Stack = createNativeStackNavigator<NavigationProps>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'HIIT Boss',
          }}
        />
        <Stack.Screen
          name="RoutineBuilder"
          component={RoutineBuilderScreen}
          options={({ route }) => ({
            title: route.params?.routineId ? 'Edit Routine' : 'Create Routine',
          })}
        />
        <Stack.Screen
          name="Routine"
          component={RoutineScreen}
          options={{
            title: 'Workout',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
