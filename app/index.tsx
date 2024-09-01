import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from "react-native";
import RecentUsersMenu from "./components/RecentUsersMenu";
import RepositoryList from "./components/RepositoryList";
import {
  Backgroud,
  BoxContainer,
  BoxContainerRepos,
  ProfileIconContainer,
  ProfileImage,
  ViewCenter,
} from "./styled";
import SearchResultsMenu from "./components/SearchResultsMenu";
import { fetchUserData } from "./components/utils";
import SearchBarComponent from "./components/searchbarcomponent";
import UserData from "./components/userdata";
import UserStats from "./components/userstats";
import Modal from "./components/modal";
import { RecentUser, Repository } from "./components/types";

const PLACEHOLDER_IMAGE =
  "https://img.icons8.com/pulsar-color/192/test-account.png";
const ENDPOINT = "https://api.github.com/users/";

const Home: React.FC = () => {
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

  const handleGetUserData = async (userName: string) => {
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }
    try {
      const response = await fetch(`${ENDPOINT}${userName}`);
      if (!response.ok) {
        setModalMessage("Erro ao buscar os dados do usuário.");
        setModalVisible(true);
        return;
      }
      const data = await response.json();
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
        return [
          ...prevUsers,
          { id, userName: login, avatarUrl, name, login, location },
        ];
      });
    } catch {
      setModalMessage("Erro ao buscar os dados do usuário.");
      setModalVisible(true);
    }
  };

  const handleGetUserRepositoryData = async (userName: string) => {
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch(`${ENDPOINT}${userName}/repos`);
      if (!response.ok) {
        setModalMessage("Erro ao buscar os dados do usuário.");
        setModalVisible(true);
        return;
      }
      const data = await response.json();
      const repos = data.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        created_at: repo.created_at,
        pushed_at: repo.pushed_at,
        html_url: repo.html_url,
      }));

      setRepositories(repos);
    } catch {
      setModalMessage("Erro ao buscar os dados dos repositórios.");
      setModalVisible(true);
    }
  };

  const handleSearch = async () => {
    await Promise.all([handleGetUserData(userName), handleGetUserRepositoryData(userName)]);
  };

  const handleRecentUserClick = async (user: RecentUser) => {
    setUserName(user.userName);
    await handleGetUserData(user.userName);
    await handleGetUserRepositoryData(user.userName);
  };

  const handleCloseModal = () => setModalVisible(false);

  useEffect(() => {
    const defaultUserName = "FelipeMTavaresS";
    setUserName(defaultUserName);
    handleGetUserData(defaultUserName);
    handleGetUserRepositoryData(defaultUserName);
  }, []);


  const renderItem: ListRenderItem<any> = ({ item }) => {
    switch (item.type) {
      case 'searchBar':
        return (
          <ViewCenter>
          <SearchBarComponent
            userName={userName}
            setUserName={setUserName}
            onSearch={handleSearch}
          />
          </ViewCenter>
        );
      case 'searchResult':
        return searchResult ? (
          <SearchResultsMenu user={searchResult} onUserClick={handleSearch} />
        ) : null;
      case 'profile':
        return (
          <ViewCenter>
          <BoxContainer>
            <TouchableOpacity>
              <ProfileIconContainer>
                <ProfileImage source={{ uri: avatarUrl }} />
              </ProfileIconContainer>
            </TouchableOpacity>
            <UserData
              userName={name}
              userLogin={login}
              location={location}
              id={id}
            />
            <UserStats followers={followers} publicRepos={publicRepos} />
          </BoxContainer>
          </ViewCenter>
        );
      case 'repositoryList':
        return (
          <ViewCenter>
          <RepositoryList
            repositories={repositories}
            publicRepos={publicRepos}
          />
      </ViewCenter>
        );
      case 'recentUsers':
        return (
          <ViewCenter>
          <RecentUsersMenu
            recentUsers={recentUsers}
            onUserClick={handleRecentUserClick}
          />
          </ViewCenter>
        );
      default:
        return null;
    }
  };

  const data = [
    { type: 'searchBar' },
    { type: 'searchResult' },
    { type: 'profile' },
    { type: 'repositoryList' },
    { type: 'recentUsers' },
  ];

  return (
    <Backgroud>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.type}
        ListFooterComponent={
          <Modal
            visible={modalVisible}
            onClose={handleCloseModal}
            message={modalMessage}
          />
        }
      />
    </Backgroud>
  );
};

export default Home;