import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps, Routine } from '../types';
import { ScreenWrapper, Title, Subtitle, Description, Body } from '../components';
import { DataService } from '../services';
import { PRESET_ROUTINES, initializePresetsIfNeeded } from '../constants/presets';
import { formatDuration } from '../utils/timeUtils';

type Props = NativeStackScreenProps<NavigationProps, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoutines();
  }, []);

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
      <View style={styles.routineItem}>
        <View style={styles.routineInfo}>
          <Body style={styles.routineName}>{item.name}</Body>
          <Description>
            {totalRounds} rounds • {totalSets} sets • {formatDuration(totalDuration)}
          </Description>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => handleEdit(item)}
          >
            <Body style={styles.buttonText}>Edit</Body>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.runButton]}
            onPress={() => handleRun(item)}
          >
            <Body style={styles.buttonText}>Run</Body>
          </TouchableOpacity>
        </View>
      </View>
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
      <TouchableOpacity style={styles.createButton} onPress={handleCreateNew}>
        <Body style={styles.createButtonText}>Create New Routine</Body>
      </TouchableOpacity>
      {routines.length === 0 ? (
        <View style={styles.emptyState}>
          <Subtitle>No routines found</Subtitle>
          <Description>Create your first routine to get started!</Description>
        </View>
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
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  routineItem: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineInfo: {
    flex: 1,
  },
  routineName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FF9500',
  },
  runButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
