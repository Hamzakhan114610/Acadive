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
import { EducationStage } from '../types';

interface DualPathSelectScreenProps {
  onBack: () => void;
  onSelectPathA: (stage: EducationStage) => void;
  onSelectPathB: () => void;
}

export const DualPathSelectScreen: React.FC<DualPathSelectScreenProps> = ({
  onBack,
  onSelectPathA,
  onSelectPathB,
}) => {
  const [selectedStage, setSelectedStage] = useState<EducationStage>('fsc_pre_eng');

  const STAGES: { id: EducationStage; label: string; desc: string }[] = [
    { id: 'matric_science', label: 'Matric (Science / CS)', desc: 'Completed or currently in 9th/10th Grade' },
    { id: 'fsc_pre_eng', label: 'F.Sc. Pre-Engineering', desc: 'Higher Secondary (Maths, Physics, Chemistry)' },
    { id: 'fsc_pre_med', label: 'F.Sc. Pre-Medical', desc: 'Higher Secondary (Biology, Physics, Chemistry)' },
    { id: 'ics', label: 'ICS (Computer Science)', desc: 'Intermediate in Computer Science & Mathematics' },
    { id: 'icom', label: 'I.Com / Commerce', desc: 'Intermediate in Accounting & Business Principles' },
    { id: 'dae', label: 'DAE (Associate Engineering)', desc: '3-Year Technical Board Diploma' },
    { id: 'o_level', label: 'O-Levels (Cambridge)', desc: 'GCE Ordinary Level curriculum' },
    { id: 'a_level', label: 'A-Levels (Cambridge)', desc: 'GCE Advanced Level qualifications' },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Choose Discovery Mode"
        subtitle="Step 1 of 2 • Flexible Guidance"
        onBack={onBack}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headline}>
          How would you like to explore your future today?
        </Text>
        <Text style={styles.subheadline}>
          Acadiv adapts to where you currently are. If you already have a target in mind, jump straight in. If you want objective interest discovery, let our assessment guide you.
        </Text>

        {/* PATH A: Direct Field Selection */}
        <View style={styles.pathCard}>
          <View style={styles.pathHeader}>
            <View style={styles.tagPillEmerald}>
              <Text style={styles.tagPillText}>PATH A • FOCUSED ROUTE</Text>
            </View>
            <Text style={styles.timeBadge}>~1 Min</Text>
          </View>

          <Text style={styles.pathTitle}>"I Know My Target Field"</Text>
          <Text style={styles.pathDescription}>
            Select your current education stage and browse target fields directly. We will construct your 5-year roadmap, required subjects, and skill bridge immediately without an assessment.
          </Text>

          <Text style={styles.stageSelectLabel}>Select Current Education Stage:</Text>
          <View style={styles.stagesGrid}>
            {STAGES.map(stage => {
              const isSelected = selectedStage === stage.id;
              return (
                <TouchableOpacity
                  key={stage.id}
                  onPress={() => setSelectedStage(stage.id)}
                  style={[
                    styles.stageOption,
                    isSelected && styles.stageOptionSelected,
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text
                    style={[
                      styles.stageOptionText,
                      isSelected && styles.stageOptionTextSelected,
                    ]}
                  >
                    {stage.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <PrimaryButton
            title="Browse Careers for My Stage →"
            onPress={() => onSelectPathA(selectedStage)}
            variant="navy"
            style={styles.pathBtn}
          />
        </View>

        {/* Divider with OR */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.orBadge}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* PATH B: RIASEC Assessment */}
        <View style={[styles.pathCard, styles.pathCardFeatured]}>
          <View style={styles.pathHeader}>
            <View style={styles.tagPillNavy}>
              <Text style={styles.tagPillTextLight}>PATH B • GUIDED DISCOVERY</Text>
            </View>
            <Text style={styles.timeBadge}>5-7 Mins</Text>
          </View>

          <Text style={styles.pathTitle}>"Help Me Discover My Strengths"</Text>
          <Text style={styles.pathDescription}>
            Take our 18 scenario-based questions grounded in John Holland's validated RIASEC framework. Discover your dominant traits across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional dimensions.
          </Text>

          <View style={styles.featurePoints}>
            <View style={styles.featureRow}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.featureText}>18 relatable Pakistani student scenarios</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.featureText}>Transparent Reason Trace: Understand every match</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.featureText}>Zero clinical pressure: Guides interests, not guarantees</Text>
            </View>
          </View>

          <PrimaryButton
            title="Start 18-Scenario RIASEC →"
            onPress={onSelectPathB}
            variant="emerald"
            style={styles.pathBtn}
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
  headline: {
    ...Typography.pageTitle,
    color: Colors.primaryNavy,
    marginBottom: Spacing.xs,
  },
  subheadline: {
    ...Typography.bodySecondary,
    marginBottom: Spacing.xl,
    lineHeight: 21,
  },
  pathCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: Colors.primaryNavy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  pathCardFeatured: {
    borderColor: Colors.primaryEmerald,
    borderWidth: 1.5,
  },
  pathHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  tagPillEmerald: {
    backgroundColor: Colors.softTeal,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  tagPillNavy: {
    backgroundColor: Colors.primaryNavy,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  tagPillText: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.primaryEmerald,
    letterSpacing: 0.5,
  },
  tagPillTextLight: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.textInverse,
    letterSpacing: 0.5,
  },
  timeBadge: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  pathTitle: {
    ...Typography.sectionTitle,
    color: Colors.primaryNavy,
    marginBottom: Spacing.xs,
  },
  pathDescription: {
    ...Typography.bodySecondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  stageSelectLabel: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
    marginBottom: Spacing.sm,
  },
  stagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.md,
  },
  stageOption: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 3,
    borderRadius: Layout.inputRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundWarm,
    marginRight: Spacing.xs + 2,
    marginBottom: Spacing.xs + 2,
  },
  stageOptionSelected: {
    borderColor: Colors.primaryNavy,
    backgroundColor: Colors.primaryNavy,
  },
  stageOptionText: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.textPrimary,
  },
  stageOptionTextSelected: {
    color: Colors.textInverse,
  },
  pathBtn: {
    marginTop: Spacing.sm,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  orBadge: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.backgroundWarm,
  },
  featurePoints: {
    marginBottom: Spacing.md,
    backgroundColor: Colors.backgroundWarm,
    padding: Spacing.md,
    borderRadius: Layout.inputRadius,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  checkIcon: {
    color: Colors.primaryEmerald,
    fontWeight: '700',
    marginRight: Spacing.xs + 2,
    fontSize: 14,
  },
  featureText: {
    ...Typography.caption,
    color: Colors.textPrimary,
  },
  footerSpacing: {
    height: 40,
  },
});
