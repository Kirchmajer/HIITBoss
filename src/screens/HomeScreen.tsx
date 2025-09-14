import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps, Routine } from '../types';
import { ScreenWrapper, Title, Subtitle, Description, Body, Button, Card, EmptyState } from '../components';
import { DataService } from '../services';
import { PRESET_ROUTINES, initializePresetsIfNeeded } from '../constants/presets';
import { formatDuration } from '../utils/timeUtils';
import { FONTS } from '../constants';

type Props = NativeStackScreenProps<NavigationProps, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadRoutines();
    }, [])
  );

  const loadRoutines = async () => {
    try {
      await initializePresetsIfNeeded();
      const allRoutines = await DataService.getAllRoutines();
      setRoutines(allRoutines);
    } catch (error) {
      console.error('Error loading routines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = (routine: Routine) => {
    navigation.navigate('Routine', { routine });
  };

  const handleEdit = (routine: Routine) => {
    navigation.navigate('RoutineBuilder', { routineId: routine.id });
  };

  const handleCreateNew = () => {
    navigation.navigate('RoutineBuilder', { routineId: undefined });
  };

  const renderRoutineItem = ({ item }: { item: Routine }) => {
    const totalRounds = item.rounds.length;
    const totalSets = item.rounds.reduce((sum, round) => sum + round.sets.length, 0);
    const totalDuration = item.rounds.reduce((sum, round) => {
      const roundDuration = round.sets.reduce((roundSum, set) => roundSum + set.activeDuration + set.restDuration, 0) + round.restDuration;
      return sum + roundDuration;
    }, 0);

    return (
      <Card style={styles.routineItem}>
        <View style={styles.routineInfo}>
          <Body style={styles.routineName}>{item.name}</Body>
          <Description>
            {totalRounds} rounds • {totalSets} sets • {formatDuration(totalDuration)}
          </Description>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit"
            onPress={() => handleEdit(item)}
            variant="warning"
            style={styles.editButton}
          />
          <Button
            title="Run"
            onPress={() => handleRun(item)}
            variant="success"
            style={styles.runButton}
          />
        </View>
      </Card>
    );
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <Title>HIIT Boss</Title>
        <Description>Loading routines...</Description>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <Title>HIIT Boss</Title>
      <Button
        title="Create New Routine"
        onPress={handleCreateNew}
        variant="primary"
        style={styles.createButton}
      />
      {routines.length === 0 ? (
        <EmptyState
          title="No routines found"
          description="Create your first routine to get started!"
        />
      ) : (
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id}
          renderItem={renderRoutineItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  createButton: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  routineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontWeight: FONTS.weights.bold,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    minWidth: 60,
  },
  runButton: {
    minWidth: 60,
  },
});
