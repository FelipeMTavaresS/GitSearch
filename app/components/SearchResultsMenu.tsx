import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTheme } from 'styled-components/native';
import { RecentUser } from "./types";


interface SearchResultsMenuProps {
  user: RecentUser;
  onUserClick: () => void;
}

const SearchResultsMenu: React.FC<SearchResultsMenuProps> = ({ user, onUserClick }) => {
  const theme = useTheme();
  return (
    <View>
      <TouchableOpacity onPress={onUserClick}>
        <Image source={{ uri: user.avatarUrl }} />
      </TouchableOpacity>
      <View>
        <Text style={{ color: theme.colors.textPrimary }}>{user.name}</Text>
        <Text style={{ color: theme.colors.textSecondary }}>{user.login}</Text>
        <Text style={{ color: theme.colors.textSecondary }}>{user.location}</Text>
      </View>
    </View>
  );
};


export default SearchResultsMenu;