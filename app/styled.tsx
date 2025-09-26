import styled from "styled-components/native";
import React from 'react';

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


export const BoxContainerStats = styled.View`
  width: 320px;
  height: auto;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px; /* Adiciona um espaçamento na parte inferior */
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
  margin-bottom: ${({theme}) => theme.spacing.xl}px;
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
  margin-vertical: 20px;
  width: 100%;
  padding-horizontal: 20px;
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