import React, { createContext, useContext, useState, useMemo, ReactNode, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Animated, Easing, Platform } from 'react-native';
import { darkTheme, lightTheme, AppTheme } from './theme';

interface ThemeCtx {
  theme: AppTheme;
  mode: 'light' | 'dark';
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme deve ser usado dentro de ThemeProviderCustom');
  return ctx;
};

export const ThemeProviderCustom: React.FC<{children: ReactNode}> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [prevMode, setPrevMode] = useState<'light' | 'dark' | null>(null);
  const anim = useRef(new Animated.Value(1)).current; // 0 => cor antiga, 1 => cor atual

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);
  const fromTheme = useMemo(() => (prevMode ? (prevMode === 'dark' ? darkTheme : lightTheme) : theme), [prevMode, mode]);

  const toggle = () => {
    setPrevMode(mode);
    setMode(m => (m === 'dark' ? 'light' : 'dark'));
  };

  // Carrega modo persistido
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('app_theme_mode');
        if (stored === 'light' || stored === 'dark') {
          setMode(stored);
        }
      }
    } catch {}
  }, []);

  // Persiste mudanças
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('app_theme_mode', mode);
      }
    } catch {}
  }, [mode]);

  useEffect(() => {
    if (prevMode) {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false
      }).start(() => {
        setPrevMode(null);
      });
    }
  }, [mode]);

  // Interpola apenas background principal; demais cores terão transição por CSS (web)
  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [fromTheme.colors.background, theme.colors.background]
  });

  // Injeta transição global suave para web (evita sensação de repaint duro nas surfaces)
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const id = 'theme-smooth-transitions';
    let styleEl = document.getElementById(id) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = id;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      *, *::before, *::after {
        transition: background-color .38s ease, color .38s ease, border-color .38s ease, box-shadow .38s ease;
      }
    `;
  }, []);

  const value = useMemo(() => ({ theme, mode, toggle }), [theme, mode]);
  return (
    <ThemeContext.Provider value={value}>
      <Animated.View style={{ flex: 1, backgroundColor }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Animated.View>
    </ThemeContext.Provider>
  );
};