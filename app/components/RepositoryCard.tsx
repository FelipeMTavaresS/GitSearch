import React from 'react';
import { Linking } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Repository } from './types';
import { LANGUAGE_COLORS, colorWithAlpha } from './languageColors';

interface Props {
  repo: Repository;
}

const Card = styled.View`
  background-color: ${({theme}) => theme.colors.surfaceAlt};
  border: 1px solid ${({theme}) => theme.colors.border};
  padding: ${({theme}) => theme.spacing.lg}px;
  border-radius: ${({theme}) => theme.radius.lg}px;
  margin-bottom: ${({theme}) => theme.spacing.md}px;
  gap: ${({theme}) => theme.spacing.sm}px;
  width: 100%;
`;

const TitleButton = styled.Pressable``;

const Title = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.font.size.lg}px;
  font-weight: ${({theme}) => theme.font.weight.bold};
`;

const Description = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.font.size.sm}px;
`;

const MetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({theme}) => theme.spacing.sm}px;
  align-items: center;
`;

const Pill = styled.View<{bg?: string; border?: string}>`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color: ${({bg, theme}) => bg || theme.colors.surface};
  padding: 4px 12px 4px 10px;
  border-radius: 999px;
  border: 1px solid ${({border, theme}) => border || theme.colors.border};
`;
const PillText = styled.Text<{colorOverride?: string}>`
  color: ${({colorOverride, theme}) => colorOverride || theme.colors.textSecondary};
  font-size: ${({theme}) => theme.font.size.xs}px;
`;
const Dot = styled.View<{color: string}>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({color}) => color};
`;

const DateText = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.font.size.xs}px;
`;

export const RepositoryCard: React.FC<Props> = ({ repo }) => {
  const theme = useTheme();
  const lang = repo.language;
  const langColor = lang && LANGUAGE_COLORS[lang as keyof typeof LANGUAGE_COLORS];
  const pillBg = langColor ? colorWithAlpha(langColor, theme.colors.background === '#0f1115' ? 0.18 : 0.12) : theme.colors.surface;
  const pillBorder = langColor ? colorWithAlpha(langColor, 0.4) : theme.colors.border;
  return (
    <Card>
      <TitleButton onPress={() => Linking.openURL(repo.html_url)}>
        <Title numberOfLines={1}>{repo.name}</Title>
      </TitleButton>
      {repo.description ? <Description numberOfLines={3}>{repo.description}</Description> : null}
      <MetaRow>
        {lang ? (
          <Pill bg={pillBg} border={pillBorder}>
            <Dot color={langColor || theme.colors.accent} />
            <PillText colorOverride={langColor ? langColor : undefined}>{lang}</PillText>
          </Pill>
        ) : null}
        <DateText>Criado: {new Date(repo.created_at).toLocaleDateString()}</DateText>
        <DateText>Push: {new Date(repo.pushed_at).toLocaleDateString()}</DateText>
      </MetaRow>
    </Card>
  );
};

export default RepositoryCard;