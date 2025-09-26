import React from "react";
import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { useTheme } from 'styled-components/native';
import { RecentUser } from "./types";
import { BoxContainer, RecentUserAvatar, RecentUserItem, RecentUsersContainer, RecentUsersTitle } from "../styled";

interface RecentUsersMenuProps {
  recentUsers: RecentUser[];
  onUserClick: (user: RecentUser) => void;
}

const RecentUsersMenu: React.FC<RecentUsersMenuProps> = ({
  recentUsers,
  onUserClick,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const isWide = screenWidth >= 1000;
  const theme = useTheme();
  const nameStyle = { color: theme.colors.textPrimary } as const;
  const secondaryStyle = { color: theme.colors.textSecondary, fontSize: 12 } as const;

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <BoxContainer style={isWide ? { width: 320 } : { width: '100%' }}>
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
                  <Text style={nameStyle}>{item.name}</Text>
                  <Text style={secondaryStyle}>{item.login}</Text>
                  <Text style={secondaryStyle}>{item.location}</Text>
                </View>
              </RecentUserItem>
            )}
          />
        </RecentUsersContainer>
      </BoxContainer>
    </View>
  );
};

export default RecentUsersMenu;
