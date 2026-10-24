import { RiasecDimension } from './riasec';
export * from './riasec';

export type EducationStage = 
  | 'matric_science'
  | 'matric_computer'
  | 'matric_arts'
  | 'fsc_pre_eng'
  | 'fsc_pre_med'
  | 'ics'
  | 'icom'
  | 'dae'
  | 'o_level'
  | 'a_level'
  | 'undergrad';

export type VerificationState = 'verified' | 'requires_confirmation' | 'pending_review' | 'not_available';

export interface EducationStageOption {
  id: EducationStage;
  label: string;
  category: 'Secondary' | 'Intermediate / Higher Secondary' | 'Technical / Vocational' | 'International';
  description: string;
}

export interface CareerRouteStep {
  stage: string;
  duration: string;
  description: string;
  institutionTypes: string[];
}

export interface CareerProfile {
  id: string;
  title: string;
  category: string;
  riasecCode: string;
  riasecDimensions: RiasecDimension[];
  shortSummary: string;
  detailedOverview: string;
  typicalActivities: string[];
  recommendedSubjects: string[];
  essentialSkills: { name: string; priority: 'core' | 'supportive'; verifiedBasis: string }[];
  routes: {
    routeName: string;
    targetQualification: string;
    steps: CareerRouteStep[];
    estimatedYears: string;
    admissionTest: string;
  }[];
  sources: {
    title: string;
    url: string;
    lastCheckedDate: string;
    verificationStatus: VerificationState;
  }[];
  reasonTrace?: string;
}

export interface RoadmapNode {
  id: string;
  yearIndex: number; // 1 to 5
  title: string;
  type: 'education' | 'skill' | 'project' | 'checkpoint' | 'decision';
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
  prerequisites?: string[];
  estimatedMonths: number;
  evidenceRequired?: string;
  userNotes?: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'MUN' | 'Debate' | 'Competition' | 'Scholarship' | 'Workshop';
  organizer: string;
  location: string;
  isKarachi: boolean;
  format: 'In-person' | 'Virtual' | 'Hybrid';
  deadline: string;
  eligibility: string;
  cost: string;
  sourceUrl: string;
  verificationStatus: VerificationState;
  lastCheckedDate: string;
}

export interface CampusBulletinCard {
  id: string;
  title: string;
  hostCampus: string;
  domainTag: string;
  eventDate: string;
  venueOrFormat: string;
  registrationDeadline: string;
  registrationUrl: string;
  sourceAttribution: string;
  verificationStatus: VerificationState;
  usefulCount: number;
}
