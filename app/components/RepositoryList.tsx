import React from 'react';
import { FlatList, Platform, Animated } from 'react-native';
import { formatNumber } from './utils';
import { Repository } from './types';
import RepositoryCard from './RepositoryCard';
import { SkeletonLine } from '../styled';
import {
  RepositoryListContainer,
  RepositoryListHeaderRow,
  RepositoryListTitle,
  RepositoryListCount,
  RepositoryListShowMoreButton,
  RepositoryListShowMoreText
} from '../styled';


interface RepositoryListProps {
  repositories: Repository[];
  publicRepos: number;
  isLoadingMore?: boolean;
  hasMore?: boolean;            // se ainda há mais no servidor
  onLoadMore?: () => void;       // busca próxima página (mais 10)
}

const FIRST_VISIBLE = 5;         // Exibe 5 ao iniciar
const LOCAL_INCREMENT = 5;       // Libera mais 5 locais antes de novo fetch

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, publicRepos, isLoadingMore = false, hasMore = false, onLoadMore }) => {
  const [localVisible, setLocalVisible] = React.useState<number>(FIRST_VISIBLE);
  const loadingOpacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(loadingOpacity, {
      toValue: isLoadingMore ? 0.5 : 1,
      duration: 220,
      useNativeDriver: true
    }).start();
  }, [isLoadingMore, loadingOpacity]);

  React.useEffect(() => {
    // Reset ao trocar lista (novo usuário)
    setLocalVisible(FIRST_VISIBLE);
  }, [publicRepos, repositories.length > 0 && repositories[0]?.html_url]);

  const totalLoaded = repositories.length;
  const showing = Math.min(localVisible, totalLoaded);
  const sliced = repositories.slice(0, showing);
  const stillHiddenInBatch = totalLoaded > showing;

  const handlePress = () => {
    // Se ainda há itens carregados localmente ocultos, apenas expandimos
    if (stillHiddenInBatch) {
      setLocalVisible(v => v + LOCAL_INCREMENT);
      return;
    }
    // Caso contrário, se não há hidden local mas há mais no servidor, dispara fetch
    if (hasMore && onLoadMore) {
      onLoadMore();
    }
  };

  const renderSkeletons = () => {
    if (!isLoadingMore) return null;
    return (
      <>
        {[0,1].map(i => (
          <Animated.View key={'skeleton-'+i} style={{opacity: 0.6, marginBottom: 12}}>
            <SkeletonLine $h={18} $w="50%" />
            <SkeletonLine $h={12} $w="80%" />
            <SkeletonLine $h={12} $w="35%" />
          </Animated.View>
        ))}
      </>
    );
  };

  return (
    <RepositoryListContainer>
      <RepositoryListHeaderRow>
        <RepositoryListTitle>Repositórios</RepositoryListTitle>
        <RepositoryListCount>{publicRepos ? formatNumber(publicRepos) : 0}</RepositoryListCount>
      </RepositoryListHeaderRow>
      <FlatList
        data={sliced}
        keyExtractor={(r, idx) => r.html_url + '|' + idx}
        renderItem={({ item }) => <RepositoryCard repo={item} />}
        scrollEnabled={false}
      />
      {renderSkeletons()}
      {(hasMore || stillHiddenInBatch) && (
        <Animated.View style={{ opacity: loadingOpacity }}>
          <RepositoryListShowMoreButton
            onPress={isLoadingMore ? undefined : handlePress}
            disabled={isLoadingMore}
            {...(Platform.OS === 'web'
              ? { role: 'button', 'aria-label': isLoadingMore ? 'Carregando' : 'Mostrar mais repositórios', 'aria-busy': isLoadingMore }
              : { accessibilityRole: 'button', accessibilityLabel: isLoadingMore ? 'Carregando' : 'Mostrar mais repositórios' })}
          >
            <RepositoryListShowMoreText>
              {isLoadingMore ? 'Mostrar mais...' : 'Mostrar mais'}
            </RepositoryListShowMoreText>
          </RepositoryListShowMoreButton>
        </Animated.View>
      )}
      {(!hasMore && !stillHiddenInBatch && repositories.length > 0) && (
        <RepositoryListShowMoreText style={{ textAlign: 'center', opacity: 0.6, marginTop: 8 }}>Todos os repositórios carregados.</RepositoryListShowMoreText>
      )}
    </RepositoryListContainer>
  );
};


export default RepositoryList;
