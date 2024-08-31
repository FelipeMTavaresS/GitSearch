import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { RecentUser } from "./types";


interface SearchResultsMenuProps {
  user: RecentUser;
  onUserClick: () => void;
}

const SearchResultsMenu: React.FC<SearchResultsMenuProps> = ({ user, onUserClick }) => {
  return (
    <View>
      <TouchableOpacity onPress={onUserClick}>
        <Image source={{ uri: user.avatarUrl }} />
      </TouchableOpacity>
      <View>
        <Text>{user.name}</Text>
        <Text>{user.login}</Text>
        <Text>{user.location}</Text>
      </View>
    </View>
  );
};


export default SearchResultsMenu;