// Design system theme tokens
const base = {
  colors: {
    background: '#0f1115',
    surface: '#1b1f27',
    surfaceAlt: '#232a36',
    border: '#2d3643',
    overlay: 'rgba(0,0,0,0.4)',
    textPrimary: '#f5f7fa',
    textSecondary: '#9aa4b1',
    accent: '#3d82f6',
    accentAlt: '#6366f1',
    danger: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#0ea5e9',
    gradientFrom: '#3d82f6',
    gradientTo: '#6366f1'
  },
  radius: {
    xs: 4,
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    full: 999
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32
  },
  font: {
    size: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 20,
      xxl: 24,
      display: 32
    },
    weight: {
      regular: '400',
      medium: '500',
      bold: '700'
    }
  },
  shadow: {
    sm: '0px 1px 2px rgba(0,0,0,0.4)',
    md: '0px 4px 12px rgba(0,0,0,0.35)'
  }
};

export const darkTheme = base;

export const lightTheme: typeof base = {
  ...base,
  colors: {
    ...base.colors,
    background: '#f5f7fa',
    surface: '#ffffff',
    surfaceAlt: '#f0f2f5',
    border: '#d9dee4',
    textPrimary: '#1d242d',
    textSecondary: '#5a6572'
  }
};

export type AppTheme = typeof base;