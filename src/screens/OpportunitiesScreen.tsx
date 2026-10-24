import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing, Layout } from '../theme/spacing';
import { Header } from '../components/common/Header';
import { Badge } from '../components/common/Badge';
import { OpportunitiesData } from '../data/opportunitiesData';
import { BulletinData } from '../data/bulletinData';

type StreamMode = 'all' | 'karachi' | 'bulletin';

export const OpportunitiesScreen: React.FC = () => {
  const [activeStream, setActiveStream] = useState<StreamMode>('all');

  const filteredOpportunities = OpportunitiesData.filter(opp => {
    if (activeStream === 'karachi') {
      return opp.isKarachi;
    }
    return true;
  });

  const handleOpenUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Header
        title="Opportunities & Bulletin"
        subtitle="Competitions, Hackathons & Campus Circulars"
      />

      {/* Stream Segmented Control */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          onPress={() => setActiveStream('all')}
          style={[styles.segmentBtn, activeStream === 'all' && styles.segmentBtnActive]}
          accessibilityRole="tab"
        >
          <Text style={[styles.segmentText, activeStream === 'all' && styles.segmentTextActive]}>
            All Opportunities
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveStream('karachi')}
          style={[styles.segmentBtn, activeStream === 'karachi' && styles.segmentBtnActive]}
          accessibilityRole="tab"
        >
          <Text style={[styles.segmentText, activeStream === 'karachi' && styles.segmentTextActive]}>
            Karachi Ki Baat 📍
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveStream('bulletin')}
          style={[styles.segmentBtn, activeStream === 'bulletin' && styles.segmentBtnActive]}
          accessibilityRole="tab"
        >
          <Text style={[styles.segmentText, activeStream === 'bulletin' && styles.segmentTextActive]}>
            Campus Bulletin
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stream Banner */}
        {activeStream === 'karachi' && (
          <View style={styles.karachiBanner}>
            <Text style={styles.karachiTitle}>Karachi Ki Baat (کراچی کی بات)</Text>
            <Text style={styles.karachiDesc}>
              A dedicated discovery stream for verified tech hackathons, MUNs, and creative exhibitions physically hosted in Karachi or open virtually to Sindh students.
            </Text>
          </View>
        )}

        {activeStream === 'bulletin' && (
          <View style={styles.bulletinNotice}>
            <View style={styles.bulletinHeader}>
              <Text style={styles.shieldIcon}>🛡️</Text>
              <Text style={styles.bulletinNoticeTitle}>STRICT ZERO-CHAT BULLETIN</Text>
            </View>
            <Text style={styles.bulletinNoticeDesc}>
              Structured academic and campus event cards only. No unmoderated comments, open chats, or direct messaging permitted. Every card links directly to institutional registration portals.
            </Text>
          </View>
        )}

        {/* Content Feeds */}
        {activeStream === 'bulletin' ? (
          // Campus Bulletin View (Screen 19)
          BulletinData.map(bulletin => (
            <View key={bulletin.id} style={styles.bulletinCard}>
              <View style={styles.bulletinCardHeader}>
                <View style={styles.bulletinCampusRow}>
                  <Text style={styles.campusIcon}>🏛️</Text>
                  <Text style={styles.campusName}>{bulletin.hostCampus}</Text>
                </View>
                <Badge label={bulletin.domainTag} />
              </View>

              <Text style={styles.bulletinTitle}>{bulletin.title}</Text>

              <View style={styles.bulletinDetailsGrid}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📅 Event Date:</Text>
                  <Text style={styles.detailVal}>{bulletin.eventDate}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📍 Venue:</Text>
                  <Text style={styles.detailVal}>{bulletin.venueOrFormat}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>⏳ Deadline:</Text>
                  <Text style={[styles.detailVal, styles.deadlineText]}>{bulletin.registrationDeadline}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>📄 Source:</Text>
                  <Text style={styles.detailVal}>{bulletin.sourceAttribution}</Text>
                </View>
              </View>

              <View style={styles.bulletinFooter}>
                <Text style={styles.usefulBadge}>👍 {bulletin.usefulCount} Students Confirmed Useful</Text>
                <TouchableOpacity
                  onPress={() => handleOpenUrl(bulletin.registrationUrl)}
                  style={styles.registerBtn}
                  accessibilityRole="link"
                >
                  <Text style={styles.registerBtnText}>Official Circular ↗</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          // Opportunities Catalogue View (Screen 17 & 18)
          filteredOpportunities.map(opp => (
            <View key={opp.id} style={styles.oppCard}>
              <View style={styles.oppTopRow}>
                <View style={styles.oppCategoryPill}>
                  <Text style={styles.oppCategoryText}>{opp.category}</Text>
                </View>
                <Badge type="verification" verificationStatus={opp.verificationStatus} />
              </View>

              <Text style={styles.oppTitle}>{opp.title}</Text>
              <Text style={styles.oppOrganizer}>Organized by: {opp.organizer}</Text>

              <View style={styles.oppMetaBox}>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>📍 Location:</Text>
                  <Text style={styles.metaValue}>{opp.location} ({opp.format})</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>🎓 Eligibility:</Text>
                  <Text style={styles.metaValue}>{opp.eligibility}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>💵 Cost:</Text>
                  <Text style={styles.metaValue}>{opp.cost}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>⏳ Deadline:</Text>
                  <Text style={[styles.metaValue, styles.deadlineHighlight]}>{opp.deadline}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleOpenUrl(opp.sourceUrl)}
                style={styles.openUrlBtn}
                accessibilityRole="link"
              >
                <Text style={styles.openUrlText}>Apply / Register on Official Site ↗</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

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
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceWhite,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: Spacing.xs + 3,
    alignItems: 'center',
    borderRadius: Layout.inputRadius,
  },
  segmentBtnActive: {
    backgroundColor: Colors.softTeal,
  },
  segmentText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  segmentTextActive: {
    color: Colors.primaryEmerald,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  karachiBanner: {
    backgroundColor: Colors.primaryNavy,
    borderRadius: Layout.cardRadius,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  karachiTitle: {
    ...Typography.cardTitle,
    color: Colors.textInverse,
    marginBottom: 2,
  },
  karachiDesc: {
    ...Typography.caption,
    color: '#CBD5E1',
    lineHeight: 16,
  },
  bulletinNotice: {
    backgroundColor: '#F8FAFC',
    borderRadius: Layout.cardRadius,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#94A3B8',
    marginBottom: Spacing.md,
  },
  bulletinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  shieldIcon: {
    fontSize: 12,
    marginRight: Spacing.xs,
  },
  bulletinNoticeTitle: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.primaryNavy,
    letterSpacing: 0.5,
  },
  bulletinNoticeDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  oppCard: {
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
  oppTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  oppCategoryPill: {
    backgroundColor: Colors.backgroundMuted,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  oppCategoryText: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.primaryNavy,
  },
  oppTitle: {
    ...Typography.cardTitle,
    color: Colors.primaryNavy,
    marginBottom: 2,
  },
  oppOrganizer: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  oppMetaBox: {
    backgroundColor: Colors.backgroundWarm,
    padding: Spacing.sm + 2,
    borderRadius: Layout.inputRadius,
    marginBottom: Spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metaLabel: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.textSecondary,
    width: 80,
  },
  metaValue: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.textPrimary,
    flex: 1,
  },
  deadlineHighlight: {
    color: Colors.statusWarning,
    fontWeight: '700',
  },
  openUrlBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  openUrlText: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  bulletinCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    elevation: 2,
  },
  bulletinCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  bulletinCampusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  campusIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  campusName: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
    fontSize: 12,
  },
  bulletinTitle: {
    ...Typography.cardTitle,
    color: Colors.primaryNavy,
    marginBottom: Spacing.sm,
  },
  bulletinDetailsGrid: {
    backgroundColor: Colors.backgroundWarm,
    padding: Spacing.sm + 2,
    borderRadius: Layout.inputRadius,
    marginBottom: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  detailLabel: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.textSecondary,
    width: 90,
  },
  detailVal: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textPrimary,
    flex: 1,
  },
  deadlineText: {
    color: Colors.statusWarning,
    fontWeight: '700',
  },
  bulletinFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xs,
  },
  usefulBadge: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  registerBtn: {
    paddingVertical: 2,
    paddingHorizontal: Spacing.xs,
  },
  registerBtnText: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  footerSpacing: {
    height: 40,
  },
});
