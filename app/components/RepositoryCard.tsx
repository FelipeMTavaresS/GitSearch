import React from 'react';
import { Linking } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Repository } from './types';
import { LANGUAGE_COLORS, colorWithAlpha } from './languageColors';

import {
  RepositoryCardWrapper,
  RepositoryCardTitleButton,
  RepositoryCardTitle,
  RepositoryCardDescription,
  RepositoryCardMetaRow,
  RepositoryCardPill,
  RepositoryCardPillText,
  RepositoryCardDot,
  RepositoryCardDateText
} from '../styled';

interface Props { repo: Repository; }

export const RepositoryCard: React.FC<Props> = ({ repo }) => {
  const theme = useTheme();
  const lang = repo.language;
  const langColor = lang && LANGUAGE_COLORS[lang as keyof typeof LANGUAGE_COLORS];
  const pillBg = langColor ? colorWithAlpha(langColor, theme.colors.background === '#0f1115' ? 0.18 : 0.12) : theme.colors.surface;
  const pillBorder = langColor ? colorWithAlpha(langColor, 0.4) : theme.colors.border;
  return (
    <RepositoryCardWrapper>
      <RepositoryCardTitleButton onPress={() => Linking.openURL(repo.html_url)}>
        <RepositoryCardTitle numberOfLines={1}>{repo.name}</RepositoryCardTitle>
      </RepositoryCardTitleButton>
      {repo.description ? <RepositoryCardDescription numberOfLines={3}>{repo.description}</RepositoryCardDescription> : null}
      <RepositoryCardMetaRow>
        {lang ? (
          <RepositoryCardPill $bg={pillBg} $border={pillBorder}>
            <RepositoryCardDot $color={langColor || theme.colors.accent} />
            <RepositoryCardPillText $color={langColor ? langColor : undefined}>{lang}</RepositoryCardPillText>
          </RepositoryCardPill>
        ) : null}
        <RepositoryCardDateText>Criado: {new Date(repo.created_at).toLocaleDateString()}</RepositoryCardDateText>
        <RepositoryCardDateText>Push: {new Date(repo.pushed_at).toLocaleDateString()}</RepositoryCardDateText>
      </RepositoryCardMetaRow>
    </RepositoryCardWrapper>
  );
};

export default RepositoryCard;