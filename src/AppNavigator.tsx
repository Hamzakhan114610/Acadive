import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Colors } from './theme/colors';
import { ScreenContainer } from './components/common/ScreenContainer';
import { OfflineBanner } from './components/common/OfflineBanner';
import { BottomNavBar, TabKey } from './components/navigation/BottomNavBar';

// Screens
import { QualificationFirstScreen } from './screens/QualificationFirstScreen';
import { AuthScreen } from './screens/AuthScreen';
import { InterestDiscoveryFirstScreen } from './screens/InterestDiscoveryFirstScreen';
import { IkigaiScreen } from './screens/IkigaiScreen';
import { PublicLandingScreen } from './screens/PublicLandingScreen';
import { DualPathSelectScreen } from './screens/DualPathSelectScreen';
import { RiasecAssessmentScreen } from './screens/RiasecAssessmentScreen';
import { RiasecResultsScreen } from './screens/RiasecResultsScreen';
import { CareerExplorerScreen } from './screens/CareerExplorerScreen';
import { CareerDetailScreen } from './screens/CareerDetailScreen';
import { RoadmapScreen } from './screens/RoadmapScreen';
import { OpportunitiesScreen } from './screens/OpportunitiesScreen';
import { ProfileVaultScreen } from './screens/ProfileVaultScreen';

// Types
import { RiasecScoreResult } from './types/riasec';
import { EducationStage } from './types';

type ScreenView = 
  | 'qualification_first' // Exactly requested: First question asks qualification
  | 'interest_discovery'
  | 'auth'                // Sign In / Register
  | 'ikigai'
  | 'landing'
  | 'dual_path'
  | 'riasec'
  | 'riasec_results'
  | 'career_detail'
  | 'main_tabs';

export const AppNavigator: React.FC = () => {
  // First page is Qualification Question with Auth & Skip to Field
  const [currentView, setCurrentView] = useState<ScreenView>('qualification_first');
  const [currentTab, setCurrentTab] = useState<TabKey>('explore');
  const [selectedCareerId, setSelectedCareerId] = useState<string>('software-ai-engineer');
  const [riasecResult, setRiasecResult] = useState<RiasecScoreResult | null>(null);
  const [userEducationStage, setUserEducationStage] = useState<EducationStage>('fsc_pre_eng');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; stage: EducationStage } | null>(null);

  // Navigation Handlers
  const handleOpenAuth = () => {
    setCurrentView('auth');
  };

  const handleAuthSuccess = (user: { name: string; email: string; stage: EducationStage }) => {
    setCurrentUser(user);
    setUserEducationStage(user.stage);
    Alert.alert('Welcome to Acadiv!', `Signed in as ${user.name}`);
    setCurrentView('qualification_first');
  };

  const handleContinueAsGuest = () => {
    setCurrentView('qualification_first');
  };

  const handleStartRiasec = () => {
    setCurrentView('riasec');
  };

  const handleStartIkigai = () => {
    setCurrentView('ikigai');
  };

  const handleSkipToField = () => {
    // Directly go to Career Explorer & Roadmaps for the selected qualification
    setCurrentTab('explore');
    setCurrentView('main_tabs');
  };

  const handleIkigaiComplete = (careerId: string) => {
    setSelectedCareerId(careerId);
    setCurrentView('career_detail');
  };

  const handleStartExploration = () => {
    setCurrentView('dual_path');
  };

  const handleSelectPathA = (stage: EducationStage) => {
    setUserEducationStage(stage);
    setCurrentTab('explore');
    setCurrentView('main_tabs');
  };

  const handleSelectPathB = () => {
    setCurrentView('riasec');
  };

  const handleRiasecComplete = (result: RiasecScoreResult) => {
    setRiasecResult(result);
    setCurrentView('riasec_results');
  };

  const handleSelectCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    setCurrentView('career_detail');
  };

  const handleStartRoadmap = (careerId: string) => {
    setSelectedCareerId(careerId);
    setCurrentTab('roadmap');
    setCurrentView('main_tabs');
  };

  const handleReset = () => {
    setRiasecResult(null);
    setCurrentView('qualification_first');
  };

  // Render Screen Content
  const renderScreenContent = () => {
    switch (currentView) {
      case 'qualification_first':
        return (
          <QualificationFirstScreen
            userName={currentUser?.name}
            selectedStage={userEducationStage}
            onSelectStage={stage => setUserEducationStage(stage)}
            onOpenAuth={handleOpenAuth}
            onStartAssessment={handleStartRiasec}
            onSkipToField={handleSkipToField}
          />
        );

      case 'auth':
        return (
          <AuthScreen
            onBack={() => setCurrentView('qualification_first')}
            onAuthSuccess={handleAuthSuccess}
            onContinueAsGuest={handleContinueAsGuest}
          />
        );

      case 'interest_discovery':
        return (
          <InterestDiscoveryFirstScreen
            userName={currentUser?.name}
            onOpenAuth={handleOpenAuth}
            onStartRiasec={handleStartRiasec}
            onStartIkigai={handleStartIkigai}
            onSkipToField={handleSkipToField}
          />
        );

      case 'ikigai':
        return (
          <IkigaiScreen
            onBack={() => setCurrentView('qualification_first')}
            onComplete={handleIkigaiComplete}
            onSkipToField={handleSkipToField}
          />
        );

      case 'landing':
        return (
          <PublicLandingScreen
            onStartExploration={handleStartExploration}
            onDirectSearch={handleSkipToField}
            onSelectCareer={handleSelectCareer}
          />
        );

      case 'dual_path':
        return (
          <DualPathSelectScreen
            onBack={() => setCurrentView('qualification_first')}
            onSelectPathA={handleSelectPathA}
            onSelectPathB={handleSelectPathB}
          />
        );

      case 'riasec':
        return (
          <RiasecAssessmentScreen
            onBack={() => setCurrentView('qualification_first')}
            onComplete={handleRiasecComplete}
          />
        );

      case 'riasec_results':
        if (!riasecResult) {
          return null;
        }
        return (
          <RiasecResultsScreen
            result={riasecResult}
            onExploreCareer={handleSelectCareer}
            onOpenRoadmap={() => {
              setCurrentTab('roadmap');
              setCurrentView('main_tabs');
            }}
            onRetake={() => setCurrentView('riasec')}
          />
        );

      case 'career_detail':
        return (
          <CareerDetailScreen
            careerId={selectedCareerId}
            onBack={() => {
              if (riasecResult) {
                setCurrentView('riasec_results');
              } else {
                setCurrentView('main_tabs');
              }
            }}
            onStartRoadmap={handleStartRoadmap}
          />
        );

      case 'main_tabs':
        switch (currentTab) {
          case 'home':
            return (
              <QualificationFirstScreen
                userName={currentUser?.name}
                selectedStage={userEducationStage}
                onSelectStage={stage => setUserEducationStage(stage)}
                onOpenAuth={handleOpenAuth}
                onStartAssessment={handleStartRiasec}
                onSkipToField={handleSkipToField}
              />
            );
          case 'explore':
            return (
              <CareerExplorerScreen
                onBack={() => setCurrentView('qualification_first')}
                onSelectCareer={handleSelectCareer}
              />
            );
          case 'roadmap':
            return (
              <RoadmapScreen
                onBack={() => setCurrentTab('explore')}
                targetCareerTitle="Software & AI Engineer"
              />
            );
          case 'opportunities':
            return <OpportunitiesScreen />;
          case 'profile':
            return (
              <ProfileVaultScreen
                onResetExploration={handleReset}
                onOpenRoadmap={() => setCurrentTab('roadmap')}
              />
            );
        }
    }
  };

  // Show bottom navigation bar when exploring main tabs
  const showBottomNav = currentView === 'main_tabs';

  return (
    <ScreenContainer withPadding={false} backgroundColor={Colors.backgroundCanvas}>
      <OfflineBanner isOffline={false} lastSynced="Oct 2026" />
      <View style={styles.screenWrapper}>
        {renderScreenContent()}
      </View>
      {showBottomNav && (
        <BottomNavBar
          currentTab={currentTab}
          onSelectTab={tab => setCurrentTab(tab)}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
});
