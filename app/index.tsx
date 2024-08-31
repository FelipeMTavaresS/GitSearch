import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import RecentUsersMenu from "./components/RecentUsersMenu";
import RepositoryList from "./components/RepositoryList";
import { Backgroud, BoxContainer, BoxContainerRepos, ProfileIconContainer, ProfileImage, ScrollRepos, ViewCenter } from "./styled";
import SearchResultsMenu from "./components/SearchResultsMenu";
import { fetchUserData } from "./components/utils";
import SearchBarComponent from "./components/searchbarcomponent";
import UserData from "./components/userdata";
import UserStats from "./components/userstats";
import Modal from "./components/modal";
import { RecentUser, Repository } from "./components/types";

const PLACEHOLDER_IMAGE = "https://img.icons8.com/pulsar-color/192/test-account.png";
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

  const handleGetUserData = async (url: string) => {
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }
    try {
      const data = await fetchUserData(url);

      const {
        login,
        name,
        avatar_url: avatarUrl,
        bio,
        public_repos: publicRepos,
        followers,
        following,
        location = "Localização não disponível",
        id,
      } = data;

      setLogin(login);
      setName(name);
      setAvatarUrl(avatarUrl);
      setBio(bio);
      setPublicRepos(publicRepos);
      setFollowers(followers);
      setFollowing(following);
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

  const handleGetUserRepositoryData = async (url: string) => {
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }

    try {
      const data = await fetchUserData(url);
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
    await Promise.all([handleGetUserData(`${ENDPOINT}${userName}`), handleGetUserRepositoryData(`${ENDPOINT}${userName}/repos`)]);
  };

  const handleRecentUserClick = async (user: RecentUser) => {
    setUserName(user.userName);
    await handleGetUserData(`${ENDPOINT}${user.userName}`);
    await handleGetUserRepositoryData(`${ENDPOINT}${user.userName}/repos`);
  };

  const handleCloseModal = () => setModalVisible(false);

  return (
    <Backgroud>
    <ScrollView>
      <ViewCenter>
        <SearchBarComponent
          userName={userName}
          setUserName={setUserName}
          onSearch={handleSearch}
        />
        {searchResult && (
          <SearchResultsMenu user={searchResult} onUserClick={handleSearch} />
        )}
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
          <UserStats
            followers={followers}
            publicRepos={publicRepos}
          />
        </BoxContainer>
        <RepositoryList repositories={repositories} publicRepos={publicRepos} />
        <ScrollView nestedScrollEnabled={true}>
        <RecentUsersMenu recentUsers={recentUsers} onUserClick={handleRecentUserClick} />
        </ScrollView>
      </ViewCenter>
      
      <Modal
        visible={modalVisible}
        onClose={handleCloseModal}
        message={modalMessage}
      />
    </ScrollView>
    </Backgroud>
  );
};


export default Home;