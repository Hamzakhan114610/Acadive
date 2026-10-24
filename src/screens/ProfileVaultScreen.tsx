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
import { Badge } from '../components/common/Badge';

interface ProfileVaultScreenProps {
  onResetExploration: () => void;
  onOpenRoadmap: () => void;
}

export const ProfileVaultScreen: React.FC<ProfileVaultScreenProps> = ({
  onResetExploration,
  onOpenRoadmap,
}) => {
  const [qrVisible, setQrVisible] = useState(false);

  const SKILL_GAPS = [
    { name: 'Data Structures & Algorithms', status: 'developing', signal: 'Self-assessed: Solved 12 Array problems on LeetCode' },
    { name: 'TypeScript & React Native', status: 'developing', signal: 'Building Acadiv mobile interface' },
    { name: 'Calculus & Linear Algebra', status: 'meets_requirement', signal: 'Board of Intermediate Marksheet (82%)' },
    { name: 'Industry Internship Experience', status: 'missing_evidence', signal: 'Required before final year placement' },
  ];

  const ARTIFACTS = [
    { title: 'Intermediate Marksheet (Part-1)', type: 'Official Document', category: 'Education', verified: true },
    { title: 'Algorithmic Problem Solutions Repo', type: 'GitHub Link', category: 'Project', verified: false },
    { title: 'Karachi Youth Hackathon Submission', type: 'Design Deck', category: 'Extracurricular', verified: true },
  ];

  const handleClearLocalCache = () => {
    Alert.alert(
      'Clear Local Offline Cache',
      'This will remove temporarily saved offline roadmaps and cached career records. Your profile settings will remain safe.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear Cache', style: 'destructive', onPress: () => Alert.alert('Success', 'Offline cache cleared successfully.') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Student Profile & Vault"
        subtitle="Competence, Evidence & Portfolio"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Student Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarPill}>
              <Text style={styles.avatarText}>ST</Text>
            </View>
            <View style={styles.profileMeta}>
              <Text style={styles.profileName}>Pakistani Student</Text>
              <Text style={styles.profileStage}>F.Sc. Pre-Engineering • Karachi Board</Text>
              <Text style={styles.profileTarget}>Target: Software & AI Engineer</Text>
            </View>
          </View>
        </View>

        {/* Skill-Gap Analysis Card (Screen 13) */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Skill-Gap Analysis</Text>
            <Text style={styles.sectionBadge}>Honest Signal Tracking</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Comparing your current verifiable evidence against documented pathway requirements.
          </Text>

          {SKILL_GAPS.map((gap, idx) => (
            <View key={idx} style={styles.gapRow}>
              <View style={styles.gapTopRow}>
                <Text style={styles.gapName}>{gap.name}</Text>
                <View
                  style={[
                    styles.gapStatusPill,
                    gap.status === 'meets_requirement'
                      ? styles.statusPillGreen
                      : gap.status === 'developing'
                      ? styles.statusPillAmber
                      : styles.statusPillMuted,
                  ]}
                >
                  <Text
                    style={[
                      styles.gapStatusText,
                      gap.status === 'meets_requirement'
                        ? styles.statusTextGreen
                        : gap.status === 'developing'
                        ? styles.statusTextAmber
                        : styles.statusTextMuted,
                    ]}
                  >
                    {gap.status.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.gapSignal}>Signal: {gap.signal}</Text>
            </View>
          ))}
        </View>

        {/* Artifact Vault (Screen 22) */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Private Artifact Vault</Text>
            <Text style={styles.sectionBadge}>3 Saved Records</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Your private repository of project files, code links, and official certificates.
          </Text>

          {ARTIFACTS.map((art, idx) => (
            <View key={idx} style={styles.artifactRow}>
              <View style={styles.artifactIconBox}>
                <Text style={styles.artifactIcon}>📁</Text>
              </View>
              <View style={styles.artifactInfo}>
                <Text style={styles.artifactTitle}>{art.title}</Text>
                <Text style={styles.artifactMeta}>{art.type} • {art.category}</Text>
              </View>
              <Badge
                type="verification"
                verificationStatus={art.verified ? 'verified' : 'requires_confirmation'}
              />
            </View>
          ))}
        </View>

        {/* Public Portfolio & QR Profile (Screen 23) */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Public Portfolio & QR Profile</Text>
          <Text style={styles.sectionSubtitle}>
            Share only explicitly approved items with university admissions or internship recruiters.
          </Text>

          <TouchableOpacity
            onPress={() => setQrVisible(!qrVisible)}
            style={styles.qrToggleBtn}
            accessibilityRole="button"
          >
            <Text style={styles.qrToggleText}>
              {qrVisible ? 'Hide Public QR Code ▲' : 'Display Scannable QR Code ▼'}
            </Text>
          </TouchableOpacity>

          {qrVisible && (
            <View style={styles.qrContainer}>
              <View style={styles.qrMock}>
                <Text style={styles.qrMockText}>[ ACADIV VERIFIED PROFILE QR ]</Text>
                <Text style={styles.qrMockSub}>ID: acadiv-student-pk-2026</Text>
              </View>
              <Text style={styles.qrExplanation}>
                Scans resolve directly to your verified, student-owned portfolio without revealing private notes or contact credentials.
              </Text>
            </View>
          )}
        </View>

        {/* ATS-Friendly CV Builder (Screen 24) */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Guided ATS-Friendly CV</Text>
          <Text style={styles.sectionSubtitle}>
            Exports a clean, selectable-text PDF containing only source-backed qualifications.
          </Text>
          <SecondaryButton
            title="Preview ATS-Friendly CV Layout"
            onPress={() => Alert.alert('CV Builder', 'CV generator preview prepared with verified education nodes and skills.')}
          />
        </View>

        {/* Settings & Privacy (Screen 25) */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Settings & Privacy Controls</Text>
          <TouchableOpacity
            onPress={handleClearLocalCache}
            style={styles.settingRow}
          >
            <Text style={styles.settingLabel}>Clear Local Offline Storage</Text>
            <Text style={styles.settingAction}>Clear Cache</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onResetExploration}
            style={styles.settingRow}
          >
            <Text style={[styles.settingLabel, { color: Colors.statusError }]}>Reset Assessment & Discovery</Text>
            <Text style={[styles.settingAction, { color: Colors.statusError }]}>Reset</Text>
          </TouchableOpacity>
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
  profileCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPill: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryEmerald,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    ...Typography.sectionTitle,
    color: Colors.textInverse,
    fontWeight: '700',
  },
  profileMeta: {
    flex: 1,
  },
  profileName: {
    ...Typography.cardTitle,
    color: Colors.primaryNavy,
    fontSize: 17,
    marginBottom: 2,
  },
  profileStage: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  profileTarget: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  cardSection: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  sectionTitle: {
    ...Typography.sectionTitle,
    color: Colors.primaryNavy,
  },
  sectionBadge: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.primaryEmerald,
  },
  sectionSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 18,
  },
  gapRow: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundMuted,
    paddingVertical: Spacing.sm,
  },
  gapTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  gapName: {
    ...Typography.bodyRegular,
    fontWeight: '600',
    color: Colors.primaryNavy,
    flex: 1,
    marginRight: Spacing.sm,
  },
  gapStatusPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  statusPillGreen: {
    backgroundColor: Colors.softTeal,
  },
  statusPillAmber: {
    backgroundColor: '#FEF3C7',
  },
  statusPillMuted: {
    backgroundColor: Colors.backgroundMuted,
  },
  gapStatusText: {
    ...Typography.captionBold,
    fontSize: 9,
  },
  statusTextGreen: {
    color: Colors.statusSuccess,
  },
  statusTextAmber: {
    color: Colors.statusWarning,
  },
  statusTextMuted: {
    color: Colors.textSecondary,
  },
  gapSignal: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  artifactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundMuted,
  },
  artifactIconBox: {
    width: 36,
    height: 36,
    borderRadius: Layout.inputRadius,
    backgroundColor: Colors.backgroundMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  artifactIcon: {
    fontSize: 16,
  },
  artifactInfo: {
    flex: 1,
  },
  artifactTitle: {
    ...Typography.bodyRegular,
    fontWeight: '600',
    color: Colors.primaryNavy,
    fontSize: 13,
  },
  artifactMeta: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  qrToggleBtn: {
    backgroundColor: Colors.backgroundMuted,
    borderRadius: Layout.inputRadius,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  qrToggleText: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
  },
  qrContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  qrMock: {
    width: 200,
    height: 120,
    borderWidth: 2,
    borderColor: Colors.primaryNavy,
    borderStyle: 'dashed',
    borderRadius: Layout.cardRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundWarm,
    marginBottom: Spacing.sm,
  },
  qrMockText: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
    fontSize: 11,
  },
  qrMockSub: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  qrExplanation: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundMuted,
    minHeight: Layout.minTouchTarget,
  },
  settingLabel: {
    ...Typography.bodyRegular,
    color: Colors.textPrimary,
  },
  settingAction: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  footerSpacing: {
    height: 40,
  },
});
