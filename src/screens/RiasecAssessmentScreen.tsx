import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing, Layout } from '../theme/spacing';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { RiasecQuestions } from '../data/riasecQuestions';
import { calculateRiasecScores } from '../utils/riasecEngine';
import { RiasecScoreResult } from '../types/riasec';

interface RiasecAssessmentScreenProps {
  onBack: () => void;
  onComplete: (result: RiasecScoreResult) => void;
}

export const RiasecAssessmentScreen: React.FC<RiasecAssessmentScreenProps> = ({
  onBack,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const totalQuestions = RiasecQuestions.length;
  const currentQuestion = RiasecQuestions[currentIndex];
  const selectedOptionId = answers[currentQuestion.id];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (!selectedOptionId) {
      Alert.alert(
        'Selection Required',
        'Please select the option that feels most natural to you to continue.'
      );
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all 18 questions! Calculate deterministic scores
      const result = calculateRiasecScores(answers);
      onComplete(result);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="RIASEC Discovery"
        subtitle={`Question ${currentIndex + 1} of ${totalQuestions}`}
        onBack={handlePrevious}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Scenario Header */}
        <View style={styles.contextBadge}>
          <Text style={styles.contextBadgeText}>
            SCENARIO {currentQuestion.id} • {currentQuestion.scenario.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.questionContext}>
          {currentQuestion.context}
        </Text>

        <Text style={styles.instructionPrompt}>
          Which path would you naturally lean toward?
        </Text>

        {/* Answer Options */}
        <View style={styles.optionsList}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;
            const letterLabel = String.fromCharCode(65 + index); // A, B, C, D

            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSelectOption(option.id)}
                activeOpacity={0.7}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View
                  style={[
                    styles.radioIndicator,
                    isSelected && styles.radioIndicatorSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.radioLetter,
                      isSelected && styles.radioLetterSelected,
                    ]}
                  >
                    {letterLabel}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {option.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <SecondaryButton
            title="← Back"
            onPress={handlePrevious}
            style={styles.backBtn}
          />
          <PrimaryButton
            title={currentIndex === totalQuestions - 1 ? 'Finish & Compute Results ✓' : 'Next Scenario →'}
            onPress={handleNext}
            style={styles.nextBtn}
          />
        </View>

        {/* Transparent Notice */}
        <View style={styles.trustFooter}>
          <Text style={styles.trustFooterText}>
            🔒 Deterministic Scoring: Your responses map strictly to John Holland's validated dimensions. No artificial guesswork.
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
    backgroundColor: Colors.backgroundWarm,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: Colors.border,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primaryEmerald,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  contextBadge: {
    backgroundColor: Colors.softTeal,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Layout.pillRadius,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  contextBadgeText: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.primaryEmerald,
    letterSpacing: 0.5,
  },
  questionContext: {
    ...Typography.pageTitle,
    fontSize: 19,
    lineHeight: 26,
    color: Colors.primaryNavy,
    marginBottom: Spacing.sm,
  },
  instructionPrompt: {
    ...Typography.bodySecondary,
    marginBottom: Spacing.lg,
  },
  optionsList: {
    marginBottom: Spacing.xl,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    minHeight: Layout.minTouchTarget + 10,
  },
  optionCardSelected: {
    borderColor: Colors.primaryEmerald,
    backgroundColor: '#F0FDF4',
  },
  radioIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.backgroundMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    marginTop: 2,
  },
  radioIndicatorSelected: {
    backgroundColor: Colors.primaryEmerald,
  },
  radioLetter: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  radioLetterSelected: {
    color: Colors.textInverse,
  },
  optionText: {
    ...Typography.bodyRegular,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },
  optionTextSelected: {
    color: Colors.primaryNavy,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  backBtn: {
    flex: 0.35,
    marginRight: Spacing.sm,
  },
  nextBtn: {
    flex: 0.65,
  },
  trustFooter: {
    backgroundColor: Colors.surfaceWhite,
    padding: Spacing.md,
    borderRadius: Layout.cardRadius,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  trustFooterText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  footerSpacing: {
    height: 40,
  },
});
