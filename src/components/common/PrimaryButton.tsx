import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, Layout } from '../../theme/spacing';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'indigo' | 'navy' | 'mint' | 'emerald';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  variant = 'indigo',
}) => {
  let backgroundColor: string = Colors.actionIndigo;
  if (disabled) {
    backgroundColor = Colors.backgroundMuted;
  } else if (variant === 'navy') {
    backgroundColor = Colors.primaryNavy;
  } else if (variant === 'mint' || variant === 'emerald') {
    backgroundColor = Colors.successMint;
  }

  const textColor = disabled ? Colors.textSecondary : Colors.textInverse;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        styles.button,
        { backgroundColor },
        disabled && styles.disabledButton,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: Layout.minTouchTarget,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: Colors.actionIndigo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  disabledButton: {
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    ...Typography.buttonText,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
