import React from "react";
import { Text } from "react-native";
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
  return (
    <ProfileText>
      <H1Text>{userName || "Usuário"}</H1Text>
      <H2Text>{userLogin || "User"}</H2Text>
      <Text>País: {location || "Localização não disponível"}</Text>
      <Text>Id do usuário:</Text>
      <Text>{id || "ID não disponível"}</Text>
    </ProfileText>
  );
};

export default UserData;