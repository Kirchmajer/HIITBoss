import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProps } from '../types';
import { ScreenWrapper, Title, Subtitle, Description } from '../components';

type Props = NativeStackScreenProps<NavigationProps, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScreenWrapper>
      <Title>HIIT Boss</Title>
      <Subtitle>Home Screen - Coming Soon</Subtitle>
      <Description>
        This will display your routines with Run/Edit options
      </Description>
    </ScreenWrapper>
  );
}
