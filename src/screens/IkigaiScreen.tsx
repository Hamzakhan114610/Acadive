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
import { Badge } from '../components/common/Badge';

interface IkigaiScreenProps {
  onBack: () => void;
  onComplete: (careerId: string) => void;
  onSkipToField: () => void;
}

export const IkigaiScreen: React.FC<IkigaiScreenProps> = ({
  onBack,
  onComplete,
  onSkipToField,
}) => {
  const [selectedPassion, setSelectedPassion] = useState<string>('logic');
  const [selectedStrength, setSelectedStrength] = useState<string>('maths');
  const [selectedNeed, setSelectedNeed] = useState<string>('tech_exports');
  const [selectedEconomy, setSelectedEconomy] = useState<string>('software');

  const PASSIONS = [
    { id: 'logic', label: 'Building systems & solving algorithmic puzzles', match: 'software-ai-engineer' },
    { id: 'creative', label: 'Designing visual interfaces & storytelling', match: 'ui-ux-product-designer' },
    { id: 'hands_on', label: 'Operating physical machines & robotics', match: 'mechanical-mechatronics-engineer' },
    { id: 'financial', label: 'Auditing ledgers & business strategy', match: 'chartered-accountant' },
  ];

  const STRENGTHS = [
    { id: 'maths', label: 'Mathematics, physics & analytical modeling' },
    { id: 'visual', label: 'Visual aesthetics, typography & user empathy' },
    { id: 'mechanics', label: 'Practical hardware repair & fabrication' },
    { id: 'compliance', label: 'Attention to detail, numbers & organization' },
  ];

  const NEEDS = [
    { id: 'tech_exports', label: 'High-value digital software exports for Pakistan' },
    { id: 'user_friendly', label: 'Accessible, human-centered digital public services' },
    { id: 'industrial_indep', label: 'Indigenous manufacturing & renewable energy infrastructure' },
    { id: 'fiscal_transparency', label: 'Corporate governance, tax compliance & audit transparency' },
  ];

  const getRecommendedCareerId = () => {
    if (selectedPassion === 'creative') return 'ui-ux-product-designer';
    if (selectedPassion === 'hands_on') return 'mechanical-mechatronics-engineer';
    if (selectedPassion === 'financial') return 'chartered-accountant';
    return 'software-ai-engineer';
  };

  const recommendedId = getRecommendedCareerId();

  return (
    <View style={styles.container}>
      <Header
        title="Ikigai Reflection"
        subtitle="Holistic 4-Pillar Alignment"
        onBack={onBack}
        rightAction={{ label: 'Skip', onPress: onSkipToField }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headline}>Find Your Career Intersection</Text>
        <Text style={styles.subheadline}>
          Ikigai is a reflective planning exercise exploring where your passions, personal strengths, societal needs, and economic viability meet.
        </Text>

        {/* Pillar 1: What You Love */}
        <View style={styles.pillarCard}>
          <View style={styles.pillarHeader}>
            <Text style={styles.pillarIcon}>❤️</Text>
            <Text style={styles.pillarTitle}>1. What You Enjoy (Passion)</Text>
          </View>
          {PASSIONS.map(item => {
            const isSelected = selectedPassion === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedPassion(item.id)}
                style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Pillar 2: What You Are Good At */}
        <View style={styles.pillarCard}>
          <View style={styles.pillarHeader}>
            <Text style={styles.pillarIcon}>⭐</Text>
            <Text style={styles.pillarTitle}>2. What You Excel At (Strengths)</Text>
          </View>
          {STRENGTHS.map(item => {
            const isSelected = selectedStrength === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedStrength(item.id)}
                style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Pillar 3: What Pakistan & Community Needs */}
        <View style={styles.pillarCard}>
          <View style={styles.pillarHeader}>
            <Text style={styles.pillarIcon}>🌏</Text>
            <Text style={styles.pillarTitle}>3. What Pakistan Needs (Societal Value)</Text>
          </View>
          {NEEDS.map(item => {
            const isSelected = selectedNeed === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedNeed(item.id)}
                style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Result Preview Box */}
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>CALCULATED IKIGAI INTERSECTION</Text>
          <Text style={styles.resultTitle}>
            {recommendedId === 'software-ai-engineer' && 'Software & AI Engineer'}
            {recommendedId === 'ui-ux-product-designer' && 'UI/UX & Product Designer'}
            {recommendedId === 'mechanical-mechatronics-engineer' && 'Mechanical & Robotics Engineer'}
            {recommendedId === 'chartered-accountant' && 'Chartered Accountant (CA / ACCA)'}
          </Text>
          <Text style={styles.resultDesc}>
            This pathway aligns your passion for technical challenge with high societal export demand and robust domestic & international market viability.
          </Text>

          <PrimaryButton
            title="Adopt This Direction & View Pathway →"
            onPress={() => onComplete(recommendedId)}
            style={styles.adoptBtn}
          />
        </View>

        {/* Skip Footer */}
        <TouchableOpacity
          onPress={onSkipToField}
          style={styles.skipFooterBtn}
          accessibilityRole="button"
        >
          <Text style={styles.skipFooterText}>Skip — I already know my field →</Text>
        </TouchableOpacity>

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
    paddingTop: Spacing.md,
  },
  headline: {
    ...Typography.pageTitle,
    color: Colors.primaryNavy,
    marginBottom: Spacing.xs,
  },
  subheadline: {
    ...Typography.bodySecondary,
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  pillarCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  pillarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  pillarIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  pillarTitle: {
    ...Typography.sectionTitle,
    fontSize: 15,
    color: Colors.primaryNavy,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Layout.inputRadius,
    marginBottom: Spacing.xs,
    backgroundColor: Colors.backgroundWarm,
  },
  optionRowSelected: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: Colors.primaryEmerald,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  radioCircleActive: {
    borderColor: Colors.primaryEmerald,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryEmerald,
  },
  optionText: {
    ...Typography.bodyRegular,
    fontSize: 13,
    color: Colors.textPrimary,
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.primaryNavy,
    fontWeight: '600',
  },
  resultBox: {
    backgroundColor: Colors.primaryNavy,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  resultLabel: {
    ...Typography.captionBold,
    fontSize: 10,
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  resultTitle: {
    ...Typography.pageTitle,
    color: Colors.textInverse,
    marginBottom: Spacing.xs,
  },
  resultDesc: {
    ...Typography.bodySecondary,
    color: '#CBD5E1',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  adoptBtn: {
    backgroundColor: Colors.primaryEmerald,
  },
  skipFooterBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.inputRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  skipFooterText: {
    ...Typography.buttonText,
    color: Colors.primaryEmerald,
  },
  footerSpacing: {
    height: 40,
  },
});
