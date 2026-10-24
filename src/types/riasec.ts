export type RiasecDimension = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecDimensionInfo {
  code: RiasecDimension;
  name: string;
  fullName: string;
  description: string;
  sampleRoles: string[];
}

export interface RiasecOption {
  id: string;
  text: string;
  dimension: RiasecDimension;
  weight: number; // typically 1 or 2
}

export interface RiasecQuestion {
  id: number;
  scenario: string;
  context: string;
  options: RiasecOption[];
}

export interface RiasecScoreResult {
  scores: Record<RiasecDimension, number>;
  topThree: RiasecDimension[];
  profileCode: string; // e.g. "IRC", "SEC"
  dimensionPercentages: Record<RiasecDimension, number>;
  dominantTrait: RiasecDimensionInfo;
  reasonTrace: {
    contributingAnswers: { questionId: number; dimension: RiasecDimension; choiceText: string }[];
    matchingRule: string;
    limitations: string;
  };
}
