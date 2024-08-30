import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  TextInput,
  ProfileIconContainer,
  ProfileImage,
  InputContainer,
  SearchButton,
  BoxContainer,
  TextTitle,
  TextSubTitle,
  ViewSpace,
  ProfileText,
  H1Text,
  BoxContainerRepos,
  ScrollRepos,
  H2Text,
  H2TextBold,
  ReposView,
  TextGray,
  HorizontalLine,
  H2TextRepos,
  ViewSpaceRepos,
  DataText
} from "../styled";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "@/app/components/modal";

const PlaceHolderImagem =
  "https://img.icons8.com/pulsar-color/192/test-account.png";
const LupaIcon = "https://img.icons8.com/ios-filled/50/000000/search--v1.png";
const endereco = "https://api.github.com/users/";

function formatNumber(value: number): string | undefined {
  if (value) {
    if (value >= 1000 && value < 1000000) {
      return (value / 1000).toFixed(1).replace(".0", "") + "k"; // Ex: 1500 -> 1.5k
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1).replace(".0", "") + "M"; // Ex: 1500000 -> 1.5M
    } else {
      return value.toString(); // Ex: 500 -> 500
    }
  }
}

export default function Home() {
  const [userName, setUserName] = useState<String>("");
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [publicRepos, setPublicRepos] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [location, setLocation] = useState("");
  const [id, setId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const url = `https://api.github.com/users/${userName}`;
  const urlRepository = `https://api.github.com/users/${userName}/repos`;

  const [repositories, setRepositories] = useState<Array<any>>([]);

  const handleGetUserData = async () => {
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch(url);

      const data = await response.json();
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
    } catch (error) {
      setModalMessage("Erro ao buscar os dados do usuário.");
      setModalVisible(true);
    }
  };

  const handleGetUserRepositoryData = async () => {
    if (!userName) {
      setModalMessage("Por favor, insira um nome de usuário.");
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch(urlRepository);
      const data = await response.json();

      const repositories = data.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        created_at: repo.created_at,
        pushed_at: repo.pushed_at,
      }));

      setRepositories(repositories);
    } catch (error) {
      setModalMessage("Erro ao buscar os dados dos repositórios.");
      setModalVisible(true);
    }
  };

  const handleSearch = async () => {
    handleGetUserData();
    handleGetUserRepositoryData();
  };
  const handleCloseModal = async () => {
    setModalVisible(false);
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <InputContainer>
          <TextInput
            onChangeText={(text) => setUserName(text)}
            placeholder="Nome do usuário"
          />
          <SearchButton onPress={handleSearch}>
            <Image
              source={{ uri: LupaIcon }}
              style={{ width: 20, height: 20 }}
            />
          </SearchButton>
        </InputContainer>
        <BoxContainer>
          <TouchableOpacity>
            <ProfileIconContainer>
              <ProfileImage source={{ uri: avatarUrl || PlaceHolderImagem }} />
            </ProfileIconContainer>
          </TouchableOpacity>
          <ProfileText>
            <H1Text>{name || "Usuário"}</H1Text>
            <H2Text>{login || "User"}</H2Text>
            <Text>País: {location || ""}</Text>
            <Text>Id do usuário:</Text>
            <Text>{id}</Text>
          </ProfileText>
          <ViewSpace>
            <TextTitle>{followers ? formatNumber(followers) : 0}</TextTitle>
            <TextTitle>{publicRepos ? publicRepos : 0}</TextTitle>
          </ViewSpace>
          <ViewSpace>
            <TextSubTitle>Seguidores</TextSubTitle>
            <TextSubTitle>Repos</TextSubTitle>
          </ViewSpace>
        </BoxContainer>
        <BoxContainerRepos>
          <ScrollRepos>
            <ReposView>
              <H2TextBold>Repositórios</H2TextBold>
              <TextGray>{publicRepos ? publicRepos : 0} Repositórios</TextGray>
              <HorizontalLine/>
              <ViewSpaceRepos>
              <H2TextRepos>Git Search</H2TextRepos>
              <DataText>15/02/24</DataText>
              </ViewSpaceRepos>
              <ViewSpaceRepos>
              <TextSubTitle>Desc</TextSubTitle>
              <TextSubTitle>ult. push 15/12</TextSubTitle>
              </ViewSpaceRepos>
              <ViewSpaceRepos>
              <H2TextRepos>Git Search</H2TextRepos>
              <DataText>15/02/24</DataText>
              </ViewSpaceRepos>
              <ViewSpaceRepos>
              <TextSubTitle>Desc</TextSubTitle>
              <TextSubTitle>ult. push 15/12</TextSubTitle>
              </ViewSpaceRepos>
              
              <ViewSpaceRepos>
              <H2TextRepos>Git Search</H2TextRepos>
              <DataText>15/02/24</DataText>
              </ViewSpaceRepos>
              <ViewSpaceRepos>
              <TextSubTitle>Desc</TextSubTitle>
              <TextSubTitle>ult. push 15/12</TextSubTitle>
              </ViewSpaceRepos>
              
              <ViewSpaceRepos>
              <H2TextRepos>Git Search</H2TextRepos>
              <DataText>15/02/24</DataText>
              </ViewSpaceRepos>
              <ViewSpaceRepos>
              <TextSubTitle>Desc</TextSubTitle>
              <TextSubTitle>ult. push 15/12</TextSubTitle>
              </ViewSpaceRepos>
              
              <ViewSpaceRepos>
              <H2TextRepos>Git Search</H2TextRepos>
              <DataText>15/02/24</DataText>
              </ViewSpaceRepos>
              <ViewSpaceRepos>
              <TextSubTitle>Desc</TextSubTitle>
              <TextSubTitle>ult. push 15/12</TextSubTitle>
              </ViewSpaceRepos>
              
              
              
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
}
