import React, { createContext, useContext, useState, useMemo, ReactNode, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Animated, Easing, View, StyleSheet } from 'react-native';
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
  const anim = useRef(new Animated.Value(0)).current; // 0 = atual, 1 = transição

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);
  const prevTheme = useMemo(() => (prevMode ? (prevMode === 'dark' ? darkTheme : lightTheme) : null), [prevMode]);

  const runTransition = () => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false
    }).start(() => {
      setPrevMode(null);
      anim.setValue(0);
    });
  };

  const toggle = () => {
    setPrevMode(mode); // guarda tema anterior
    setMode(m => (m === 'dark' ? 'light' : 'dark'));
  };

  // Quando modo mudar e existe prevMode, roda animação
  useEffect(() => {
    if (prevMode) runTransition();
  }, [mode]);

  const overlayOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }); // antigo some

  const value = useMemo(() => ({ theme, mode, toggle }), [theme, mode]);
  return (
    <ThemeContext.Provider value={value}>
      <View style={{ flex: 1 }}>
        {/* Camada nova (tema atual) */}
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        {/* Overlay cross-fade (mostra o tema anterior desvanecendo) */}
        {prevTheme && (
          <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { opacity: overlayOpacity }]}>
            <ThemeProvider theme={prevTheme}>{children}</ThemeProvider>
          </Animated.View>
        )}
      </View>
    </ThemeContext.Provider>
  );
};