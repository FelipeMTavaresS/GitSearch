import React, { useState } from 'react';
import { 
  View, 
  Text
   } from "react-native";
import {
  TextInput,
  ProfileIconContainer,
  ProfileImage
} from './styled';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Index() {
  const [userName, setUserName] = useState<String>('')
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [publicRepos, setPublicRepos] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  
  const handleGetUserData = async () => {
    if (!userName) {
      alert('Por favor, insira um nome de usuário.');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      if (!response.ok) {
        throw new Error('Usuário não encontrado');
      }
      const data = await response.json();

      setLogin(data.login);
      setName(data.name);
      setAvatarUrl(data.avatar_url);
      setBio(data.bio);
      setPublicRepos(data.public_repos);
      setFollowers(data.followers);
      setFollowing(data.following);
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
      alert('Erro ao buscar os dados do usuário.');
    }
  };

  

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <TextInput
        onChangeText={(text) => setUserName(text)}
        placeholder="Digite seu nome"
      />
      <button onClick={handleGetUserData}></button>
      
      <Text></Text>
      <TouchableOpacity>
      <ProfileIconContainer>
        <ProfileImage source={{ uri: avatarUrl }} />
      </ProfileIconContainer>
      </TouchableOpacity>
      <Text>Nome: {name}</Text>
      <Text>User: {userName}</Text>
      <Text>Seguidores: {followers}</Text>

    </View>
    
  );
}
