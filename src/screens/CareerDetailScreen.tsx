import React, { useState } from 'react';
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
import { Badge } from '../components/common/Badge';
import { SourceCitation } from '../components/common/SourceCitation';
import { CareersData } from '../data/careersData';

interface CareerDetailScreenProps {
  careerId: string;
  onBack: () => void;
  onStartRoadmap: (careerId: string) => void;
  onCompare?: () => void;
}

export const CareerDetailScreen: React.FC<CareerDetailScreenProps> = ({
  careerId,
  onBack,
  onStartRoadmap,
  onCompare,
}) => {
  const career = CareersData.find(c => c.id === careerId) || CareersData[0];
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  const activeRoute = career.routes[selectedRouteIndex];

  return (
    <View style={styles.container}>
      <Header
        title={career.title}
        subtitle={career.category}
        onBack={onBack}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <Text style={styles.categoryLabel}>{career.category.toUpperCase()}</Text>
            <Badge type="riasec" dimension={career.riasecDimensions[0]} label={`Holland: ${career.riasecCode}`} />
          </View>
          <Text style={styles.heroTitle}>{career.title}</Text>
          <Text style={styles.heroSummary}>{career.detailedOverview}</Text>
        </View>

        {/* Typical Activities Section */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Typical Work & Daily Responsibilities</Text>
          <View style={styles.bulletList}>
            {career.typicalActivities.map((act, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bulletCheck}>✓</Text>
                <Text style={styles.bulletText}>{act}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education Pathways (Key Pakistan Architecture) */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Pakistani Education Routes</Text>
          <Text style={styles.sectionSubtitle}>
            Choose between traditional intermediate, technical DAE diploma, or Cambridge streams.
          </Text>

          {/* Route Selector Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.routeSelectorScroll}
          >
            {career.routes.map((route, idx) => {
              const isSelected = selectedRouteIndex === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedRouteIndex(idx)}
                  style={[
                    styles.routeTab,
                    isSelected && styles.routeTabSelected,
                  ]}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.routeTabText,
                      isSelected && styles.routeTabTextSelected,
                    ]}
                  >
                    Route {idx + 1}: {route.routeName.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Active Route Detail Box */}
          <View style={styles.routeDetailBox}>
            <Text style={styles.routeTitle}>{activeRoute.routeName}</Text>
            <View style={styles.routeMetaRow}>
              <Text style={styles.routeMeta}>⏳ Duration: {activeRoute.estimatedYears}</Text>
              <Text style={styles.routeMeta}>🎯 Test: {activeRoute.admissionTest}</Text>
            </View>

            <View style={styles.timelineWrapper}>
              {activeRoute.steps.map((step, idx) => (
                <View key={idx} style={styles.timelineStep}>
                  <View style={styles.timelineLeftCol}>
                    <View style={styles.timelineDot} />
                    {idx < activeRoute.steps.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <View style={styles.stepHeader}>
                      <Text style={styles.stepStage}>{step.stage}</Text>
                      <Text style={styles.stepDuration}>{step.duration}</Text>
                    </View>
                    <Text style={styles.stepDescription}>{step.description}</Text>
                    <Text style={styles.stepInstitutions}>
                      Institutions: {step.institutionTypes.join(', ')}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Essential Skills Section */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Essential Competence & Skills</Text>
          <Text style={styles.sectionSubtitle}>
            Skills evaluated during technical interviews and professional practice.
          </Text>

          {career.essentialSkills.map((skill, idx) => (
            <View key={idx} style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Badge label={skill.priority.toUpperCase()} />
              </View>
              <Text style={styles.skillBasis}>Basis: {skill.verifiedBasis}</Text>
            </View>
          ))}
        </View>

        {/* Official Sources Citation */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Accreditation & Regulatory Sources</Text>
          {career.sources.map((src, idx) => (
            <SourceCitation
              key={idx}
              title={src.title}
              url={src.url}
              lastCheckedDate={src.lastCheckedDate}
              verificationStatus={src.verificationStatus}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <PrimaryButton
            title="Adopt This Career in My Roadmap →"
            onPress={() => onStartRoadmap(career.id)}
            style={styles.actionBtn}
          />
          {onCompare && (
            <SecondaryButton
              title="Compare with Another Career"
              onPress={onCompare}
            />
          )}
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
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  categoryLabel: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 0.8,
  },
  heroTitle: {
    ...Typography.pageTitle,
    color: Colors.primaryNavy,
    marginBottom: Spacing.xs,
  },
  heroSummary: {
    ...Typography.bodyLarge,
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  cardSection: {
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
  bulletList: {
    marginTop: Spacing.xs,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  bulletCheck: {
    color: Colors.primaryEmerald,
    fontWeight: '700',
    fontSize: 14,
    marginRight: Spacing.xs + 2,
    marginTop: 1,
  },
  bulletText: {
    ...Typography.bodyRegular,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  routeSelectorScroll: {
    marginBottom: Spacing.md,
  },
  routeTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Layout.pillRadius,
    backgroundColor: Colors.backgroundMuted,
    marginRight: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  routeTabSelected: {
    backgroundColor: Colors.primaryNavy,
    borderColor: Colors.primaryNavy,
  },
  routeTabText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  routeTabTextSelected: {
    color: Colors.textInverse,
  },
  routeDetailBox: {
    backgroundColor: Colors.backgroundWarm,
    borderRadius: Layout.inputRadius,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  routeTitle: {
    ...Typography.cardTitle,
    color: Colors.primaryNavy,
    marginBottom: 4,
  },
  routeMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.md,
  },
  routeMeta: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.primaryEmerald,
    marginRight: Spacing.md,
  },
  timelineWrapper: {
    marginTop: Spacing.xs,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  timelineLeftCol: {
    width: 20,
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primaryEmerald,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepStage: {
    ...Typography.cardTitle,
    fontSize: 14,
    color: Colors.primaryNavy,
  },
  stepDuration: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
  },
  stepDescription: {
    ...Typography.bodyRegular,
    fontSize: 13,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  stepInstitutions: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  skillItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundMuted,
    paddingVertical: Spacing.sm,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  skillName: {
    ...Typography.bodyRegular,
    fontWeight: '600',
    color: Colors.primaryNavy,
  },
  skillBasis: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  actionContainer: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  actionBtn: {
    marginBottom: Spacing.md,
  },
  footerSpacing: {
    height: 40,
  },
});
