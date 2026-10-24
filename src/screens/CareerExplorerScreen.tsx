import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing, Layout } from '../theme/spacing';
import { Header } from '../components/common/Header';
import { Badge } from '../components/common/Badge';
import { CareersData } from '../data/careersData';
import { CareerProfile } from '../types';
import { JAWAN_PAKISTAN_COURSES, JawanCourse } from '../data/jawanPakistanCourses';

interface CareerExplorerScreenProps {
  onBack?: () => void;
  onSelectCareer: (careerId: string) => void;
  initialFilter?: string;
}

export const CareerExplorerScreen: React.FC<CareerExplorerScreenProps> = ({
  onBack,
  onSelectCareer,
  initialFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter || 'All');

  const CATEGORIES = ['All', 'Computer Science', 'Engineering', 'Finance', 'Design'];

  const filteredCareers = CareersData.filter(career => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.recommendedSubjects.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || career.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const openUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Cannot Open Link', `Please visit: ${url}`);
      }
    } catch {
      Alert.alert('Error', 'Could not open the link.');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Career Explorer"
        subtitle="Verified Pakistani Pathways"
        onBack={onBack}
      />

      {/* Search Input Bar */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search careers, subjects, or keywords..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter Chips */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {CATEGORIES.map(category => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                ]}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Career Cards List */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── JAWAN PAKISTAN FREE COURSES BANNER (TOP) ── */}
        <View style={styles.jawanCard}>
          {/* Institute Header */}
          <View style={styles.jawanHeader}>
            <View style={styles.jawanLogoCircle}>
              <Text style={styles.jawanLogoEmoji}>🎓</Text>
            </View>
            <View style={styles.jawanHeaderText}>
              <Text style={styles.jawanInstituteName}>Jawan Pakistan</Text>
              <Text style={styles.jawanTagline}>Government Free Skill Courses</Text>
            </View>
            <View style={styles.freeBadge}>
              <Text style={styles.freeBadgeText}>FREE</Text>
            </View>
          </View>

          <Text style={styles.jawanDesc}>
            Matric ke baad free time mein yeh government-certified courses karo. Ghar se online ya centre par — bilkul free!
          </Text>

          {/* Visit Website Button */}
          <TouchableOpacity
            onPress={() => openUrl('https://jawanpakistan.com/')}
            activeOpacity={0.8}
            style={styles.jawanWebBtn}
          >
            <Text style={styles.jawanWebBtnText}>🌐  Visit jawanpakistan.com  →</Text>
          </TouchableOpacity>

          {/* Course Rows */}
          <Text style={styles.jawanCoursesLabel}>Available Free Courses:</Text>
          {JAWAN_PAKISTAN_COURSES.map((course: JawanCourse) => (
            <TouchableOpacity
              key={course.id}
              onPress={() => openUrl(course.link)}
              activeOpacity={0.85}
              style={styles.jawanCourseRow}
            >
              <View style={styles.jawanCourseIconBox}>
                <Text style={styles.jawanCourseIcon}>{course.categoryIcon}</Text>
              </View>
              <View style={styles.jawanCourseInfo}>
                <Text style={styles.jawanCourseTitle}>{course.title}</Text>
                <Text style={styles.jawanCourseDesc} numberOfLines={2}>
                  {course.description}
                </Text>
                <View style={styles.jawanCourseMeta}>
                  <View style={styles.jawanMetaPill}>
                    <Text style={styles.jawanMetaText}>⏱ {course.duration}</Text>
                  </View>
                  <View style={[styles.jawanMetaPill, styles.jawanMetaPillFormat]}>
                    <Text style={styles.jawanMetaText}>{course.format}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.jawanArrow}>›</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.jawanFooterNote}>
            * Free for all Pakistani youth. Enroll at jawanpakistan.com
          </Text>
        </View>

        {/* Results Meta */}
        <View style={styles.resultsMeta}>
          <Text style={styles.resultsCount}>
            Showing {filteredCareers.length} of {CareersData.length} Careers
          </Text>

          <Text style={styles.disclaimerText}>HEC & PEC Aligned</Text>
        </View>

        {filteredCareers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No Matching Careers Found</Text>
            <Text style={styles.emptyDesc}>
              Try searching with broader terms like "Software", "Maths", or "Engineering".
            </Text>
          </View>
        ) : (
          filteredCareers.map(career => (
            <TouchableOpacity
              key={career.id}
              onPress={() => onSelectCareer(career.id)}
              activeOpacity={0.8}
              style={styles.careerCard}
              accessibilityRole="button"
            >
              <View style={styles.cardTopRow}>
                <View style={styles.titleCol}>
                  <Text style={styles.careerTitle}>{career.title}</Text>
                  <Text style={styles.careerCategory}>{career.category}</Text>
                </View>
                <Badge type="riasec" dimension={career.riasecDimensions[0]} />
              </View>

              <Text style={styles.summaryText}>{career.shortSummary}</Text>

              {/* Subject Badges */}
              <View style={styles.subjectsRow}>
                <Text style={styles.subjectsLabel}>Subjects:</Text>
                {career.recommendedSubjects.slice(0, 2).map((sub, idx) => (
                  <View key={idx} style={styles.subjectPill}>
                    <Text style={styles.subjectPillText}>{sub.split(' ')[0]}</Text>
                  </View>
                ))}
              </View>

              {/* Verified Routes Footer */}
              <View style={styles.cardFooter}>
                <Text style={styles.routeCountText}>
                  ✓ {career.routes.length} Education Routes (Matric / Inter / DAE)
                </Text>
                <Text style={styles.arrowText}>Explore →</Text>
              </View>
            </TouchableOpacity>
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
  searchBarWrapper: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.surfaceWhite,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMuted,
    borderRadius: Layout.inputRadius,
    paddingHorizontal: Spacing.md,
    minHeight: Layout.minTouchTarget,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  searchInput: {
    flex: 1,
    ...Typography.bodyRegular,
    color: Colors.textPrimary,
  },
  clearIcon: {
    fontSize: 14,
    color: Colors.textSecondary,
    padding: Spacing.xs,
  },
  filterSection: {
    backgroundColor: Colors.surfaceWhite,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterScroll: {
    paddingHorizontal: Spacing.lg,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Layout.pillRadius,
    backgroundColor: Colors.backgroundMuted,
    marginRight: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipSelected: {
    backgroundColor: Colors.primaryEmerald,
    borderColor: Colors.primaryEmerald,
  },
  filterChipText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  filterChipTextSelected: {
    color: Colors.textInverse,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  resultsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  resultsCount: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  disclaimerText: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.primaryEmerald,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.xxl,
    alignItems: 'center',
    marginTop: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    ...Typography.sectionTitle,
    color: Colors.primaryNavy,
    marginBottom: Spacing.xs,
  },
  emptyDesc: {
    ...Typography.bodySecondary,
    textAlign: 'center',
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
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  titleCol: {
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
  summaryText: {
    ...Typography.bodySecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  subjectsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  subjectsLabel: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  subjectPill: {
    backgroundColor: Colors.backgroundMuted,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
    marginRight: Spacing.xs,
  },
  subjectPillText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.primaryNavy,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundMuted,
    paddingTop: Spacing.sm,
  },
  routeCountText: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.statusSuccess,
  },
  arrowText: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
  },
  footerSpacing: {
    height: 40,
  },

  /* ── Jawan Pakistan Section Styles ── */
  jawanCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#10B981',
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    elevation: 2,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  jawanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  jawanLogoCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  jawanLogoEmoji: {
    fontSize: 22,
  },
  jawanHeaderText: {
    flex: 1,
  },
  jawanInstituteName: {
    ...Typography.cardTitle,
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primaryNavy,
    letterSpacing: 0.3,
  },
  jawanTagline: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  freeBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Layout.pillRadius,
  },
  freeBadgeText: {
    ...Typography.captionBold,
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 1,
  },
  jawanDesc: {
    ...Typography.bodyRegular,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: Spacing.sm + 2,
  },
  jawanWebBtn: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
    borderColor: '#10B981',
    borderRadius: Layout.inputRadius,
    paddingVertical: 11,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  jawanWebBtnText: {
    ...Typography.buttonText,
    color: '#059669',
    fontSize: 13,
    fontWeight: '700',
  },
  jawanCoursesLabel: {
    ...Typography.captionBold,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 0.6,
    marginBottom: Spacing.xs + 2,
    textTransform: 'uppercase',
  },
  jawanCourseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCanvas,
    borderRadius: 12,
    padding: Spacing.sm + 2,
    marginBottom: Spacing.xs + 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  jawanCourseIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.actionIndigoLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  jawanCourseIcon: {
    fontSize: 18,
  },
  jawanCourseInfo: {
    flex: 1,
  },
  jawanCourseTitle: {
    ...Typography.cardTitle,
    fontSize: 13,
    color: Colors.primaryNavy,
    fontWeight: '700',
    marginBottom: 2,
  },
  jawanCourseDesc: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
    marginBottom: 5,
  },
  jawanCourseMeta: {
    flexDirection: 'row',
    gap: 5,
  },
  jawanMetaPill: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  jawanMetaPillFormat: {
    backgroundColor: Colors.actionIndigoLight,
  },
  jawanMetaText: {
    ...Typography.captionBold,
    fontSize: 9,
    color: Colors.actionIndigo,
  },
  jawanArrow: {
    fontSize: 20,
    color: Colors.textLight,
    marginLeft: Spacing.xs,
  },
  jawanFooterNote: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.sm,
    fontStyle: 'italic',
  },
});

