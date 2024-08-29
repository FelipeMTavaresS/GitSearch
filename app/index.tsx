import React, { useState } from "react";
import { View, Text, Image } from "react-native";
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
  ProfileText
} from "./styled";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const PlaceHolderImagem = "https://img.icons8.com/pulsar-color/192/test-account.png";
const LupaIcon = "https://img.icons8.com/ios-filled/50/000000/search--v1.png";



function formatNumber(value: number): string {
  if (value >= 1000 && value < 1000000) {
    return (value / 1000).toFixed(1).replace('.0', '') + 'k'; // Ex: 1500 -> 1.5k
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace('.0', '') + 'M'; // Ex: 1500000 -> 1.5M
  } else {
    return value.toString(); // Ex: 500 -> 500
  }
}

export default function Index() {
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

  const handleGetUserData = async () => {
    if (!userName) {
      alert("Por favor, insira um nome de usuário.");
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }
      const data = await response.json();

      setLogin(data.login);
      setName(data.name);
      setAvatarUrl(data.avatar_url);
      setBio(data.bio);
      setPublicRepos(data.public_repos);
      setFollowers(data.followers);
      setFollowing(data.following);
      setLocation(data.location || "Localização não disponível");
      setId(data.id);
      
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
      alert("Erro ao buscar os dados do usuário.");
    }
  };

  return (
    <SafeAreaView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <InputContainer>
          <TextInput
            onChangeText={(text) => setUserName(text)}
            placeholder="Nome do usuário"
          />
          <SearchButton onPress={handleGetUserData}>
            <Image source={{ uri: LupaIcon }} style={{ width: 20, height: 20 }} />
          </SearchButton>
        </InputContainer>
        
        <TouchableOpacity>
          <ProfileIconContainer>
            <ProfileImage source={{ uri: avatarUrl || PlaceHolderImagem }} />
          </ProfileIconContainer>
        </TouchableOpacity>
        <BoxContainer>
          <ProfileText>
          <Text>{name || "Usuário"}</Text>
          <Text>{login || "User"}</Text>
          <Text>País: {location || ""}</Text>
          <Text>{id}</Text>
          </ProfileText>
          <ViewSpace>
            <TextTitle>{formatNumber(followers)}</TextTitle>
            <TextTitle>{publicRepos}</TextTitle>
          </ViewSpace>
          <ViewSpace>
            <TextSubTitle>Seguidores</TextSubTitle>
            <TextSubTitle>Repos</TextSubTitle>
          </ViewSpace>
          
        </BoxContainer>
      </View>
    </SafeAreaView>
  );
}
