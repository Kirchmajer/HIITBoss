import { COLORS } from '../constants';

export const navigationTheme = {
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTintColor: COLORS.text.inverse,
  headerTitleStyle: {
    fontWeight: 'bold' as const,
  },
} as const;

export const screenOptions = {
  ...navigationTheme,
} as const;
