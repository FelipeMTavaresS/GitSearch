import React, { useEffect, useRef, useState } from 'react';
import { 
  Image, 
  NativeSyntheticEvent, 
  TextInputKeyPressEventData, 
  Platform, 
  Pressable, 
  Animated
 } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  SearchWrapper,
  InputContainer,
  StyledTextInput,
  SearchButton,
  SearchBarContainer,
  SearchIconImg,
  SearchClearButton,
  SearchClearText,
  SearchSuggestionsBox,
  SearchSuggestionRow,
  SearchSuggestionAvatar,
  SearchSuggestionLogin,
  SearchSuggestionHighlight,
  SearchLoadingRow,
  SearchLoadingSkeleton
} from '../styled';

const LupaIcon = "https://img.icons8.com/ios-filled/50/000000/search--v1.png";

interface SuggestionItem { login: string; avatarUrl: string; }
interface SearchBarProps {
  userName: string;
  onChangeUserName: (text: string) => void;
  onSearch: () => void;
  onClear: () => void;
  suggestions: SuggestionItem[];
  onPickSuggestion: (login: string) => void;
  shrink: Animated.AnimatedInterpolation<string | number>;
  isLoadingSuggestions: boolean;
  onCloseSuggestions: () => void;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({
  userName,
  onChangeUserName,
  onSearch,
  onClear,
  suggestions,
  onPickSuggestion,
  shrink,
  isLoadingSuggestions,
  onCloseSuggestions
}) => {
  const theme = useTheme();

  // Controle de animação de entrada/saída das sugestões
  const isOpen = isLoadingSuggestions || suggestions.length > 0;
  const [showBox, setShowBox] = useState(isOpen); // controla renderização evitando flicker
  const opacityAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const translateYAnim = useRef(new Animated.Value(isOpen ? 0 : -6)).current;

  useEffect(() => {
    if (isOpen) {
      // Garante que esteja montado antes de animar
      if (!showBox) setShowBox(true);
      Animated.parallel([
        Animated.timing(opacityAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(translateYAnim, { toValue: 0, duration: 180, useNativeDriver: true })
      ]).start();
    } else {
      // Anima saída e desmonta no final para não capturar interação invisível
      Animated.parallel([
        Animated.timing(opacityAnim, { toValue: 0, duration: 130, useNativeDriver: true }),
        Animated.timing(translateYAnim, { toValue: -6, duration: 130, useNativeDriver: true })
      ]).start(({ finished }) => {
        if (finished) setShowBox(false);
      });
    }
  }, [isOpen]);

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === 'Enter') onSearch();
  };

  return (
    <Pressable onPress={onCloseSuggestions} style={{ width: '100%' }}>
      <SearchWrapper>
        <InputContainer>
          <StyledTextInput
            value={userName}
            onChangeText={onChangeUserName}
            placeholder="Buscar usuário do GitHub"
            placeholderTextColor={theme.colors.textSecondary}
            {...(Platform.OS === 'web' ? {
              id: 'github-user-search',
              name: 'github-user-search',
              enterKeyHint: 'search',
              autoComplete: 'username',
              'aria-label': 'Buscar usuário do GitHub'
            } : { returnKeyType: 'search', accessibilityLabel: 'Campo de busca de usuário GitHub', nativeID: 'github-user-search' })}
            onSubmitEditing={onSearch}
            onKeyPress={Platform.OS === 'web' ? handleKeyPress : undefined}
          />
          {userName.length > 0 && (
            <SearchClearButton
              onPress={(e) => { e.stopPropagation(); onClear(); }}
              {...(Platform.OS === 'web' ? { role: 'button', 'aria-label': 'Limpar busca' } : { accessibilityRole: 'button', accessibilityLabel: 'Limpar busca' })}
            >
              <SearchClearText>X</SearchClearText>
            </SearchClearButton>
          )}
          <SearchButton
            onPress={(e) => { e.stopPropagation(); onSearch(); }}
            {...(Platform.OS === 'web' ? { role: 'button', 'aria-label': 'Buscar' } : { accessibilityRole: 'button', accessibilityLabel: 'Buscar' })}
          >
            <SearchIconImg source={{ uri: LupaIcon }} resizeMode="contain" tintColor={theme.colors.textPrimary} />
          </SearchButton>
        </InputContainer>

        {showBox && (
          <SearchSuggestionsBox
            style={{
              opacity: opacityAnim,
              transform: [{ translateY: translateYAnim }]
            }}
            // Evita capturar toques quando invisível durante animação de saída
            pointerEvents={isOpen ? 'auto' : 'none'}
          >
            <Animated.ScrollView style={{ maxHeight: 240 }} keyboardShouldPersistTaps="handled">
              {isLoadingSuggestions && (
                <>
                  {[1, 2, 3].map(i => (
                    <SearchLoadingRow key={i}>
                      <SearchLoadingSkeleton style={{ maxWidth: 140 }} />
                      <SearchLoadingSkeleton />
                    </SearchLoadingRow>
                  ))}
                </>
              )}
              {!isLoadingSuggestions && suggestions.map(s => {
                const q = userName.toLowerCase();
                const loginLower = s.login.toLowerCase();
                const idx = loginLower.indexOf(q);
                if (idx === -1) {
                  return (
                    <SearchSuggestionRow key={s.login} onPress={(e) => { e.stopPropagation(); onPickSuggestion(s.login); }}>
                      <SearchSuggestionAvatar source={{ uri: s.avatarUrl }} />
                      <SearchSuggestionLogin>{s.login}</SearchSuggestionLogin>
                    </SearchSuggestionRow>
                  );
                }
                const start = s.login.slice(0, idx);
                const match = s.login.slice(idx, idx + userName.length);
                const end = s.login.slice(idx + userName.length);
                return (
                  <SearchSuggestionRow key={s.login} onPress={(e) => { e.stopPropagation(); onPickSuggestion(s.login); }}>
                    <SearchSuggestionAvatar source={{ uri: s.avatarUrl }} />
                    <SearchSuggestionLogin>
                      {start}<SearchSuggestionHighlight>{match}</SearchSuggestionHighlight>{end}
                    </SearchSuggestionLogin>
                  </SearchSuggestionRow>
                );
              })}
            </Animated.ScrollView>
          </SearchSuggestionsBox>
        )}
      </SearchWrapper>
    </Pressable>
  );
};

export default SearchBarComponent;