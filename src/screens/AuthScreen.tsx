import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing, Layout } from '../theme/spacing';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { EducationStage } from '../types';

interface AuthScreenProps {
  onBack: () => void;
  onAuthSuccess: (user: { name: string; email: string; stage: EducationStage }) => void;
  onContinueAsGuest: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onBack,
  onAuthSuccess,
  onContinueAsGuest,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedStage, setSelectedStage] = useState<EducationStage>('fsc_pre_eng');
  const [loading, setLoading] = useState(false);

  const STAGES: { id: EducationStage; label: string }[] = [
    { id: 'matric_science', label: 'Matric' },
    { id: 'fsc_pre_eng', label: 'F.Sc Pre-Eng' },
    { id: 'fsc_pre_med', label: 'F.Sc Pre-Med' },
    { id: 'ics', label: 'ICS' },
    { id: 'icom', label: 'I.Com' },
    { id: 'dae', label: 'DAE' },
    { id: 'a_level', label: 'A-Levels' },
  ];

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter your email and password.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      Alert.alert('Missing Name', 'Please enter your full name.');
      return;
    }

    setLoading(true);

    // Simulate clean auth response
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({
        name: name.trim() || (email.split('@')[0] || 'Student'),
        email: email.trim(),
        stage: selectedStage,
      });
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Header
        title={mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        onBack={onBack}
        rightAction={{ label: 'Guest', onPress: onContinueAsGuest }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Modern Segmented Tab Toggle */}
        <View style={styles.segmentWrapper}>
          <TouchableOpacity
            style={[styles.segmentBtn, mode === 'signin' && styles.segmentBtnActive]}
            onPress={() => setMode('signin')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, mode === 'signin' && styles.segmentTextActive]}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, mode === 'signup' && styles.segmentBtnActive]}
            onPress={() => setMode('signup')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, mode === 'signup' && styles.segmentTextActive]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Minimal Hero Subtitle */}
        <Text style={styles.authTagline}>
          {mode === 'signin'
            ? 'Sign in to access your saved roadmaps and progress.'
            : 'Join Acadiv to discover, plan, and verify your path.'}
        </Text>

        {/* Form Inputs */}
        <View style={styles.form}>
          {mode === 'signup' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Ali Ahmed"
                placeholderTextColor={Colors.textLight}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor={Colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              {mode === 'signin' && (
                <TouchableOpacity onPress={() => Alert.alert('Reset Password', 'Password recovery instructions sent to your email.')}>
                  <Text style={styles.forgotText}>Forgot?</Text>
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {mode === 'signup' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Current Education Stage</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stageScroll}>
                {STAGES.map(s => {
                  const isSelected = selectedStage === s.id;
                  return (
                    <TouchableOpacity
                      key={s.id}
                      onPress={() => setSelectedStage(s.id)}
                      style={[styles.stageChip, isSelected && styles.stageChipSelected]}
                    >
                      <Text style={[styles.stageChipText, isSelected && styles.stageChipTextSelected]}>
                        {s.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* Primary Action Button */}
          <PrimaryButton
            title={mode === 'signin' ? 'Sign In →' : 'Create Free Account →'}
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitBtn}
          />

          {/* Quick Guest Continue Option */}
          <TouchableOpacity
            onPress={onContinueAsGuest}
            style={styles.guestLink}
            activeOpacity={0.7}
          >
            <Text style={styles.guestLinkText}>Continue as Guest (Explore First) →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerSpacing} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  segmentWrapper: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: Layout.inputRadius,
    padding: 3,
    marginBottom: Spacing.lg,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Layout.inputRadius - 2,
  },
  segmentBtnActive: {
    backgroundColor: Colors.surfaceWhite,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  segmentText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  segmentTextActive: {
    color: Colors.primaryNavy,
  },
  authTagline: {
    ...Typography.bodyRegular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  form: {
    marginBottom: Spacing.xl,
  },
  inputGroup: {
    marginBottom: Spacing.md + 2,
  },
  inputLabel: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
    fontSize: 12,
    marginBottom: 6,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotText: {
    ...Typography.captionBold,
    color: Colors.actionIndigo,
    fontSize: 11,
  },
  input: {
    backgroundColor: Colors.surfaceWhite,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: Layout.inputRadius,
    paddingHorizontal: Spacing.md,
    height: 48,
    ...Typography.bodyRegular,
    color: Colors.textPrimary,
  },
  stageScroll: {
    flexDirection: 'row',
    marginTop: 4,
  },
  stageChip: {
    backgroundColor: Colors.surfaceWhite,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Layout.pillRadius,
    marginRight: 8,
  },
  stageChipSelected: {
    backgroundColor: Colors.actionIndigo,
    borderColor: Colors.actionIndigo,
  },
  stageChipText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  stageChipTextSelected: {
    color: Colors.textInverse,
  },
  submitBtn: {
    marginTop: Spacing.sm,
    height: 50,
  },
  guestLink: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.xs,
  },
  guestLinkText: {
    ...Typography.captionBold,
    color: Colors.actionIndigo,
    fontSize: 13,
  },
  footerSpacing: {
    height: 40,
  },
});
