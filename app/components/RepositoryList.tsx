import React from 'react';
import { FlatList } from 'react-native';
import { formatNumber } from './utils';
import { Repository } from './types';
import styled from 'styled-components/native';
import RepositoryCard from './RepositoryCard';

const Container = styled.View`
  width: 100%;
`;
const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({theme}) => theme.spacing.md}px;
`;
const Title = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  font-size: ${({theme}) => theme.font.size.xl}px;
  font-weight: ${({theme}) => theme.font.weight.bold};
`;
const Count = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
`;

interface RepositoryListProps {
  repositories: Repository[];
  publicRepos: number;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, publicRepos }) => {
  return (
    <Container>
      <HeaderRow>
        <Title>Repositórios</Title>
        <Count>{publicRepos ? formatNumber(publicRepos) : 0}</Count>
      </HeaderRow>
      <FlatList
        data={repositories}
        keyExtractor={(r) => r.html_url}
        renderItem={({ item }) => <RepositoryCard repo={item} />}
        scrollEnabled={false}
      />
    </Container>
  );
};

export default RepositoryList;
