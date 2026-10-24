import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing, Layout } from '../../theme/spacing';

export type TabKey = 'home' | 'explore' | 'roadmap' | 'opportunities' | 'profile';

interface BottomNavBarProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

interface TabItem {
  key: TabKey;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'explore', label: 'Explore', icon: '🧭' },
  { key: 'roadmap', label: 'Roadmap', icon: '🗺️' },
  { key: 'opportunities', label: 'Opportunities', icon: '🎯' },
  { key: 'profile', label: 'Profile', icon: '👤' },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = currentTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onSelectTab(tab.key)}
            style={styles.tabButton}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${tab.label} tab`}
          >
            <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
              <Text style={[styles.icon, isActive && styles.activeIcon]}>
                {tab.icon}
              </Text>
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceWhite,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.xs + 2,
    paddingBottom: Spacing.sm,
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: Colors.primaryNavy,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
    minHeight: Layout.minTouchTarget,
    paddingHorizontal: Spacing.xs,
  },
  iconWrapper: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.pillRadius,
  },
  activeIconWrapper: {
    backgroundColor: Colors.actionIndigoLight,
  },
  icon: {
    fontSize: 20,
    color: Colors.textSecondary,
  },
  activeIcon: {
    color: Colors.actionIndigo,
  },
  label: {
    ...Typography.caption,
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  activeLabel: {
    color: Colors.actionIndigo,
    fontWeight: '700',
  },
});
