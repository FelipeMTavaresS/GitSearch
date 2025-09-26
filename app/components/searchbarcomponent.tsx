import React from 'react';
import { Image, NativeSyntheticEvent, TextInputKeyPressEventData, Platform, Pressable, Animated } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { InputContainer, StyledTextInput, SearchButton } from '../styled';

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

const SearchContainer = styled(Animated.View)`
  width: 100%;
`;

const IconImg = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: #fff;
`;

const ClearButton = styled.Pressable`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.surface};
  border: 1px solid ${({theme}) => theme.colors.border};
`;

const ClearText = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: 12px;
`;

const SuggestionsBox = styled(Animated.View)`
  margin-top: -8px;
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-top-width: 0px;
  padding: 8px 10px 10px 10px;
  border-bottom-left-radius: ${({theme}) => theme.radius.lg}px;
  border-bottom-right-radius: ${({theme}) => theme.radius.lg}px;
  gap: 6px;
  max-height: 260px;
  overflow: hidden;
`;

const SuggestionRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 4px 2px;
`;

const SuggestionAvatar = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 14px;
`;

const SuggestionLogin = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.font.size.sm}px;
`;

const Highlight = styled.Text`
  color: ${({theme}) => theme.colors.accent};
  font-weight: ${({theme}) => theme.font.weight.bold};
`;

const LoadingRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const LoadingSkeleton = styled.View`
  height: 12px;
  flex: 1;
  background-color: ${({theme}) => theme.colors.surface};
  border-radius: 6px;
`;

const SearchBarComponent: React.FC<SearchBarProps> = ({ userName, onChangeUserName, onSearch, onClear, suggestions, onPickSuggestion, shrink, isLoadingSuggestions, onCloseSuggestions }) => {
  const theme = useTheme();

  const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (event.nativeEvent.key === 'Enter') {
      onSearch();
    }
  };

  const scale = Animated.subtract(1, Animated.multiply(shrink, 0.25));
  return (
    <Pressable onPress={onCloseSuggestions} style={{ width: '100%' }}>
    <SearchContainer style={{ transform: [{ scaleY: scale }] }}>
      <InputContainer style={{ marginBottom: (suggestions.length || isLoadingSuggestions) ? 0 : 24 }}>
        <StyledTextInput
          value={userName}
          onChangeText={onChangeUserName}
          placeholder="Buscar usuário do GitHub"
          placeholderTextColor={theme.colors.textSecondary}
          returnKeyType="search"
          onSubmitEditing={onSearch}
          onKeyPress={Platform.OS === 'web' ? handleKeyPress : undefined}
          accessibilityLabel="Campo de busca de usuário GitHub"
        />
        {userName.length > 0 && (
          <ClearButton onPress={(e) => { e.stopPropagation(); onClear(); }} accessibilityRole="button" accessibilityLabel="Limpar busca">
            <ClearText>X</ClearText>
          </ClearButton>
        )}
        <SearchButton onPress={(e) => { e.stopPropagation(); onSearch(); }} accessibilityRole="button" accessibilityLabel="Buscar">
          <IconImg source={{ uri: LupaIcon }} resizeMode="contain" />
        </SearchButton>
      </InputContainer>
      {(isLoadingSuggestions || suggestions.length > 0) && (
        <SuggestionsBox style={{ opacity: suggestions.length || isLoadingSuggestions ? 1 : 0 }}>
          <Animated.ScrollView style={{ maxHeight: 240 }} keyboardShouldPersistTaps="handled">
          {isLoadingSuggestions && (
            <>
              {[1,2,3].map(i => (
                <LoadingRow key={i}>
                  <LoadingSkeleton style={{ maxWidth: 140 }} />
                  <LoadingSkeleton />
                </LoadingRow>
              ))}
            </>
          )}
          {!isLoadingSuggestions && suggestions.map(s => {
            const q = userName.toLowerCase();
            const loginLower = s.login.toLowerCase();
            const idx = loginLower.indexOf(q);
            if (idx === -1) return (
              <SuggestionRow key={s.login} onPress={(e) => { e.stopPropagation(); onPickSuggestion(s.login); }}>
                <SuggestionAvatar source={{ uri: s.avatarUrl }} />
                <SuggestionLogin>{s.login}</SuggestionLogin>
              </SuggestionRow>
            );
            const start = s.login.slice(0, idx);
            const match = s.login.slice(idx, idx + userName.length);
            const end = s.login.slice(idx + userName.length);
            return (
              <SuggestionRow key={s.login} onPress={(e) => { e.stopPropagation(); onPickSuggestion(s.login); }}>
                <SuggestionAvatar source={{ uri: s.avatarUrl }} />
                <SuggestionLogin>
                  {start}<Highlight>{match}</Highlight>{end}
                </SuggestionLogin>
              </SuggestionRow>
            );
          })}
          </Animated.ScrollView>
        </SuggestionsBox>
      )}
    </SearchContainer>
    </Pressable>
  );
};

export default SearchBarComponent;