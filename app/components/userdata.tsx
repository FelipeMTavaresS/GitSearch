import React from "react";
import { Text } from "react-native";
import { useTheme } from 'styled-components/native';
import {
  ProfileText,
  H1Text,
  H2Text
} from "../styled";

interface UserDataProps {
  userName: string;
  userLogin: string;
  location: string;
  id: string;
}

const UserData: React.FC<UserDataProps> = ({ userName, userLogin, location, id }) => {
  const theme = useTheme();
  const base = { color: theme.colors.textSecondary } as const;
  const strong = { color: theme.colors.textPrimary } as const;
  return (
    <ProfileText>
      <H1Text>{userName || "Usuário"}</H1Text>
      <H2Text>{userLogin || "User"}</H2Text>
      <Text style={base}>País: <Text style={strong}>{location || "Localização não disponível"}</Text></Text>
      <Text style={base}>Id do usuário:</Text>
      <Text style={strong}>{id || "ID não disponível"}</Text>
    </ProfileText>
  );
};

export default UserData;