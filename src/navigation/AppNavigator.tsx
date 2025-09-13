import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Import screens
import { HomeScreen, RoutineBuilderScreen, RoutineScreen, SettingsScreen } from '../screens';

// Import types
import { NavigationProps } from '../types';

// Import theme
import { screenOptions } from './navigationTheme';
import { COLORS, FONTS } from '../constants';

// Settings Header Button Component
function SettingsHeaderButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Settings' as never);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.headerButton}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Text style={styles.headerButtonText}>⚙️</Text>
    </TouchableOpacity>
  );
}

const Stack = createNativeStackNavigator<NavigationProps>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          ...screenOptions,
          headerRight: () => <SettingsHeaderButton />,
        }}
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
            headerRight: undefined,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    padding: 8,
  },
  headerButtonText: {
    fontSize: 20,
    color: COLORS.text.inverse,
  },
});
