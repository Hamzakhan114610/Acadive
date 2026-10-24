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
import { EducationStage } from '../types';

interface QualificationFirstScreenProps {
  userName?: string | null;
  selectedStage: EducationStage;
  onSelectStage: (stage: EducationStage) => void;
  onOpenAuth: () => void;
  onStartAssessment: () => void;
  onSkipToField: () => void;
}

interface QualificationOption {
  id: EducationStage;
  icon: string;
  title: string;
  subtitle: string;
  tag: string;
}

const QUALIFICATIONS: QualificationOption[] = [
  {
    id: 'matric_science',
    icon: '📘',
    title: 'Matriculation (Science / CS / Arts)',
    subtitle: '9th or 10th Grade Secondary School (BISE)',
    tag: 'Secondary',
  },
  {
    id: 'fsc_pre_eng',
    icon: '📐',
    title: 'F.Sc. Pre-Engineering',
    subtitle: 'Higher Secondary (Mathematics, Physics, Chemistry)',
    tag: 'Intermediate',
  },
  {
    id: 'fsc_pre_med',
    icon: '🔬',
    title: 'F.Sc. Pre-Medical',
    subtitle: 'Higher Secondary (Biology, Physics, Chemistry)',
    tag: 'Intermediate',
  },
  {
    id: 'ics',
    icon: '💻',
    title: 'ICS (Computer Science)',
    subtitle: 'Intermediate in Computer Science & Mathematics',
    tag: 'Intermediate',
  },
  {
    id: 'icom',
    icon: '📊',
    title: 'I.Com (Commerce & Finance)',
    subtitle: 'Intermediate in Accounting & Business Principles',
    tag: 'Commerce',
  },
  {
    id: 'dae',
    icon: '⚙️',
    title: 'DAE (Diploma of Associate Engineering)',
    subtitle: '3-Year Technical Board Polytechnic Diploma',
    tag: 'Technical',
  },
  {
    id: 'a_level',
    icon: '🌍',
    title: 'O-Levels / A-Levels (Cambridge)',
    subtitle: 'GCE International Secondary / Advanced Qualifications',
    tag: 'Cambridge',
  },
  {
    id: 'undergrad',
    icon: '🎓',
    title: 'Undergraduate (BS / BE / Degree)',
    subtitle: 'Currently enrolled in university studies',
    tag: 'Higher Ed',
  },
];

export const QualificationFirstScreen: React.FC<QualificationFirstScreenProps> = ({
  userName,
  selectedStage,
  onSelectStage,
  onOpenAuth,
  onStartAssessment,
  onSkipToField,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <Text style={styles.compassStar}>🧭</Text>
          <Text style={styles.brandName}>ACADIV</Text>
          <View style={styles.goldDot} />
        </View>

        <TouchableOpacity
          onPress={onOpenAuth}
          style={styles.authBtn}
          accessibilityRole="button"
          activeOpacity={0.8}
        >
          <Text style={styles.authBtnText}>
            {userName ? `Hi, ${userName.split(' ')[0]} 👤` : 'Sign In / Register'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Question & Subtitle */}
        <View style={styles.questionSection}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>STEP 1 OF 2 • QUALIFICATION</Text>
          </View>
          <Text style={styles.headline}>What is your current qualification?</Text>
          <Text style={styles.subheadline}>
            Aapki current taleem kya hai? Select your stage so we can map authentic Pakistani career routes for you:
          </Text>
        </View>

        {/* Qualification Options Grid */}
        <View style={styles.optionsList}>
          {QUALIFICATIONS.map(item => {
            const isSelected = selectedStage === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelectStage(item.id)}
                activeOpacity={0.8}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View style={styles.optionIconCircle}>
                  <Text style={styles.optionIcon}>{item.icon}</Text>
                </View>

                <View style={styles.optionTextCol}>
                  <View style={styles.optionTitleRow}>
                    <Text
                      style={[
                        styles.optionTitle,
                        isSelected && styles.optionTitleSelected,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={[
                        styles.tagPill,
                        isSelected && styles.tagPillSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagPillText,
                          isSelected && styles.tagPillTextSelected,
                        ]}
                      >
                        {item.tag}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                </View>

                <View
                  style={[
                    styles.radioIndicator,
                    isSelected && styles.radioIndicatorSelected,
                  ]}
                >
                  {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Buttons Section */}
        <View style={styles.actionSection}>

          {/* Primary CTA (Electric Indigo #6366F1) */}
          <TouchableOpacity
            onPress={onStartAssessment}
            activeOpacity={0.85}
            style={styles.primaryCta}
          >
            <Text style={styles.primaryCtaText}>
              Start Quick RIASEC Assessment (60s) →
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Skip Button (I know my field) */}
          <TouchableOpacity
            onPress={onSkipToField}
            activeOpacity={0.8}
            style={styles.skipBtn}
          >
            <Text style={styles.skipBtnText}>Skip — I know my field →</Text>
          </TouchableOpacity>
          <Text style={styles.skipHintText}>
            Bypass assessment and directly browse verified roadmaps for your stage.
          </Text>
        </View>

        <View style={styles.footerSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundCanvas,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surfaceWhite,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compassStar: {
    fontSize: 20,
    marginRight: 6,
  },
  brandName: {
    ...Typography.sectionTitle,
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryNavy,
    letterSpacing: 1.5,
  },
  goldDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accentGold,
    marginLeft: 4,
    marginTop: 2,
  },
  authBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Layout.pillRadius,
    backgroundColor: Colors.actionIndigoLight,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  authBtnText: {
    ...Typography.captionBold,
    color: Colors.actionIndigo,
    fontSize: 12,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  questionSection: {
    marginBottom: Spacing.lg,
  },
  stepBadge: {
    backgroundColor: Colors.actionIndigoLight,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Layout.pillRadius,
    alignSelf: 'flex-start',
    marginBottom: Spacing.xs + 2,
  },
  stepBadgeText: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.actionIndigo,
    letterSpacing: 0.8,
  },
  headline: {
    ...Typography.display,
    fontSize: 26,
    lineHeight: 32,
    color: Colors.primaryNavy,
    fontWeight: '800',
    marginBottom: 6,
  },
  subheadline: {
    ...Typography.bodyRegular,
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  optionsList: {
    marginBottom: Spacing.lg,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 14,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    elevation: 1,
    shadowColor: Colors.primaryNavy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  optionCardSelected: {
    borderColor: Colors.actionIndigo,
    backgroundColor: '#F5F7FF',
  },
  optionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm + 2,
  },
  optionIcon: {
    fontSize: 18,
  },
  optionTextCol: {
    flex: 1,
  },
  optionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  optionTitle: {
    ...Typography.cardTitle,
    fontSize: 14,
    color: Colors.primaryNavy,
    flex: 1,
    marginRight: 6,
  },
  optionTitleSelected: {
    color: Colors.actionIndigo,
    fontWeight: '700',
  },
  tagPill: {
    backgroundColor: Colors.backgroundMuted,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  tagPillSelected: {
    backgroundColor: Colors.actionIndigo,
  },
  tagPillText: {
    ...Typography.captionBold,
    fontSize: 9,
    color: Colors.textSecondary,
  },
  tagPillTextSelected: {
    color: Colors.textInverse,
  },
  optionSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  radioIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  radioIndicatorSelected: {
    borderColor: Colors.actionIndigo,
    backgroundColor: Colors.actionIndigo,
  },
  checkIcon: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: '700',
  },
  actionSection: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  primaryCta: {
    backgroundColor: Colors.actionIndigo,
    borderRadius: Layout.inputRadius,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.actionIndigo,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  primaryCtaText: {
    ...Typography.buttonText,
    color: Colors.textInverse,
    fontSize: 15,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    ...Typography.captionBold,
    color: Colors.textLight,
    paddingHorizontal: Spacing.md,
    fontSize: 11,
  },
  skipBtn: {
    backgroundColor: Colors.surfaceWhite,
    borderWidth: 1.5,
    borderColor: Colors.primaryNavy,
    borderRadius: Layout.inputRadius,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  skipBtnText: {
    ...Typography.buttonText,
    color: Colors.primaryNavy,
    fontSize: 15,
    fontWeight: '700',
  },
  skipHintText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 11,
  },
  footerSpacing: {
    height: 40,
  },
});
