import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing, Layout } from '../theme/spacing';

interface InterestDiscoveryFirstScreenProps {
  userName?: string | null;
  onOpenAuth: () => void;
  onStartRiasec: () => void;
  onStartIkigai: () => void;
  onSkipToField: () => void;
}

export const InterestDiscoveryFirstScreen: React.FC<InterestDiscoveryFirstScreenProps> = ({
  userName,
  onOpenAuth,
  onStartRiasec,
  onStartIkigai,
  onSkipToField,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header with Brand & Sign In */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <Text style={styles.brandName}>ACADIV</Text>
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          onPress={onOpenAuth}
          style={styles.authBtn}
          accessibilityRole="button"
        >
          <Text style={styles.authBtnText}>
            {userName ? `Hi, ${userName.split(' ')[0]} 👤` : 'Sign In / Register'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Punchy Hero */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Discover your path.</Text>
        <Text style={styles.heroSubtitle}>
          Find where your natural strengths fit best across Pakistani careers.
        </Text>
      </View>

      {/* Single Main Assessment Card: RIASEC (6 Quick Questions) */}
      <TouchableOpacity
        onPress={onStartRiasec}
        activeOpacity={0.88}
        style={styles.mainCard}
      >
        <View style={styles.cardHeaderRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.cardIcon}>🧭</Text>
          </View>
          <View style={styles.timeBadge}>
            <Text style={styles.timeBadgeText}>⚡ 6 Questions • ~1 min</Text>
          </View>
        </View>

        <Text style={styles.cardTitle}>Quick RIASEC Discovery</Text>
        <Text style={styles.cardDesc}>
          6 short student scenarios to pinpoint your Holland personality traits (Realistic, Analytical, Creative, Social, Leadership, Organizing).
        </Text>

        <View style={styles.actionButtonEmerald}>
          <Text style={styles.actionBtnText}>Start Quick Assessment (60s) →</Text>
        </View>
      </TouchableOpacity>

      {/* Subtle Ikigai Link (Optional Secondary Reflection) */}
      <TouchableOpacity
        onPress={onStartIkigai}
        style={styles.ikigaiRow}
        activeOpacity={0.7}
      >
        <Text style={styles.ikigaiIcon}>🌸</Text>
        <View style={styles.ikigaiTextCol}>
          <Text style={styles.ikigaiTitle}>Prefer Ikigai 4-Pillar Reflection?</Text>
          <Text style={styles.ikigaiSubtitle}>Explore passion, skills, and Pakistani market demand.</Text>
        </View>
        <Text style={styles.ikigaiArrow}>→</Text>
      </TouchableOpacity>

      {/* Bottom Skip Section (Direct to Field) */}
      <View style={styles.skipWrapper}>
        <View style={styles.divider} />
        
        <TouchableOpacity
          onPress={onSkipToField}
          style={styles.skipBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.skipBtnText}>Skip — I know my field →</Text>
        </TouchableOpacity>
        
        <Text style={styles.skipHint}>
          Already decided? Jump straight to Pakistani career roadmaps (Matric / Inter / DAE).
        </Text>
      </View>

      <View style={styles.footerSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    ...Typography.sectionTitle,
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryNavy,
    letterSpacing: 1.5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryEmerald,
    marginLeft: 4,
    marginTop: 2,
  },
  authBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Layout.pillRadius,
    backgroundColor: Colors.surfaceWhite,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  authBtnText: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
    fontSize: 12,
  },
  heroSection: {
    marginBottom: Spacing.xl,
  },
  heroTitle: {
    ...Typography.display,
    fontSize: 32,
    lineHeight: 38,
    color: Colors.primaryNavy,
    fontWeight: '800',
    marginBottom: 6,
  },
  heroSubtitle: {
    ...Typography.bodyRegular,
    color: Colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  mainCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 16,
    padding: Spacing.lg + 2,
    marginBottom: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.primaryEmerald,
    elevation: 3,
    shadowColor: Colors.primaryNavy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.softTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 20,
  },
  timeBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Layout.pillRadius,
  },
  timeBadgeText: {
    ...Typography.captionBold,
    fontSize: 11,
    color: '#92400E',
  },
  cardTitle: {
    ...Typography.sectionTitle,
    fontSize: 19,
    color: Colors.primaryNavy,
    marginBottom: 4,
  },
  cardDesc: {
    ...Typography.bodyRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: Spacing.lg,
  },
  actionButtonEmerald: {
    backgroundColor: Colors.primaryEmerald,
    borderRadius: Layout.inputRadius,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    ...Typography.buttonText,
    color: Colors.textInverse,
    fontWeight: '700',
    fontSize: 14,
  },
  ikigaiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: Spacing.lg,
  },
  ikigaiIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  ikigaiTextCol: {
    flex: 1,
  },
  ikigaiTitle: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
    fontSize: 12,
  },
  ikigaiSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
  },
  ikigaiArrow: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  skipWrapper: {
    marginTop: Spacing.xs,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    width: '100%',
    marginBottom: Spacing.lg,
  },
  skipBtn: {
    width: '100%',
    height: 50,
    borderRadius: Layout.inputRadius,
    borderWidth: 1.5,
    borderColor: Colors.primaryNavy,
    backgroundColor: Colors.surfaceWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs + 2,
  },
  skipBtnText: {
    ...Typography.buttonText,
    color: Colors.primaryNavy,
    fontSize: 15,
    fontWeight: '700',
  },
  skipHint: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 11,
  },
  footerSpacing: {
    height: 40,
  },
});
