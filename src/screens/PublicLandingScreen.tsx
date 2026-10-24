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
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { Badge } from '../components/common/Badge';

interface PublicLandingScreenProps {
  onStartExploration: () => void;
  onDirectSearch: () => void;
  onSelectCareer: (careerId: string) => void;
}

export const PublicLandingScreen: React.FC<PublicLandingScreenProps> = ({
  onStartExploration,
  onDirectSearch,
  onSelectCareer,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand Header */}
      <View style={styles.brandSection}>
        <View style={styles.logoPill}>
          <Text style={styles.logoIcon}>🧭</Text>
          <Text style={styles.logoText}>ACADIV</Text>
        </View>
        <Text style={styles.tagline}>
          Navigate Your Future,{'\n'}Master Your Path.
        </Text>
        <Text style={styles.subtitle}>
          Turn uncertainty into a credible next action. A premium, decision-support platform designed for Pakistani students after Matric, Intermediate, DAE, and O/A-Levels.
        </Text>
      </View>

      {/* Primary Actions */}
      <View style={styles.actionContainer}>
        <PrimaryButton
          title="Begin Free Exploration →"
          onPress={onStartExploration}
          style={styles.primaryBtn}
        />
        <SecondaryButton
          title="Browse Known Fields Directly"
          onPress={onDirectSearch}
        />
      </View>

      {/* Target Audience Badges */}
      <View style={styles.audienceSection}>
        <Text style={styles.sectionHeaderLabel}>DESIGNED FOR DIVERSE PATHWAYS</Text>
        <View style={styles.badgeRow}>
          <Badge label="Matric (Science/CS/Arts)" />
          <Badge label="F.Sc. Pre-Engineering" />
          <Badge label="F.Sc. Pre-Medical" />
          <Badge label="ICS & I.Com" />
          <Badge label="DAE (Polytechnic)" />
          <Badge label="O & A-Levels" />
          <Badge label="Undergraduate BS/BE" />
        </View>
      </View>

      {/* Sample Pathway Spotlight */}
      <View style={styles.spotlightCard}>
        <View style={styles.spotlightHeader}>
          <Text style={styles.spotlightBadge}>SAMPLE PATHWAY PREVIEW</Text>
          <Text style={styles.riasecBadge}>RIASEC: IRC</Text>
        </View>
        <Text style={styles.spotlightTitle}>Software & AI Engineer</Text>
        <Text style={styles.spotlightDesc}>
          Explore how a Matric or DAE student in Pakistan transitions through 4 years of accredited BS studies to high-value global software roles.
        </Text>

        <View style={styles.milestoneMiniRow}>
          <View style={styles.milestoneStep}>
            <Text style={styles.stepNum}>1</Text>
            <Text style={styles.stepText}>Matric / DAE / Inter</Text>
          </View>
          <Text style={styles.arrowStep}>→</Text>
          <View style={styles.milestoneStep}>
            <Text style={styles.stepNum}>2</Text>
            <Text style={styles.stepText}>HEC Entry Tests</Text>
          </View>
          <Text style={styles.arrowStep}>→</Text>
          <View style={styles.milestoneStep}>
            <Text style={styles.stepNum}>3</Text>
            <Text style={styles.stepText}>4-Yr BS Degree</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onSelectCareer('software-ai-engineer')}
          style={styles.inspectBtn}
          accessibilityRole="button"
        >
          <Text style={styles.inspectBtnText}>Inspect Full 5-Year Roadmap ↗</Text>
        </TouchableOpacity>
      </View>

      {/* Mandatory Trust Statement */}
      <View style={styles.trustBox}>
        <View style={styles.trustHeaderRow}>
          <Text style={styles.shieldIcon}>🛡️</Text>
          <Text style={styles.trustTitle}>ACADIV TRUST & INTEGRITY STATEMENT</Text>
        </View>
        <Text style={styles.trustBody}>
          Acadiv is an objective decision-support and career exploration system. It is <Text style={styles.boldText}>not</Text> an admissions authority, employment guarantee, or clinical diagnosis. Recommendations trace strictly to documented Pakistani institutional prerequisites (HEC, PEC, NCEAC, ICAP). Information requiring verification is explicitly labeled.
        </Text>
      </View>

      <View style={styles.footerSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWarm,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  brandSection: {
    marginBottom: Spacing.xl,
  },
  logoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceWhite,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Layout.pillRadius,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  logoIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  logoText: {
    ...Typography.captionBold,
    fontSize: 13,
    color: Colors.primaryNavy,
    letterSpacing: 1.5,
  },
  tagline: {
    ...Typography.display,
    color: Colors.primaryNavy,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  actionContainer: {
    marginBottom: Spacing.xl,
  },
  primaryBtn: {
    marginBottom: Spacing.md,
  },
  audienceSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeaderLabel: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spotlightCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
    elevation: 2,
    shadowColor: Colors.primaryNavy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  spotlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  spotlightBadge: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.primaryEmerald,
    letterSpacing: 0.5,
  },
  riasecBadge: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.textSecondary,
    backgroundColor: Colors.backgroundMuted,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  spotlightTitle: {
    ...Typography.pageTitle,
    fontSize: 20,
    color: Colors.primaryNavy,
    marginBottom: Spacing.xs,
  },
  spotlightDesc: {
    ...Typography.bodySecondary,
    marginBottom: Spacing.md,
  },
  milestoneMiniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundMuted,
    padding: Spacing.md,
    borderRadius: Layout.inputRadius,
    marginBottom: Spacing.md,
  },
  milestoneStep: {
    alignItems: 'center',
    flex: 1,
  },
  stepNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primaryEmerald,
    color: Colors.textInverse,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 2,
  },
  stepText: {
    ...Typography.caption,
    fontSize: 10,
    textAlign: 'center',
    color: Colors.textPrimary,
  },
  arrowStep: {
    color: Colors.textSecondary,
    fontWeight: '700',
    fontSize: 14,
  },
  inspectBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  inspectBtnText: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  trustBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryNavy,
  },
  trustHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  shieldIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  trustTitle: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.primaryNavy,
    letterSpacing: 0.5,
  },
  trustBody: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '700',
    color: Colors.primaryNavy,
  },
  footerSpacing: {
    height: 40,
  },
});
