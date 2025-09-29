import React from "react";
import { View, FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { RecentUser } from "./types";
import {
  RecentUserAvatar,
  RecentUserItem,
  RecentUsersContainer,
  RecentUsersTitle,
  RecentUsersOuter,
  RecentUsersBox,
  RecentUserName,
  RecentUserSecondary
} from "../styled";

interface RecentUsersMenuProps {
  recentUsers: RecentUser[];
  onUserClick: (user: RecentUser) => void;
}

const RecentUsersMenu: React.FC<RecentUsersMenuProps> = ({
  recentUsers,
  onUserClick,
}) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 1000;
  const maxHeight = isWide ? 420 : 360; // limite de altura para evitar alongar demais

  return (
    <RecentUsersOuter>
      <RecentUsersBox $isWide={isWide}>
  <RecentUsersContainer>
          <RecentUsersTitle>Usuários Recentes</RecentUsersTitle>
          {recentUsers.length === 0 ? (
            <RecentUserSecondary style={{paddingVertical: 8}}>
              Nenhum usuário ainda.
            </RecentUserSecondary>
          ) : (
            <View style={{maxHeight, width: '100%'}}>
              <FlatList
                data={recentUsers.slice().reverse()}
                keyExtractor={(item) => item.userName + item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <RecentUserItem>
                    <TouchableOpacity onPress={() => onUserClick(item)}>
                      <RecentUserAvatar source={{ uri: item.avatarUrl }} />
                    </TouchableOpacity>
                    <View>
                      <RecentUserName numberOfLines={1}>{item.name || item.login}</RecentUserName>
                      <RecentUserSecondary numberOfLines={1}>{item.login}</RecentUserSecondary>
                      {item.location ? (
                        <RecentUserSecondary numberOfLines={1}>{item.location}</RecentUserSecondary>
                      ) : null}
                    </View>
                  </RecentUserItem>
                )}
              />
            </View>
          )}
        </RecentUsersContainer>
      </RecentUsersBox>
    </RecentUsersOuter>
  );
};

export default RecentUsersMenu;