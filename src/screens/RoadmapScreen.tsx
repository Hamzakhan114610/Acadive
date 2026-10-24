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
import { Badge } from '../components/common/Badge';
import { RoadmapNode } from '../types';

interface RoadmapScreenProps {
  onBack?: () => void;
  targetCareerTitle?: string;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({
  onBack,
  targetCareerTitle = 'Software & AI Engineer',
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-2');

  const INITIAL_NODES: RoadmapNode[] = [
    {
      id: 'node-1',
      yearIndex: 1,
      title: 'Intermediate Foundation (F.Sc / DAE)',
      type: 'education',
      status: 'completed',
      description: 'Complete Higher Secondary Science, ICS, or 3-year DAE technical coursework with strong focus on Advanced Algebra & Physics.',
      estimatedMonths: 24,
      evidenceRequired: 'BISE / Board of Technical Education Official Marksheet',
      userNotes: 'Scored 82% in Part-1 Mathematics. Preparing for Physics board exam.',
    },
    {
      id: 'node-2',
      yearIndex: 2,
      title: 'Programming Core & Algorithmic Thinking',
      type: 'skill',
      status: 'in_progress',
      description: 'Master Object-Oriented Programming (TypeScript/Python) and Data Structures (Arrays, Linked Lists, Trees, Hashmaps).',
      prerequisites: ['Basic High School Algebra', 'Logical Flowcharts'],
      estimatedMonths: 6,
      evidenceRequired: 'GitHub repository with 15 verified algorithmic problem solutions',
      userNotes: 'Currently practicing two-pointer arrays and basic recursion.',
    },
    {
      id: 'node-3',
      yearIndex: 2,
      title: 'First Verified Hackathon Project',
      type: 'project',
      status: 'upcoming',
      description: 'Participate in a recognized local or virtual hackathon (e.g. Procom or NED Hackathon) and submit a working project demo.',
      prerequisites: ['Git Version Control', 'Basic REST API consumption'],
      estimatedMonths: 3,
      evidenceRequired: 'Working live demo link and event certificate',
    },
    {
      id: 'node-4',
      yearIndex: 3,
      title: 'HEC University Entrance & Core CS Curriculum',
      type: 'education',
      status: 'upcoming',
      description: 'Enter an NCEAC-accredited Computer Science program (FAST, NUST, NED, ITU) and complete Operating Systems & Database Design.',
      prerequisites: ['Intermediate Equivalence (min 50%)', 'University Entry Test Score'],
      estimatedMonths: 24,
      evidenceRequired: 'Semester Grade Point Average (CGPA) Transcript',
    },
    {
      id: 'node-5',
      yearIndex: 4,
      title: 'Software Industry Summer Internship',
      type: 'checkpoint',
      status: 'upcoming',
      description: 'Complete 8-10 weeks of supervised technical internship in a recognized Pakistani software house or remote company.',
      prerequisites: ['Full-stack project in portfolio', 'Passing technical coding test'],
      estimatedMonths: 3,
      evidenceRequired: 'Formal completion letter and performance evaluation',
    },
    {
      id: 'node-6',
      yearIndex: 5,
      title: 'Final Year Capstone & Junior Engineer Placement',
      type: 'decision',
      status: 'upcoming',
      description: 'Design and deploy an enterprise-grade AI or cloud system for final university evaluation and secure graduate employment.',
      prerequisites: ['All degree core credits completed', 'Industry mentor review'],
      estimatedMonths: 12,
      evidenceRequired: 'Published capstone thesis and production code repository',
    },
  ];

  const selectedNode = INITIAL_NODES.find(n => n.id === selectedNodeId) || INITIAL_NODES[1];

  const getNodeTypeBadge = (type: RoadmapNode['type']) => {
    switch (type) {
      case 'education': return 'EDUCATION';
      case 'skill': return 'CORE SKILL';
      case 'project': return 'PROJECT MILESTONE';
      case 'checkpoint': return 'INDUSTRY CHECKPOINT';
      case 'decision': return 'CAREER LAUNCH';
    }
  };

  const getNodeStatusColor = (status: RoadmapNode['status']) => {
    switch (status) {
      case 'completed': return Colors.statusSuccess;
      case 'in_progress': return Colors.primaryEmerald;
      case 'upcoming': return '#94A3B8';
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Interactive Roadmap"
        subtitle={targetCareerTitle}
        onBack={onBack}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Pathway Header Banner */}
        <View style={styles.bannerCard}>
          <Text style={styles.bannerSubtitle}>5-YEAR PLANNING HORIZON</Text>
          <Text style={styles.bannerTitle}>{targetCareerTitle}</Text>
          <Text style={styles.bannerDesc}>
            Step-by-step milestones spanning intermediate education, skill bridges, verified projects, and university placement.
          </Text>
        </View>

        {/* Selected Node Inspection Drawer */}
        <View style={styles.inspectionCard}>
          <View style={styles.inspectionTopRow}>
            <Text style={styles.inspectionBadge}>
              YEAR {selectedNode.yearIndex} • {getNodeTypeBadge(selectedNode.type)}
            </Text>
            <View style={[styles.statusPill, { backgroundColor: getNodeStatusColor(selectedNode.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getNodeStatusColor(selectedNode.status) }]}>
                {selectedNode.status.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.inspectTitle}>{selectedNode.title}</Text>
          <Text style={styles.inspectDesc}>{selectedNode.description}</Text>

          {selectedNode.prerequisites && (
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Prerequisites:</Text>
              {selectedNode.prerequisites.map((pre, i) => (
                <Text key={i} style={styles.metaValue}>• {pre}</Text>
              ))}
            </View>
          )}

          {selectedNode.evidenceRequired && (
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Evidence Required for Verification:</Text>
              <Text style={styles.metaValueHighlight}>📄 {selectedNode.evidenceRequired}</Text>
            </View>
          )}

          {selectedNode.userNotes && (
            <View style={styles.notesBlock}>
              <Text style={styles.notesLabel}>Student Personal Log:</Text>
              <Text style={styles.notesValue}>"{selectedNode.userNotes}"</Text>
            </View>
          )}
        </View>

        {/* Vertical Timeline */}
        <Text style={styles.timelineHeading}>Tap Any Milestone to Inspect</Text>

        <View style={styles.timelineList}>
          {INITIAL_NODES.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            const statusColor = getNodeStatusColor(node.status);
            const isCompleted = node.status === 'completed';
            const isInProgress = node.status === 'in_progress';

            return (
              <TouchableOpacity
                key={node.id}
                onPress={() => setSelectedNodeId(node.id)}
                activeOpacity={0.8}
                style={[
                  styles.timelineCard,
                  isSelected && styles.timelineCardSelected,
                ]}
                accessibilityRole="button"
              >
                <View style={styles.timelineLeftTrack}>
                  <View
                    style={[
                      styles.dot,
                      { borderColor: statusColor },
                      (isCompleted || isInProgress) && { backgroundColor: statusColor },
                    ]}
                  >
                    {isCompleted ? (
                      <Text style={styles.dotCheck}>✓</Text>
                    ) : (
                      <Text style={styles.dotIndex}>{node.yearIndex}</Text>
                    )}
                  </View>
                  {index < INITIAL_NODES.length - 1 && <View style={styles.line} />}
                </View>

                <View style={styles.timelineBody}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.yearTag}>Year {node.yearIndex}</Text>
                    <Text style={[styles.typeTag, { color: statusColor }]}>
                      {getNodeTypeBadge(node.type)}
                    </Text>
                  </View>
                  <Text style={[styles.nodeTitle, isSelected && styles.nodeTitleSelected]}>
                    {node.title}
                  </Text>
                  <Text style={styles.nodeShortDesc} numberOfLines={2}>
                    {node.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
  bannerCard: {
    backgroundColor: Colors.primaryNavy,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  bannerSubtitle: {
    ...Typography.captionBold,
    fontSize: 10,
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  bannerTitle: {
    ...Typography.pageTitle,
    color: Colors.textInverse,
    marginBottom: Spacing.xs,
  },
  bannerDesc: {
    ...Typography.bodySecondary,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  inspectionCard: {
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.lg,
    borderWidth: 1.5,
    borderColor: Colors.primaryEmerald,
    marginBottom: Spacing.lg,
    elevation: 3,
    shadowColor: Colors.primaryNavy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  inspectionTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  inspectionBadge: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.primaryEmerald,
    letterSpacing: 0.5,
  },
  statusPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  statusText: {
    ...Typography.captionBold,
    fontSize: 10,
  },
  inspectTitle: {
    ...Typography.sectionTitle,
    color: Colors.primaryNavy,
    marginBottom: Spacing.xs,
  },
  inspectDesc: {
    ...Typography.bodyRegular,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  metaBlock: {
    marginBottom: Spacing.sm,
  },
  metaLabel: {
    ...Typography.captionBold,
    color: Colors.primaryNavy,
    fontSize: 11,
    marginBottom: 2,
  },
  metaValue: {
    ...Typography.caption,
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  metaValueHighlight: {
    ...Typography.captionBold,
    color: Colors.primaryEmerald,
    fontSize: 12,
  },
  notesBlock: {
    backgroundColor: Colors.backgroundMuted,
    padding: Spacing.sm + 2,
    borderRadius: Layout.inputRadius,
    marginTop: Spacing.xs,
  },
  notesLabel: {
    ...Typography.captionBold,
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  notesValue: {
    ...Typography.caption,
    fontStyle: 'italic',
    color: Colors.textPrimary,
  },
  timelineHeading: {
    ...Typography.sectionTitle,
    fontSize: 16,
    color: Colors.primaryNavy,
    marginBottom: Spacing.md,
  },
  timelineList: {
    marginBottom: Spacing.xl,
  },
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceWhite,
    borderRadius: Layout.cardRadius,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  timelineCardSelected: {
    borderColor: Colors.primaryNavy,
    backgroundColor: '#FAFDFB',
  },
  timelineLeftTrack: {
    width: 32,
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceWhite,
  },
  dotCheck: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: '700',
  },
  dotIndex: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
  timelineBody: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  yearTag: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  typeTag: {
    ...Typography.captionBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  nodeTitle: {
    ...Typography.cardTitle,
    color: Colors.primaryNavy,
    fontSize: 15,
    marginBottom: 2,
  },
  nodeTitleSelected: {
    color: Colors.primaryEmerald,
  },
  nodeShortDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  footerSpacing: {
    height: 40,
  },
});
