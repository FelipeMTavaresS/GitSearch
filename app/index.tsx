import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, FlatList, ListRenderItem, ActivityIndicator, View, useWindowDimensions, Animated, Platform } from "react-native";
import { ThemeProviderCustom, useAppTheme } from './themeContext';
// RecentUsers integrados na SearchBar agora
import RepositoryList from "./components/RepositoryList";
import {
  Backgroud,
  BoxContainer,
  ProfileIconContainer,
  ProfileImage,
  Section,
  TopBar,
  ThemeToggleBtn,
  ThemeToggleText,
  TopBarRow,
  TopBarLeft,
  TopBarTitle,
} from "./styled";
import SearchResultsMenu from "./components/SearchResultsMenu";

import SearchBarComponent from "./components/searchbarcomponent";
import RecentUsersMenu from "./components/RecentUsersMenu";
import { Image } from 'react-native';
import UserData from "./components/userdata";
import UserStats from "./components/userstats";
import Modal from "./components/modal";
import { RecentUser, Repository } from "./components/types";
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { darkTheme } from './theme';
import { ProfileSkeleton, RepoListSkeleton } from './components/Skeleton';

const PLACEHOLDER_IMAGE =
  "https://img.icons8.com/pulsar-color/192/test-account.png";
const ENDPOINT = "https://api.github.com/users/";
// ===== Debug =====
const DEBUG = true;
const debugLog = (...args: any[]) => { if (DEBUG) console.log('[DEBUG]', ...args); };

// Logos locais (assets)
const LOGO_LIGHT = require('../assets/logo/github-mark.png');
const LOGO_DARK = require('../assets/logo/github-mark-white.png');

const HomeContent: React.FC = () => {
  const { width } = useWindowDimensions();
  const isWide = width >= 1000; // breakpoint para layout em colunas
  const { mode } = useAppTheme();
  const [userName, setUserName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>(PLACEHOLDER_IMAGE);
  const [bio, setBio] = useState<string>("");
  const [publicRepos, setPublicRepos] = useState<number>(0);
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [searchResult, setSearchResult] = useState<RecentUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // Página de repositórios (1 = primeira página carregada). Exibimos 5 dos primeiros 10 inicialmente.
  const [repoPage, setRepoPage] = useState<number>(0);
  const [hasMoreRepos, setHasMoreRepos] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  // Valor debounced do texto de busca para sugestões (apenas para suggestions, não para busca principal que é manual)
  const debouncedUserName = useDebouncedValue(userName, 320);
  const scrollY = useRef(new Animated.Value(0)).current;
  const shrink = scrollY.interpolate({ inputRange: [0, 120], outputRange: [0, 1], extrapolate: 'clamp' });
  const suggestionCache = useRef<Map<string, any[]>>(new Map());
  const suggestionsAbort = useRef<AbortController | null>(null);
  const REPOS_PER_PAGE = 10; // Carregar 10 por clique

  const handleGetUserData = async (userName: string) => {
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }
    try {
      setLoading(true);
      debugLog('handleGetUserData:start', { userName });
      const response = await fetch(`${ENDPOINT}${userName}`);
      debugLog('handleGetUserData:response', { status: response.status, url: response.url });
      if (!response.ok) {
        setModalMessage("Erro ao buscar os dados do usuário.");
        setModalVisible(true);
        setLoading(false);
        debugLog('handleGetUserData:failed', { userName, status: response.status });
        return;
      }
      const data = await response.json();
      debugLog('handleGetUserData:parsed', { login: data.login, public_repos: data.public_repos });
      const {
        login,
        name,
        avatar_url: avatarUrl,
        public_repos: publicRepos,
        followers,
        location = "Localização não disponível",
        id,
      } = data;

      setLogin(login);
      setName(name);
      setAvatarUrl(avatarUrl);
      setPublicRepos(publicRepos);
      setFollowers(followers);
      setLocation(location);
      setId(id);

      setRecentUsers((prevUsers) => {
        if (prevUsers.some(user => user.userName === login)) {
          return prevUsers;
        }
        const updated = [
          ...prevUsers,
          { id, userName: login, avatarUrl, name, login, location },
        ];
        // Persistir após adicionar (até 50)
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('recent_users', JSON.stringify(updated.slice(-50)));
          }
        } catch {}
        return updated;
      });
    } catch {
      setModalMessage("Erro ao buscar os dados do usuário.");
      setModalVisible(true);
    } finally {
      setLoading(false);
      debugLog('handleGetUserData:done', { userName });
    }
  };

  const handleGetUserRepositoryData = async (userName: string, page = 1, append = false) => {
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }

    try {
      debugLog('repos:start', { userName, page, append });
      if (publicRepos && page > Math.ceil(publicRepos / REPOS_PER_PAGE)) {
        debugLog('repos:exceeds-total-pages', { userName, page });
        setHasMoreRepos(false);
        return;
      }
      const url = `${ENDPOINT}${userName}/repos?per_page=${REPOS_PER_PAGE}&page=${page}&sort=updated`;
      const response = await fetch(url);
      debugLog('repos:response', { status: response.status, url });
      if (!response.ok) {
        if (response.status === 403) {
          const remaining = response.headers.get('X-RateLimit-Remaining');
          const reset = response.headers.get('X-RateLimit-Reset');
          if (remaining === '0' && reset) {
            const resetDate = new Date(parseInt(reset, 10) * 1000);
            const minutes = Math.max(1, Math.ceil((resetDate.getTime() - Date.now()) / 60000));
            setModalMessage(`Limite da API do GitHub atingido. Tente novamente em ~${minutes} min.`);
            debugLog('repos:rate-limit', { remaining, reset: resetDate.toISOString(), minutes });
          } else {
            setModalMessage("Acesso negado pela API (403). Aguarde e tente novamente.");
            debugLog('repos:403-other');
          }
        } else {
          setModalMessage("Erro ao buscar os dados do usuário.");
          debugLog('repos:non-ok', { status: response.status });
        }
        setModalVisible(true);
        return;
      }
      const data = await response.json();
      debugLog('repos:raw-length', { length: data.length });
      const repos = data.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        created_at: repo.created_at,
        pushed_at: repo.pushed_at,
        html_url: repo.html_url,
      }));
      if (repos.length === 0) {
        debugLog('repos:empty-page', { userName, page });
        setHasMoreRepos(false);
        return;
      }
      setRepositories(prev => {
        const merged = append ? [...prev, ...repos] : repos;
        const seen = new Set<string>();
        const dedup = [] as typeof merged;
        for (const r of merged) {
          if (!seen.has(r.html_url)) {
            seen.add(r.html_url);
            dedup.push(r);
          }
        }
        debugLog('repos:merged', { prevLen: prev.length, added: repos.length, finalLen: dedup.length, append });
        return dedup;
      });
      const linkHeader = response.headers.get('link');
      if (repos.length < REPOS_PER_PAGE || !linkHeader || !/rel="next"/.test(linkHeader)) {
        setHasMoreRepos(false);
        debugLog('repos:no-more', { userName, page });
      } else {
        setHasMoreRepos(true);
        debugLog('repos:more-available', { userName, page });
      }
    } catch (err) {
      debugLog('repos:error', { userName, page, err });
      setModalMessage("Erro ao buscar os dados dos repositórios.");
      setModalVisible(true);
    }
  };

  const handleSearch = async (override?: string) => {
    const target = override ?? userName;
    if (!target) return;
    debugLog('search:start', { target, override });
    setLoading(true);
    setRepositories([]);
    setPublicRepos(0);
    setFollowers(0);
    setFollowing(0);
    setLocation("");
    setId("");
    setAvatarUrl(PLACEHOLDER_IMAGE);
    try {
      if (override) setUserName(override);
      await handleGetUserData(target);
      setRepoPage(1);
      setHasMoreRepos(true);
      await handleGetUserRepositoryData(target, 1, false);
    } catch (err) {
      debugLog('search:error', { target, err });
    } finally {
      setSuggestions([]);
      setLoading(false);
      // Limpa a barra de busca automaticamente após concluir a pesquisa
      setUserName("");
      debugLog('search:done', { target });
    }
  };

  const loadMoreRepos = async () => {
    if (!login || !hasMoreRepos || isLoadingMore) return;
    const nextPage = repoPage + 1;
    setIsLoadingMore(true);
    await handleGetUserRepositoryData(login, nextPage, true);
    setRepoPage(nextPage);
    setIsLoadingMore(false);
  };

  const handleRecentUserClick = async (user: RecentUser) => {
    debugLog('recent:click', { user: user.userName });
    // Mesmo se já estiver no mesmo login, forçamos refresh limpando repositórios antes.
    if (login === user.userName) {
      setRepositories([]);
      setPublicRepos(0);
      setFollowers(0);
      setFollowing(0);
      setLocation("");
      setId("");
      setAvatarUrl(PLACEHOLDER_IMAGE);
    }
    // Preenche imediatamente o campo para feedback instantâneo
    setUserName(user.userName);
    await handleSearch(user.userName);
  };

  const fetchSuggestions = async (q: string) => {
    // Garantir que q é string
    if (typeof q !== 'string') {
      debugLog('suggestions:invalid-query-type', { qType: typeof q });
      setSuggestions([]);
      return;
    }
    if (!q || q.trim().length < 2) { setSuggestions([]); setIsSuggestLoading(false); return; }
    const key = q.trim().toLowerCase();
    // histórico local (recent users) - priorizar início que bate
    const historyMatches = recentUsers
      .filter(u => u.userName.toLowerCase().startsWith(key))
      .map(u => ({ login: u.userName, avatarUrl: u.avatarUrl, source: 'history' }));

    if (suggestionCache.current.has(key)) {
      const cached = suggestionCache.current.get(key)!;
      const merged = [...historyMatches, ...cached.filter(c => !historyMatches.some(h => h.login === c.login))];
      setSuggestions(merged);
      setIsSuggestLoading(false);
      return;
    }
    setIsSuggestLoading(true);
    // Cancelar requisição anterior
    if (suggestionsAbort.current) {
      suggestionsAbort.current.abort();
    }
    suggestionsAbort.current = new AbortController();
    try {
      const resp = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(q)}&per_page=5`, { signal: suggestionsAbort.current.signal });
      if (!resp.ok) { setIsSuggestLoading(false); return; }
      const json = await resp.json();
      const remote = Array.isArray(json.items)
        ? json.items.map((u: any) => ({ login: u.login, avatarUrl: u.avatar_url, source: 'remote' }))
        : [];
      suggestionCache.current.set(key, remote);
      // Ranking: 1) histórico prefixo (já feito), 2) remoto prefixo, 3) remoto contém, 4) histórico contém (não prefixo)
      const lower = key;
  const remotePrefix = remote.filter((r: any) => r.login.toLowerCase().startsWith(lower));
  const remoteContain = remote.filter((r: any) => !r.login.toLowerCase().startsWith(lower) && r.login.toLowerCase().includes(lower));
      const historyContain = recentUsers
        .filter(u => !u.userName.toLowerCase().startsWith(lower) && u.userName.toLowerCase().includes(lower))
        .map(u => ({ login: u.userName, avatarUrl: u.avatarUrl, source: 'history' }));
      const merged = [
        ...historyMatches, // já prefix
  ...remotePrefix.filter((r: any) => !historyMatches.some(h => h.login === r.login)),
        ...historyContain.filter(hc => !historyMatches.some(h => h.login === hc.login)),
  ...remoteContain.filter((r: any) => !historyMatches.some(h => h.login === r.login) && !historyContain.some(hc => hc.login === r.login)),
      ];
      setSuggestions(merged.slice(0, 12));
    } catch (err:any) {
      if (err?.name === 'AbortError') {
        debugLog('suggestions:aborted');
      }
      // falha silenciosa
    } finally {
      setIsSuggestLoading(false);
    }
  };

  const handleChangeUserName = (text: string) => {
    setUserName(text);
  };

  // Efeito para buscar sugestões baseado no valor debounced
  useEffect(() => {
    if (!debouncedUserName) {
      setSuggestions([]);
      return;
    }
    fetchSuggestions(debouncedUserName);
  }, [debouncedUserName]);

  const handlePickSuggestion = async (loginPicked: string) => {
    setSuggestions([]);
    debugLog('suggestion:pick', { loginPicked });
    await handleSearch(loginPicked);
  };

  const handleClear = () => {
    setUserName("");
    setSuggestions([]);
    setIsSuggestLoading(false);
  };

  const handleCloseSuggestions = () => {
    setSuggestions([]);
    setIsSuggestLoading(false);
  };

  const handleCloseModal = () => setModalVisible(false);

  useEffect(() => {
    const defaultUserName = "FelipeMTavaresS";
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('recent_users');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setRecentUsers(parsed.slice(0,50));
          }
        }
      }
    } catch {}
    setUserName(defaultUserName);
    (async () => {
      await handleGetUserData(defaultUserName);
      setRepoPage(1);
      setHasMoreRepos(true);
      await handleGetUserRepositoryData(defaultUserName, 1, false);
    })();
  }, []);


  const renderItem: ListRenderItem<any> = ({ item }) => {
    switch (item.type) {
      case 'searchBar':
        return (
          <Section style={{ marginTop: 20, width: '100%', alignItems: 'stretch' }}>
            <SearchBarComponent
              userName={userName}
              onChangeUserName={handleChangeUserName}
              onSearch={handleSearch}
              onClear={handleClear}
              suggestions={suggestions}
              onPickSuggestion={handlePickSuggestion}
              shrink={shrink}
              isLoadingSuggestions={isSuggestLoading}
              onCloseSuggestions={handleCloseSuggestions}
              
            />
          </Section>
        );
      case 'searchResult':
        return searchResult ? (
          <SearchResultsMenu user={searchResult} onUserClick={handleSearch} />
        ) : null;
      case 'profile':
        return (
          <Section>
            {loading && repositories.length === 0 ? (
              <BoxContainer $fluid={isWide && Platform.OS === 'web'}>
                <ProfileSkeleton />
              </BoxContainer>
            ) : (
              <BoxContainer $fluid={isWide && Platform.OS === 'web'}>
                <ProfileIconContainer>
                  <ProfileImage source={{ uri: avatarUrl }} />
                </ProfileIconContainer>
                <UserData
                  userName={name}
                  userLogin={login}
                  location={location}
                  id={id}
                />
                <UserStats followers={followers} publicRepos={publicRepos} />
                {repositories.length > 0 && (
                  <View style={{ marginTop: 6 }}>
                    <Animated.Text style={{ fontSize: 12, opacity: 0.7 }}>
                      {`Exibindo ${Math.min(repositories.length, 5 + (repoPage-1)*REPOS_PER_PAGE)} de ${publicRepos} repositórios`}
                    </Animated.Text>
                  </View>
                )}
              </BoxContainer>
            )}
          </Section>
        );
      case 'recentUsers':
        return (
          <Section>
            <RecentUsersMenu
              recentUsers={recentUsers}
              onUserClick={async (u: RecentUser) => {
                await handleRecentUserClick(u);
              }}
            />
          </Section>
        );
      case 'repositoryList':
        return (
          <Section>
            {loading && repositories.length === 0 ? (
              <BoxContainer $fluid={isWide && Platform.OS === 'web'}>
                <RepoListSkeleton />
              </BoxContainer>
            ) : (
              <BoxContainer $fluid={isWide && Platform.OS === 'web'}>
                <RepositoryList
                  key={login || 'repo-list'}
                  repositories={repositories}
                  publicRepos={publicRepos}
                  isLoadingMore={isLoadingMore}
                  hasMore={hasMoreRepos}
                  onLoadMore={loadMoreRepos}
                />
              </BoxContainer>
            )}
          </Section>
        );
      default:
        return null;
    }
  };

  const data = [
    { type: 'searchBar' },
    { type: 'searchResult' },
    { type: 'profile' },
    { type: 'recentUsers' },
    { type: 'repositoryList' },
  ];

  return (
      <Backgroud>
        <Animated.View
          style={{
            width: '100%',
            backgroundColor: darkTheme.colors.surface, // será sobrescrito pelo ThemeProvider nos filhos
            shadowColor: '#000',
            shadowOpacity: scrollY.interpolate({ inputRange: [0, 40], outputRange: [0, 0.25], extrapolate: 'clamp' }),
            shadowRadius: scrollY.interpolate({ inputRange: [0, 60], outputRange: [0, 10], extrapolate: 'clamp' }),
            shadowOffset: { width: 0, height: 2 },
            elevation: scrollY.interpolate({ inputRange: [0, 50], outputRange: [0, 8], extrapolate: 'clamp' }),
            zIndex: 10
          }}
        >
          <TopBar>
            <TopBarRow>
              <TopBarLeft>
                <Image
                  source={mode === 'dark' ? LOGO_DARK : LOGO_LIGHT}
                  style={{ width: 34, height: 34, resizeMode: 'contain' }}
                  accessibilityLabel="GitHub Logo"
                />
                <TopBarTitle>GitHub Search</TopBarTitle>
              </TopBarLeft>
              <ThemeConsumerToggle />
            </TopBarRow>
          </TopBar>
        </Animated.View>
        {loading && repositories.length > 0 && (
          <ActivityIndicator size="large" color={darkTheme.colors.accent} style={{ marginVertical: 16 }} />
        )}
        {isWide ? (
          <Animated.ScrollView
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 160, maxWidth: 1600, alignSelf: 'center', width: '100%' }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false, listener: (e: any) => {
                // Removido carregamento automático ao aproximar do fim
              }}
            )}
          >
            <Animated.View style={{ width: '100%', marginTop: 20, marginBottom: 32, transform: [{ translateY: Animated.multiply(shrink, -10) }] }}>
              {renderItem({ item: { type: 'searchBar' }, index: 0, separators: {} as any })}
            </Animated.View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 32 }}>
              <View style={{ flex: 1, maxWidth: 480, gap: 32 }}>
                {renderItem({ item: { type: 'profile' }, index: 1, separators: {} as any })}
                {renderItem({ item: { type: 'recentUsers' }, index: 4, separators: {} as any })}
              </View>
              <View style={{ flex: 2, maxWidth: 820 }}>
                {renderItem({ item: { type: 'repositoryList' }, index: 3, separators: {} as any })}
              </View>
            </View>
            <Modal
              visible={modalVisible}
              onClose={handleCloseModal}
              message={modalMessage}
            />
          </Animated.ScrollView>
        ) : (
          <Animated.FlatList
            contentContainerStyle={{ paddingBottom: 120, width: '100%', paddingHorizontal: 20 }}
            style={{ width: '100%' }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.type}
            // Removido carregamento automático ao chegar ao fim da lista
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            ListFooterComponent={
              <Modal
                visible={modalVisible}
                onClose={handleCloseModal}
                message={modalMessage}
              />
            }
          />
        )}
      </Backgroud>
  );
};

const Home: React.FC = () => (
  <ThemeProviderCustom>
    <HomeContent />
  </ThemeProviderCustom>
);

// Componente interno para consumir contexto
const ThemeConsumerToggle: React.FC = () => {
  const { mode, toggle } = useAppTheme();
  return (
    <ThemeToggleBtn onPress={toggle} accessibilityRole="button" accessibilityLabel="Alternar tema claro/escuro">
      <ThemeToggleText>{mode === 'dark' ? '🌙' : '☀️'}</ThemeToggleText>
    </ThemeToggleBtn>
  );
};



export default Home;