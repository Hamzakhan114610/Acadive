import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, Layout } from '../../theme/spacing';
import { VerificationState } from '../../types';
import { Badge } from './Badge';

interface SourceCitationProps {
  title: string;
  url?: string;
  lastCheckedDate: string;
  verificationStatus: VerificationState;
}

export const SourceCitation: React.FC<SourceCitationProps> = ({
  title,
  url,
  lastCheckedDate,
  verificationStatus,
}) => {
  const handleOpenLink = () => {
    if (url) {
      Linking.openURL(url).catch(() => {});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sourceLabel}>OFFICIAL SOURCE PROVENANCE</Text>
        <Badge type="verification" verificationStatus={verificationStatus} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.metaText}>Reviewed: {lastCheckedDate}</Text>

      {url ? (
        <TouchableOpacity
          onPress={handleOpenLink}
          style={styles.linkButton}
          accessibilityRole="link"
        >
          <Text style={styles.linkText}>View Official Source ↗</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundMuted,
    borderRadius: Layout.cardRadius,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  sourceLabel: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  title: {
    ...Typography.bodyRegular,
    color: Colors.primaryNavy,
    fontWeight: '600',
    marginBottom: 2,
  },
  metaText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  linkButton: {
    minHeight: 32,
    justifyContent: 'center',
  },
  linkText: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
});
