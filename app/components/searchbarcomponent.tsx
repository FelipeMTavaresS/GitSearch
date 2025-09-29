import React from 'react';
import { 
  Image, 
  NativeSyntheticEvent, 
  TextInputKeyPressEventData, 
  Platform, 
  Animated,
  View
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
  recentUsers?: { login: string; avatarUrl: string; name?: string; }[];
  onPickRecentUser?: (login: string) => void;
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
  recentUsers = [],
  onPickRecentUser
}) => {
  const theme = useTheme();
  const [focused, setFocused] = React.useState(false);

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === 'Enter') onSearch();
  };

  const scale = Animated.subtract(1, Animated.multiply(shrink, 0.25));
  const showRecents = focused && userName.length === 0 && recentUsers.length > 0;
  const showSuggestions = userName.length > 0 && (isLoadingSuggestions || suggestions.length > 0);

  return (
    <View style={{ width: '100%' }}>
      <SearchBarContainer style={{ transform: [{ scaleY: scale }] }}>
        <InputContainer style={{ marginBottom: (showRecents || showSuggestions) ? 0 : 24 }}>
          <StyledTextInput
            value={userName}
            onChangeText={onChangeUserName}
            placeholder="Buscar usuário do GitHub"
            placeholderTextColor={theme.colors.textSecondary}
            returnKeyType="search"
            onSubmitEditing={onSearch}
            onKeyPress={Platform.OS === 'web' ? handleKeyPress : undefined}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
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
          <SearchButton
            onPress={(e) => { e.stopPropagation(); onSearch(); }}
            accessibilityRole="button"
            accessibilityLabel="Buscar"
          >
            <SearchIconImg source={{ uri: LupaIcon }} resizeMode="contain" />
          </SearchButton>
        </InputContainer>

        {(showRecents || showSuggestions) && (
          <SearchSuggestionsBox style={{ opacity: (showRecents || showSuggestions) ? 1 : 0 }}>
            <Animated.ScrollView style={{ maxHeight: 300 }} keyboardShouldPersistTaps="handled">
              {showRecents && (
                <>
                  <SearchSuggestionRow style={{ opacity: 0.65 }}>
                    <SearchSuggestionLogin style={{ fontWeight: '700' }}>Recentes</SearchSuggestionLogin>
                  </SearchSuggestionRow>
                  {recentUsers.slice().reverse().slice(0,6).map(r => (
                    <SearchSuggestionRow key={'recent-'+r.login} onPress={() => { 
                      onPickRecentUser && onPickRecentUser(r.login);
                      onCloseSuggestions();
                      setFocused(false);
                    }}>
                      <SearchSuggestionAvatar source={{ uri: r.avatarUrl }} />
                      <SearchSuggestionLogin numberOfLines={1}>{r.name || r.login}</SearchSuggestionLogin>
                    </SearchSuggestionRow>
                  ))}
                </>
              )}
              {showSuggestions && isLoadingSuggestions && (
                <>
                  {[1, 2, 3].map(i => (
                    <SearchLoadingRow key={i}>
                      <SearchLoadingSkeleton style={{ maxWidth: 140 }} />
                      <SearchLoadingSkeleton />
                    </SearchLoadingRow>
                  ))}
                </>
              )}
              {showSuggestions && !isLoadingSuggestions && suggestions.map(s => {
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
            </Animated.ScrollView>
          </SearchSuggestionsBox>
        )}
      </SearchBarContainer>
    </View>
  );
};

export default SearchBarComponent;