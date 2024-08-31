import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking } from "react-native";
import {
  ProfileIconContainer,
  ProfileImage,
  BoxContainer,
  TextSubTitle,
  BoxContainerRepos,
  ScrollRepos,
  H2TextBold,
  ReposView,
  TextGray,
  HorizontalLine,
  H2TextRepos,
  ViewSpaceRepos,
  DataText
} from "./styled";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "@/app/components/modal";
import SearchBarComponent from "./components/searchbarcomponent";
import UserData from "./components/userdata";
import UserStats from "./components/userstats";

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

const formatNumber = (value: number): string => {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1).replace(".0", "") + "k";
  return value.toString();
};

const formatTextDesc = (value: string): string => {
  if (!value) return "Não possui descrição";

  const maxLength = 20;
  const maxLineLength = 12;
  const truncatedText = value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  return wrapText(truncatedText, maxLineLength);
};

const formatTextTitle = (value: string): string => {
  if (!value) return "Sem título";

  const maxLineLength = 15;
  return wrapText(value, maxLineLength);
};

const wrapText = (text: string, maxLineLength: number): string => {
  const lines: string[] = [];
  let currentLine = '';

  for (const char of text) {
    currentLine += char;
    if (currentLine.length >= maxLineLength) {
      lines.push(currentLine.trim());
      currentLine = '';
    }
  }

  if (currentLine.length) lines.push(currentLine.trim());
  return lines.join('\n');
};

const fetchUserData = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const RecentUsersMenu: React.FC<{ recentUsers: RecentUser[], onUserClick: (user: RecentUser) => void }> = ({ recentUsers, onUserClick }) => {
  return (
    <View style={styles.recentUsersContainer}>
      <Text style={styles.recentUsersTitle}>Usuários Recentes</Text>
      <FlatList
        data={recentUsers}
        keyExtractor={(item) => item.userName + item.id}
        renderItem={({ item }) => (
          <View style={styles.recentUserItem}>
            <TouchableOpacity onPress={() => onUserClick(item)}>
              <Image source={{ uri: item.avatarUrl }} style={styles.recentUserAvatar} />
            </TouchableOpacity>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.login}</Text>
              <Text>{item.location}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

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
    <ScrollView>
      <View style={styles.container}>
        <SearchBarComponent
          userName={userName}
          setUserName={setUserName}
          onSearch={handleSearch}
        />
        <RecentUsersMenu recentUsers={recentUsers} onUserClick={handleRecentUserClick} />
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
        <BoxContainerRepos>
            <ScrollRepos>
            <ReposView>
              <H2TextBold>Repositórios</H2TextBold>
              <TextGray>
                {publicRepos ? formatNumber(publicRepos) : 0} Repositórios
              </TextGray>
              <HorizontalLine />
              {repositories.map((repo, index) => (
                <View key={index}>
                  <ViewSpaceRepos>
                    <TouchableOpacity onPress={() => Linking.openURL(repo.html_url)}>
                      <H2TextRepos style={styles.repoLink}>{formatTextTitle(repo.name)}</H2TextRepos>
                    </TouchableOpacity>
                    <DataText>
                      Criado em: {'\n'} {new Date(repo.created_at).toLocaleDateString()}
                    </DataText>
                  </ViewSpaceRepos>
                  <ViewSpaceRepos>
                    <TextSubTitle>
                      {repo.description
                        ? formatTextDesc(repo.description)
                        : "Sem descrição"}
                    </TextSubTitle>
                    <TextSubTitle>
                      {repo.language
                        ? formatTextDesc(repo.language)
                        : "Sem linguagem definida"}
                    </TextSubTitle>
                    <TextSubTitle>
                      Último push: {new Date(repo.pushed_at).toLocaleDateString()}
                    </TextSubTitle>
                  </ViewSpaceRepos>
                  <HorizontalLine />
                </View>
              ))}
            </ReposView>
          </ScrollRepos>
        </BoxContainerRepos>
      </View>
      <Modal
        visible={modalVisible}
        onClose={handleCloseModal}
        message={modalMessage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  recentUsersContainer: {
    marginVertical: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  recentUsersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentUserItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  repoLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Home;