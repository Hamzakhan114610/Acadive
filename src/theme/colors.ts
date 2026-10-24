/**
 * ACADIV Design System — Color Palette
 * Exactly calibrated to user specification:
 * 1. Primary: Deep Navy / Slate Blue (#0A2540)
 * 2. Action / Primary CTA: Electric Indigo / Vibrant Blue (#6366F1)
 * 3. Success & Match Indicator: Mint Green / Emerald (#10B981)
 * 4. Accent / Highlight: Warm Gold / Amber (#D4AF37)
 * 5. Background & Surface: Soft Slate Canvas (#F8FAFC) & Clean White (#FFFFFF)
 */
export const Colors = {
  // 1. Primary Brand & Navigation
  primaryNavy: '#0A2540',
  navySlate: '#1E293B',

  // 2. Action / Primary CTA Color
  actionIndigo: '#6366F1',
  actionIndigoHover: '#4F46E5',
  actionIndigoLight: '#EEF2FF',

  // 3. Success & Match Indicator
  successMint: '#10B981',
  successMintLight: '#ECFDF5',

  // 4. Accent / Highlight Color
  accentGold: '#D4AF37',
  accentGoldLight: '#FEF9C3',

  // 5. Background & Surfaces
  backgroundCanvas: '#F8FAFC',
  backgroundWarm: '#F8FAFC', // backward compatibility
  surfaceWhite: '#FFFFFF',
  surfaceCard: '#FFFFFF',
  backgroundMuted: '#F1F5F9',
  border: '#E2E8F0',
  borderActive: '#6366F1',

  // Text Colors
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  textInverse: '#FFFFFF',

  // Semantic Status
  statusSuccess: '#10B981',
  statusWarning: '#D4AF37',
  statusError: '#EF4444',
  statusInfo: '#3B82F6',

  // Legacy mappings for existing components
  primaryEmerald: '#10B981',
  softTeal: '#EEF2FF',
} as const;

export type ColorToken = keyof typeof Colors;
