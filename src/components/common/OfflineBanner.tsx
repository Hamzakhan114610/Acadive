import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';

interface OfflineBannerProps {
  isOffline?: boolean;
  lastSynced?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  isOffline = false,
  lastSynced = 'Just now',
}) => {
  if (!isOffline) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Text style={styles.icon}>⚡</Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Offline Mode Active</Text>
        <Text style={styles.subtitle}>Viewing locally cached data. Last synced {lastSynced}.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FEF3C7',
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.captionBold,
    color: '#92400E',
    fontSize: 11,
  },
  subtitle: {
    ...Typography.caption,
    color: '#B45309',
    fontSize: 10,
  },
});
