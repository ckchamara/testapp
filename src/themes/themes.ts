import { DarkTheme, DefaultTheme } from '@react-navigation/native';

// Premium color palette
const colors = {
  // Primary colors
  goldDark: '#FFD700', // Luxurious gold
  goldLight: '#F7DC6F', // Softer gold for light theme

  // Secondary colors
  purpleDark: '#9f7aea', // Soft purple for accents
  purpleLight: '#8b5cf6', // Soft violet for accents

  // Accent colors
  cyanDark: '#00d2d3', // Bright cyan for highlights
  cyanLight: '#06b6d4', // Bright cyan for highlights

  // Background colors
  backgroundDark: '#121212',
  backgroundLight: '#ffffff',

  // Surface colors
  surfaceDark: '#1e1e1e',
  surfaceLight: '#f8fafc',

  // Text colors
  textPrimaryDark: '#ffffff',
  textSecondaryDark: 'rgba(255, 255, 255, 0.7)',
  textDisabledDark: 'rgba(255, 255, 255, 0.5)',

  textPrimaryLight: '#0f172a',
  textSecondaryLight: '#475569',
  textDisabledLight: '#94a3b8',

  // Status colors
  successDark: '#10b981',
  successLight: '#34d399',

  warningDark: '#f59e0b',
  warningLight: '#fbbf24',

  errorDark: '#ff4757',
  errorLight: '#ef4444',

  infoDark: '#3b82f6',
  infoLight: '#60a5fa',

  // Gradient colors
  gradientStartDark: '#FFD700',
  gradientEndDark: '#9f7aea',

  gradientStartLight: '#6366f1',
  gradientEndLight: '#8b5cf6',
};

// Font configuration
const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
};

// Spacing system
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius
const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Shadows
const shadows = {
  light: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  dark: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2.0,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
};

export const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.goldDark,
    secondary: colors.purpleDark,
    background: colors.backgroundDark,
    card: colors.surfaceDark,
    text: colors.textPrimaryDark,
    textSecondary: colors.textSecondaryDark,
    textDisabled: colors.textDisabledDark,
    border: 'rgba(255, 255, 255, 0.1)',
    notification: colors.errorDark,
    accent: colors.cyanDark,
    success: colors.successDark,
    warning: colors.warningDark,
    error: colors.errorDark,
    info: colors.infoDark,
    gradientStart: colors.gradientStartDark,
    gradientEnd: colors.gradientEndDark,
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows.dark,
};

export const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.goldLight,
    secondary: colors.purpleLight,
    background: colors.backgroundLight,
    card: colors.surfaceLight,
    text: colors.textPrimaryLight,
    textSecondary: colors.textSecondaryLight,
    textDisabled: colors.textDisabledLight,
    border: 'rgba(0, 0, 0, 0.05)',
    notification: colors.errorLight,
    accent: colors.cyanLight,
    success: colors.successLight,
    warning: colors.warningLight,
    error: colors.errorLight,
    info: colors.infoLight,
    gradientStart: colors.gradientStartLight,
    gradientEnd: colors.gradientEndLight,
  },
  typography,
  spacing,
  borderRadius,
  shadows: shadows.light,
};

// Export the raw colors for direct access
export { colors, typography, spacing, borderRadius, shadows };
