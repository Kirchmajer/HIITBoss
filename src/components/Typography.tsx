import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { COLORS, FONTS } from '../constants';

interface BaseTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface TitleProps extends BaseTextProps {
  level?: 1 | 2 | 3;
}

export function Title({ children, level = 1, style, ...props }: TitleProps) {
  const titleStyles = [
    styles.titleBase,
    level === 1 && styles.title1,
    level === 2 && styles.title2,
    level === 3 && styles.title3,
    style,
  ];

  return (
    <Text style={titleStyles} {...props}>
      {children}
    </Text>
  );
}

export function Subtitle({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.subtitle, style]} {...props}>
      {children}
    </Text>
  );
}

export function Description({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
}

export function Body({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.body, style]} {...props}>
      {children}
    </Text>
  );
}

export function Caption({ children, style, ...props }: BaseTextProps) {
  return (
    <Text style={[styles.caption, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  titleBase: {
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  title1: {
    fontSize: FONTS.sizes.huge,
    marginBottom: 10,
  },
  title2: {
    fontSize: FONTS.sizes.xxxl,
    marginBottom: 10,
  },
  title3: {
    fontSize: FONTS.sizes.xl,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONTS.sizes.lg,
    color: COLORS.text.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.primary,
    lineHeight: 22,
  },
  caption: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.tertiary,
  },
});
