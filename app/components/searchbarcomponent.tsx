import React from 'react';
import { 
  Image, 
  NativeSyntheticEvent, 
  TextInputKeyPressEventData, 
  Platform, 
  Animated,
  View,
  ActivityIndicator
 } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
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
  onCloseSuggestions,
  
}) => {
  const theme = useTheme();
  const [focused, setFocused] = React.useState(false);
  

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === 'Enter') onSearch();
  };

  const scale = Animated.subtract(1, Animated.multiply(shrink, 0.25));
  const showSuggestions = userName.length > 0 && (isLoadingSuggestions || suggestions.length > 0);

  const handleTextChange = React.useCallback((text: string) => {
    onChangeUserName(text);
  }, [onChangeUserName]);

  return (
    <View style={{ width: '100%' }}>
      <SearchBarContainer style={{ transform: [{ scaleY: scale }] }}>
  <InputContainer style={{ marginBottom: showSuggestions ? 0 : 24 }}>
          <StyledTextInput
            value={userName}
            onChangeText={handleTextChange}
            placeholder="Buscar usuário do GitHub"
            placeholderTextColor={theme.colors.textSecondary}
            returnKeyType="search"
            onSubmitEditing={onSearch}
            onKeyPress={Platform.OS === 'web' ? handleKeyPress : undefined}
            onFocus={() => { setFocused(true); }}
            onBlur={() => { setFocused(false); }}
            accessibilityLabel="Campo de busca de usuário GitHub"
          />
          {userName.length > 0 && (
            <SearchClearButton
              onPress={(e) => { e.stopPropagation(); onClear(); }}
              accessibilityRole="button"
              accessibilityLabel="Limpar busca"
            >
              <SearchClearText>X</SearchClearText>
            </SearchClearButton>
          )}
          {isLoadingSuggestions && userName.length > 0 && (
            <View style={{ position: 'absolute', right: 52, top: 8 }}>
              <ActivityIndicator size={16 as any} color={theme.colors.accent} />
            </View>
          )}
          <SearchButton
            onPress={(e) => { e.stopPropagation(); onSearch(); }}
            accessibilityRole="button"
            accessibilityLabel="Buscar"
          >
            <SearchIconImg source={{ uri: LupaIcon }} resizeMode="contain" />
          </SearchButton>
        </InputContainer>

        {showSuggestions && (
          <SearchSuggestionsBox style={{ opacity: showSuggestions ? 1 : 0 }}>
            <Animated.ScrollView style={{ maxHeight: 300 }} keyboardShouldPersistTaps="handled">
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
                    <SearchSuggestionRow key={s.login} onPress={() => { onPickSuggestion(s.login); }}>
                      <SearchSuggestionAvatar source={{ uri: s.avatarUrl }} />
                      <SearchSuggestionLogin>{s.login}</SearchSuggestionLogin>
                    </SearchSuggestionRow>
                  );
                }
                const start = s.login.slice(0, idx);
                const match = s.login.slice(idx, idx + userName.length);
                const end = s.login.slice(idx + userName.length);
                return (
                  <SearchSuggestionRow key={s.login} onPress={() => { onPickSuggestion(s.login); }}>
                    <SearchSuggestionAvatar source={{ uri: s.avatarUrl }} />
                    <SearchSuggestionLogin>
                      {start}<SearchSuggestionHighlight>{match}</SearchSuggestionHighlight>{end}
                    </SearchSuggestionLogin>
                  </SearchSuggestionRow>
                );
              })}
              {!isLoadingSuggestions && userName.length > 0 && suggestions.length === 0 && (
                <SearchSuggestionRow>
                  <SearchSuggestionLogin style={{ opacity: 0.7 }}>Sem resultados</SearchSuggestionLogin>
                </SearchSuggestionRow>
              )}
            </Animated.ScrollView>
          </SearchSuggestionsBox>
        )}
      </SearchBarContainer>
    </View>
  );
};

export default SearchBarComponent;