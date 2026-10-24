import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, Layout } from '../../theme/spacing';
import { VerificationState, RiasecDimension } from '../../types';

interface BadgeProps {
  label?: string;
  type?: 'verification' | 'riasec' | 'general' | 'category';
  verificationStatus?: VerificationState;
  dimension?: RiasecDimension;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  type = 'general',
  verificationStatus,
  dimension,
}) => {
  if (type === 'verification' && verificationStatus) {
    const isVerified = verificationStatus === 'verified';
    const isRequiresConfirmation = verificationStatus === 'requires_confirmation';

    const bg = isVerified
      ? Colors.softTeal
      : isRequiresConfirmation
      ? '#FEF3C7'
      : Colors.backgroundMuted;

    const textCol = isVerified
      ? Colors.statusSuccess
      : isRequiresConfirmation
      ? Colors.statusWarning
      : Colors.textSecondary;

    const text = isVerified
      ? '✓ Verified Source'
      : isRequiresConfirmation
      ? '⚠ Requires Confirmation'
      : 'Not Available';

    return (
      <View style={[styles.badge, { backgroundColor: bg }]}>
        <Text style={[styles.badgeText, { color: textCol }]}>{text}</Text>
      </View>
    );
  }

  if (type === 'riasec' && dimension) {
    const dimensionColors: Record<RiasecDimension, { bg: string; text: string }> = {
      R: { bg: '#FEE2E2', text: '#991B1B' },
      I: { bg: '#E0F2FE', text: '#075985' },
      A: { bg: '#F3E8FF', text: '#6B21A8' },
      S: { bg: '#DCFCE7', text: '#166534' },
      E: { bg: '#FFEDD5', text: '#9A3412' },
      C: { bg: '#F1F5F9', text: '#334155' },
    };

    const config = dimensionColors[dimension];

    return (
      <View style={[styles.badge, { backgroundColor: config.bg }]}>
        <Text style={[styles.badgeText, { color: config.text }]}>
          {dimension} • {label || dimension}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, { backgroundColor: Colors.softTeal }]}>
      <Text style={[styles.badgeText, { color: Colors.primaryEmerald }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: Layout.pillRadius,
    alignSelf: 'flex-start',
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  badgeText: {
    ...Typography.captionBold,
    fontSize: 11,
  },
});
