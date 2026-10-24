import { StyleSheet } from 'react-native';
import { Colors } from './colors';

/**
 * ACADIV Design System — Typography Tokens
 * Editorial, legible, and balanced scale for Android & iOS
 */
export const Typography = StyleSheet.create({
  display: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.4,
  },
  pageTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '400',
    color: Colors.textPrimary,
  },
  bodyRegular: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: Colors.textPrimary,
  },
  bodySecondary: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  captionBold: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  numberDisplay: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    color: Colors.primaryNavy,
  },
});
