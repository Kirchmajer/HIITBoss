import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps } from '../types';
import { ScreenWrapper, Title, Subtitle, Description, Caption } from '../components';

type Props = NativeStackScreenProps<NavigationProps, 'RoutineBuilder'>;

export default function RoutineBuilderScreen({ navigation, route }: Props) {
  const { routineId } = route.params || {};

  return (
    <ScreenWrapper>
      <Title level={2}>Routine Builder</Title>
      <Subtitle>
        {routineId ? 'Edit Routine' : 'Create New Routine'} - Coming Soon
      </Subtitle>
      <Description>
        This will allow you to create and edit workout routines
      </Description>
      {routineId && (
        <Caption>Editing routine: {routineId}</Caption>
      )}
    </ScreenWrapper>
  );
}
