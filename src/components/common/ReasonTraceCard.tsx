import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, Layout } from '../../theme/spacing';

interface ReasonTraceCardProps {
  title?: string;
  whyMatched: string;
  contributingInputs: string[];
  prerequisites: string[];
  uncertaintyOrLimitations?: string;
  nextCredibleAction: string;
}

export const ReasonTraceCard: React.FC<ReasonTraceCardProps> = ({
  title = 'Why This Recommendation?',
  whyMatched,
  contributingInputs,
  prerequisites,
  uncertaintyOrLimitations,
  nextCredibleAction,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
        style={styles.headerRow}
        accessibilityRole="button"
        accessibilityLabel="Toggle recommendation explanation"
      >
        <View style={styles.titleWithIcon}>
          <Text style={styles.icon}>🔍</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.toggleText}>{expanded ? 'Hide Details ▲' : 'Inspect Reason Trace ▼'}</Text>
      </TouchableOpacity>

      <Text style={styles.summaryText}>{whyMatched}</Text>

      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Contributing Signals & Answers:</Text>
            {contributingInputs.map((input, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{input}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Relevant Prerequisites:</Text>
            {prerequisites.map((pre, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <Text style={styles.bulletPoint}>✓</Text>
                <Text style={styles.bulletText}>{pre}</Text>
              </View>
            ))}
          </View>

          {uncertaintyOrLimitations ? (
            <View style={[styles.section, styles.warningBox]}>
              <Text style={styles.warningLabel}>Uncertainty & Boundaries:</Text>
              <Text style={styles.warningText}>{uncertaintyOrLimitations}</Text>
            </View>
          ) : null}

          <View style={[styles.section, styles.actionBox]}>
            <Text style={styles.actionLabel}>Credible Next Step:</Text>
            <Text style={styles.actionText}>{nextCredibleAction}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginVertical: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: Layout.minTouchTarget - 8,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.primaryNavy,
  },
  toggleText: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  summaryText: {
    ...Typography.bodySecondary,
    marginTop: Spacing.xs,
    lineHeight: 20,
  },
  expandedContent: {
    marginTop: Spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.md,
  },
  section: {
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
    marginBottom: Spacing.xs,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletPoint: {
    color: Colors.primaryEmerald,
    fontWeight: '700',
    marginRight: Spacing.xs,
    fontSize: 14,
  },
  bulletText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 18,
  },
  warningBox: {
    backgroundColor: '#FFFBEB',
    padding: Spacing.sm + 2,
    borderRadius: Layout.inputRadius - 2,
    borderLeftWidth: 3,
    borderLeftColor: Colors.statusWarning,
  },
  warningLabel: {
    ...Typography.captionBold,
    color: Colors.statusWarning,
    marginBottom: 2,
  },
  warningText: {
    ...Typography.caption,
    color: '#78350F',
    lineHeight: 16,
  },
  actionBox: {
    backgroundColor: Colors.softTeal,
    padding: Spacing.sm + 2,
    borderRadius: Layout.inputRadius - 2,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primaryEmerald,
    marginBottom: 0,
  },
  actionLabel: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
    marginBottom: 2,
  },
  actionText: {
    ...Typography.caption,
    color: Colors.textPrimary,
    lineHeight: 18,
    fontWeight: '500',
  },
});
