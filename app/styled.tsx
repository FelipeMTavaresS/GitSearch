import styled from "styled-components/native";
import React from 'react';
import { Animated } from 'react-native';

export const BoxContainer = styled.View<{ $fluid?: boolean }>`
  width: 100%;
  /* Para web usamos max-width apenas se não for fluid; em mobile RN ignora max-width */
  max-width: ${({$fluid}) => $fluid ? '100%' : '640px'};
  background-color: ${({theme}) => theme.colors.surface};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: ${({theme}) => theme.radius.xl}px;
  padding: ${({theme}) => theme.spacing.xl}px ${({theme}) => theme.spacing.lg}px;
  margin-bottom: ${({theme}) => theme.spacing.xxl}px;
  shadow-color: #000;
  shadow-opacity: 0.35;
  shadow-radius: 12px;
  elevation: 6;
  gap: ${({theme}) => theme.spacing.md}px;
`;


export const BoxContainerStats = styled.View<{ $stack?: boolean }>`
  width: 100%;
  flex-direction: ${({$stack}) => $stack ? 'column' : 'row'};
  gap: ${({theme, $stack}) => $stack ? theme.spacing.sm + 'px' : theme.spacing.md + 'px'};
  align-items: stretch;
`;
/* Itens agora sem cartão separado; apenas um wrapper transparente para alinhamento */
export const StatItem = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 4px;
  gap: 4px;
`;

export const StatDivider = styled.View`
  width: 1px;
  background-color: ${({theme}) => theme.colors.border};
  opacity: 0.6;
  margin-vertical: 4px;
`;

export const StatValue = styled.Text`
  font-size: ${({theme}) => Math.round(theme.font.size.xl * 0.9)}px;
  font-weight: ${({theme}) => theme.font.weight.bold};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const StatLabel = styled.Text`
  font-size: ${({theme}) => theme.font.size.xs}px;
  font-weight: ${({theme}) => theme.font.weight.medium};
  color: ${({theme}) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
/* Removidos estilos legados: recentUsersContainer, recentUsersTitle, recentUserItem, BoxContainerRepos, ScrollRepos */

export const ProfileIconContainer = styled.View`
  width: 128px;
  height: 128px;
  border-radius: 64px;
  overflow: hidden;
  align-self: center;
  border: 2px solid ${({theme}) => theme.colors.border};
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TextTitle = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: 48px;
  font-weight: bold;
  text-align: center;
`;

export const TextSubTitle = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: 12px;
  text-align: center;
`;

export const ViewSpace = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 8px;
`;

export const ViewSpaceRepos = styled.View`
  flex-direction: row; /* Coloca os subtítulos em linha */
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProfileText = styled.View`
  align-items: center;
  gap: 4px;
  margin-top: 12px;
`;

export const H1Text = styled.Text`
  font-size: ${({theme}) => theme.font.size.xl}px;
  font-weight: ${({theme}) => theme.font.weight.bold};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const H2Text = styled.Text`
  font-size: ${({theme}) => theme.font.size.lg}px;
  font-weight: ${({theme}) => theme.font.weight.medium};
  color: ${({theme}) => theme.colors.textSecondary};
`;

export const H2TextBold = styled.Text`
  font-size: ${({theme}) => theme.font.size.lg}px;
  font-weight: ${({theme}) => theme.font.weight.bold};
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const H2TextRepos = styled.Text`
  font-size: 18px;
  font-weight: normal;
  color: ${({theme}) => theme.colors.accent};
  text-decoration-line: underline;
  margin-top: 10px;
  text-align: left;
`;

export const DataText = styled.Text`
  font-size: 18px;
  font-weight: normal;
  color: ${({theme}) => theme.colors.textPrimary};
  margin-top: 10px;
  margin-right: 5px;
  text-align: right;
`;

export const ReposView = styled.View`
  padding-top: 10px;
  padding-left: 10px;
`;

export const TextGray = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
`;

export const HorizontalLine = styled.View`
  height: 1px;
  width: auto;
  background-color: ${({theme}) => theme.colors.border};
  margin: 10px 10px;
  margin-left: -5px;
  margin-right: 5px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 52px;
  width: 100%;
  border-radius: ${({theme}) => theme.radius.full}px;
  border: 1px solid ${({theme}) => theme.colors.border};
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  padding-left: ${({theme}) => theme.spacing.lg}px;
  padding-right: ${({theme}) => theme.spacing.sm}px;
  gap: ${({theme}) => theme.spacing.sm}px;
  margin-bottom: 0px;
`;

export const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: ${({theme}) => theme.font.size.md}px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const SearchButton = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.accent};
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const RecentUsersContainer = styled.View`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const RecentUsersTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const RecentUserItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const RecentUserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const RepoLink = styled.Text`
  color: blue;
  text-decoration: underline;
`;

export const ViewCenter = styled.View`
  align-items: center;
`;

export const SearchResultsContainer = styled.View`
  margin-vertical: 20px;
  width: 100%;
  padding-horizontal: 20px;
`;

export const SearchResultAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 10px;
`;

export const Backgroud = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const TopBar = styled.View`
  width: 100%;
  padding: 16px 20px 14px 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 12px;
  background-color: ${({theme}) => theme.colors.surface};
`;

export const ThemeToggleBtn = styled.TouchableOpacity`
  padding: 10px 14px;
  border-radius: 24px;
  background-color: ${({theme}) => theme.colors.surface};
  border: 1px solid ${({theme}) => theme.colors.border};
`;

export const ThemeToggleText = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: 14px;
`;

// Simulated gradient wrapper (fallback sem expo-linear-gradient)
// HeaderGradientWrapper removido (gradiente não utilizado atualmente)

export const TopBarRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TopBarLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const TopBarTitle = styled.Text`
  font-size: ${({theme}) => theme.font.size.xl}px;
  font-weight: ${({theme}) => theme.font.weight.bold};
  color: ${({theme}) => theme.colors.textPrimary};
`;


export const ScreenWrapper = styled.ScrollView`
  flex: 1;
  padding: ${({theme}) => theme.spacing.xl}px 0;
`;

export const Section = styled.View`
  width: 100%;
  align-items: center;
`;

// Largura padronizada para conteúdo que não precisa de cartão (ex: search bar)
export const ContentWidth = styled.View`
  width: 100%;
  max-width: 640px;
  padding: 0 ${({theme}) => theme.spacing.lg}px;
  align-self: center;
`;
export const RepositoryListContainer = styled.View`
  width: 100%;
`;

export const RepositoryListHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

export const RepositoryListTitle = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.font.size.xl}px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const RepositoryListCount = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RepositoryListShowMoreButton = styled.TouchableOpacity`
  margin-top: ${({theme}) => theme.spacing.sm}px;
  padding: 8px 14px;
  align-self: flex-start;
  border-radius: ${({theme}) => theme.radius.full}px;
  background-color: ${({theme}) => theme.colors.accent};
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const RepositoryListShowMoreText = styled.Text`
  color: #fff;
  font-size: ${({theme}) => theme.font.size.sm}px;
  font-weight: ${({theme}) => theme.font.weight.medium};
`;

/* Repository Card */
export const RepositoryCardWrapper = styled.View`
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  border: 1px solid ${({theme}) => theme.colors.border};
  padding: ${({theme}) => theme.spacing.lg}px;
  border-radius: ${({theme}) => theme.radius.lg}px;
  margin-bottom: ${({theme}) => theme.spacing.md}px;
  gap: ${({theme}) => theme.spacing.sm}px;
  width: 100%;
`;

export const RepositoryCardTitleButton = styled.Pressable``;

export const RepositoryCardTitle = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.font.size.lg}px;
  font-weight: ${({theme}) => theme.font.weight.bold};
`;

export const RepositoryCardDescription = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.font.size.sm}px;
`;

export const RepositoryCardMetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({theme}) => theme.spacing.sm}px;
  align-items: center;
`;

export const RepositoryCardPill = styled.View<{ $bg?: string; $border?: string }>`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color: ${({$bg, theme}) => $bg || theme.colors.surface};
  padding: 4px 12px 4px 10px;
  border-radius: 999px;
  border: 1px solid ${({$border, theme}) => $border || theme.colors.border};
`;

export const RepositoryCardPillText = styled.Text<{ $color?: string }>`
  color: ${({$color, theme}) => $color || theme.colors.textSecondary};
  font-size: ${({theme}) => theme.font.size.xs}px;
`;

export const RepositoryCardDot = styled.View<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({$color}) => $color};
`;

export const RepositoryCardDateText = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.font.size.xs}px;
`;

const SearchContainer = styled(Animated.View)`
  width: 100%;
`;

export const SearchBarContainer = styled(Animated.View)`
  width: 100%;
`;

const IconImg = styled.Image`
  width: 20px;
  height: 20px;
  tint-color: #fff;
`;

export const SearchIconImg = styled.Image`
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

export const SearchClearButton = styled.Pressable`
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

export const SearchClearText = styled.Text`
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

export const SearchSuggestionsBox = styled(Animated.View)`
  /* Cola diretamente no input removendo qualquer gap vertical */
  margin-top: -4px;
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-top-width: 0; /* unir com a borda inferior do input container */
  padding: 6px 10px 10px 10px;
  border-bottom-left-radius: ${({theme}) => theme.radius.lg}px;
  border-bottom-right-radius: ${({theme}) => theme.radius.lg}px;
  gap: 6px;
  max-height: 320px;
  overflow: hidden;
  shadow-color: #000;
  shadow-opacity: 0.10;
  shadow-radius: 12px;
  elevation: 4;
`;

const SuggestionRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 4px 2px;
`;

export const SearchSuggestionRow = styled.Pressable`
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

export const SearchSuggestionAvatar = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 14px;
`;

const SuggestionLogin = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.font.size.sm}px;
`;

export const SearchSuggestionLogin = styled.Text`
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

export const SearchLoadingRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const SearchLoadingSkeleton = styled.View`
  height: 12px;
  flex: 1;
  background-color: ${({theme}) => theme.colors.surface};
  border-radius: 6px;
`;
export const SearchSuggestionHighlight = styled.Text`
  color: ${({theme}) => theme.colors.accent};
  font-weight: ${({theme}) => theme.font.weight.bold};
`;


export const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.45);
  padding: 0 24px;
  z-index: 999;
`;

export const ModalCard = styled.View`
  width: 100%;
  max-width: 360px;
  background-color: ${({theme}) => theme.colors.surface};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: ${({theme}) => theme.radius.lg}px;
  padding: ${({theme}) => theme.spacing.lg}px;
  gap: ${({theme}) => theme.spacing.md}px;
  shadow-color: #000;
  shadow-opacity: 0.30;
  shadow-radius: 12px;
  elevation: 8;
`;

export const ModalMessageText = styled.Text`
  font-size: ${({theme}) => theme.font.size.md}px;
  line-height: ${({theme}) => theme.font.size.md * 1.4}px;
  text-align: center;
  color: ${({theme}) => theme.colors.textPrimary};
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.accent};
  padding: ${({theme}) => theme.spacing.sm}px ${({theme}) => theme.spacing.lg}px;
  border-radius: ${({theme}) => theme.radius.full}px;
  align-self: center;
  min-width: 120px;
  justify-content: center;
  align-items: center;
`;

export const ModalButtonText = styled.Text`
  color: #ffffff;
  font-size: ${({theme}) => theme.font.size.md}px;
  font-weight: ${({theme}) => theme.font.weight.medium};
`;

export const RecentUsersOuter = styled.View`
  align-items: center;
  width: 100%;
`;

export const RecentUsersBox = styled(BoxContainer)<{ $isWide: boolean }>`
  /* Sempre ocupar a largura disponível do container pai; o pai já limita a coluna */
  width: 100%;
  /* Em telas largas podemos opcionalmente ajustar padding ou densidade futuramente */
`;

export const RecentUserName = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const RecentUserSecondary = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;


export const SkeletonLine = styled.View<{ $h?: number; $w?: string }>`
  height: ${({$h}) => $h || 14}px;
  width: ${({$w}) => $w || '100%'};
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  margin-bottom: 10px;
`;

export const SkeletonAvatar = styled.View<{ $size?: number }>`
  width: ${({$size}) => $size || 120}px;
  height: ${({$size}) => $size || 120}px;
  border-radius: ${({$size}) => ($size ? $size/2 : 60)}px;
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  margin-bottom: 16px;
`;


