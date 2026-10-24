import { RiasecDimension, RiasecScoreResult } from '../types/riasec';
import { RiasecQuestions, RiasecDimensionDetails } from '../data/riasecQuestions';

const TIE_BREAK_ORDER: RiasecDimension[] = ['I', 'R', 'E', 'A', 'S', 'C'];

/**
 * Deterministic RIASEC Scoring & Reason Trace Engine
 * Zero random selection. Transparent, reproducible, and explainable.
 */
export function calculateRiasecScores(
  answers: Record<number, string> // questionId -> optionId
): RiasecScoreResult {
  const scores: Record<RiasecDimension, number> = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  const contributingAnswers: {
    questionId: number;
    dimension: RiasecDimension;
    choiceText: string;
  }[] = [];

  // Iterate over answers
  for (const question of RiasecQuestions) {
    const selectedOptionId = answers[question.id];
    if (selectedOptionId) {
      const option = question.options.find(opt => opt.id === selectedOptionId);
      if (option) {
        scores[option.dimension] += option.weight;
        contributingAnswers.push({
          questionId: question.id,
          dimension: option.dimension,
          choiceText: option.text,
        });
      }
    }
  }

  // Calculate total score for percentage calculation
  const totalPoints = Object.values(scores).reduce((sum, val) => sum + val, 0) || 1;

  const dimensionPercentages: Record<RiasecDimension, number> = {
    R: Math.round((scores.R / totalPoints) * 100),
    I: Math.round((scores.I / totalPoints) * 100),
    A: Math.round((scores.A / totalPoints) * 100),
    S: Math.round((scores.S / totalPoints) * 100),
    E: Math.round((scores.E / totalPoints) * 100),
    C: Math.round((scores.C / totalPoints) * 100),
  };

  // Sort dimensions by score descending, breaking ties deterministically using TIE_BREAK_ORDER
  const allDimensions: RiasecDimension[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const sortedDimensions = allDimensions.sort((a, b) => {
    if (scores[b] !== scores[a]) {
      return scores[b] - scores[a];
    }
    // Deterministic tie-breaker
    return TIE_BREAK_ORDER.indexOf(a) - TIE_BREAK_ORDER.indexOf(b);
  });

  const topThree = sortedDimensions.slice(0, 3);
  const profileCode = topThree.join('');
  const dominantDim = topThree[0];
  const dominantTrait = RiasecDimensionDetails[dominantDim];

  const reasonTrace = {
    contributingAnswers,
    matchingRule: `Calculated from ${contributingAnswers.length} responses. Primary dimension '${dominantTrait.fullName}' scored highest (${scores[dominantDim]} points, ${dimensionPercentages[dominantDim]}%). Top three profile '${profileCode}' selected via deterministic ranking.`,
    limitations: 'This assessment reflects current situational interest preferences; it is not a clinical diagnosis or aptitude examination. It guides career discovery without predicting guaranteed success.',
  };

  return {
    scores,
    topThree,
    profileCode,
    dimensionPercentages,
    dominantTrait,
    reasonTrace,
  };
}
