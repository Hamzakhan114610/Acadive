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
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { ReasonTraceCard } from '../components/common/ReasonTraceCard';
import { Badge } from '../components/common/Badge';
import { RiasecScoreResult, RiasecDimension } from '../types/riasec';
import { RiasecDimensionDetails } from '../data/riasecQuestions';
import { CareersData } from '../data/careersData';
import { CareerProfile } from '../types';

interface RiasecResultsScreenProps {
  result: RiasecScoreResult;
  onExploreCareer: (careerId: string) => void;
  onOpenRoadmap: () => void;
  onRetake: () => void;
}

export const RiasecResultsScreen: React.FC<RiasecResultsScreenProps> = ({
  result,
  onExploreCareer,
  onOpenRoadmap,
  onRetake,
}) => {
  const dimensionsList: RiasecDimension[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  // Find careers matching at least one of the top dimensions
  const matchedCareers = CareersData.filter(career =>
    career.riasecDimensions.some(dim => result.topThree.includes(dim))
  );

  return (
    <View style={styles.container}>
      <Header
        title="Your Holland RIASEC Profile"
        subtitle="Objective Exploration Results"
        rightAction={{ label: 'Retake', onPress: onRetake }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Code Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroCodeLabel}>PRIMARY 3-LETTER HOLLAND CODE</Text>
          <Text style={styles.heroCode}>{result.profileCode}</Text>

          <View style={styles.topTraitPills}>
            {result.topThree.map(dim => (
              <Badge key={dim} type="riasec" dimension={dim} label={RiasecDimensionDetails[dim].name} />
            ))}
          </View>

          <Text style={styles.heroDescription}>
            Your highest alignment is with <Text style={styles.boldText}>{result.dominantTrait.fullName}</Text>. {result.dominantTrait.description}
          </Text>
        </View>

        {/* 6-Dimension Score Breakdown */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>All 6 Dimension Scores</Text>
          <Text style={styles.sectionSubtitle}>
            Normalized percentage breakdown from your 18 scenario responses.
          </Text>

          <View style={styles.dimensionBarsContainer}>
            {dimensionsList.map(dim => {
              const info = RiasecDimensionDetails[dim];
              const score = result.scores[dim];
              const percentage = result.dimensionPercentages[dim];
              const isTopThree = result.topThree.includes(dim);

              return (
                <View key={dim} style={styles.dimensionRow}>
                  <View style={styles.dimLabelCol}>
                    <Text style={[styles.dimCode, isTopThree && styles.dimCodeTop]}>
                      {dim}
                    </Text>
                    <Text style={styles.dimName} numberOfLines={1}>
                      {info.name}
                    </Text>
                  </View>

                  <View style={styles.dimBarWrapper}>
                    <View
                      style={[
                        styles.dimBarFill,
                        { width: `${Math.max(percentage, 4)}%` },
                        isTopThree ? styles.dimBarFillActive : styles.dimBarFillMuted,
                      ]}
                    />
                  </View>

                  <Text style={[styles.dimPercent, isTopThree && styles.dimPercentTop]}>
                    {percentage}%
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Reason Trace Section */}
        <ReasonTraceCard
          title="Transparent Reason Trace"
          whyMatched={result.reasonTrace.matchingRule}
          contributingInputs={result.reasonTrace.contributingAnswers.slice(0, 4).map(
            ans => `Q${ans.questionId}: Selected '${ans.choiceText.substring(0, 60)}...' [${ans.dimension}]`
          )}
          prerequisites={[
            `Alignment with primary dimension ${result.dominantTrait.fullName}`,
            'Sufficient points accumulated across 18 scenario checkpoints',
            'Pakistani educational qualification pathways (Matric / Inter / DAE)',
          ]}
          uncertaintyOrLimitations={result.reasonTrace.limitations}
          nextCredibleAction="Inspect recommended careers below and review their verified 4-5 year education pathways."
        />

        {/* Matched Careers Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Matched High-Alignment Careers</Text>
          <Text style={styles.matchedCount}>{matchedCareers.length} Found</Text>
        </View>

        {matchedCareers.map(career => (
          <View key={career.id} style={styles.careerCard}>
            <View style={styles.careerCardHeader}>
              <View style={styles.careerTitleCol}>
                <Text style={styles.careerTitle}>{career.title}</Text>
                <Text style={styles.careerCategory}>{career.category}</Text>
              </View>
              <Badge type="riasec" dimension={career.riasecDimensions[0]} />
            </View>

            <Text style={styles.careerSummary}>{career.shortSummary}</Text>

            <View style={styles.careerFooter}>
              <View style={styles.routesInfo}>
                <Text style={styles.routesCount}>
                  ✓ {career.routes.length} Verified Pakistani Routes
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => onExploreCareer(career.id)}
                style={styles.viewCareerBtn}
                accessibilityRole="button"
              >
                <Text style={styles.viewCareerText}>View Pathways →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <PrimaryButton
            title="Open Interactive 5-Year Roadmap →"
            onPress={onOpenRoadmap}
            style={styles.actionBtn}
          />
          <SecondaryButton
            title="Retake 18-Scenario Assessment"
            onPress={onRetake}
          />
        </View>

        <View style={styles.footerSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWarm,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  heroCard: {
    backgroundColor: Colors.primaryNavy,
    borderRadius: Layout.cardRadius,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  heroCodeLabel: {
    ...Typography.captionBold,
    fontSize: 10,
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  heroCode: {
    ...Typography.display,
    fontSize: 38,
    lineHeight: 44,
    color: Colors.textInverse,
    letterSpacing: 3,
    marginBottom: Spacing.sm,
  },
  topTraitPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.md,
  },
  heroDescription: {
    ...Typography.bodyRegular,
    color: '#E2E8F0',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '700',
    color: Colors.textInverse,
  },
  sectionCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.sectionTitle,
    color: Colors.primaryNavy,
    marginBottom: 2,
  },
  sectionSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  dimensionBarsContainer: {
    marginTop: Spacing.xs,
  },
  dimensionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm + 2,
  },
  dimLabelCol: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dimCode: {
    ...Typography.captionBold,
    width: 18,
    color: Colors.textSecondary,
  },
  dimCodeTop: {
    color: Colors.primaryEmerald,
  },
  dimName: {
    ...Typography.caption,
    color: Colors.textPrimary,
    flex: 1,
    fontSize: 11,
  },
  dimBarWrapper: {
    flex: 1,
    height: 10,
    backgroundColor: Colors.backgroundMuted,
    borderRadius: Layout.pillRadius,
    marginHorizontal: Spacing.sm,
    overflow: 'hidden',
  },
  dimBarFill: {
    height: '100%',
    borderRadius: Layout.pillRadius,
  },
  dimBarFillActive: {
    backgroundColor: Colors.primaryEmerald,
  },
  dimBarFillMuted: {
    backgroundColor: '#94A3B8',
  },
  dimPercent: {
    ...Typography.captionBold,
    width: 36,
    textAlign: 'right',
    color: Colors.textSecondary,
    fontSize: 12,
  },
  dimPercentTop: {
    color: Colors.primaryNavy,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionHeading: {
    ...Typography.sectionTitle,
    color: Colors.primaryNavy,
  },
  matchedCount: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  careerCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: Colors.primaryNavy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  careerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  careerTitleCol: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  careerTitle: {
    ...Typography.cardTitle,
    color: Colors.primaryNavy,
    marginBottom: 2,
  },
  careerCategory: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  careerSummary: {
    ...Typography.bodySecondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  careerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundMuted,
    paddingTop: Spacing.sm,
  },
  routesInfo: {
    flex: 1,
  },
  routesCount: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.statusSuccess,
  },
  viewCareerBtn: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  viewCareerText: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  actionContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  actionBtn: {
    marginBottom: Spacing.md,
  },
  footerSpacing: {
    height: 40,
  },
});
