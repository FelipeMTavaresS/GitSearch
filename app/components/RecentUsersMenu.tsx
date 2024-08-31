import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { RecentUser } from "./types";
import { BoxContainer, BoxContainerRepos, RecentUserAvatar, RecentUserItem, RecentUsersContainer, RecentUsersTitle } from "../styled";


interface RecentUsersMenuProps {
  recentUsers: RecentUser[];
  onUserClick: (user: RecentUser) => void;
}

const RecentUsersMenu: React.FC<RecentUsersMenuProps> = ({ recentUsers, onUserClick }) => {
  return (
    <BoxContainerRepos>
    <RecentUsersContainer>
      <RecentUsersTitle>Usuários Recentes</RecentUsersTitle>
      <FlatList
        data={recentUsers}
        keyExtractor={(item) => item.userName + item.id}
        renderItem={({ item }) => (
          <RecentUserItem>
            <TouchableOpacity onPress={() => onUserClick(item)}>
              <RecentUserAvatar source={{ uri: item.avatarUrl }} />
            </TouchableOpacity>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.login}</Text>
              <Text>{item.location}</Text>
            </View>
          </RecentUserItem>
        )}
      />
    </RecentUsersContainer>
    </BoxContainerRepos>
  );
};

export default RecentUsersMenu;