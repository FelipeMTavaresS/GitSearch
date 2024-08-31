import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import {
  Container,
  RecentUsersContainer,
  RecentUsersTitle,
  RecentUserItem,
  RecentUserAvatar,
  BoxContainer,
  ViewCenter,
} from "./styled";
import Modal from "@/app/components/modal";
import SearchBarComponent from "./components/searchbarcomponent";
import UserData from "./components/userdata";
import UserStats from "./components/userstats";

const RecentUserHome: React.FC = () => {
  const PLACEHOLDER_IMAGE = "https://img.icons8.com/pulsar-color/192/test-account.png";
  const ENDPOINT = "https://api.github.com/users/";

  interface Repository {
    name: string;
    description: string | null;
    language: string | null;
    created_at: string;
    pushed_at: string;
    html_url: string;
  }

  interface RecentUser {
    id: string;
    userName: string;
    avatarUrl: string;
    name: string;
    login: string;
    location: string;
  }

  const fetchUserData = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

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

  const handleGetUserData = async (url: string) => {
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
        if (prevUsers.some((user) => user.userName === login)) {
          return prevUsers;
        }
        return [...prevUsers, { id, userName: login, avatarUrl, name, login, location }];
      });
    } catch {
      setModalMessage("Erro ao buscar os dados do usuário.");
      setModalVisible(true);
    }
  };

  const handleGetUserRepositoryData = async (url: string) => {
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
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }
    await Promise.all([handleGetUserData(`${ENDPOINT}${userName}`), handleGetUserRepositoryData(`${ENDPOINT}${userName}/repos`)]);
  };

  const handleRecentUserClick = async (user: RecentUser) => {
    setUserName(user.userName);
    await handleGetUserData(`${ENDPOINT}${user.userName}`);
    await handleGetUserRepositoryData(`${ENDPOINT}${user.userName}/repos`);
  };

  const handleCloseModal = () => setModalVisible(false);

  return (
    <ScrollView>
      <ViewCenter>
        <SearchBarComponent userName={userName} setUserName={setUserName} onSearch={handleSearch} />
        <BoxContainer>
          <RecentUsersContainer>
            <RecentUsersTitle>Usuários Recentes</RecentUsersTitle>
            <FlatList
              data={recentUsers}
              keyExtractor={(item) => item.userName + item.id}
              renderItem={({ item }) => (
                <RecentUserItem>
                  <TouchableOpacity onPress={() => handleRecentUserClick(item)}>
                    <RecentUserAvatar source={{ uri: item.avatarUrl }} />
                  </TouchableOpacity>
                  <Container>
                    <Text>{item.name}</Text>
                    <Text>{item.login}</Text>
                    <Text>{item.location}</Text>
                  </Container>
                </RecentUserItem>
              )}
              style={{ flexGrow: 0 }} // Adjust style as necessary
            />
          </RecentUsersContainer>
        </BoxContainer>
      </ViewCenter>

      {/* Add other components like UserData and UserStats as needed */}
      <Modal visible={modalVisible} message={modalMessage} onClose={handleCloseModal} />
    </ScrollView>
  );
};

export default RecentUserHome;
