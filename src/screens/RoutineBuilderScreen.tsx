import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { NavigationProps, Routine, Round, Set } from '../types';
import { ScreenWrapper, Title, Subtitle, Body, Button, Input, Card } from '../components';
import { DataService } from '../services';
import { COLORS, SPACING, FONTS } from '../constants';

type Props = NativeStackScreenProps<NavigationProps, 'RoutineBuilder'>;

export default function RoutineBuilderScreen({ navigation, route }: Props) {
  const { routineId } = route.params || {};
  const [routine, setRoutine] = useState<Routine>({
    id: '',
    name: '',
    rounds: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (routineId) {
      loadRoutine();
    } else {
      setRoutine({
        id: DataService.generateId(),
        name: '',
        rounds: [],
      });
    }
  }, [routineId]);

  const loadRoutine = async () => {
    if (!routineId) return;
    const loadedRoutine = await DataService.getRoutine(routineId);
    if (loadedRoutine) {
      setRoutine(loadedRoutine);
      setIsEditing(true);
    }
  };

  const updateName = (name: string) => {
    setRoutine(prev => ({ ...prev, name }));
  };

  const addRound = () => {
    setRoutine(prev => ({
      ...prev,
      rounds: [...prev.rounds, { sets: [], restDuration: 60 }],
    }));
  };

  const removeRound = (roundIndex: number) => {
    setRoutine(prev => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== roundIndex),
    }));
  };

  const updateRoundRest = (roundIndex: number, restDuration: number) => {
    setRoutine(prev => ({
      ...prev,
      rounds: prev.rounds.map((round, i) =>
        i === roundIndex ? { ...round, restDuration } : round
      ),
    }));
  };

  const addSet = (roundIndex: number) => {
    setRoutine(prev => ({
      ...prev,
      rounds: prev.rounds.map((round, i) =>
        i === roundIndex
          ? { ...round, sets: [...round.sets, { activeDuration: 30, restDuration: 15 }] }
          : round
      ),
    }));
  };

  const removeSet = (roundIndex: number, setIndex: number) => {
    setRoutine(prev => ({
      ...prev,
      rounds: prev.rounds.map((round, i) =>
        i === roundIndex
          ? { ...round, sets: round.sets.filter((_, j) => j !== setIndex) }
          : round
      ),
    }));
  };

  const updateSet = (roundIndex: number, setIndex: number, field: keyof Set, value: number) => {
    setRoutine(prev => ({
      ...prev,
      rounds: prev.rounds.map((round, i) =>
        i === roundIndex
          ? {
              ...round,
              sets: round.sets.map((set, j) =>
                j === setIndex ? { ...set, [field]: value } : set
              ),
            }
          : round
      ),
    }));
  };

  const validateRoutine = () => {
    if (!routine.name.trim()) {
      Alert.alert('Error', 'Please enter a routine name');
      return false;
    }
    if (routine.rounds.length === 0) {
      Alert.alert('Error', 'Please add at least one round');
      return false;
    }
    for (let i = 0; i < routine.rounds.length; i++) {
      if (routine.rounds[i].sets.length === 0) {
        Alert.alert('Error', `Round ${i + 1} has no sets`);
        return false;
      }
    }
    return true;
  };

  const saveRoutine = async () => {
    if (!validateRoutine()) return;

    const success = await DataService.saveRoutine(routine);
    if (success) {
      Alert.alert('Success', `Routine ${isEditing ? 'updated' : 'created'} successfully`);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to save routine');
    }
  };

  const saveAsNewRoutine = async () => {
    if (!validateRoutine()) return;

    // Create a new routine with a new ID
    const newRoutine: Routine = {
      ...routine,
      id: DataService.generateId(),
      name: routine.name.trim() + ' (Copy)', // Add " (Copy)" to distinguish
    };

    const success = await DataService.saveRoutine(newRoutine);
    if (success) {
      Alert.alert('Success', 'New routine created successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to create new routine');
    }
  };

  return (
    <ScreenWrapper centerContent={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <Title level={2}>{isEditing ? 'Edit Routine' : 'Create New Routine'}</Title>

        <Input
          label="Routine Name:"
          value={routine.name}
          onChangeText={updateName}
          placeholder="Enter routine name"
          containerStyle={styles.inputContainer}
        />

        {routine.rounds.map((round, roundIndex) => (
          <Card key={roundIndex} style={styles.roundCard}>
            <Title level={3}>Round {roundIndex + 1}</Title>

            <Input
              label="Rest between sets (seconds):"
              value={round.restDuration.toString()}
              onChangeText={(text: string) => updateRoundRest(roundIndex, parseInt(text) || 0)}
              keyboardType="numeric"
              placeholder="60"
            />

            {round.sets.map((set, setIndex) => (
              <View key={setIndex} style={styles.setContainer}>
                <Body>Set {setIndex + 1}:</Body>
                <View style={styles.setInputs}>
                  <Input
                    label="Active (s):"
                    value={set.activeDuration.toString()}
                    onChangeText={(text: string) => updateSet(roundIndex, setIndex, 'activeDuration', parseInt(text) || 0)}
                    keyboardType="numeric"
                    placeholder="30"
                    inputStyle={styles.smallInput}
                  />
                  <Input
                    label="Rest (s):"
                    value={set.restDuration.toString()}
                    onChangeText={(text: string) => updateSet(roundIndex, setIndex, 'restDuration', parseInt(text) || 0)}
                    keyboardType="numeric"
                    placeholder="15"
                    inputStyle={styles.smallInput}
                  />
                  <Button
                    title="Remove Set"
                    onPress={() => removeSet(roundIndex, setIndex)}
                    variant="danger"
                    style={styles.removeButton}
                  />
                </View>
              </View>
            ))}

            <Button
              title="Add Set"
              onPress={() => addSet(roundIndex)}
              variant="primary"
              style={styles.addButton}
            />

            <Button
              title="Remove Round"
              onPress={() => removeRound(roundIndex)}
              variant="danger"
              style={styles.removeButton}
            />
          </Card>
        ))}

        <Button
          title="Add Round"
          onPress={addRound}
          variant="primary"
          style={styles.addButton}
        />

        {isEditing ? (
          <View style={styles.buttonContainer}>
            <Button
              title="Save Changes"
              onPress={saveRoutine}
              variant="primary"
              style={styles.saveButton}
            />
            <Button
              title="Save as New"
              onPress={saveAsNewRoutine}
              variant="secondary"
              style={styles.saveAsNewButton}
            />
          </View>
        ) : (
          <Button
            title="Save Routine"
            onPress={saveRoutine}
            variant="primary"
            style={styles.saveButton}
          />
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.sm,
  },
  smallInput: {
    width: 80,
  },
  setContainer: {
    marginBottom: SPACING.md,
  },
  setInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  addButton: {
    marginBottom: SPACING.sm,
  },
  removeButton: {
    marginBottom: SPACING.sm,
  },
  roundCard: {
    marginBottom: SPACING.lg,
  },
  saveButton: {
    marginTop: SPACING.lg,
  },
  buttonContainer: {
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  saveAsNewButton: {
    // Additional styling for the save as new button if needed
  },
});
